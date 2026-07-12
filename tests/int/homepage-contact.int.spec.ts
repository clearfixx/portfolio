import { describe, expect, it } from 'vitest'

import type { Contact, Homepage, Profile, Social } from '@/payload-types'
import { buildContactSectionViewModel } from '@/lib/cms/homepage'

function asContact(value: Partial<Contact>): Contact {
  return value as Contact
}

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asProfile(value: Partial<Profile>): Profile {
  return value as Profile
}

function asSocial(value: Partial<Social>): Social {
  return value as Social
}

describe('homepage contact content', () => {
  it('maps contact, profile availability, section copy, and safe social URLs', () => {
    const result = buildContactSectionViewModel({
      contact: asContact({
        email: 'andrii@example.com',
        phone: '+380 67 123 45 67',
        location: 'Kyiv, Ukraine',
        contactFormEnabled: false,
      }),
      homepage: asHomepage({
        contactSection: {
          enabled: true,
          eyebrow: 'CONTACT',
          title: 'Need a reliable system? Let’s talk.',
          titleAccent: 'Let’s talk.',
          description: 'Tell me about the product.',
          formTitle: 'Start a mission',
          formDescription: 'Share the context and desired outcome.',
          footerLabel: 'Direct channel',
          footerText: 'Open for selected engineering work.',
        },
      }),
      profile: asProfile({
        location: 'Ukraine',
        status: 'available',
        availability: 'Open for freelance & product work',
      }),
      social: asSocial({
        githubUrl: 'https://github.com/clearfixx',
        linkedinUrl: 'https://linkedin.com/in/example',
        telegramUrl: 'https://t.me/ak_dev',
        xUrl: 'javascript:alert(1)',
      }),
    })

    expect(result.title).toEqual({
      accent: 'Let’s talk.',
      leading: 'Need a reliable system?',
    })
    expect(result.form).toEqual({
      description: 'Share the context and desired outcome.',
      enabled: false,
      title: 'Start a mission',
    })
    expect(result.location).toBe('Kyiv, Ukraine')
    expect(result.availability).toEqual({
      label: 'Available',
      tone: 'available',
    })
    expect(result.channels).toEqual([
      {
        external: false,
        href: 'mailto:andrii@example.com',
        icon: 'mail',
        id: 'email',
        label: 'Email',
        value: 'andrii@example.com',
      },
      {
        external: false,
        href: 'tel:+380671234567',
        icon: 'phone',
        id: 'phone',
        label: 'Phone',
        value: '+380 67 123 45 67',
      },
      {
        external: true,
        href: 'https://t.me/ak_dev',
        icon: 'telegram',
        id: 'telegram',
        label: 'Telegram',
        value: '@ak_dev',
      },
      {
        external: false,
        icon: 'pin',
        id: 'location',
        label: 'Location',
        value: 'Kyiv, Ukraine',
      },
      {
        external: false,
        icon: 'clock',
        id: 'availability',
        label: 'Availability',
        value: 'Open for freelance & product work',
      },
    ])
    expect(result.socialLinks).toEqual([
      {
        href: 'https://github.com/clearfixx',
        icon: 'github',
        id: 'github',
        label: 'GitHub',
      },
      {
        href: 'https://linkedin.com/in/example',
        icon: 'linkedin',
        id: 'linkedin',
        label: 'LinkedIn',
      },
      {
        href: 'https://t.me/ak_dev',
        icon: 'telegram',
        id: 'telegram',
        label: 'Telegram',
      },
    ])
  })

  it('uses profile location, truthful status, and safe defaults without restoring hardcoded channels', () => {
    const result = buildContactSectionViewModel({
      contact: asContact({
        email: '',
        phone: null,
        location: null,
        contactFormEnabled: null,
      }),
      homepage: asHomepage({
        contactSection: {
          enabled: true,
          eyebrow: null,
          title: '',
          titleAccent: null,
          description: '',
          formTitle: '',
          formDescription: '',
          footerLabel: '',
          footerText: '',
        },
      }),
      profile: asProfile({
        location: 'Ukraine',
        status: 'focused',
        availability: null,
      }),
      social: asSocial({
        githubUrl: 'ftp://example.com/profile',
        linkedinUrl: null,
        telegramUrl: 'not-a-url',
        xUrl: null,
      }),
    })

    expect(result.location).toBe('Ukraine')
    expect(result.channels).toEqual([
      {
        external: false,
        icon: 'pin',
        id: 'location',
        label: 'Location',
        value: 'Ukraine',
      },
    ])
    expect(result.socialLinks).toEqual([])
    expect(result.availability).toEqual({
      label: 'Currently focused',
      tone: 'focused',
    })
    expect(result.form.enabled).toBe(true)
    expect(result.title).toEqual({
      accent: "Let's talk.",
      leading: 'Not enough?',
    })
  })

  it('keeps the full title unaccented when the configured accent is not present', () => {
    const result = buildContactSectionViewModel({
      contact: asContact({
        email: 'hello@example.com',
      }),
      homepage: asHomepage({
        contactSection: {
          title: 'Build the next product.',
          titleAccent: 'Missing phrase',
        },
      }),
      profile: asProfile({
        status: 'unavailable',
      }),
      social: asSocial({}),
    })

    expect(result.title).toEqual({
      leading: 'Build the next product.',
    })
    expect(result.availability).toEqual({
      label: 'Unavailable',
      tone: 'unavailable',
    })
  })
})
