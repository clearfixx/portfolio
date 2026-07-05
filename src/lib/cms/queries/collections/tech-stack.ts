import type { TechStack } from '@/payload-types'

import { andWhere, findCollectionDocs } from '../shared'

const DEFAULT_TECH_STACK_LIMIT = 100
const DEFAULT_FEATURED_TECH_STACK_LIMIT = 24

/**
 * Tech stack queries for public frontend sections.
 */
export async function getVisibleTechStack(limit = DEFAULT_TECH_STACK_LIMIT): Promise<TechStack[]> {
  return findCollectionDocs({
    collection: 'tech-stack',
    depth: 1,
    limit,
    sort: 'sortOrder',
    where: {
      visible: {
        equals: true,
      },
    },
  })
}

export async function getFeaturedTechStack(
  limit = DEFAULT_FEATURED_TECH_STACK_LIMIT,
): Promise<TechStack[]> {
  return findCollectionDocs({
    collection: 'tech-stack',
    depth: 1,
    limit,
    sort: 'sortOrder',
    where: andWhere(
      {
        visible: {
          equals: true,
        },
      },
      {
        featured: {
          equals: true,
        },
      },
    ),
  })
}
