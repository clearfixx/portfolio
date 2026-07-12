import {
  createHmac,
  randomBytes,
} from 'node:crypto'

import { publicApiResponse } from './publicApi'

type RateLimitBucket = {
  count: number
  resetAt: number
}

type PublicApiRateLimitOptions = {
  scope: string
  key: string
  limit: number
  windowMs: number
  now?: number
}

type RecentSubmissionOptions = {
  scope: string
  key: string
  ttlMs: number
  now?: number
}

export type PublicApiRateLimitDecision = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds: number
  windowSeconds: number
}

type GlobalRateLimitState = typeof globalThis & {
  __portfolioPublicApiRateLimitBuckets?: Map<
    string,
    RateLimitBucket
  >
  __portfolioPublicApiRecentSubmissions?: Map<
    string,
    number
  >
  __portfolioPublicApiRateLimitOperations?: number
}

const MAX_TRACKED_KEYS = 10_000
const PRUNE_INTERVAL = 100
const fallbackSecret = randomBytes(32)
const globalState =
  globalThis as GlobalRateLimitState

const rateLimitBuckets =
  globalState.__portfolioPublicApiRateLimitBuckets ??
  new Map<string, RateLimitBucket>()

const recentSubmissions =
  globalState.__portfolioPublicApiRecentSubmissions ??
  new Map<string, number>()

globalState.__portfolioPublicApiRateLimitBuckets =
  rateLimitBuckets
globalState.__portfolioPublicApiRecentSubmissions =
  recentSubmissions

function firstForwardedValue(
  value: string | null,
) {
  return value?.split(',')[0]?.trim() || null
}

function resolveRateLimitSecret() {
  const configuredSecret =
    process.env.PUBLIC_API_RATE_LIMIT_SECRET?.trim() ||
    process.env.PAYLOAD_SECRET?.trim()

  return configuredSecret || fallbackSecret
}

function hashRateLimitValue(value: string) {
  return createHmac(
    'sha256',
    resolveRateLimitSecret(),
  )
    .update(value)
    .digest('base64url')
    .slice(0, 32)
}

const trustedIpHeaders = new Set<string>([
  'cf-connecting-ip',
  'x-vercel-forwarded-for',
  'x-real-ip',
  'x-forwarded-for',
])

function resolveTrustedIpHeader() {
  const configuredHeader =
    process.env.PUBLIC_API_TRUSTED_IP_HEADER
      ?.trim()
      .toLowerCase()

  if (
    !configuredHeader ||
    !trustedIpHeaders.has(configuredHeader)
  ) {
    return null
  }

  return configuredHeader
}

function resolveClientAddress(request: Request) {
  const trustedHeader =
    resolveTrustedIpHeader()

  if (!trustedHeader) {
    return null
  }

  return firstForwardedValue(
    request.headers.get(trustedHeader),
  )
}

function removeOldestMapEntries<T>(
  map: Map<string, T>,
) {
  while (map.size > MAX_TRACKED_KEYS) {
    const oldestKey = map.keys().next().value

    if (typeof oldestKey !== 'string') {
      break
    }

    map.delete(oldestKey)
  }
}

function pruneRateLimitState(now: number) {
  const operationCount =
    (globalState
      .__portfolioPublicApiRateLimitOperations ??
      0) + 1

  globalState.__portfolioPublicApiRateLimitOperations =
    operationCount

  const shouldPrune =
    operationCount % PRUNE_INTERVAL === 0 ||
    rateLimitBuckets.size > MAX_TRACKED_KEYS ||
    recentSubmissions.size > MAX_TRACKED_KEYS

  if (!shouldPrune) {
    return
  }

  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key)
    }
  }

  for (const [key, expiresAt] of recentSubmissions) {
    if (expiresAt <= now) {
      recentSubmissions.delete(key)
    }
  }

  removeOldestMapEntries(rateLimitBuckets)
  removeOldestMapEntries(recentSubmissions)
}

function createDecision(
  allowed: boolean,
  limit: number,
  remaining: number,
  resetAt: number,
  windowMs: number,
  now: number,
): PublicApiRateLimitDecision {
  return {
    allowed,
    limit,
    remaining,
    resetAt,
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((resetAt - now) / 1000),
    ),
    windowSeconds: Math.ceil(
      windowMs / 1000,
    ),
  }
}

export function createPublicApiClientKey(
  request: Request,
) {
  const clientAddress =
    resolveClientAddress(request)

  if (clientAddress) {
    return hashRateLimitValue(
      `client-address:${clientAddress}`,
    )
  }

  const userAgent =
    request.headers.get('user-agent') || 'unknown'
  const language =
    request.headers.get('accept-language') ||
    'unknown'

  return hashRateLimitValue(
    `client-fallback:${userAgent}\n${language}`,
  )
}

export function createPublicApiValueKey(
  value: string,
) {
  return hashRateLimitValue(
    `submitted-value:${value}`,
  )
}

export function consumePublicApiRateLimit({
  scope,
  key,
  limit,
  windowMs,
  now = Date.now(),
}: PublicApiRateLimitOptions): PublicApiRateLimitDecision {
  pruneRateLimitState(now)

  const bucketKey = `${scope}:${key}`
  const existing = rateLimitBuckets.get(
    bucketKey,
  )

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs

    rateLimitBuckets.set(bucketKey, {
      count: 1,
      resetAt,
    })

    return createDecision(
      true,
      limit,
      Math.max(0, limit - 1),
      resetAt,
      windowMs,
      now,
    )
  }

  if (existing.count >= limit) {
    return createDecision(
      false,
      limit,
      0,
      existing.resetAt,
      windowMs,
      now,
    )
  }

  existing.count += 1
  rateLimitBuckets.set(bucketKey, existing)

  return createDecision(
    true,
    limit,
    Math.max(0, limit - existing.count),
    existing.resetAt,
    windowMs,
    now,
  )
}

export function checkRecentPublicApiSubmission({
  scope,
  key,
  ttlMs,
  now = Date.now(),
}: RecentSubmissionOptions): PublicApiRateLimitDecision {
  pruneRateLimitState(now)

  const submissionKey = `${scope}:${key}`
  const expiresAt =
    recentSubmissions.get(submissionKey)

  if (!expiresAt || expiresAt <= now) {
    if (expiresAt) {
      recentSubmissions.delete(submissionKey)
    }

    return createDecision(
      true,
      1,
      1,
      now + ttlMs,
      ttlMs,
      now,
    )
  }

  return createDecision(
    false,
    1,
    0,
    expiresAt,
    ttlMs,
    now,
  )
}

export function recordRecentPublicApiSubmission({
  scope,
  key,
  ttlMs,
  now = Date.now(),
}: RecentSubmissionOptions) {
  pruneRateLimitState(now)

  recentSubmissions.set(
    `${scope}:${key}`,
    now + ttlMs,
  )
}

export function publicApiRateLimitResponse(
  requestId: string,
  decision: PublicApiRateLimitDecision,
) {
  return publicApiResponse(
    {
      ok: false,
      message:
        'Too many requests. Please try again later.',
    },
    429,
    requestId,
    {
      'Retry-After': String(
        decision.retryAfterSeconds,
      ),
      'X-RateLimit-Limit': String(
        decision.limit,
      ),
      'X-RateLimit-Remaining': String(
        decision.remaining,
      ),
      'X-RateLimit-Reset': String(
        Math.ceil(decision.resetAt / 1000),
      ),
      'X-RateLimit-Policy':
        `${decision.limit};w=${decision.windowSeconds}`,
    },
  )
}
