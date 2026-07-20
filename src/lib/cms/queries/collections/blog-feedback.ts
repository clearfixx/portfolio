import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type BlogFeedbackCounts = {
  helpful: number
  notHelpful: number
}

export async function getBlogFeedbackCounts(postId: number): Promise<BlogFeedbackCounts> {
  const payload = await getPayload({
    config: configPromise,
  })

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
