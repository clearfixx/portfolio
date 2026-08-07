import type { BlogPost } from '@/payload-types'

import { andWhere, findAllCollectionDocs, findCollectionDocs, findOneCollection } from '../shared'

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

export type BlogPostSitemapEntry = Pick<BlogPost, 'slug' | 'updatedAt'>

export async function getPublishedBlogPostSitemapEntries(
  now = new Date(),
): Promise<BlogPostSitemapEntry[]> {
  const docs = await findAllCollectionDocs({
    collection: 'blog-posts',
    depth: 0,
    select: {
      slug: true,
      updatedAt: true,
    },
    sort: '-publishedAt',
    where: publishedBlogPostWhere(now),
  })

  return docs as BlogPostSitemapEntry[]
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
