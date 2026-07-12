import type { Contact, Homepage, Profile, Social } from '@/payload-types'

import type {
  ContactAvailabilityTone,
  ContactChannelViewModel,
  ContactSectionViewModel,
  ContactSocialIcon,
  ContactSocialLinkViewModel,
} from './types'

const DEFAULT_EYEBROW = 'CONTACT'
const DEFAULT_TITLE = "Not enough? Let's talk."
const DEFAULT_TITLE_ACCENT = "Let's talk."
const DEFAULT_DESCRIPTION =
  'If you need a scalable product, clean architecture and reliable delivery — I’m ready to discuss your project.'
const DEFAULT_FORM_TITLE = 'Start the conversation'
const DEFAULT_FORM_DESCRIPTION =
  'Tell me what you’re building, what you need, and where you need help.'
const DEFAULT_FOOTER_LABEL = 'Mission link'
const DEFAULT_FOOTER_TEXT = 'Open for freelance, product work and collaboration.'

const STATUS_LABELS: Record<ContactAvailabilityTone, string> = {
  available: 'Available',
  focused: 'Currently focused',
  unavailable: 'Unavailable',
}

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function normalizeExternalUrl(value: string | null | undefined): string | undefined {
  const normalized = normalizeText(value)

  if (!normalized) {
    return undefined
  }

  try {
    const url = new URL(normalized)

    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

function buildPhoneHref(value: string): string | undefined {
  const normalized = value.replace(/[^\d+]/g, '')

  return normalized ? `tel:${normalized}` : undefined
}

function getTelegramDisplayValue(url: string): string {
  try {
    const parsed = new URL(url)
    const handle = parsed.pathname.split('/').filter(Boolean)[0]

    return handle ? `@${handle.replace(/^@/, '')}` : 'Telegram'
  } catch {
    return 'Telegram'
  }
}

function splitAccentText(
  title: string,
  accentValue: string | null | undefined,
): ContactSectionViewModel['title'] {
  const accent = normalizeText(accentValue)

  if (!accent) {
    return {
      leading: title,
    }
  }

  const index = title.indexOf(accent)

  if (index < 0) {
    return {
      leading: title,
    }
  }

  const leading = title.slice(0, index).trim()
  const trailing = title.slice(index + accent.length).trim()

  return {
    accent,
    leading,
    ...(trailing ? { trailing } : {}),
  }
}

function getAvailability(profile: Profile): ContactSectionViewModel['availability'] {
  const tone: ContactAvailabilityTone =
    profile.status === 'focused' || profile.status === 'unavailable' ? profile.status : 'available'

  return {
    label: STATUS_LABELS[tone],
    tone,
  }
}

function getChannels({
  contact,
  profile,
  telegramUrl,
}: {
  contact: Contact
  profile: Profile
  telegramUrl?: string
}): ContactChannelViewModel[] {
  const channels: ContactChannelViewModel[] = []
  const email = normalizeText(contact.email)
  const phone = normalizeText(contact.phone)
  const location = normalizeText(contact.location) ?? normalizeText(profile.location)
  const availability = normalizeText(profile.availability)

  if (email) {
    channels.push({
      external: false,
      href: `mailto:${email}`,
      icon: 'mail',
      id: 'email',
      label: 'Email',
      value: email,
    })
  }

  if (phone) {
    channels.push({
      external: false,
      href: buildPhoneHref(phone),
      icon: 'phone',
      id: 'phone',
      label: 'Phone',
      value: phone,
    })
  }

  if (telegramUrl) {
    channels.push({
      external: true,
      href: telegramUrl,
      icon: 'telegram',
      id: 'telegram',
      label: 'Telegram',
      value: getTelegramDisplayValue(telegramUrl),
    })
  }

  if (location) {
    channels.push({
      external: false,
      icon: 'pin',
      id: 'location',
      label: 'Location',
      value: location,
    })
  }

  if (availability) {
    channels.push({
      external: false,
      icon: 'clock',
      id: 'availability',
      label: 'Availability',
      value: availability,
    })
  }

  return channels
}

function getSocialLinks(social: Social, telegramUrl?: string): ContactSocialLinkViewModel[] {
  const candidates: Array<{
    icon: ContactSocialIcon
    id: string
    label: string
    value: string | null | undefined
  }> = [
    {
      icon: 'github',
      id: 'github',
      label: 'GitHub',
      value: social.githubUrl,
    },
    {
      icon: 'linkedin',
      id: 'linkedin',
      label: 'LinkedIn',
      value: social.linkedinUrl,
    },
    {
      icon: 'telegram',
      id: 'telegram',
      label: 'Telegram',
      value: telegramUrl,
    },
    {
      icon: 'x',
      id: 'x',
      label: 'X',
      value: social.xUrl,
    },
  ]

  return candidates.flatMap((candidate) => {
    const href = normalizeExternalUrl(candidate.value)

    return href
      ? [
          {
            href,
            icon: candidate.icon,
            id: candidate.id,
            label: candidate.label,
          },
        ]
      : []
  })
}

type BuildContactSectionViewModelInput = {
  contact: Contact
  homepage: Homepage
  profile: Profile
  social: Social
}

export function buildContactSectionViewModel({
  contact,
  homepage,
  profile,
  social,
}: BuildContactSectionViewModelInput): ContactSectionViewModel {
  const section = homepage.contactSection
  const title = cleanText(section?.title, DEFAULT_TITLE)
  const telegramUrl = normalizeExternalUrl(social.telegramUrl)
  const location = normalizeText(contact.location) ?? normalizeText(profile.location)

  return {
    availability: getAvailability(profile),
    channels: getChannels({
      contact,
      profile,
      telegramUrl,
    }),
    description: cleanText(section?.description, DEFAULT_DESCRIPTION),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_EYEBROW),
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_FOOTER_LABEL),
      text: cleanText(section?.footerText, DEFAULT_FOOTER_TEXT),
    },
    form: {
      description: cleanText(section?.formDescription, DEFAULT_FORM_DESCRIPTION),
      enabled: contact.contactFormEnabled !== false,
      title: cleanText(section?.formTitle, DEFAULT_FORM_TITLE),
    },
    location,
    socialLinks: getSocialLinks(social, telegramUrl),
    title: splitAccentText(title, section?.titleAccent ?? DEFAULT_TITLE_ACCENT),
  }
}
