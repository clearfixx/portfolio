import type { Category, Media, Project, TechStack } from '@/payload-types'

export type ProjectLinkViewModel = {
  href: string
  label: string
  type: NonNullable<Project['links']>[number]['type']
}

export type ProjectDirectoryMetric = {
  label: string
  value: string
}

export type ProjectDirectoryItem = {
  category: string
  excerpt: string
  featured: boolean
  id: string
  image?: {
    alt: string
    height?: number
    src: string
    width?: number
  }
  links: ProjectLinkViewModel[]
  metrics: ProjectDirectoryMetric[]
  progress: number
  sinceYear: string
  slug: string
  stage: Project['stage']
  stageLabel: string
  technologies: string[]
  title: string
  updatedLabel: string
  version?: string
}

const STAGE_LABELS: Record<Project['stage'], string> = {
  idea: 'Idea',
  planning: 'Planning',
  development: 'Active Development',
  testing: 'Testing',
  released: 'Released',
  maintenance: 'Maintenance',
  archived: 'Archived',
}

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized ? normalized : undefined
}

export function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

export function isPopulatedTechnology(
  value: number | TechStack | null | undefined,
): value is TechStack {
  return typeof value === 'object' && value !== null
}

export function isPopulatedCategory(
  value: number | Category | null | undefined,
): value is Category {
  return typeof value === 'object' && value !== null
}

export function getProjectStageLabel(stage: Project['stage']): string {
  return STAGE_LABELS[stage]
}

export function getProjectImage(project: Project) {
  const media = isPopulatedMedia(project.featuredImage)
    ? project.featuredImage
    : isPopulatedMedia(project.coverImage)
      ? project.coverImage
      : undefined
  const src = normalizeText(media?.url)

  if (!media || !src || media.isPublic === false) {
    return undefined
  }

  return {
    alt: normalizeText(media.alt) ?? `${project.title} interface preview`,
    height: media.height ?? undefined,
    src,
    width: media.width ?? undefined,
  }
}

export function getProjectTechnologies(project: Project): string[] {
  return (project.techStack ?? [])
    .filter(isPopulatedTechnology)
    .filter((technology) => technology.visible !== false)
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
    .map((technology) => technology.name.trim())
    .filter(Boolean)
}

export function getProjectCategory(project: Project): string {
  return isPopulatedCategory(project.category) ? project.category.title : 'Uncategorized'
}

export function getProjectLinks(project: Project): ProjectLinkViewModel[] {
  return (project.links ?? [])
    .filter((link) => link.isEnabled !== false && Boolean(normalizeText(link.url)))
    .map((link) => ({
      href: normalizeText(link.url) ?? '#',
      label: normalizeText(link.label) ?? 'Open link',
      type: link.type,
    }))
}

export function getProjectLink(links: ProjectLinkViewModel[], type: ProjectLinkViewModel['type']) {
  return links.find((link) => link.type === type)
}

function formatUpdatedLabel(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Recently'
  }

  const difference = Date.now() - date.getTime()
  const days = Math.floor(difference / 86_400_000)

  if (days < 0) {
    return new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  if (days === 0) {
    return 'Today'
  }

  if (days === 1) {
    return '1 day ago'
  }

  if (days < 31) {
    return `${days} days ago`
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function getSinceYear(project: Project): string {
  const date = new Date(project.startedAt ?? project.createdAt)

  return Number.isNaN(date.getTime()) ? '—' : String(date.getFullYear())
}

function getDirectoryMetrics(project: Project, technologies: string[]): ProjectDirectoryMetric[] {
  const configuredMetrics = (project.caseStudyMetrics ?? [])
    .map((metric) => ({
      label: normalizeText(metric.label) ?? '',
      value: normalizeText(metric.value) ?? '',
    }))
    .filter((metric) => metric.label && metric.value)
    .slice(0, 2)

  if (configuredMetrics.length >= 2) {
    return configuredMetrics
  }

  const fallbackMetrics: ProjectDirectoryMetric[] = [
    {
      label: 'Technologies',
      value: technologies.length > 0 ? `${technologies.length}+` : '—',
    },
    {
      label: 'Features',
      value: (project.highlights?.length ?? 0) > 0 ? `${project.highlights?.length ?? 0}+` : '—',
    },
  ]

  return [...configuredMetrics, ...fallbackMetrics].slice(0, 2)
}

export function buildProjectDirectoryItem(project: Project): ProjectDirectoryItem {
  const technologies = getProjectTechnologies(project)

  return {
    category: getProjectCategory(project),
    excerpt: project.excerpt,
    featured: project.isFeatured === true,
    id: String(project.id),
    image: getProjectImage(project),
    links: getProjectLinks(project),
    metrics: getDirectoryMetrics(project, technologies),
    progress: Math.min(100, Math.max(0, Math.round(project.progress ?? 0))),
    sinceYear: getSinceYear(project),
    slug: project.slug,
    stage: project.stage,
    stageLabel: getProjectStageLabel(project.stage),
    technologies,
    title: project.title,
    updatedLabel: formatUpdatedLabel(project.updatedAt),
    version: normalizeText(project.currentVersion),
  }
}

export function buildProjectDirectoryItems(projects: Project[]): ProjectDirectoryItem[] {
  return projects.map(buildProjectDirectoryItem)
}
