import type { BlogPost } from '@/payload-types'

import { andWhere, findCollectionDocs, findOneCollection } from '../shared'

const DEFAULT_BLOG_POST_LIMIT = 6

function publishedBlogPostWhere(now: Date) {
  return andWhere(
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
  )
}

export async function getPublishedBlogPosts(
  limit = DEFAULT_BLOG_POST_LIMIT,
  now = new Date(),
): Promise<BlogPost[]> {
  return findCollectionDocs({
    collection: 'blog-posts',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: publishedBlogPostWhere(now),
  })
}

export async function getBlogPostBySlug(slug: string, now = new Date()): Promise<BlogPost | null> {
  return findOneCollection({
    collection: 'blog-posts',
    depth: 3,
    where: andWhere(
      {
        slug: {
          equals: slug,
        },
      },
      publishedBlogPostWhere(now),
    ),
  })
}
