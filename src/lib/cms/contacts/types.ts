import type {
  ContactAvailabilityTone,
  ContactChannelViewModel,
  ContactSectionViewModel,
  ContactSocialLinkViewModel,
} from '../homepage'

// contacts-page-foundation-v1

export type ContactsTitleViewModel = {
  accent?: string
  leading: string
  trailing?: string
}

export type ContactsStatusIcon = 'clock' | 'pin' | 'signal' | 'system'

export type ContactsStatusItemViewModel = {
  icon: ContactsStatusIcon
  id: string
  label: string
  value: string
}

export type ContactsProcessStepViewModel = {
  code: string
  description: string
  id: string
  title: string
}

export type ContactsPageViewModel = {
  breadcrumbLabel: string
  channels: {
    description: string
    eyebrow: string
    title: string
  }
  contact: ContactSectionViewModel
  enabled: boolean
  form: {
    description: string
    enabled: boolean
    eyebrow: string
    title: string
  }
  hero: {
    description: string
    eyebrow: string
    title: ContactsTitleViewModel
  }
  process: {
    description: string
    eyebrow: string
    steps: ContactsProcessStepViewModel[]
    title: string
  }
  seo: {
    canonical: string
    description: string
    title: string
  }
  social: {
    description: string
    enabled: boolean
    eyebrow: string
    links: ContactSocialLinkViewModel[]
    title: string
  }
  status: {
    availability: {
      label: string
      tone: ContactAvailabilityTone
    }
    items: ContactsStatusItemViewModel[]
  }
}

export type ContactsPageChannel = ContactChannelViewModel
