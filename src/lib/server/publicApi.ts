import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'

type PublicApiBody = {
  ok: boolean
  message: string
}

type PublicApiJsonOptions = {
  maxBytes: number
}

type PublicApiJsonResult<T extends object> =
  | {
      ok: true
      data: T
      requestId: string
    }
  | {
      ok: false
      response: Response
    }

const jsonContentTypePattern =
  /^application\/json(?:\s*;|$)/i

function firstForwardedValue(value: string | null) {
  return value?.split(',')[0]?.trim() || null
}

function resolveRequestOrigin(request: Request) {
  const requestUrl = new URL(request.url)
  const forwardedHost = firstForwardedValue(
    request.headers.get('x-forwarded-host'),
  )
  const forwardedProto = firstForwardedValue(
    request.headers.get('x-forwarded-proto'),
  )
  const host =
    forwardedHost ||
    request.headers.get('host') ||
    requestUrl.host
  const protocol =
    forwardedProto ||
    requestUrl.protocol.replace(':', '')

  try {
    return new URL(`${protocol}://${host}`).origin
  } catch {
    return requestUrl.origin
  }
}

function hasAllowedOrigin(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site')

  if (fetchSite === 'cross-site') {
    return false
  }

  const origin = request.headers.get('origin')

  if (!origin) {
    return true
  }

  try {
    return (
      new URL(origin).origin ===
      resolveRequestOrigin(request)
    )
  } catch {
    return false
  }
}

export function publicApiResponse(
  body: PublicApiBody,
  status: number,
  requestId: string = randomUUID(),
  additionalHeaders?: HeadersInit,
) {
  const headers = new Headers(additionalHeaders)

  headers.set('Cache-Control', 'no-store')
  headers.set('Referrer-Policy', 'no-referrer')
  headers.set('Vary', 'Origin')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Request-Id', requestId)

  return Response.json(body, {
    status,
    headers,
  })
}

function publicApiError(
  message: string,
  status: number,
  requestId: string,
) {
  return {
    ok: false as const,
    response: publicApiResponse(
      {
        ok: false,
        message,
      },
      status,
      requestId,
    ),
  }
}

export async function readPublicApiJson<T extends object>(
  request: Request,
  options: PublicApiJsonOptions,
): Promise<PublicApiJsonResult<T>> {
  const requestId = randomUUID()

  if (!hasAllowedOrigin(request)) {
    return publicApiError(
      'Request origin is not allowed.',
      403,
      requestId,
    )
  }

  const contentType =
    request.headers.get('content-type') || ''

  if (!jsonContentTypePattern.test(contentType)) {
    return publicApiError(
      'Content-Type must be application/json.',
      415,
      requestId,
    )
  }

  const contentLengthHeader =
    request.headers.get('content-length')
  const contentLength = contentLengthHeader
    ? Number(contentLengthHeader)
    : null

  if (
    contentLength !== null &&
    Number.isFinite(contentLength) &&
    contentLength > options.maxBytes
  ) {
    return publicApiError(
      'Request payload is too large.',
      413,
      requestId,
    )
  }

  let rawBody: string

  try {
    rawBody = await request.text()
  } catch {
    return publicApiError(
      'Invalid request payload.',
      400,
      requestId,
    )
  }

  if (
    Buffer.byteLength(rawBody, 'utf8') >
    options.maxBytes
  ) {
    return publicApiError(
      'Request payload is too large.',
      413,
      requestId,
    )
  }

  let parsedBody: unknown

  try {
    parsedBody = JSON.parse(rawBody)
  } catch {
    return publicApiError(
      'Invalid request payload.',
      400,
      requestId,
    )
  }

  if (
    !parsedBody ||
    typeof parsedBody !== 'object' ||
    Array.isArray(parsedBody)
  ) {
    return publicApiError(
      'Invalid request payload.',
      400,
      requestId,
    )
  }

  return {
    ok: true,
    data: parsedBody as T,
    requestId,
  }
}
