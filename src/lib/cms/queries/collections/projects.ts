import type { Project, ProjectVersion } from '@/payload-types'

import {
  countCollection,
  findCollectionDocs,
  findOneCollection,
  publishedOnly,
  andWhere,
} from '../shared'

const DEFAULT_PROJECT_LIMIT = 12
const DEFAULT_FEATURED_PROJECT_LIMIT = 6

/**
 * Project queries.
 *
 * UI should not know Payload query syntax.
 * Pages ask for portfolio data, this layer speaks CMS. 🛰️
 */
export async function getProjects(limit = DEFAULT_PROJECT_LIMIT): Promise<Project[]> {
  return findCollectionDocs({
    collection: 'projects',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: publishedOnly(),
  })
}

export async function getFeaturedProjects(
  limit = DEFAULT_FEATURED_PROJECT_LIMIT,
): Promise<Project[]> {
  return findCollectionDocs({
    collection: 'projects',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: andWhere(
      {
        isFeatured: {
          equals: true,
        },
      },
      publishedOnly(),
    ),
  })
}

export async function getLatestProjects(limit = 3): Promise<Project[]> {
  return getProjects(limit)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return findOneCollection({
    collection: 'projects',
    depth: 3,
    where: andWhere(
      {
        slug: {
          equals: slug,
        },
      },
      publishedOnly(),
    ),
  })
}

export async function getProjectVersions(projectId: number): Promise<ProjectVersion[]> {
  return findCollectionDocs({
    collection: 'project-versions',
    depth: 1,
    limit: 50,
    sort: '-releaseDate',
    where: {
      project: {
        equals: projectId,
      },
    },
  })
}

export async function getProjectsCount(): Promise<number> {
  return countCollection({
    collection: 'projects',
    where: publishedOnly(),
  })
}
