import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

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
  if (
    !value ||
    typeof value !== 'object'
  ) {
    return false
  }

  const proof = value as Record<string, unknown>

  return (
    proof.checked === true &&
    proof.trusted === true &&
    (proof.interaction === 'pointer' ||
      proof.interaction === 'keyboard') &&
    typeof proof.elapsedMs === 'number' &&
    Number.isFinite(proof.elapsedMs) &&
    proof.elapsedMs >= 500 &&
    proof.elapsedMs <= 1_800_000
  )
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
  let body: ContactRequest

  try {
    body = (await request.json()) as ContactRequest
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: 'Invalid request payload.',
      },
      400,
    )
  }

  const name = normalizeString(body.name)
  const email = normalizeString(body.email).toLowerCase()
  const projectType = normalizeString(body.projectType)
  const message = normalizeString(body.message)
  const website = normalizeString(body.website)

  if (website) {
    return jsonResponse(
      {
        ok: true,
        message: 'Message received.',
      },
      200,
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
    return jsonResponse(
      {
        ok: false,
        message: 'Please review the form fields and human verification.',
      },
      422,
    )
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
        source: 'portfolio-contact-form',
      },
    })

    return jsonResponse(
      {
        ok: true,
        message: 'Message sent successfully.',
      },
      201,
    )
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          'Unable to send your message right now. Please try again later.',
      },
      500,
    )
  }
}
