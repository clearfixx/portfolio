import type { Homepage, Media, Profile } from '@/payload-types'

import { calculateExperienceYears } from './hero'
import type {
  EngineerJourneyItemViewModel,
  EngineerPrincipleIcon,
  EngineerPrincipleViewModel,
  EngineerProfileStatViewModel,
  EngineerProfileViewModel,
} from './types'

const DEFAULT_SECTION = {
  description: 'A builder of scalable systems and meaningful digital experiences.',
  eyebrow: 'About me',
  footerLabel: 'Engineer mindset',
  footerText: 'turning complex ideas into clean, maintainable systems.',
  journeyFooter: 'MISSION: CONTINUOUS IMPROVEMENT',
  journeyMeta: '// my path',
  journeyTitle: 'Engineering Journey',
  principlesMeta: '// principles',
  principlesTitle: 'Engineering Philosophy',
  title: 'Engineer Profile',
} as const

const DEFAULT_PROFILE = {
  bio: 'I build scalable web applications and distributed systems. Architecture first. Quality always.',
  id: 'AK_PROFILE',
  image: '/images/profile/engineer-profile.png',
  name: 'Andrii Kulahin',
  role: 'Software Engineer',
} as const

const STATUS_LABELS = {
  available: 'ONLINE',
  focused: 'FOCUSED',
  unavailable: 'OFFLINE',
} as const

const PRINCIPLE_ICONS = new Set<EngineerPrincipleIcon>([
  'architecture',
  'code',
  'documentation',
  'rocket',
])

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

function formatMetricValue(value: number, suffix: string | null | undefined): string {
  return `${new Intl.NumberFormat('en-US').format(value)}${normalizeText(suffix) ?? ''}`
}

function getStats({
  profile,
  projectsCount,
  now,
}: {
  now: Date
  profile: Profile
  projectsCount: number
}): EngineerProfileStatViewModel[] {
  const stats: EngineerProfileStatViewModel[] = []
  const experienceYears = calculateExperienceYears(profile.careerStartedAt, now)

  if (experienceYears !== null) {
    stats.push({
      id: 'experience',
      label: 'Years Exp.',
      value: `${experienceYears}+`,
    })
  }

  stats.push({
    id: 'projects',
    label: 'Projects',
    value: `${Math.max(0, projectsCount)}+`,
  })

  for (const metric of profile.metrics ?? []) {
    if (metric.enabled === false || !Number.isFinite(metric.value) || metric.value < 0) {
      continue
    }

    const key = cleanText(metric.key, metric.label)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    if (key === 'experience' || key === 'projects') {
      continue
    }

    stats.push({
      id: key || `metric-${stats.length + 1}`,
      label: metric.label,
      value: formatMetricValue(metric.value, metric.suffix),
    })

    if (stats.length === 4) {
      break
    }
  }

  return stats
}

function getJourney(profile: Profile): EngineerJourneyItemViewModel[] {
  return (profile.journey ?? []).flatMap((item, index) => {
    const year = normalizeText(item.year)
    const title = normalizeText(item.title)
    const description = normalizeText(item.description)

    if (!year || !title || !description) {
      return []
    }

    return [
      {
        accent: item.accent === true,
        description,
        id: item.id ?? `${year}-${index}`,
        title,
        year,
      },
    ]
  })
}

function getPrinciples(profile: Profile): EngineerPrincipleViewModel[] {
  return (profile.principles ?? []).flatMap((item, index) => {
    const title = normalizeText(item.title)
    const description = normalizeText(item.description)
    const icon = PRINCIPLE_ICONS.has(item.icon as EngineerPrincipleIcon)
      ? (item.icon as EngineerPrincipleIcon)
      : 'architecture'

    if (!title || !description) {
      return []
    }

    return [
      {
        description,
        icon,
        id: item.id ?? `${icon}-${index}`,
        number: String(index + 1).padStart(2, '0'),
        title,
      },
    ]
  })
}

function getImage(profile: Profile): EngineerProfileViewModel['profile']['image'] {
  const media = isPopulatedMedia(profile.portrait) ? profile.portrait : undefined
  const name = cleanText(profile.name, DEFAULT_PROFILE.name)

  return {
    alt: normalizeText(media?.alt) ?? `Portrait of ${name}`,
    src: normalizeText(media?.url) ?? DEFAULT_PROFILE.image,
  }
}

export function buildEngineerProfileViewModel({
  homepage,
  now = new Date(),
  profile,
  projectsCount,
}: {
  homepage: Homepage
  now?: Date
  profile: Profile
  projectsCount: number
}): EngineerProfileViewModel | null {
  const section = homepage.engineerProfileSection

  if (section?.enabled === false) {
    return null
  }

  const status =
    profile.status === 'focused' || profile.status === 'unavailable' ? profile.status : 'available'

  return {
    description: cleanText(section?.description, DEFAULT_SECTION.description),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_SECTION.eyebrow),
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_SECTION.footerLabel),
      text: cleanText(section?.footerText, DEFAULT_SECTION.footerText),
    },
    journey: {
      footer: cleanText(section?.journeyFooter, DEFAULT_SECTION.journeyFooter),
      items: getJourney(profile),
      meta: cleanText(section?.journeyMeta, DEFAULT_SECTION.journeyMeta),
      title: cleanText(section?.journeyTitle, DEFAULT_SECTION.journeyTitle),
    },
    principles: {
      items: getPrinciples(profile),
      meta: cleanText(section?.principlesMeta, DEFAULT_SECTION.principlesMeta),
      title: cleanText(section?.principlesTitle, DEFAULT_SECTION.principlesTitle),
    },
    profile: {
      bio: normalizeText(profile.fullBio) ?? normalizeText(profile.shortBio) ?? DEFAULT_PROFILE.bio,
      id: cleanText(profile.profileId, DEFAULT_PROFILE.id),
      image: getImage(profile),
      location: normalizeText(profile.location),
      name: cleanText(profile.name, DEFAULT_PROFILE.name),
      role: cleanText(profile.role, DEFAULT_PROFILE.role),
      stats: getStats({
        now,
        profile,
        projectsCount,
      }),
      status: {
        label: STATUS_LABELS[status],
        tone: status,
      },
    },
    title: cleanText(section?.title, DEFAULT_SECTION.title),
  }
}
