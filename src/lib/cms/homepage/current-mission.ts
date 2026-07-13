import type { Homepage, Project, TechStack } from '@/payload-types'

import type {
  CurrentMissionLinkViewModel,
  CurrentMissionProjectViewModel,
  CurrentMissionViewModel,
} from './types'

type ProjectLink = NonNullable<Project['links']>[number]
type ProjectStage = NonNullable<Project['stage']>

const DEFAULT_EYEBROW = 'Current Mission'
const DEFAULT_DESCRIPTION =
  'A live preview of the flagship product currently shaping my engineering roadmap.'
const DEFAULT_FOOTER_LABEL = 'Mission Status'
const DEFAULT_FOOTER_TEXT = 'Building the future, one release at a time.'
const DEFAULT_CTA_LABEL = 'View Mission Control'

const STAGE_LABELS: Record<ProjectStage, string> = {
  idea: 'Idea',
  planning: 'Planning',
  development: 'In Development',
  testing: 'Testing',
  released: 'Released',
  maintenance: 'Maintenance',
  archived: 'Archived',
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

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function isPopulatedProject(value: number | Project | null | undefined): value is Project {
  return typeof value === 'object' && value !== null
}

function isPopulatedTechnology(value: number | TechStack | null | undefined): value is TechStack {
  return typeof value === 'object' && value !== null
}

function isPublishedProject(project: Project, now: Date): boolean {
  if (!project.publishedAt) {
    return false
  }

  const publishedAt = new Date(project.publishedAt)

  return !Number.isNaN(publishedAt.getTime()) && publishedAt.getTime() <= now.getTime()
}

function clampProgress(value: number | null | undefined): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(100, Math.max(0, Math.round(value ?? 0)))
}

function getStack(project: Project): string[] {
  const names = (project.techStack ?? [])
    .filter(isPopulatedTechnology)
    .filter((technology) => technology.visible !== false)
    .map((technology) => normalizeText(technology.name))
    .filter((name): name is string => Boolean(name))

  return [...new Set(names)].slice(0, 8)
}

function normalizeSafeHref(
  value: string | null | undefined,
): CurrentMissionLinkViewModel['href'] | undefined {
  const normalized = normalizeText(value)

  if (!normalized) {
    return undefined
  }

  if (normalized.startsWith('/') || normalized.startsWith('#')) {
    return normalized
  }

  try {
    const url = new URL(normalized)

    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

function getPreferredProjectLink(
  project: Project,
  label: string,
  override: string | null | undefined,
): CurrentMissionLinkViewModel | undefined {
  const overrideHref = normalizeSafeHref(override)

  if (overrideHref) {
    return {
      external: isExternalHref(overrideHref),
      href: overrideHref,
      label,
    }
  }

  const candidate = [...(project.links ?? [])]
    .filter((link) => link.isEnabled !== false)
    .map((link) => ({
      ...link,
      safeHref: normalizeSafeHref(link.url),
    }))
    .filter(
      (
        link,
      ): link is ProjectLink & {
        safeHref: string
      } => Boolean(link.safeHref),
    )
    .sort((left, right) => LINK_PRIORITY[left.type] - LINK_PRIORITY[right.type])[0]

  if (!candidate) {
    return undefined
  }

  return {
    external: isExternalHref(candidate.safeHref),
    href: candidate.safeHref,
    label: normalizeText(candidate.label) ?? label,
  }
}

function getSelectedProject(
  value: Homepage['currentMissionSection'],
  now: Date,
): Project | undefined {
  const project = value?.project

  return isPopulatedProject(project) && isPublishedProject(project, now) ? project : undefined
}

function buildProjectViewModel(
  project: Project,
  section: Homepage['currentMissionSection'],
): CurrentMissionProjectViewModel {
  const stage = STAGE_LABELS[project.stage]
  const ctaLabel = cleanText(section?.ctaLabel, DEFAULT_CTA_LABEL)

  return {
    cta: getPreferredProjectLink(project, ctaLabel, section?.ctaUrlOverride),
    excerpt: project.excerpt,
    id: String(project.id),
    progress: clampProgress(project.progress),
    stage,
    stack: getStack(project),
    tagline: normalizeText(project.cardTagline) ?? `${stage} · ${project.title}`,
    title: project.title,
    version: normalizeText(project.currentVersion),
  }
}

export function buildCurrentMissionViewModel(
  homepage: Homepage,
  now = new Date(),
): CurrentMissionViewModel | null {
  const section = homepage.currentMissionSection

  if (section?.enabled === false) {
    return null
  }

  const project = getSelectedProject(section, now)

  return {
    description: cleanText(section?.description, DEFAULT_DESCRIPTION),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_EYEBROW),
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_FOOTER_LABEL),
      text: cleanText(section?.footerText, DEFAULT_FOOTER_TEXT),
    },
    project: project ? buildProjectViewModel(project, section) : undefined,
    title:
      normalizeText(section?.title) ?? (project ? `Building ${project.title}` : DEFAULT_EYEBROW),
  }
}
