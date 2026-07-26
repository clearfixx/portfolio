import { cache } from 'react'

import type { Contact, Homepage, Profile, SiteSetting, Social } from '@/payload-types'

import { buildContactSectionViewModel, buildSiteFooterViewModel } from '../homepage'
import type { SiteFooterViewModel } from '../homepage'
import { getContact, getHomepage, getProfile, getSiteSettings, getSocial } from '../queries'
import type {
  ContactsPageViewModel,
  ContactsProcessStepViewModel,
  ContactsTitleViewModel,
} from './types'

// contacts-page-foundation-v1

const DEFAULTS = {
  breadcrumbLabel: 'Contacts',
  hero: {
    eyebrow: 'Open communication channel',
    title: 'Let’s build something that deserves to exist.',
    titleAccent: 'deserves to exist.',
    description:
      'Share the problem, product idea, or engineering challenge. I’ll review the context and reply with a clear next step.',
  },
  responseTime: {
    label: 'Response time',
    value: 'Within 1–2 business days',
  },
  workingMode: {
    label: 'Working mode',
    value: 'Remote-first · async-friendly',
  },
  channels: {
    eyebrow: 'Direct channels',
    title: 'Choose the channel that fits the conversation.',
    description:
      'Email works best for project context. Telegram is useful for a quick first contact. Location and availability are kept in the shared profile settings.',
  },
  form: {
    eyebrow: 'Project intake',
    title: 'Start the conversation',
    description:
      'Tell me what you are building, where the project stands, and what kind of help you need.',
  },
  process: {
    eyebrow: 'Communication protocol',
    title: 'What happens after you send the message.',
    description:
      'No vague sales funnel. The goal is to understand the work, identify fit, and define the smallest useful next step.',
    steps: [
      {
        code: '01',
        title: 'Context review',
        description:
          'I read the message, inspect the scope, and identify the important technical or product constraints.',
      },
      {
        code: '02',
        title: 'Fit check',
        description:
          'I confirm whether the challenge matches my current focus, availability, and working model.',
      },
      {
        code: '03',
        title: 'Clear response',
        description:
          'You receive a direct answer with questions, recommendations, or a proposed next action.',
      },
      {
        code: '04',
        title: 'Working session',
        description:
          'When the fit is right, we define scope, ownership, communication, and the first delivery milestone.',
      },
    ],
  },
  social: {
    eyebrow: 'Public network',
    title: 'Follow the work between releases.',
    description:
      'Code, product progress, engineering notes, and selected experiments are published through the connected social channels.',
  },
  seo: {
    title: 'Contacts',
    description:
      'Contact Andrii Kulahin about product engineering, architecture, full-stack development, technical direction, and selected collaborations.',
    canonical: '/contacts',
  },
} as const

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

function safeInternalPath(value: unknown, fallback: string): string {
  const normalized = normalizeText(value)

  if (!normalized || !normalized.startsWith('/')) {
    return fallback
  }

  return normalized
}

function splitAccentText(titleValue: unknown, accentValue: unknown): ContactsTitleViewModel {
  const title = text(titleValue, DEFAULTS.hero.title)
  const accent = text(accentValue, DEFAULTS.hero.titleAccent)
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

function mapProcessSteps(contact: Contact): ContactsProcessStepViewModel[] {
  const configured = (contact.page?.processSteps ?? []).flatMap((step, index) => {
    if (!step) {
      return []
    }

    const title = normalizeText(step.title)
    const description = normalizeText(step.description)

    if (!title || !description) {
      return []
    }

    return [
      {
        code: text(step.code, String(index + 1).padStart(2, '0')),
        description,
        id: step.id ?? `contacts-process-${index + 1}`,
        title,
      },
    ]
  })

  if (configured.length > 0) {
    return configured
  }

  return DEFAULTS.process.steps.map((step, index) => ({
    ...step,
    id: `contacts-process-${index + 1}`,
  }))
}

export function buildContactsPageViewModel({
  contact,
  homepage,
  profile,
  social,
}: {
  contact: Contact
  homepage: Homepage
  profile: Profile
  social: Social
}): ContactsPageViewModel {
  const sharedContact = buildContactSectionViewModel({
    contact,
    homepage,
    profile,
    social,
  })
  const page = contact.page
  const locationChannel = sharedContact.channels.find((channel) => channel.id === 'location')

  return {
    breadcrumbLabel: text(page?.breadcrumbLabel, DEFAULTS.breadcrumbLabel),
    channels: {
      description: text(page?.channelsDescription, DEFAULTS.channels.description),
      eyebrow: text(page?.channelsEyebrow, DEFAULTS.channels.eyebrow),
      title: text(page?.channelsTitle, DEFAULTS.channels.title),
    },
    contact: sharedContact,
    enabled: page?.enabled !== false,
    form: {
      description: text(
        page?.formDescription,
        sharedContact.form.description || DEFAULTS.form.description,
      ),
      enabled: sharedContact.form.enabled,
      eyebrow: text(page?.formEyebrow, DEFAULTS.form.eyebrow),
      title: text(page?.formTitle, sharedContact.form.title || DEFAULTS.form.title),
    },
    hero: {
      description: text(page?.description, DEFAULTS.hero.description),
      eyebrow: text(page?.eyebrow, DEFAULTS.hero.eyebrow),
      title: splitAccentText(page?.title, page?.titleAccent),
    },
    process: {
      description: text(page?.processDescription, DEFAULTS.process.description),
      eyebrow: text(page?.processEyebrow, DEFAULTS.process.eyebrow),
      steps: mapProcessSteps(contact),
      title: text(page?.processTitle, DEFAULTS.process.title),
    },
    seo: {
      canonical: safeInternalPath(page?.seo?.canonical, DEFAULTS.seo.canonical),
      description: text(page?.seo?.metaDescription, DEFAULTS.seo.description),
      title: text(page?.seo?.metaTitle, DEFAULTS.seo.title),
    },
    social: {
      description: text(page?.socialDescription, DEFAULTS.social.description),
      enabled: sharedContact.socialLinks.length > 0,
      eyebrow: text(page?.socialEyebrow, DEFAULTS.social.eyebrow),
      links: sharedContact.socialLinks,
      title: text(page?.socialTitle, DEFAULTS.social.title),
    },
    status: {
      availability: sharedContact.availability,
      items: [
        {
          icon: 'signal',
          id: 'availability',
          label: 'Channel status',
          value: sharedContact.availability.label,
        },
        {
          icon: 'pin',
          id: 'location',
          label: 'Location',
          value: locationChannel?.value ?? sharedContact.location ?? 'Remote / Ukraine',
        },
        {
          icon: 'clock',
          id: 'response-time',
          label: text(page?.responseTimeLabel, DEFAULTS.responseTime.label),
          value: text(page?.responseTimeValue, DEFAULTS.responseTime.value),
        },
        {
          icon: 'system',
          id: 'working-mode',
          label: text(page?.workingModeLabel, DEFAULTS.workingMode.label),
          value: text(page?.workingModeValue, DEFAULTS.workingMode.value),
        },
      ],
    },
  }
}

export type ContactsPageContent = {
  page: ContactsPageViewModel
  siteFooter: SiteFooterViewModel | null
}

export const getContactsPageContent = cache(async (): Promise<ContactsPageContent> => {
  const [contact, homepage, profile, social, siteSettings] = await Promise.all([
    getContact(),
    getHomepage(),
    getProfile(),
    getSocial(),
    getSiteSettings(),
  ])

  return {
    page: buildContactsPageViewModel({
      contact,
      homepage,
      profile,
      social,
    }),
    siteFooter: buildSiteFooterViewModel({
      contact,
      homepage,
      profile,
      siteSettings: siteSettings as SiteSetting,
      social,
    }),
  }
})
