import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { publicApiResponse, readPublicApiJson } from '@/lib/server/publicApi'
import {
  checkRecentPublicApiSubmission,
  consumePublicApiRateLimit,
  createPublicApiClientKey,
  createPublicApiValueKey,
  publicApiRateLimitResponse,
  recordRecentPublicApiSubmission,
} from '@/lib/server/publicApiRateLimit'

export const runtime = 'nodejs'

const MAX_CONTACT_BODY_BYTES = 8 * 1024
const CONTACT_CLIENT_LIMIT = 8
const CONTACT_CLIENT_WINDOW_MS = 10 * 60 * 1000
const CONTACT_DUPLICATE_WINDOW_MS = 30 * 60 * 1000

const projectTypes = {
  website: 'Website',
  'web-app': 'Web App',
  architecture: 'Architecture Review',
  consultation: 'Consultation',
  other: 'Other',
} as const

type ProjectType = keyof typeof projectTypes

type ContactRequest = {
  name?: unknown
  email?: unknown
  projectType?: unknown
  message?: unknown
  website?: unknown
  source?: unknown
  captcha?: unknown
}

type CaptchaProof = {
  checked: true
  interaction: 'pointer' | 'keyboard'
  trusted: true
  elapsedMs: number
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isProjectType(value: string): value is ProjectType {
  return value in projectTypes
}

function isCaptchaProof(value: unknown): value is CaptchaProof {
  if (!value || typeof value !== 'object') {
    return false
  }

  const proof = value as Record<string, unknown>

  return (
    proof.checked === true &&
    proof.trusted === true &&
    (proof.interaction === 'pointer' || proof.interaction === 'keyboard') &&
    typeof proof.elapsedMs === 'number' &&
    Number.isFinite(proof.elapsedMs) &&
    proof.elapsedMs >= 500 &&
    proof.elapsedMs <= 1_800_000
  )
}

export async function POST(request: Request) {
  const parsed = await readPublicApiJson<ContactRequest>(request, {
    maxBytes: MAX_CONTACT_BODY_BYTES,
  })

  if (!parsed.ok) {
    return parsed.response
  }

  const { data: body, requestId } = parsed

  const clientLimit = consumePublicApiRateLimit({
    scope: 'contact:client',
    key: createPublicApiClientKey(request),
    limit: CONTACT_CLIENT_LIMIT,
    windowMs: CONTACT_CLIENT_WINDOW_MS,
  })

  if (!clientLimit.allowed) {
    return publicApiRateLimitResponse(requestId, clientLimit)
  }

  const name = normalizeString(body.name)
  const email = normalizeString(body.email).toLowerCase()
  const projectType = normalizeString(body.projectType)
  const message = normalizeString(body.message)
  const website = normalizeString(body.website)
  const requestedSource = normalizeString(body.source)
  const submissionSource =
    requestedSource === 'contact-page' ? 'contact-page' : 'portfolio-contact-form'

  if (website) {
    return publicApiResponse(
      {
        ok: true,
        message: 'Message received.',
      },
      200,
      requestId,
    )
  }

  if (
    name.length < 2 ||
    name.length > 100 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    !isProjectType(projectType) ||
    message.length < 10 ||
    message.length > 1000 ||
    !isCaptchaProof(body.captcha)
  ) {
    return publicApiResponse(
      {
        ok: false,
        message: 'Please review the form fields and human verification.',
      },
      422,
      requestId,
    )
  }

  const duplicateKey = createPublicApiValueKey(
    [email, projectType, message.toLocaleLowerCase()].join('\n'),
  )

  const duplicateCheck = checkRecentPublicApiSubmission({
    scope: 'contact:duplicate',
    key: duplicateKey,
    ttlMs: CONTACT_DUPLICATE_WINDOW_MS,
  })

  if (!duplicateCheck.allowed) {
    return publicApiRateLimitResponse(requestId, duplicateCheck)
  }

  try {
    const payload = await getPayload({
      config: configPromise,
    })

    await payload.create({
      collection: 'contact-messages',
      overrideAccess: true,
      data: {
        name,
        email,
        subject: `${projectTypes[projectType]} enquiry`,
        message,
        status: 'new',
        source: submissionSource,
      },
    })

    recordRecentPublicApiSubmission({
      scope: 'contact:duplicate',
      key: duplicateKey,
      ttlMs: CONTACT_DUPLICATE_WINDOW_MS,
    })

    return publicApiResponse(
      {
        ok: true,
        message: 'Message sent successfully.',
      },
      201,
      requestId,
    )
  } catch {
    return publicApiResponse(
      {
        ok: false,
        message: 'Unable to send your message right now. Please try again later.',
      },
      500,
      requestId,
    )
  }
}
