import type { Homepage, Media, Project, TechStack } from '@/payload-types'

import type { FeaturedProjectAccent, FeaturedProjectImage, FeaturedProjectViewModel } from './types'

type ProjectLink = NonNullable<Project['links']>[number]
type ProjectStage = NonNullable<Project['stage']>

const STAGE_PRESENTATION: Record<
  ProjectStage,
  {
    stage: string
    status: string
  }
> = {
  idea: {
    stage: 'Idea',
    status: 'Concept',
  },
  planning: {
    stage: 'Planning',
    status: 'Planning phase',
  },
  development: {
    stage: 'In Development',
    status: 'Active mission',
  },
  testing: {
    stage: 'Testing',
    status: 'Validation phase',
  },
  released: {
    stage: 'Released',
    status: 'Live product',
  },
  maintenance: {
    stage: 'Maintenance',
    status: 'Maintained',
  },
  archived: {
    stage: 'Archived',
    status: 'Archived',
  },
}

const LINK_PRIORITY: Record<ProjectLink['type'], number> = {
  live: 0,
  'case-study': 1,
  documentation: 2,
  github: 3,
  figma: 4,
  other: 5,
}

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized ? normalized : undefined
}

function isPopulatedProject(value: number | Project | null | undefined): value is Project {
  return typeof value === 'object' && value !== null
}

function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

function isPopulatedTechnology(value: number | TechStack | null | undefined): value is TechStack {
  return typeof value === 'object' && value !== null
}

function getAccent(index: number): FeaturedProjectAccent {
  return index % 2 === 0 ? 'cyan' : 'violet'
}

function getImage(project: Project): FeaturedProjectImage | undefined {
  const mediaCandidate = isPopulatedMedia(project.featuredImage)
    ? project.featuredImage
    : isPopulatedMedia(project.coverImage)
      ? project.coverImage
      : undefined

  const src = normalizeText(mediaCandidate?.url)

  if (!src) {
    return undefined
  }

  return {
    alt: normalizeText(mediaCandidate?.alt) ?? `${project.title} project preview`,
    src,
  }
}

function getStack(project: Project): string[] {
  const names = (project.techStack ?? [])
    .filter(isPopulatedTechnology)
    .filter((technology) => technology.visible !== false)
    .map((technology) => normalizeText(technology.name))
    .filter((name): name is string => Boolean(name))

  return [...new Set(names)].slice(0, 5)
}

function getProjectLink(project: Project): Pick<FeaturedProjectViewModel, 'href' | 'linkLabel'> {
  const candidate = [...(project.links ?? [])]
    .filter((link) => link.isEnabled !== false && Boolean(normalizeText(link.url)))
    .sort((left, right) => LINK_PRIORITY[left.type] - LINK_PRIORITY[right.type])[0]

  const href = normalizeText(candidate?.url)

  if (!candidate || !href) {
    return {
      linkLabel: 'Coming soon',
    }
  }

  return {
    href,
    linkLabel: normalizeText(candidate.label) ?? 'Explore project',
  }
}

function clampProgress(value: number | null | undefined): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(100, Math.max(0, Math.round(value ?? 0)))
}

export function isPublishedProject(project: Project, now = new Date()): boolean {
  const publishedAt = project.publishedAt ? new Date(project.publishedAt) : undefined

  return Boolean(
    publishedAt && !Number.isNaN(publishedAt.getTime()) && publishedAt.getTime() <= now.getTime(),
  )
}

export function getSelectedFeaturedProjects(
  relationships: Homepage['featuredProjects'],
  now = new Date(),
): Project[] {
  const seen = new Set<string>()

  return (relationships ?? [])
    .filter(isPopulatedProject)
    .filter((project) => isPublishedProject(project, now))
    .filter((project) => {
      const id = String(project.id)

      if (seen.has(id)) {
        return false
      }

      seen.add(id)
      return true
    })
}

export function buildFeaturedProjectViewModel(
  project: Project,
  index: number,
): FeaturedProjectViewModel {
  const presentation = STAGE_PRESENTATION[project.stage]

  return {
    accent: getAccent(index),
    excerpt: project.excerpt,
    id: String(project.id),
    image: getImage(project),
    previewLabel:
      normalizeText(project.cardTagline) ?? normalizeText(project.title) ?? 'Project preview',
    progress: clampProgress(project.progress),
    stack: getStack(project),
    stage: presentation.stage,
    status: presentation.status,
    title: project.title,
    ...getProjectLink(project),
  }
}

export function buildFeaturedProjectViewModels(projects: Project[]): FeaturedProjectViewModel[] {
  return projects.map(buildFeaturedProjectViewModel)
}
