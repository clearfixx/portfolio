import { cache } from 'react'

import type { About, Media, Profile, Project } from '@/payload-types'

import { getHomepageContent } from '../homepage'
import { getAbout, getProfile, getProjects } from '../queries'
import type {
  AboutActionTone,
  AboutCareerItemViewModel,
  AboutExperienceItemViewModel,
  AboutFocusCardViewModel,
  AboutFocusProjectViewModel,
  AboutHeroActionViewModel,
  AboutHeroSignalViewModel,
  AboutLabelValueViewModel,
  AboutOperatingStepViewModel,
  AboutOutputViewModel,
  AboutPageViewModel,
  AboutPersonalSignalViewModel,
  AboutProfileIconName,
  AboutProfileImageViewModel,
  AboutPrincipleViewModel,
  AboutSectionHeadingViewModel,
  AboutSignalTone,
  AboutSummaryItemViewModel,
  AboutTelemetryViewModel,
} from './types'

// about-live-data-integration-v2

const ICONS = new Set<AboutProfileIconName>([
  'architecture',
  'arrow',
  'automation',
  'code',
  'compass',
  'layers',
  'performance',
  'product',
  'signal',
  'system',
])

const DEFAULTS = {
  breadcrumbLabel: 'Engineering Profile',
  hero: {
    eyebrow: 'Engineering Profile',
    title: 'Engineering systems, interfaces, and ideas',
    titleAccent: 'that are built to last.',
    description:
      'I design and build complex digital products with a focus on architecture, performance, maintainability, and interfaces that communicate clearly.',
  },
  career: {
    eyebrow: '01 / Career timeline',
    title: 'A path shaped by larger systems',
    description:
      'The role changed over time. The direction stayed consistent: understand more of the product and take responsibility for the whole result.',
  },
  principles: {
    eyebrow: '02 / How I think',
    title: 'Engineering principles',
    description: 'The practical rules behind architecture and product decisions.',
  },
  operatingSystem: {
    eyebrow: '03 / Operating system',
    title: 'How I build',
    description: 'A repeatable path from an unclear problem to a product that can evolve.',
  },
  experience: {
    eyebrow: '04 / Experience matrix',
    title: 'Responsibility, not percentages',
    description:
      'A compact view of where I lead, where I work deeply, and where I support the system.',
  },
  currentFocus: {
    eyebrow: '05 / Current focus',
    title: 'What is active now',
    description: 'Products, research, and technical directions currently receiving attention.',
  },
  personalSignals: {
    eyebrow: '06 / Beyond the code',
    title: 'Personal signals',
    description: 'The things that shape the work without appearing in the repository.',
  },
  cta: {
    eyebrow: 'Open channel / New project',
    title: 'Have a complex idea?',
    titleAccent: "Let's turn it into a working system.",
    description:
      'I am open to selected products, architecture work, technical direction, and meaningful collaborations.',
    label: 'Start a conversation',
    href: '/#contact',
  },
  seo: {
    title: 'Engineering Profile',
    description:
      'A deeper view into my engineering journey, product mindset, architecture principles, technical focus, and the systems I build.',
    canonical: '/about',
  },
} as const

type HeadingSource = {
  description?: string | null
  enabled?: boolean | null
  eyebrow?: string | null
  title?: string | null
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim()

  return normalized || undefined
}

function text(value: unknown, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function safeHref(value: unknown, fallback: string): string {
  const normalized = normalizeText(value)

  if (!normalized) {
    return fallback
  }

  if (
    normalized.startsWith('/') ||
    normalized.startsWith('#') ||
    normalized.startsWith('https://')
  ) {
    return normalized
  }

  return fallback
}

function makeId(prefix: string, value: unknown, index: number): string {
  return normalizeText(value) ?? `${prefix}-${index + 1}`
}

function icon(value: unknown, fallback: AboutProfileIconName): AboutProfileIconName {
  return typeof value === 'string' && ICONS.has(value as AboutProfileIconName)
    ? (value as AboutProfileIconName)
    : fallback
}

function tone(value: unknown): AboutSignalTone {
  return value === 'purple' ? 'purple' : 'cyan'
}

function actionTone(value: unknown): AboutActionTone {
  return value === 'primary' ? 'primary' : 'secondary'
}

function heading(
  source: HeadingSource | null | undefined,
  fallback: {
    description: string
    eyebrow: string
    title: string
  },
  hasContent = true,
): AboutSectionHeadingViewModel {
  return {
    description: text(source?.description, fallback.description),
    enabled: source?.enabled !== false && hasContent,
    eyebrow: text(source?.eyebrow, fallback.eyebrow),
    title: text(source?.title, fallback.title),
  }
}

function initialsFromName(name: string): string {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return initials || 'AK'
}

function experienceYears(value: unknown, now: Date): number | null {
  const normalized = normalizeText(value)

  if (!normalized) {
    return null
  }

  const start = new Date(normalized)

  if (Number.isNaN(start.getTime()) || start > now) {
    return null
  }

  let years = now.getUTCFullYear() - start.getUTCFullYear()
  const beforeAnniversary =
    now.getUTCMonth() < start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() < start.getUTCDate())

  if (beforeAnniversary) {
    years -= 1
  }

  return Math.max(0, years)
}

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value
}

function mapPortrait(profile: Profile, name: string): AboutProfileImageViewModel | undefined {
  if (!isMedia(profile.portrait) || profile.portrait.isPublic === false) {
    return undefined
  }

  const src = normalizeText(profile.portrait.url)

  if (!src) {
    return undefined
  }

  return {
    alt: text(profile.portrait.alt, name),
    src,
  }
}

function statusLabel(profile: Profile): string {
  if (profile.status === 'focused') {
    return 'Focused'
  }

  if (profile.status === 'unavailable') {
    return 'Unavailable'
  }

  return 'Available'
}

function mapHeroActions(about: About): AboutHeroActionViewModel[] {
  const actions = (about.hero?.actions ?? []).flatMap((action, index) => {
    if (!action) {
      return []
    }

    const label = normalizeText(action.label)
    const href = normalizeText(action.href)

    if (!label || !href) {
      return []
    }

    return [
      {
        href: safeHref(href, '/about'),
        icon: icon(action.icon, index === 0 ? 'arrow' : 'code'),
        id: makeId('about-action', action.id, index),
        label,
        tone: actionTone(action.tone),
      },
    ]
  })

  if (actions.length > 0) {
    return actions
  }

  return [
    {
      href: '#career',
      icon: 'arrow',
      id: 'about-action-career',
      label: 'View experience',
      tone: 'primary',
    },
    {
      href: '/projects',
      icon: 'code',
      id: 'about-action-projects',
      label: 'Explore projects',
      tone: 'secondary',
    },
    {
      href: '/#contact',
      icon: 'signal',
      id: 'about-action-contact',
      label: 'Start a conversation',
      tone: 'secondary',
    },
  ]
}

function mapHeroSignals(
  about: About,
  years: number | null,
  publishedProjectCount: number,
): AboutHeroSignalViewModel[] {
  const signals = (about.hero?.signals ?? []).flatMap((signal, index) => {
    if (!signal) {
      return []
    }

    const label = normalizeText(signal.label)

    if (!label) {
      return []
    }

    let value = text(signal.value, '—')

    if (signal.source === 'experience-years') {
      value = years === null ? '—' : `${years}+`
    } else if (signal.source === 'published-projects') {
      value = String(publishedProjectCount)
    }

    return [
      {
        id: makeId('about-signal', signal.id, index),
        label,
        value,
      },
    ]
  })

  if (signals.length > 0) {
    return signals
  }

  return [
    {
      id: 'about-signal-experience',
      label: 'Years building',
      value: years === null ? '—' : `${years}+`,
    },
    {
      id: 'about-signal-systems',
      label: 'Product systems',
      value: 'Full-stack',
    },
    {
      id: 'about-signal-focus',
      label: 'Primary focus',
      value: 'Architecture',
    },
  ]
}

function mapCareer(about: About): AboutCareerItemViewModel[] {
  return (about.career?.items ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const period = normalizeText(item.period)
    const role = normalizeText(item.role)
    const description = normalizeText(item.description)

    if (!period || !role || !description) {
      return []
    }

    return [
      {
        description,
        id: makeId('about-career', item.id, index),
        period,
        role,
        stack: (item.stack ?? []).flatMap((technology) => {
          const label = normalizeText(technology?.label)

          return label ? [label] : []
        }),
      },
    ]
  })
}

function mapPrinciples(about: About): AboutPrincipleViewModel[] {
  return (about.principles?.items ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const title = normalizeText(item.title)
    const description = normalizeText(item.description)

    if (!title || !description) {
      return []
    }

    return [
      {
        description,
        icon: icon(item.icon, 'architecture'),
        id: makeId('about-principle', item.id, index),
        title,
      },
    ]
  })
}

function mapOperatingSteps(about: About): AboutOperatingStepViewModel[] {
  return (about.operatingSystem?.steps ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const label = normalizeText(item.label)
    const output = normalizeText(item.output)

    if (!label || !output) {
      return []
    }

    return [
      {
        code: text(item.code, String(index + 1).padStart(2, '0')),
        id: makeId('about-step', item.id, index),
        label,
        output,
      },
    ]
  })
}

function mapLabelValues(
  values:
    | {
        id?: string | null
        label?: string | null
        value?: string | null
      }[]
    | null
    | undefined,
  prefix: string,
): AboutLabelValueViewModel[] {
  return (values ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const label = normalizeText(item.label)
    const value = normalizeText(item.value)

    if (!label || !value) {
      return []
    }

    return [
      {
        id: makeId(prefix, item.id, index),
        label,
        value,
      },
    ]
  })
}

function mapOutputs(about: About): AboutOutputViewModel[] {
  return (about.operatingSystem?.outputs?.items ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const title = normalizeText(item.title)
    const description = normalizeText(item.description)

    if (!title || !description) {
      return []
    }

    return [
      {
        description,
        id: makeId('about-output', item.id, index),
        title,
      },
    ]
  })
}

function mapTelemetry(about: About): AboutTelemetryViewModel[] {
  return (about.operatingSystem?.telemetry ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const label = normalizeText(item.label)
    const value = normalizeText(item.value)

    if (!label || !value) {
      return []
    }

    return [
      {
        id: makeId('about-telemetry', item.id, index),
        label,
        tone: tone(item.tone),
        value,
      },
    ]
  })
}

function experienceLevel(value: unknown): AboutExperienceItemViewModel['level'] {
  if (value === 'lead') {
    return 'Lead'
  }

  if (value === 'working') {
    return 'Working experience'
  }

  return 'Advanced'
}

function mapExperience(about: About): AboutExperienceItemViewModel[] {
  return (about.experience?.items ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const area = normalizeText(item.area)
    const example = normalizeText(item.example)

    if (!area || !example) {
      return []
    }

    const rawScore = typeof item.score === 'number' ? item.score : 1

    return [
      {
        area,
        example,
        id: makeId('about-experience', item.id, index),
        level: experienceLevel(item.level),
        score: Math.min(6, Math.max(1, Math.round(rawScore))),
      },
    ]
  })
}

function mapSummary(about: About): AboutSummaryItemViewModel[] {
  return (about.experience?.summary ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const label = normalizeText(item.label)
    const title = normalizeText(item.title)
    const description = normalizeText(item.description)

    if (!label || !title || !description) {
      return []
    }

    return [
      {
        description,
        id: makeId('about-summary', item.id, index),
        label,
        title,
      },
    ]
  })
}

function isProject(value: unknown): value is Project {
  return typeof value === 'object' && value !== null && 'title' in value
}

function resolvePrimaryProject(about: About, projects: Project[]): AboutFocusProjectViewModel {
  const relation = about.currentFocus?.primaryProject
  const project = isProject(relation)
    ? relation
    : projects.find((candidate) => String(candidate.id) === String(relation))

  if (project) {
    return {
      description: text(
        project.excerpt,
        'A modular platform built around developer identity, publishing, community, media, and long-term product experimentation.',
      ),
      href: project.slug ? `/projects/${project.slug}` : '/projects',
      title: text(project.title, 'DSS Universe'),
    }
  }

  return {
    description:
      'A modular platform for developer identity, publishing, community, media, administration, and long-term product experimentation.',
    href: '/projects',
    title: 'DSS Universe',
  }
}

function mapFocusCards(about: About): AboutFocusCardViewModel[] {
  return (about.currentFocus?.cards ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const eyebrow = normalizeText(item.eyebrow)
    const status = normalizeText(item.status)
    const title = normalizeText(item.title)
    const description = normalizeText(item.description)
    const footerLabel = normalizeText(item.footerLabel)
    const footerValue = normalizeText(item.footerValue)

    if (!eyebrow || !status || !title || !description || !footerLabel || !footerValue) {
      return []
    }

    return [
      {
        description,
        eyebrow,
        footerLabel,
        footerValue,
        icon: icon(item.icon, index === 0 ? 'automation' : 'code'),
        id: makeId('about-focus-card', item.id, index),
        status,
        tags: (item.tags ?? []).flatMap((tag) => {
          const label = normalizeText(tag?.label)

          return label ? [label] : []
        }),
        title,
        tone: tone(item.tone),
      },
    ]
  })
}

function mapPersonalSignals(about: About): AboutPersonalSignalViewModel[] {
  return (about.personalSignals?.items ?? []).flatMap((item, index) => {
    if (!item) {
      return []
    }

    const title = normalizeText(item.title)
    const description = normalizeText(item.description)

    if (!title || !description) {
      return []
    }

    return [
      {
        description,
        id: makeId('about-personal-signal', item.id, index),
        title,
      },
    ]
  })
}

export function buildAboutPageViewModel({
  about,
  now = new Date(),
  profile,
  projects,
}: {
  about: About
  now?: Date
  profile: Profile
  projects: Project[]
}): AboutPageViewModel {
  const years = experienceYears(profile.careerStartedAt, now)
  const heroSignals = mapHeroSignals(about, years, projects.length)
  const career = mapCareer(about)
  const principles = mapPrinciples(about)
  const steps = mapOperatingSteps(about)
  const outputs = mapOutputs(about)
  const telemetry = mapTelemetry(about)
  const experience = mapExperience(about)
  const summary = mapSummary(about)
  const focusCards = mapFocusCards(about)
  const personalSignals = mapPersonalSignals(about)
  const name = text(profile.name, 'Andrii Kulahin')
  const resolvedStatusLabel = statusLabel(profile)
  const focusSignal =
    heroSignals.find((signal) => signal.label.toLowerCase().includes('focus')) ?? heroSignals[2]

  return {
    breadcrumbLabel: DEFAULTS.breadcrumbLabel,
    career: {
      ...heading(about.career, DEFAULTS.career, career.length > 0),
      items: career,
    },
    cta: {
      description: text(about.cta?.description, DEFAULTS.cta.description),
      enabled: about.cta?.enabled !== false,
      eyebrow: text(about.cta?.eyebrow, DEFAULTS.cta.eyebrow),
      href: safeHref(about.cta?.href, DEFAULTS.cta.href),
      label: text(about.cta?.label, DEFAULTS.cta.label),
      title: text(about.cta?.title, DEFAULTS.cta.title),
      titleAccent: text(about.cta?.titleAccent, DEFAULTS.cta.titleAccent),
    },
    currentFocus: {
      ...heading(
        about.currentFocus,
        DEFAULTS.currentFocus,
        focusCards.length > 0 || Boolean(about.currentFocus?.primaryProject),
      ),
      cards: focusCards,
      primaryLabel: text(about.currentFocus?.primaryLabel, 'Now building'),
      primaryLinkLabel: text(about.currentFocus?.primaryLinkLabel, 'View project'),
      primaryProject: resolvePrimaryProject(about, projects),
    },
    experience: {
      ...heading(about.experience, DEFAULTS.experience, experience.length > 0),
      items: experience,
      summary,
    },
    hero: {
      actions: mapHeroActions(about),
      availabilityLabel: `Profile / ${resolvedStatusLabel}`,
      description: text(about.hero?.description, DEFAULTS.hero.description),
      enabled: about.hero?.enabled !== false,
      eyebrow: text(about.hero?.eyebrow, DEFAULTS.hero.eyebrow),
      signals: heroSignals,
      title: text(about.hero?.title, DEFAULTS.hero.title),
      titleAccent: text(about.hero?.titleAccent, DEFAULTS.hero.titleAccent),
    },
    operatingSystem: {
      ...heading(about.operatingSystem, DEFAULTS.operatingSystem, steps.length > 0),
      currentStage: {
        description: text(
          about.operatingSystem?.currentStage?.description,
          'Define boundaries, data ownership, failure modes, interfaces, and the smallest architecture that supports the next meaningful version.',
        ),
        items: (about.operatingSystem?.currentStage?.items ?? []).flatMap((item) => {
          const label = normalizeText(item?.label)

          return label ? [label] : []
        }),
        label: text(about.operatingSystem?.currentStage?.label, 'Current stage'),
        title: text(about.operatingSystem?.currentStage?.title, 'System design'),
      },
      guardrails: {
        eyebrow: text(about.operatingSystem?.guardrails?.eyebrow, 'System controls'),
        items: mapLabelValues(about.operatingSystem?.guardrails?.items, 'about-guardrail'),
        status: text(about.operatingSystem?.guardrails?.status, 'Active'),
        title: text(about.operatingSystem?.guardrails?.title, 'Engineering guardrails'),
      },
      outputs: {
        eyebrow: text(about.operatingSystem?.outputs?.eyebrow, 'Delivery package'),
        items: outputs,
        status: text(about.operatingSystem?.outputs?.status, `${outputs.length} artifacts`),
        title: text(about.operatingSystem?.outputs?.title, 'Concrete outputs'),
      },
      steps,
      telemetry,
    },
    personalSignals: {
      ...heading(about.personalSignals, DEFAULTS.personalSignals, personalSignals.length > 0),
      items: personalSignals,
    },
    principles: {
      ...heading(about.principles, DEFAULTS.principles, principles.length > 0),
      items: principles,
    },
    profile: {
      availability: text(profile.availability, resolvedStatusLabel),
      experience: years === null ? '—' : `${years}+ years`,
      focus: focusSignal?.value ?? 'Architecture',
      initials: initialsFromName(name),
      location: text(profile.location, 'Ukraine'),
      name,
      portrait: mapPortrait(profile, name),
      profileId: text(profile.profileId, 'AK-1206'),
      role: text(profile.role, 'Full-stack Engineer'),
      statusLabel: resolvedStatusLabel,
    },
    seo: {
      canonical: safeHref(about.seo?.canonical, DEFAULTS.seo.canonical),
      description: text(about.seo?.metaDescription, DEFAULTS.seo.description),
      title: text(about.seo?.metaTitle, DEFAULTS.seo.title),
    },
  }
}

export const getAboutPageContent = cache(async () => {
  const [about, profile, projects, homepageContent] = await Promise.all([
    getAbout(),
    getProfile(),
    getProjects(250),
    getHomepageContent(),
  ])

  return {
    page: buildAboutPageViewModel({
      about,
      profile,
      projects,
    }),
    siteFooter: homepageContent.siteFooter,
  }
})

export type AboutPageContent = Awaited<ReturnType<typeof getAboutPageContent>>
