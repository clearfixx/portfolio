import type { Contact, Homepage, Media, Profile, SiteSetting, Social } from '@/payload-types'

import type {
  SiteFooterImageViewModel,
  SiteFooterLinkViewModel,
  SiteFooterPostViewModel,
  SiteFooterSnapshotKind,
  SiteFooterSnapshotViewModel,
  SiteFooterSocialIcon,
  SiteFooterSocialLinkViewModel,
  SiteFooterViewModel,
} from './types'

const DEFAULT_PROFILE_IMAGE = '/images/profile/engineer-profile.png'

const DEFAULTS = {
  availabilityLabel: 'Available',
  connectLabel: 'Connect',
  copyrightEmphasis: 'lot',
  copyrightPrefix: 'Built with ❤️, clean architecture and',
  copyrightSuffix: 'of ☕️.',
  instagramLinkLabel: 'View on Instagram',
  newsletterButtonLabel: 'Gimme!',
  newsletterDescription: 'Notes on engineering, architecture and better products.',
  newsletterNote: 'No spam. Unsubscribe anytime.',
  newsletterPlaceholder: "What's a good email address?",
  newsletterTitle: 'Build Notes',
  profileDescription:
    'I build scalable web systems with clean architecture, thoughtful interfaces, and predictable delivery.',
  snapshotsSubtitle: 'Instagram visual log',
  snapshotsTitle: 'Build Snapshots',
  xHandle: '@ak_dev',
  xLinkLabel: 'View more on X',
  xTitle: 'X Signals',
} as const

const SNAPSHOT_KINDS = new Set<SiteFooterSnapshotKind>([
  'code',
  'coffee',
  'desk',
  'quote',
  'terminal',
  'ui',
])

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function normalizeCount(value: number | null | undefined): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value ?? 0)) : 0
}

function safeHref(
  value: string | null | undefined,
  protocols: Array<'https' | 'mailto'> = ['https'],
): string | undefined {
  const normalized = normalizeText(value)

  if (!normalized) {
    return undefined
  }

  if (normalized.startsWith('/') || normalized.startsWith('#')) {
    return normalized
  }

  try {
    const url = new URL(normalized)

    if (
      (url.protocol === 'https:' && protocols.includes('https')) ||
      (url.protocol === 'mailto:' && protocols.includes('mailto'))
    ) {
      return normalized
    }
  } catch {
    return undefined
  }

  return undefined
}

function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

function mapMedia(
  value: number | Media | null | undefined,
  fallbackAlt: string,
): SiteFooterImageViewModel | undefined {
  if (!isPopulatedMedia(value) || value.isPublic === false) {
    return undefined
  }

  const src = normalizeText(value.url)

  if (!src) {
    return undefined
  }

  return {
    alt: normalizeText(value.alt) ?? fallbackAlt,
    src,
  }
}

function splitParagraphs(...values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()

  return values.flatMap((value) =>
    (value ?? '')
      .split(/\n{2,}|\n/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => {
        if (!paragraph || seen.has(paragraph)) {
          return false
        }

        seen.add(paragraph)
        return true
      }),
  )
}

function socialLink({
  href,
  icon,
  label,
}: {
  href: string | undefined
  icon: SiteFooterSocialIcon
  label: string
}): SiteFooterSocialLinkViewModel | undefined {
  if (!href) {
    return undefined
  }

  return {
    external: href.startsWith('https://'),
    href,
    icon,
    id: icon,
    label,
  }
}

function getSocialLinks(contact: Contact, social: Social): SiteFooterSocialLinkViewModel[] {
  const links = [
    socialLink({
      href: safeHref(social.githubUrl),
      icon: 'github',
      label: 'GitHub',
    }),
    socialLink({
      href: safeHref(social.linkedinUrl),
      icon: 'linkedin',
      label: 'LinkedIn',
    }),
    socialLink({
      href: safeHref(social.xUrl),
      icon: 'x',
      label: 'X',
    }),
    socialLink({
      href: safeHref(social.telegramUrl),
      icon: 'telegram',
      label: 'Telegram',
    }),
    socialLink({
      href: safeHref(
        normalizeText(contact.email) ? `mailto:${normalizeText(contact.email)}` : undefined,
        ['mailto'],
      ),
      icon: 'mail',
      label: 'Email',
    }),
  ]

  return links.filter((link): link is SiteFooterSocialLinkViewModel => Boolean(link))
}

function getPosts(section: Homepage['footerSection'], now: Date): SiteFooterPostViewModel[] {
  return (section?.xPosts ?? []).flatMap((post, index) => {
    const content = normalizeText(post.content)
    const publishedAt = normalizeText(post.publishedAt)

    if (!content || !publishedAt) {
      return []
    }

    const date = new Date(publishedAt)

    if (Number.isNaN(date.getTime()) || date > now) {
      return []
    }

    return [
      {
        content,
        date: new Intl.DateTimeFormat('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(date),
        id: normalizeText(post.id) ?? `post-${index + 1}`,
        likes: normalizeCount(post.likes),
        replies: normalizeCount(post.replies),
        reposts: normalizeCount(post.reposts),
        time: new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }).format(date),
      },
    ]
  })
}

function isSnapshotKind(value: string | null | undefined): value is SiteFooterSnapshotKind {
  return Boolean(value && SNAPSHOT_KINDS.has(value as SiteFooterSnapshotKind))
}

function getSnapshots(section: Homepage['footerSection']): SiteFooterSnapshotViewModel[] {
  return (section?.snapshots ?? []).flatMap((snapshot, index) => {
    const title = normalizeText(snapshot.title)

    if (!title || !isSnapshotKind(snapshot.kind)) {
      return []
    }

    return [
      {
        id: normalizeText(snapshot.id) ?? `snapshot-${index + 1}`,
        image: mapMedia(snapshot.image, title),
        kind: snapshot.kind,
        subtitle: normalizeText(snapshot.subtitle),
        title,
      },
    ]
  })
}

function getNavigation(settings: SiteSetting): SiteFooterLinkViewModel[] {
  const seen = new Set<string>()

  return (settings.footer?.navigation ?? []).flatMap((link, index) => {
    const label = normalizeText(link.label)
    const href = safeHref(link.href, ['https', 'mailto'])

    if (!label || !href || seen.has(href)) {
      return []
    }

    seen.add(href)

    return [
      {
        href,
        id: normalizeText(link.id) ?? `footer-link-${index + 1}`,
        label,
      },
    ]
  })
}

function availabilityLabel(profile: Profile, configuredLabel: string): string {
  if (profile.status === 'focused') {
    return 'Focused'
  }

  if (profile.status === 'unavailable') {
    return 'Unavailable'
  }

  return configuredLabel
}

export function buildSiteFooterViewModel({
  contact,
  homepage,
  now = new Date(),
  profile,
  siteSettings,
  social,
}: {
  contact: Contact
  homepage: Homepage
  now?: Date
  profile: Profile
  siteSettings: SiteSetting
  social: Social
}): SiteFooterViewModel | null {
  const section = homepage.footerSection

  if (section?.enabled === false) {
    return null
  }

  const name = cleanText(profile.name, 'Portfolio owner')
  const description = splitParagraphs(profile.shortBio, profile.fullBio)
  const xHref = safeHref(social.xUrl)
  const instagramHref = safeHref(social.instagramUrl)

  return {
    copyright: {
      emphasis: cleanText(siteSettings.footer?.copyrightEmphasis, DEFAULTS.copyrightEmphasis),
      prefix: cleanText(siteSettings.footer?.copyrightPrefix, DEFAULTS.copyrightPrefix),
      suffix: cleanText(siteSettings.footer?.copyrightSuffix, DEFAULTS.copyrightSuffix),
      year: now.getFullYear(),
    },
    newsletter: {
      buttonLabel: cleanText(section?.newsletterButtonLabel, DEFAULTS.newsletterButtonLabel),
      description: cleanText(section?.newsletterDescription, DEFAULTS.newsletterDescription),
      note: cleanText(section?.newsletterNote, DEFAULTS.newsletterNote),
      placeholder: cleanText(section?.newsletterPlaceholder, DEFAULTS.newsletterPlaceholder),
      title: cleanText(section?.newsletterTitle, DEFAULTS.newsletterTitle),
    },
    navigation: getNavigation(siteSettings),
    profile: {
      availability: {
        active: profile.status !== 'unavailable',
        detail: normalizeText(profile.availability) ?? 'Open for freelance & product work',
        label: availabilityLabel(
          profile,
          cleanText(section?.availabilityLabel, DEFAULTS.availabilityLabel),
        ),
      },
      connectLabel: cleanText(section?.connectLabel, DEFAULTS.connectLabel),
      description: description.length > 0 ? description : [DEFAULTS.profileDescription],
      image: mapMedia(profile.portrait, name) ?? {
        alt: name,
        src: DEFAULT_PROFILE_IMAGE,
      },
      name,
      role: cleanText(profile.role, 'Software Engineer'),
      socialLinks: getSocialLinks(contact, social),
    },
    snapshots: {
      href: instagramHref,
      items: getSnapshots(section),
      linkLabel: cleanText(section?.instagramLinkLabel, DEFAULTS.instagramLinkLabel),
      subtitle: cleanText(section?.snapshotsSubtitle, DEFAULTS.snapshotsSubtitle),
      title: cleanText(section?.snapshotsTitle, DEFAULTS.snapshotsTitle),
    },
    xFeed: {
      handle: cleanText(section?.xHandle, DEFAULTS.xHandle),
      href: xHref,
      linkLabel: cleanText(section?.xLinkLabel, DEFAULTS.xLinkLabel),
      posts: getPosts(section, now),
      title: cleanText(section?.xTitle, DEFAULTS.xTitle),
    },
  }
}
