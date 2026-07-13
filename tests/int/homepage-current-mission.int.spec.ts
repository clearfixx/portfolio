import { describe, expect, it } from 'vitest'

import type { Homepage, Project, TechStack } from '@/payload-types'
import { buildCurrentMissionViewModel } from '@/lib/cms/homepage'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asProject(value: Partial<Project>): Project {
  return value as Project
}

function asTechnology(value: Partial<TechStack>): TechStack {
  return value as TechStack
}

describe('homepage current mission content', () => {
  it('maps the explicitly selected published project and CMS section copy', () => {
    const next = asTechnology({
      id: 10,
      name: 'Next.js',
      visible: true,
    })
    const postgres = asTechnology({
      id: 11,
      name: 'PostgreSQL',
      visible: true,
    })
    const hidden = asTechnology({
      id: 12,
      name: 'Hidden',
      visible: false,
    })

    const result = buildCurrentMissionViewModel(
      asHomepage({
        currentMissionSection: {
          enabled: true,
          eyebrow: 'Current Mission',
          title: null,
          description: 'The flagship platform in active development.',
          project: asProject({
            id: 7,
            title: 'DSS Universe',
            excerpt: 'A modular developer ecosystem.',
            cardTagline: 'Years of ideas. One platform.',
            currentVersion: '2.6.7',
            stage: 'development',
            progress: 78.4,
            publishedAt: '2026-07-01T12:00:00.000Z',
            techStack: [next, 99, next, hidden, postgres],
            links: [
              {
                id: 'github',
                label: 'GitHub',
                type: 'github',
                url: 'https://github.com/clearfixx/dss-universe',
                isEnabled: true,
              },
              {
                id: 'live-disabled',
                label: 'Live',
                type: 'live',
                url: 'https://example.com/live',
                isEnabled: false,
              },
              {
                id: 'case-study',
                label: 'View Mission Control',
                type: 'case-study',
                url: '/projects/dss-universe',
                isEnabled: true,
              },
            ],
          }),
          ctaLabel: 'Explore project',
          ctaUrlOverride: null,
          footerLabel: 'Mission Status',
          footerText: 'Building one release at a time.',
        },
      }),
      new Date('2026-07-12T12:00:00.000Z'),
    )

    expect(result).toEqual({
      description: 'The flagship platform in active development.',
      eyebrow: 'Current Mission',
      footer: {
        label: 'Mission Status',
        text: 'Building one release at a time.',
      },
      project: {
        cta: {
          external: false,
          href: '/projects/dss-universe',
          label: 'View Mission Control',
        },
        excerpt: 'A modular developer ecosystem.',
        id: '7',
        progress: 78,
        stage: 'In Development',
        stack: ['Next.js', 'PostgreSQL'],
        tagline: 'Years of ideas. One platform.',
        title: 'DSS Universe',
        version: '2.6.7',
      },
      title: 'Building DSS Universe',
    })
  })

  it('uses a safe override and rejects unsafe project links', () => {
    const result = buildCurrentMissionViewModel(
      asHomepage({
        currentMissionSection: {
          enabled: true,
          title: 'Engineering the next platform',
          project: asProject({
            id: 8,
            title: 'Platform',
            excerpt: 'A platform.',
            stage: 'planning',
            progress: 140,
            publishedAt: '2026-07-01T12:00:00.000Z',
            techStack: [],
            links: [
              {
                id: 'unsafe',
                label: 'Unsafe',
                type: 'live',
                url: 'javascript:alert(1)',
                isEnabled: true,
              },
            ],
          }),
          ctaLabel: 'Open roadmap',
          ctaUrlOverride: 'https://example.com/roadmap',
        },
      }),
      new Date('2026-07-12T12:00:00.000Z'),
    )

    expect(result?.title).toBe('Engineering the next platform')
    expect(result?.project).toMatchObject({
      cta: {
        external: true,
        href: 'https://example.com/roadmap',
        label: 'Open roadmap',
      },
      progress: 100,
      stage: 'Planning',
      tagline: 'Planning · Platform',
    })
  })

  it('keeps a truthful empty section for unresolved, unpublished, or future projects', () => {
    const unresolved = buildCurrentMissionViewModel(
      asHomepage({
        currentMissionSection: {
          enabled: true,
          project: 77,
        },
      }),
    )
    const future = buildCurrentMissionViewModel(
      asHomepage({
        currentMissionSection: {
          enabled: true,
          project: asProject({
            id: 9,
            title: 'Future project',
            excerpt: 'Not public yet.',
            stage: 'idea',
            publishedAt: '2026-08-01T12:00:00.000Z',
          }),
        },
      }),
      new Date('2026-07-12T12:00:00.000Z'),
    )

    expect(unresolved?.project).toBeUndefined()
    expect(future?.project).toBeUndefined()
    expect(unresolved?.title).toBe('Current Mission')
  })

  it('returns null when the current mission section is explicitly disabled', () => {
    expect(
      buildCurrentMissionViewModel(
        asHomepage({
          currentMissionSection: {
            enabled: false,
          },
        }),
      ),
    ).toBeNull()
  })
})
