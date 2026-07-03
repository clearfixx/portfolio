import type { Project } from '@/payload-types'

import { getPayloadClient } from '../../client'

const DEFAULT_PROJECT_LIMIT = 12
const DEFAULT_FEATURED_PROJECT_LIMIT = 6

/**
 * Project queries.
 *
 * UI should not know Payload query syntax.
 * Pages ask for portfolio data, this layer speaks CMS. 🛰️
 */
export async function getProjects(limit = DEFAULT_PROJECT_LIMIT): Promise<Project[]> {
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: {
      publishedAt: {
        exists: true,
      },
    },
  })

  return projects.docs
}

export async function getFeaturedProjects(
  limit = DEFAULT_FEATURED_PROJECT_LIMIT,
): Promise<Project[]> {
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: {
      and: [
        {
          isFeatured: {
            equals: true,
          },
        },
        {
          publishedAt: {
            exists: true,
          },
        },
      ],
    },
  })

  return projects.docs
}

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  return getProjects(limit)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    depth: 3,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          publishedAt: {
            exists: true,
          },
        },
      ],
    },
  })

  return projects.docs[0] ?? null
}

export async function getProjectsCount(): Promise<number> {
  const payload = await getPayloadClient()

  const projects = await payload.count({
    collection: 'projects',
    where: {
      publishedAt: {
        exists: true,
      },
    },
  })

  return projects.totalDocs
}
