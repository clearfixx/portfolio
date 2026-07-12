import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

type NewsletterRequest = {
  email?: unknown
  website?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function jsonResponse(
  body: {
    ok: boolean
    message: string
  },
  status: number,
) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export async function POST(request: Request) {
  let body: NewsletterRequest

  try {
    body = (await request.json()) as NewsletterRequest
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'Invalid request payload.',
      },
      400,
    )
  }

  const email = normalizeString(body.email).toLowerCase()
  const website = normalizeString(body.website)

  if (website) {
    return jsonResponse(
      {
        ok: true,
        message: 'You’re subscribed to Build Notes.',
      },
      200,
    )
  }

  if (
    !email ||
    email.length > 254 ||
    !emailPattern.test(email)
  ) {
    return jsonResponse(
      {
        ok: false,
        message: 'Enter a valid email address.',
      },
      422,
    )
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
        return jsonResponse(
          {
            ok: true,
            message: 'You’re already subscribed to Build Notes.',
          },
          200,
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

      return jsonResponse(
        {
          ok: true,
          message: 'Welcome back to Build Notes.',
        },
        200,
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

    return jsonResponse(
      {
        ok: true,
        message: 'You’re subscribed to Build Notes.',
      },
      201,
    )
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          'Unable to subscribe right now. Please try again later.',
      },
      500,
    )
  }
}
