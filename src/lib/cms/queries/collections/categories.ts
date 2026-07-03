import type { Category } from '@/payload-types'

import { andWhere, findCollectionDocs, findOneCollection } from '../shared'

const DEFAULT_CATEGORY_LIMIT = 100

type CategoryType = NonNullable<Category['type']>

/**
 * Category queries.
 *
 * Categories connect projects, blog posts, and future taxonomy.
 * Small collection, big navigation responsibility. 🛰️
 */
export async function getCategories(limit = DEFAULT_CATEGORY_LIMIT): Promise<Category[]> {
  return findCollectionDocs({
    collection: 'categories',
    depth: 1,
    limit,
    sort: 'sortOrder',
  })
}

export async function getCategoriesByType(
  type: CategoryType,
  limit = DEFAULT_CATEGORY_LIMIT,
): Promise<Category[]> {
  return findCollectionDocs({
    collection: 'categories',
    depth: 1,
    limit,
    sort: 'sortOrder',
    where: {
      type: {
        equals: type,
      },
    },
  })
}

export async function getProjectCategories(limit = DEFAULT_CATEGORY_LIMIT): Promise<Category[]> {
  return findCollectionDocs({
    collection: 'categories',
    depth: 1,
    limit,
    sort: 'sortOrder',
    where: {
      type: {
        in: ['project', 'shared'],
      },
    },
  })
}

export async function getBlogCategories(limit = DEFAULT_CATEGORY_LIMIT): Promise<Category[]> {
  return findCollectionDocs({
    collection: 'categories',
    depth: 1,
    limit,
    sort: 'sortOrder',
    where: {
      type: {
        in: ['blog', 'shared'],
      },
    },
  })
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return findOneCollection({
    collection: 'categories',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
}

export async function getCategoryBySlugAndType(
  slug: string,
  type: CategoryType,
): Promise<Category | null> {
  return findOneCollection({
    collection: 'categories',
    depth: 1,
    where: andWhere(
      {
        slug: {
          equals: slug,
        },
      },
      {
        type: {
          equals: type,
        },
      },
    ),
  })
}
