import type { Homepage, Navigation as NavigationGlobal } from '@/payload-types'

import { getHomepage, getNavigation } from '../queries'

export type HomepageSectionKey =
  | 'hero'
  | 'currentMission'
  | 'projects'
  | 'engineerProfile'
  | 'skills'
  | 'delivery'
  | 'insights'
  | 'contact'

export type NavigationMatchMode = 'exact' | 'prefix'

export type NavigationLandingItemViewModel = {
  href: string
  id: string
  label: string
  sectionId: string
}

export type NavigationRouteItemViewModel = {
  external: boolean
  href: string
  id: string
  label: string
  match: NavigationMatchMode
  newTab: boolean
}

export type NavigationCtaViewModel = {
  external: boolean
  href: string
  label: string
  newTab: boolean
  sectionId?: string
}

export type NavigationViewModel = {
  cta?: NavigationCtaViewModel
  landingItems: NavigationLandingItemViewModel[]
  pagesMenu?: {
    items: NavigationRouteItemViewModel[]
    label: string
  }
}

type LandingLinkInput = {
  enabled?: boolean | null
  id?: string | null
  label?: string | null
  section?: string | null
}

type PageLinkInput = {
  destination?: string | null
  href?: string | null
  id?: string | null
  label?: string | null
  match?: string | null
  openInNewTab?: boolean | null
}

const SECTION_REGISTRY: Record<HomepageSectionKey, { id: string }> = {
  hero: {
    id: 'hero',
  },
  currentMission: {
    id: 'current-mission',
  },
  projects: {
    id: 'projects',
  },
  engineerProfile: {
    id: 'engineer-profile',
  },
  skills: {
    id: 'skills-technologies',
  },
  delivery: {
    id: 'delivery',
  },
  insights: {
    id: 'insights',
  },
  contact: {
    id: 'contact',
  },
}

const DEFAULT_LANDING_LINKS: LandingLinkInput[] = [
  {
    enabled: true,
    id: 'work',
    label: 'Work',
    section: 'projects',
  },
  {
    enabled: true,
    id: 'about',
    label: 'About',
    section: 'engineerProfile',
  },
  {
    enabled: true,
    id: 'stack',
    label: 'Stack',
    section: 'skills',
  },
  {
    enabled: true,
    id: 'process',
    label: 'Process',
    section: 'delivery',
  },
]

const DEFAULT_PAGE_LINKS: PageLinkInput[] = [
  {
    destination: 'projects',
    id: 'projects',
    label: 'All Projects',
    openInNewTab: false,
  },
  {
    destination: 'articles',
    id: 'articles',
    label: 'Articles',
    openInNewTab: false,
  },
]

function cleanText(value: string | null | undefined, fallback?: string): string | undefined {
  const normalized = value?.trim()

  return normalized || fallback
}

function isSectionKey(value: string): value is HomepageSectionKey {
  return value in SECTION_REGISTRY
}

function getAvailableSections(homepage: Homepage): Set<HomepageSectionKey> {
  const sections: HomepageSectionKey[] = ['hero', 'projects', 'skills']

  if (homepage.currentMissionSection?.enabled !== false) {
    sections.push('currentMission')
  }

  if (homepage.engineerProfileSection?.enabled !== false) {
    sections.push('engineerProfile')
  }

  if (homepage.deliveryPipelineSection?.enabled !== false) {
    sections.push('delivery')
  }

  if (homepage.insightsTrustSection?.enabled !== false) {
    sections.push('insights')
  }

  if (homepage.contactSection?.enabled !== false) {
    sections.push('contact')
  }

  return new Set(sections)
}

function normalizeHref(value: string | null | undefined): string | undefined {
  const href = cleanText(value)

  if (!href) {
    return undefined
  }

  if (href.startsWith('#')) {
    return `/${href}`
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return href
  }

  try {
    const url = new URL(href)

    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? href : undefined
  } catch {
    return undefined
  }
}

function isExternalHref(href: string): boolean {
  return !href.startsWith('/')
}

function resolvePageHref(item: PageLinkInput): {
  href: string
  match: NavigationMatchMode
} | null {
  if (item.destination === 'projects') {
    return {
      href: '/projects',
      match: 'prefix',
    }
  }

  if (item.destination === 'articles') {
    return {
      href: '/articles',
      match: 'prefix',
    }
  }

  const href = normalizeHref(item.href)

  if (!href) {
    return null
  }

  return {
    href,
    match: item.match === 'prefix' ? 'prefix' : 'exact',
  }
}

function buildLandingItems(
  navigation: NavigationGlobal,
  homepage: Homepage,
): NavigationLandingItemViewModel[] {
  const availableSections = getAvailableSections(homepage)
  const source: LandingLinkInput[] = Array.isArray(navigation.landingLinks)
    ? navigation.landingLinks
    : DEFAULT_LANDING_LINKS
  const usedSections = new Set<HomepageSectionKey>()

  return source.flatMap((item, index) => {
    const label = cleanText(item.label)
    const section = item.section

    if (
      item.enabled === false ||
      !label ||
      !section ||
      !isSectionKey(section) ||
      !availableSections.has(section) ||
      usedSections.has(section)
    ) {
      return []
    }

    usedSections.add(section)

    const sectionId = SECTION_REGISTRY[section].id

    return [
      {
        href: `/#${sectionId}`,
        id: cleanText(item.id) ?? `${section}-${index}`,
        label,
        sectionId,
      },
    ]
  })
}

function buildPagesMenu(
  navigation: NavigationGlobal,
): NavigationViewModel['pagesMenu'] | undefined {
  const settings = navigation.pagesMenu

  if (settings?.enabled === false) {
    return undefined
  }

  const source: PageLinkInput[] = Array.isArray(settings?.items)
    ? settings.items
    : DEFAULT_PAGE_LINKS

  const items = source.flatMap((item, index) => {
    const label = cleanText(item.label)
    const destination = resolvePageHref(item)

    if (!label || !destination) {
      return []
    }

    return [
      {
        external: isExternalHref(destination.href),
        href: destination.href,
        id: cleanText(item.id) ?? `${item.destination ?? 'custom'}-${index}`,
        label,
        match: destination.match,
        newTab: item.openInNewTab === true,
      },
    ]
  })

  if (items.length === 0) {
    return undefined
  }

  return {
    items,
    label: cleanText(settings?.label, 'Explore') ?? 'Explore',
  }
}

function buildCta(
  navigation: NavigationGlobal,
  homepage: Homepage,
): NavigationCtaViewModel | undefined {
  const settings = navigation.cta

  if (settings?.enabled === false) {
    return undefined
  }

  const label = cleanText(settings?.label, "Let's Talk") ?? "Let's Talk"
  const destination = settings?.destination ?? 'contact'

  if (destination === 'contact') {
    if (homepage.contactSection?.enabled === false) {
      return undefined
    }

    return {
      external: false,
      href: '/#contact',
      label,
      newTab: false,
      sectionId: 'contact',
    }
  }

  const href = normalizeHref(settings?.href)

  if (!href) {
    return undefined
  }

  return {
    external: isExternalHref(href),
    href,
    label,
    newTab: settings?.openInNewTab === true,
  }
}

export function buildNavigationViewModel({
  homepage,
  navigation,
}: {
  homepage: Homepage
  navigation: NavigationGlobal
}): NavigationViewModel {
  return {
    cta: buildCta(navigation, homepage),
    landingItems: buildLandingItems(navigation, homepage),
    pagesMenu: buildPagesMenu(navigation),
  }
}

export async function getNavigationViewModel(): Promise<NavigationViewModel> {
  const [homepage, navigation] = await Promise.all([getHomepage(), getNavigation()])

  return buildNavigationViewModel({
    homepage,
    navigation,
  })
}
