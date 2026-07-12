import type { Homepage, Media, Profile, TechStack } from '@/payload-types'

import type { HeroTechIcon, HeroTechItem, HeroTelemetryItem, HeroViewModel } from './types'

const DEFAULT_NAME = 'Andrii Kulahin'
const DEFAULT_ROLE = 'Software Engineer'
const DEFAULT_EYEBROW = "Hi, I'm"
const DEFAULT_TITLE = "I don't just build websites."
const DEFAULT_SUBTITLE = 'I build systems\nthat solve real problems.'
const DEFAULT_PRIMARY_CTA_LABEL = 'Explore My Work'
const DEFAULT_PRIMARY_CTA_URL = '#projects'
const DEFAULT_SECONDARY_CTA_LABEL = 'Download CV'
const DEFAULT_SECONDARY_CTA_URL = '#contact'

const ICON_ALIASES: Record<string, HeroTechIcon> = {
  docker: 'docker',
  github: 'github',
  next: 'next',
  nextjs: 'next',
  node: 'node',
  nodejs: 'node',
  postgres: 'postgres',
  postgresql: 'postgres',
  prisma: 'prisma',
  tailwind: 'tailwind',
  tailwindcss: 'tailwind',
  ts: 'ts',
  typescript: 'ts',
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function cleanText(value: string | null | undefined, fallback: string): string {
  const cleaned = value?.trim()

  return cleaned || fallback
}

function resolveMediaUrl(value: Media | number | null | undefined): string | undefined {
  if (!value || typeof value === 'number') return undefined

  return value.url || undefined
}

function isPopulatedTechStack(value: TechStack | number): value is TechStack {
  return typeof value === 'object' && value !== null
}

export function calculateExperienceYears(
  careerStartedAt: string | null | undefined,
  now = new Date(),
): number {
  if (!careerStartedAt) return 0

  const start = new Date(careerStartedAt)

  if (Number.isNaN(start.getTime()) || start > now) return 0

  let years = now.getUTCFullYear() - start.getUTCFullYear()
  const currentMonth = now.getUTCMonth()
  const startMonth = start.getUTCMonth()
  const currentDay = now.getUTCDate()
  const startDay = start.getUTCDate()

  if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
    years -= 1
  }

  return Math.max(0, years)
}

export function splitDisplayName(name: string | null | undefined): HeroViewModel['name'] {
  const parts = cleanText(name, DEFAULT_NAME).split(/\s+/)
  const accentPart = parts.pop() || DEFAULT_NAME
  const accent = /[.!?]$/.test(accentPart) ? accentPart : `${accentPart}.`

  return {
    accent,
    leading: parts.join(' '),
  }
}

export function getSelectedTechStack(relationships: Homepage['selectedTechStack']): TechStack[] {
  const seen = new Set<string>()

  return (relationships || []).filter(isPopulatedTechStack).filter((technology) => {
    if (technology.visible === false) return false

    const key = String(technology.id)

    if (seen.has(key)) return false

    seen.add(key)

    return true
  })
}

export function mapHeroTechStack(technologies: TechStack[]): HeroTechItem[] {
  return technologies.slice(0, 8).flatMap((technology) => {
    const icon =
      ICON_ALIASES[normalizeKey(technology.slug)] || ICON_ALIASES[normalizeKey(technology.name)]

    return [
      {
        id: String(technology.id),
        icon: icon || 'generic',
        label: technology.name,
      },
    ]
  })
}

function getManualMetric(profile: Profile): HeroTelemetryItem | undefined {
  const metric = profile.metrics?.find(
    (item) => item.enabled !== false && Number.isFinite(item.value),
  )

  if (!metric) return undefined

  return {
    label: cleanText(metric.label, 'Engineering metric'),
    suffix: metric.suffix?.trim() || '',
    value: metric.value,
  }
}

function getTelemetry(
  profile: Profile,
  projectsCount: number,
  technologiesCount: number,
  now: Date,
): HeroViewModel['telemetry'] {
  const manualMetric = getManualMetric(profile)
  const experienceYears = calculateExperienceYears(profile.careerStartedAt, now)
  const activity =
    profile.heroActivity?.enabled &&
    profile.heroActivity.label?.trim() &&
    profile.heroActivity.detail?.trim()
      ? {
          detail: profile.heroActivity.detail.trim(),
          label: profile.heroActivity.label.trim(),
        }
      : undefined

  return {
    activity,
    stats: [
      {
        label: 'Projects shipped',
        suffix: projectsCount > 0 ? '+' : '',
        value: Math.max(0, projectsCount),
      },
      manualMetric || {
        label: 'Core technologies',
        suffix: '',
        value: Math.max(0, technologiesCount),
      },
      {
        label: 'Years coding',
        suffix: experienceYears > 0 ? '+' : '',
        value: experienceYears,
      },
      {
        label: 'Debug sessions',
        suffix: '∞',
        value: null,
      },
    ],
  }
}

type BuildHeroViewModelInput = {
  homepage: Homepage
  now?: Date
  profile: Profile
  projectsCount: number
  technologies: TechStack[]
}

export function buildHeroViewModel({
  homepage,
  now = new Date(),
  profile,
  projectsCount,
  technologies,
}: BuildHeroViewModelInput): HeroViewModel {
  const hero = homepage.hero
  const mappedTechnologies = mapHeroTechStack(technologies)

  return {
    eyebrow: cleanText(hero?.eyebrow, DEFAULT_EYEBROW),
    headline: {
      subtitle: cleanText(hero?.subtitle, DEFAULT_SUBTITLE),
      subtitleAccent: hero?.subtitleAccent?.trim() || 'systems',
      title: cleanText(hero?.title, DEFAULT_TITLE),
      titleAccent: hero?.titleAccent?.trim() || 'websites.',
    },
    name: splitDisplayName(profile.name),
    primaryAction: {
      href: cleanText(hero?.primaryCtaUrl, DEFAULT_PRIMARY_CTA_URL),
      label: cleanText(hero?.primaryCtaLabel, DEFAULT_PRIMARY_CTA_LABEL),
    },
    role: cleanText(profile.role, DEFAULT_ROLE),
    secondaryAction: {
      href:
        hero?.secondaryCtaUrl?.trim() ||
        resolveMediaUrl(profile.cvFile) ||
        DEFAULT_SECONDARY_CTA_URL,
      label: cleanText(hero?.secondaryCtaLabel, DEFAULT_SECONDARY_CTA_LABEL),
    },
    techStack: mappedTechnologies,
    telemetry: getTelemetry(profile, projectsCount, mappedTechnologies.length, now),
  }
}
