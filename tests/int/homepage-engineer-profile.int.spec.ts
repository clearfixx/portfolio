import { describe, expect, it } from 'vitest'

import type { Homepage, Media, Profile } from '@/payload-types'
import { buildEngineerProfileViewModel } from '@/lib/cms/homepage'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asMedia(value: Partial<Media>): Media {
  return value as Media
}

function asProfile(value: Partial<Profile>): Profile {
  return value as Profile
}

describe('homepage engineer profile content', () => {
  it('maps one Profile source into identity, derived stats, journey, and principles', () => {
    const result = buildEngineerProfileViewModel({
      homepage: asHomepage({
        engineerProfileSection: {
          enabled: true,
          eyebrow: 'About me',
          title: 'Engineer Profile',
          description: 'Systems, interfaces, and product engineering.',
          journeyTitle: 'Career Path',
          journeyMeta: '// timeline',
          journeyFooter: 'KEEP BUILDING',
          principlesTitle: 'Principles',
          principlesMeta: '// operating system',
          footerLabel: 'Engineering mindset',
          footerText: 'turning complexity into maintainable systems.',
        },
      }),
      now: new Date('2026-07-13T00:00:00.000Z'),
      profile: asProfile({
        name: 'Andrii Kulahin',
        role: 'Software Engineer',
        location: 'Kyiv, Ukraine',
        profileId: 'AK_10061988',
        status: 'focused',
        portrait: asMedia({
          id: 10,
          alt: 'Andrii in the engineering lab',
          url: '/api/media/file/profile.webp',
        }),
        fullBio: 'I design and build scalable product systems.',
        careerStartedAt: '2014-01-01T00:00:00.000Z',
        metrics: [
          {
            id: 'commits',
            key: 'commits',
            label: 'Commits',
            value: 6241,
            suffix: '+',
            enabled: true,
          },
          {
            id: 'disabled',
            key: 'hidden',
            label: 'Hidden',
            value: 99,
            enabled: false,
          },
        ],
        journey: [
          {
            id: 'journey-1',
            year: '2014',
            title: 'Started building',
            description: 'The first production projects.',
            accent: false,
          },
          {
            id: 'journey-invalid',
            year: '',
            title: 'Invalid',
            description: 'Ignored.',
            accent: false,
          },
        ],
        principles: [
          {
            id: 'principle-1',
            icon: 'code',
            title: 'Quality Always',
            description: 'Maintainability matters after launch.',
          },
          {
            id: 'principle-2',
            icon: 'unsupported' as 'code',
            title: 'Safe defaults',
            description: 'Unknown icons use the architecture mark.',
          },
        ],
      }),
      projectsCount: 18,
    })

    expect(result).toMatchObject({
      description: 'Systems, interfaces, and product engineering.',
      eyebrow: 'About me',
      footer: {
        label: 'Engineering mindset',
        text: 'turning complexity into maintainable systems.',
      },
      profile: {
        bio: 'I design and build scalable product systems.',
        id: 'AK_10061988',
        image: {
          alt: 'Andrii in the engineering lab',
          src: '/api/media/file/profile.webp',
        },
        location: 'Kyiv, Ukraine',
        name: 'Andrii Kulahin',
        role: 'Software Engineer',
        stats: [
          {
            id: 'experience',
            label: 'Years Exp.',
            value: '12+',
          },
          {
            id: 'projects',
            label: 'Projects',
            value: '18+',
          },
          {
            id: 'commits',
            label: 'Commits',
            value: '6,241+',
          },
        ],
        status: {
          label: 'FOCUSED',
          tone: 'focused',
        },
      },
      title: 'Engineer Profile',
    })
    expect(result?.journey).toEqual({
      footer: 'KEEP BUILDING',
      items: [
        {
          accent: false,
          description: 'The first production projects.',
          id: 'journey-1',
          title: 'Started building',
          year: '2014',
        },
      ],
      meta: '// timeline',
      title: 'Career Path',
    })
    expect(result?.principles.items).toEqual([
      {
        description: 'Maintainability matters after launch.',
        icon: 'code',
        id: 'principle-1',
        number: '01',
        title: 'Quality Always',
      },
      {
        description: 'Unknown icons use the architecture mark.',
        icon: 'architecture',
        id: 'principle-2',
        number: '02',
        title: 'Safe defaults',
      },
    ])
  })

  it('uses safe visual fallbacks without restoring the deleted data module', () => {
    const result = buildEngineerProfileViewModel({
      homepage: asHomepage({
        engineerProfileSection: {
          enabled: true,
        },
      }),
      profile: asProfile({
        name: '',
        role: '',
        profileId: '',
        location: null,
        status: null,
        portrait: 99,
        shortBio: 'Short biography.',
        fullBio: '',
        careerStartedAt: null,
        metrics: [],
        journey: [],
        principles: [],
      }),
      projectsCount: -4,
    })

    expect(result?.profile).toEqual({
      bio: 'Short biography.',
      id: 'AK_PROFILE',
      image: {
        alt: 'Portrait of Andrii Kulahin',
        src: '/images/profile/engineer-profile.png',
      },
      location: undefined,
      name: 'Andrii Kulahin',
      role: 'Software Engineer',
      stats: [
        {
          id: 'projects',
          label: 'Projects',
          value: '0+',
        },
      ],
      status: {
        label: 'ONLINE',
        tone: 'available',
      },
    })
    expect(result?.journey.items).toEqual([])
    expect(result?.principles.items).toEqual([])
  })

  it('returns null when the Engineer Profile section is disabled', () => {
    expect(
      buildEngineerProfileViewModel({
        homepage: asHomepage({
          engineerProfileSection: {
            enabled: false,
          },
        }),
        profile: asProfile({}),
        projectsCount: 0,
      }),
    ).toBeNull()
  })
})
