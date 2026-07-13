import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { publicApiResponse, readPublicApiJson } from '@/lib/server/publicApi'
import {
  consumePublicApiRateLimit,
  createPublicApiClientKey,
  createPublicApiValueKey,
  publicApiRateLimitResponse,
} from '@/lib/server/publicApiRateLimit'

export const runtime = 'nodejs'

const MAX_NEWSLETTER_BODY_BYTES = 2 * 1024
const NEWSLETTER_CLIENT_LIMIT = 20
const NEWSLETTER_CLIENT_WINDOW_MS = 10 * 60 * 1000
const NEWSLETTER_EMAIL_LIMIT = 5
const NEWSLETTER_EMAIL_WINDOW_MS = 60 * 60 * 1000

type NewsletterRequest = {
  email?: unknown
  website?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const parsed = await readPublicApiJson<NewsletterRequest>(request, {
    maxBytes: MAX_NEWSLETTER_BODY_BYTES,
  })

  if (!parsed.ok) {
    return parsed.response
  }

  const { data: body, requestId } = parsed

  const clientLimit = consumePublicApiRateLimit({
    scope: 'newsletter:client',
    key: createPublicApiClientKey(request),
    limit: NEWSLETTER_CLIENT_LIMIT,
    windowMs: NEWSLETTER_CLIENT_WINDOW_MS,
  })

  if (!clientLimit.allowed) {
    return publicApiRateLimitResponse(requestId, clientLimit)
  }

  const email = normalizeString(body.email).toLowerCase()
  const website = normalizeString(body.website)

  if (website) {
    return publicApiResponse(
      {
        ok: true,
        message: 'You\u2019re subscribed to Build Notes.',
      },
      200,
      requestId,
    )
  }

  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return publicApiResponse(
      {
        ok: false,
        message: 'Enter a valid email address.',
      },
      422,
      requestId,
    )
  }

  const emailLimit = consumePublicApiRateLimit({
    scope: 'newsletter:email',
    key: createPublicApiValueKey(email),
    limit: NEWSLETTER_EMAIL_LIMIT,
    windowMs: NEWSLETTER_EMAIL_WINDOW_MS,
  })

  if (!emailLimit.allowed) {
    return publicApiRateLimitResponse(requestId, emailLimit)
  }

  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: {
        email: {
          equals: email,
        },
      },
    })

    const subscriber = existing.docs[0]
    const now = new Date().toISOString()

    if (subscriber) {
      if (subscriber.status === 'active') {
        return publicApiResponse(
          {
            ok: true,
            message: 'You\u2019re already subscribed to Build Notes.',
          },
          200,
          requestId,
        )
      }

      await payload.update({
        collection: 'newsletter-subscribers',
        id: subscriber.id,
        overrideAccess: true,
        data: {
          status: 'active',
          source: 'site-footer',
          subscribedAt: now,
          unsubscribedAt: null,
        },
      })

      return publicApiResponse(
        {
          ok: true,
          message: 'Welcome back to Build Notes.',
        },
        200,
        requestId,
      )
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      overrideAccess: true,
      data: {
        email,
        status: 'active',
        source: 'site-footer',
        subscribedAt: now,
      },
    })

    return publicApiResponse(
      {
        ok: true,
        message: 'You\u2019re subscribed to Build Notes.',
      },
      201,
      requestId,
    )
  } catch {
    return publicApiResponse(
      {
        ok: false,
        message: 'Unable to subscribe right now. Please try again later.',
      },
      500,
      requestId,
    )
  }
}
