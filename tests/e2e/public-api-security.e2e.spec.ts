import { randomUUID } from 'node:crypto'

import { expect, test } from '@playwright/test'
import type { APIResponse } from '@playwright/test'

const siteUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

const requestIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function apiUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString()
}

function createClientHeaders(label: string) {
  const identity = randomUUID()

  return {
    'accept-language': `en-US,${label};q=0.9`,
    'content-type': 'application/json',
    'user-agent': `portfolio-security-e2e/${label}/${identity}`,
  }
}

function expectBoundaryHeaders(response: APIResponse) {
  const headers = response.headers()

  expect(headers['cache-control']).toBe('no-store')
  expect(headers['referrer-policy']).toBe('no-referrer')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-request-id']).toMatch(requestIdPattern)
}

async function expectErrorResponse(response: APIResponse, status: number, message: string) {
  expect(response.status()).toBe(status)
  expectBoundaryHeaders(response)

  await expect(response.json()).resolves.toEqual({
    ok: false,
    message,
  })
}

test.describe('public API security boundary', () => {
  test('rejects a non-JSON content type', async ({ request }) => {
    const response = await request.post(apiUrl('/api/newsletter'), {
      headers: {
        ...createClientHeaders('content-type'),
        'content-type': 'text/plain',
      },
      data: 'test',
    })

    await expectErrorResponse(response, 415, 'Content-Type must be application/json.')
  })

  test('rejects malformed JSON', async ({ request }) => {
    const response = await request.post(apiUrl('/api/newsletter'), {
      headers: createClientHeaders('malformed-json'),
      data: '{"email":',
    })

    await expectErrorResponse(response, 400, 'Invalid request payload.')
  })

  test('rejects an oversized request body', async ({ request }) => {
    const response = await request.post(apiUrl('/api/newsletter'), {
      headers: createClientHeaders('oversized-body'),
      data: JSON.stringify({
        email: `${'a'.repeat(3000)}@example.com`,
      }),
    })

    await expectErrorResponse(response, 413, 'Request payload is too large.')
  })

  test('rejects a foreign origin', async ({ request }) => {
    const response = await request.post(apiUrl('/api/newsletter'), {
      headers: {
        ...createClientHeaders('foreign-origin'),
        origin: 'https://evil.example',
      },
      data: {
        email: 'security-test@example.com',
      },
    })

    await expectErrorResponse(response, 403, 'Request origin is not allowed.')
  })

  test('ignores spoofed proxy IP headers and enforces the contact limit', async ({ request }) => {
    const clientHeaders = createClientHeaders('spoofed-proxy')
    let limitedResponse: APIResponse | undefined

    for (let attempt = 1; attempt <= 9; attempt += 1) {
      const response = await request.post(apiUrl('/api/contact'), {
        headers: {
          ...clientHeaders,
          'x-forwarded-for': `203.0.113.${attempt}`,
        },
        data: {
          website: 'filled-by-bot',
        },
      })

      if (attempt <= 8) {
        expect(response.status()).toBe(200)
        continue
      }

      limitedResponse = response
    }

    expect(limitedResponse).toBeDefined()

    if (!limitedResponse) {
      throw new Error('The rate-limited response was not captured.')
    }

    await expectErrorResponse(limitedResponse, 429, 'Too many requests. Please try again later.')

    const headers = limitedResponse.headers()

    expect(headers['retry-after']).toMatch(/^\d+$/)
    expect(Number(headers['retry-after'])).toBeGreaterThan(0)

    expect(headers['x-ratelimit-limit']).toBe('8')
    expect(headers['x-ratelimit-remaining']).toBe('0')
    expect(headers['x-ratelimit-reset']).toMatch(/^\d+$/)
    expect(headers['x-ratelimit-policy']).toBe('8;w=600')
  })
})
