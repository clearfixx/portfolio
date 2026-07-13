import type { BlogPost } from '@/payload-types'

import { andWhere, findCollectionDocs } from '../shared'

const DEFAULT_BLOG_POST_LIMIT = 6

export async function getPublishedBlogPosts(
  limit = DEFAULT_BLOG_POST_LIMIT,
  now = new Date(),
): Promise<BlogPost[]> {
  return findCollectionDocs({
    collection: 'blog-posts',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: andWhere(
      {
        status: {
          equals: 'published',
        },
      },
      {
        publishedAt: {
          exists: true,
        },
      },
      {
        publishedAt: {
          less_than_equal: now.toISOString(),
        },
      },
    ),
  })
}
