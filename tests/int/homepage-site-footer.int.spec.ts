import { describe, expect, it } from 'vitest'

import type { Contact, Homepage, Media, Profile, SiteSetting, Social } from '@/payload-types'
import { buildSiteFooterViewModel } from '@/lib/cms/homepage'

const NOW = new Date('2026-07-13T12:00:00.000Z')

function asValue<T>(value: Partial<T>): T {
  return value as T
}

describe('homepage site footer content', () => {
  it('maps profile, social, curated feeds, media and site settings', () => {
    const portrait = asValue<Media>({
      alt: 'Andrii portrait',
      id: 1,
      isPublic: true,
      url: '/media/portrait.webp',
    })
    const snapshot = asValue<Media>({
      alt: 'Code workspace',
      id: 2,
      isPublic: true,
      url: '/media/snapshot.webp',
    })

    const result = buildSiteFooterViewModel({
      contact: asValue<Contact>({
        email: 'andrii@example.com',
      }),
      homepage: asValue<Homepage>({
        footerSection: {
          availabilityLabel: 'Available',
          connectLabel: 'Connect',
          enabled: true,
          instagramLinkLabel: 'Instagram',
          newsletterButtonLabel: 'Subscribe',
          newsletterDescription: 'Engineering notes.',
          newsletterNote: 'No spam.',
          newsletterPlaceholder: 'Email',
          newsletterTitle: 'Build Notes',
          snapshots: [
            {
              id: 'snapshot-one',
              image: snapshot,
              kind: 'code',
              subtitle: 'Typed work',
              title: 'Code Snapshot',
            },
          ],
          snapshotsSubtitle: 'Visual log',
          snapshotsTitle: 'Snapshots',
          xHandle: '@andrii',
          xLinkLabel: 'More on X',
          xPosts: [
            {
              content: 'A useful note.',
              id: 'post-one',
              likes: 3,
              publishedAt: '2026-07-12T09:30:00.000Z',
              replies: 1,
              reposts: 2,
            },
            {
              content: 'Future note.',
              publishedAt: '2027-01-01T00:00:00.000Z',
            },
          ],
          xTitle: 'X Signals',
        },
      }),
      now: NOW,
      profile: asValue<Profile>({
        availability: 'Open for product work',
        fullBio: 'Second paragraph.',
        name: 'Andrii Kulahin',
        portrait,
        role: 'Software Engineer',
        shortBio: 'First paragraph.',
        status: 'available',
      }),
      siteSettings: asValue<SiteSetting>({
        footer: {
          copyrightEmphasis: 'lot',
          copyrightPrefix: 'Built with care and',
          copyrightSuffix: 'of coffee.',
          navigation: [
            {
              href: '/#projects',
              id: 'projects',
              label: 'Projects',
            },
            {
              href: 'javascript:alert(1)',
              label: 'Unsafe',
            },
          ],
        },
      }),
      social: asValue<Social>({
        githubUrl: 'https://github.com/clearfixx',
        instagramUrl: 'https://instagram.com/andrii',
        linkedinUrl: 'http://unsafe.example.com',
        telegramUrl: 'https://t.me/andrii',
        xUrl: 'https://x.com/andrii',
      }),
    })

    expect(result).toMatchObject({
      copyright: {
        emphasis: 'lot',
        prefix: 'Built with care and',
        suffix: 'of coffee.',
        year: 2026,
      },
      newsletter: {
        buttonLabel: 'Subscribe',
        description: 'Engineering notes.',
        note: 'No spam.',
        placeholder: 'Email',
        title: 'Build Notes',
      },
      navigation: [
        {
          href: '/#projects',
          id: 'projects',
          label: 'Projects',
        },
      ],
      profile: {
        availability: {
          active: true,
          detail: 'Open for product work',
          label: 'Available',
        },
        description: ['First paragraph.', 'Second paragraph.'],
        image: {
          alt: 'Andrii portrait',
          src: '/media/portrait.webp',
        },
        name: 'Andrii Kulahin',
        role: 'Software Engineer',
      },
      snapshots: {
        href: 'https://instagram.com/andrii',
        items: [
          {
            id: 'snapshot-one',
            image: {
              alt: 'Code workspace',
              src: '/media/snapshot.webp',
            },
            kind: 'code',
            subtitle: 'Typed work',
            title: 'Code Snapshot',
          },
        ],
      },
      xFeed: {
        handle: '@andrii',
        href: 'https://x.com/andrii',
        posts: [
          {
            content: 'A useful note.',
            id: 'post-one',
            likes: 3,
            replies: 1,
            reposts: 2,
          },
        ],
      },
    })

    expect(result?.profile.socialLinks.map((link) => link.id)).toEqual([
      'github',
      'x',
      'telegram',
      'mail',
    ])
  })

  it('uses truthful empty feeds and safe visual profile fallbacks', () => {
    const result = buildSiteFooterViewModel({
      contact: asValue<Contact>({
        email: 'owner@example.com',
      }),
      homepage: asValue<Homepage>({
        footerSection: {},
      }),
      now: NOW,
      profile: asValue<Profile>({
        fullBio: '',
        name: 'Owner',
        role: 'Engineer',
        status: 'unavailable',
      }),
      siteSettings: asValue<SiteSetting>({
        footer: {},
      }),
      social: asValue<Social>({}),
    })

    expect(result?.profile.image).toEqual({
      alt: 'Owner',
      src: '/images/profile/engineer-profile.png',
    })
    expect(result?.profile.availability).toMatchObject({
      active: false,
      label: 'Unavailable',
    })
    expect(result?.profile.socialLinks).toEqual([
      expect.objectContaining({
        href: 'mailto:owner@example.com',
        id: 'mail',
      }),
    ])
    expect(result?.xFeed.posts).toEqual([])
    expect(result?.snapshots.items).toEqual([])
    expect(result?.navigation).toEqual([])
  })

  it('returns null when the footer is disabled', () => {
    const result = buildSiteFooterViewModel({
      contact: asValue<Contact>({}),
      homepage: asValue<Homepage>({
        footerSection: {
          enabled: false,
        },
      }),
      now: NOW,
      profile: asValue<Profile>({}),
      siteSettings: asValue<SiteSetting>({}),
      social: asValue<Social>({}),
    })

    expect(result).toBeNull()
  })
})
