import { describe, expect, it } from 'vitest'

import type { Homepage, Media, Profile, TechStack } from '@/payload-types'
import {
  buildHeroViewModel,
  calculateExperienceYears,
  getSelectedTechStack,
} from '@/lib/cms/homepage'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asProfile(value: Partial<Profile>): Profile {
  return value as Profile
}

function asMedia(value: Partial<Media>): Media {
  return value as Media
}

function asTechnology(value: Partial<TechStack>): TechStack {
  return value as TechStack
}

describe('homepage hero content', () => {
  it('keeps populated visible technologies in selected order and removes duplicates', () => {
    const next = asTechnology({
      id: 1,
      name: 'Next.js',
      slug: 'nextjs',
      visible: true,
    })
    const hidden = asTechnology({
      id: 2,
      name: 'Hidden',
      slug: 'hidden',
      visible: false,
    })

    expect(getSelectedTechStack([next, 99, hidden, next])).toEqual([next])
  })

  it('calculates complete experience years without timezone drift', () => {
    expect(
      calculateExperienceYears('2014-08-20T00:00:00.000Z', new Date('2026-07-12T12:00:00.000Z')),
    ).toBe(11)

    expect(
      calculateExperienceYears('2014-07-01T00:00:00.000Z', new Date('2026-07-12T12:00:00.000Z')),
    ).toBe(12)
  })

  it('maps Payload content, derived telemetry, and a truthful optional activity note', () => {
    const homepage = asHomepage({
      hero: {
        eyebrow: 'Hello',
        title: 'I build resilient products.',
        titleAccent: 'products.',
        subtitle: 'Architecture first\nDelivery without drama.',
        subtitleAccent: 'Architecture',
        primaryCtaLabel: 'See projects',
        primaryCtaUrl: '#projects',
        secondaryCtaLabel: 'Get CV',
        secondaryCtaUrl: null,
        image: null,
      },
    })
    const profile = asProfile({
      name: 'Andrii Kulahin',
      role: 'Software Engineer',
      careerStartedAt: '2014-01-01T00:00:00.000Z',
      cvFile: asMedia({
        id: 8,
        alt: 'CV',
        url: '/api/media/file/cv.pdf',
      }),
      metrics: [
        {
          id: 'metric-1',
          key: 'commits',
          label: 'Commits pushed',
          value: 6241,
          suffix: '+',
          enabled: true,
        },
      ],
      heroActivity: {
        enabled: true,
        label: 'Engineering activity',
        detail: 'Public source code is available on GitHub',
      },
    })
    const technologies = [
      asTechnology({
        id: 1,
        name: 'Next.js',
        slug: 'nextjs',
        visible: true,
      }),
      asTechnology({
        id: 2,
        name: 'Unknown tool',
        slug: 'unknown',
        visible: true,
      }),
    ]

    const result = buildHeroViewModel({
      homepage,
      profile,
      projectsCount: 18,
      technologies,
      now: new Date('2026-07-12T12:00:00.000Z'),
    })

    expect(result.eyebrow).toBe('Hello')
    expect(result.name).toEqual({
      accent: 'Kulahin.',
      leading: 'Andrii',
    })
    expect(result.secondaryAction.href).toBe('/api/media/file/cv.pdf')
    expect(result.techStack).toEqual([
      {
        id: '1',
        icon: 'next',
        label: 'Next.js',
      },
      {
        id: '2',
        icon: 'generic',
        label: 'Unknown tool',
      },
    ])
    expect(result.telemetry.stats).toEqual([
      {
        label: 'Projects shipped',
        suffix: '+',
        value: 18,
      },
      {
        label: 'Commits pushed',
        suffix: '+',
        value: 6241,
      },
      {
        label: 'Years coding',
        suffix: '+',
        value: 12,
      },
      {
        label: 'Debug sessions',
        suffix: '∞',
        value: null,
      },
    ])
    expect(result.telemetry.activity).toEqual({
      detail: 'Public source code is available on GitHub',
      label: 'Engineering activity',
    })
  })

  it('uses safe defaults without restoring fake live activity', () => {
    const result = buildHeroViewModel({
      homepage: asHomepage({
        hero: {
          eyebrow: null,
          title: '',
          titleAccent: null,
          subtitle: '',
          subtitleAccent: null,
          primaryCtaLabel: null,
          primaryCtaUrl: null,
          secondaryCtaLabel: null,
          secondaryCtaUrl: null,
          image: null,
        },
      }),
      profile: asProfile({
        name: '',
        role: '',
        careerStartedAt: null,
        metrics: [],
        heroActivity: {
          enabled: false,
          label: 'GitHub activity',
          detail: 'Last commit pushed 2 hours ago',
        },
      }),
      projectsCount: 0,
      technologies: [],
      now: new Date('2026-07-12T12:00:00.000Z'),
    })

    expect(result.headline.title).toBe("I don't just build websites.")
    expect(result.telemetry.stats[0]).toEqual({
      label: 'Projects shipped',
      suffix: '',
      value: 0,
    })
    expect(result.telemetry.stats[1]).toEqual({
      label: 'Core technologies',
      suffix: '',
      value: 0,
    })
    expect(result.telemetry.activity).toBeUndefined()
  })
})
