import configPromise from '@payload-config'
import { createHash } from 'node:crypto'
import { getPayload } from 'payload'

import { publicApiResponse, readPublicApiJson } from '@/lib/server/publicApi'
import {
  consumePublicApiRateLimit,
  createPublicApiClientKey,
  publicApiRateLimitResponse,
} from '@/lib/server/publicApiRateLimit'

export const runtime = 'nodejs'

const MAX_FEEDBACK_BODY_BYTES = 4 * 1024
const FEEDBACK_CLIENT_LIMIT = 40
const FEEDBACK_CLIENT_WINDOW_MS = 10 * 60 * 1000

type FeedbackVote = 'helpful' | 'not-helpful'

type FeedbackRequest = {
  clientId?: unknown
  slug?: unknown
  vote?: unknown
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isVote(value: string): value is FeedbackVote {
  return value === 'helpful' || value === 'not-helpful'
}

function buildFingerprint(postId: number, clientId: string): string {
  return createHash('sha256').update(`${postId}:${clientId}`).digest('hex')
}

async function countVotes(payload: Awaited<ReturnType<typeof getPayload>>, postId: number) {
  const [helpfulResult, notHelpfulResult] = await Promise.all([
    payload.count({
      collection: 'blog-feedback-votes',
      overrideAccess: true,
      where: {
        and: [
          {
            post: {
              equals: postId,
            },
          },
          {
            vote: {
              equals: 'helpful',
            },
          },
        ],
      },
    }),
    payload.count({
      collection: 'blog-feedback-votes',
      overrideAccess: true,
      where: {
        and: [
          {
            post: {
              equals: postId,
            },
          },
          {
            vote: {
              equals: 'not-helpful',
            },
          },
        ],
      },
    }),
  ])

  return {
    helpful: helpfulResult.totalDocs,
    notHelpful: notHelpfulResult.totalDocs,
  }
}

export async function POST(request: Request) {
  const parsed = await readPublicApiJson<FeedbackRequest>(request, {
    maxBytes: MAX_FEEDBACK_BODY_BYTES,
  })

  if (!parsed.ok) {
    return parsed.response
  }

  const { data: body, requestId } = parsed

  const rateLimit = consumePublicApiRateLimit({
    scope: 'blog-feedback:client',
    key: createPublicApiClientKey(request),
    limit: FEEDBACK_CLIENT_LIMIT,
    windowMs: FEEDBACK_CLIENT_WINDOW_MS,
  })

  if (!rateLimit.allowed) {
    return publicApiRateLimitResponse(requestId, rateLimit)
  }

  const clientId = normalizeString(body.clientId)
  const slug = normalizeString(body.slug)
  const vote = normalizeString(body.vote)

  if (
    clientId.length < 16 ||
    clientId.length > 128 ||
    slug.length < 1 ||
    slug.length > 180 ||
    !isVote(vote)
  ) {
    return publicApiResponse(
      {
        ok: false,
        message: 'Invalid feedback request.',
      },
      422,
      requestId,
    )
  }

  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const postResult = await payload.find({
      collection: 'blog-posts',
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
    })

    const post = postResult.docs[0]

    if (!post) {
      return publicApiResponse(
        {
          ok: false,
          message: 'Article not found.',
        },
        404,
        requestId,
      )
    }

    const fingerprint = buildFingerprint(post.id, clientId)

    const existingResult = await payload.find({
      collection: 'blog-feedback-votes',
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: {
        fingerprint: {
          equals: fingerprint,
        },
      },
    })

    const existingVote = existingResult.docs[0]

    if (!existingVote) {
      await payload.create({
        collection: 'blog-feedback-votes',
        overrideAccess: true,
        data: {
          post: post.id,
          vote,
          fingerprint,
        },
      })
    } else if (existingVote.vote !== vote) {
      await payload.update({
        collection: 'blog-feedback-votes',
        overrideAccess: true,
        id: existingVote.id,
        data: {
          vote,
        },
      })
    }

    const counts = await countVotes(payload, post.id)

    return publicApiResponse(
      {
        ok: true,
        vote,
        counts,
      },
      200,
      requestId,
    )
  } catch {
    return publicApiResponse(
      {
        ok: false,
        message: 'Unable to save feedback right now.',
      },
      500,
      requestId,
    )
  }
}
