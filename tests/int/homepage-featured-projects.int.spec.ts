import { describe, expect, it } from 'vitest'

import type { Homepage, Media, Project, TechStack } from '@/payload-types'
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from '@/lib/cms/homepage'

function asProject(value: Partial<Project>): Project {
  return value as Project
}

function asMedia(value: Partial<Media>): Media {
  return value as Media
}

function asTechnology(value: Partial<TechStack>): TechStack {
  return value as TechStack
}

describe('homepage featured projects content', () => {
  it('keeps selected published projects in editor order and removes unresolved or duplicate relations', () => {
    const first = asProject({
      id: 1,
      title: 'First',
      publishedAt: '2026-07-10T12:00:00.000Z',
    })
    const second = asProject({
      id: 2,
      title: 'Second',
      publishedAt: '2026-07-11T12:00:00.000Z',
    })
    const future = asProject({
      id: 3,
      title: 'Future',
      publishedAt: '2026-08-01T12:00:00.000Z',
    })

    const relationships: Homepage['featuredProjects'] = [second, 99, first, second, future]

    expect(
      getSelectedFeaturedProjects(relationships, new Date('2026-07-12T12:00:00.000Z')),
    ).toEqual([second, first])
  })

  it('maps Payload project content, populated media, technologies, and the preferred enabled link', () => {
    const next = asTechnology({
      id: 10,
      name: 'Next.js',
      visible: true,
    })
    const node = asTechnology({
      id: 11,
      name: 'Node.js',
      visible: true,
    })
    const hidden = asTechnology({
      id: 12,
      name: 'Hidden',
      visible: false,
    })

    const result = buildFeaturedProjectViewModels([
      asProject({
        id: 7,
        title: 'DSS Universe',
        excerpt: 'A modular developer platform.',
        cardTagline: 'Build. Ship. Evolve.',
        stage: 'development',
        progress: 82.4,
        publishedAt: '2026-07-01T12:00:00.000Z',
        featuredImage: asMedia({
          id: 20,
          alt: 'DSS Universe dashboard',
          url: '/api/media/file/dss-dashboard.webp',
        }),
        coverImage: asMedia({
          id: 21,
          alt: 'Fallback cover',
          url: '/api/media/file/dss-cover.webp',
        }),
        techStack: [next, 101, next, hidden, node],
        links: [
          {
            id: 'github-link',
            label: 'GitHub',
            type: 'github',
            url: 'https://github.com/clearfixx/dss-universe',
            isEnabled: true,
          },
          {
            id: 'disabled-live-link',
            label: 'Live preview',
            type: 'live',
            url: 'https://example.com/disabled',
            isEnabled: false,
          },
          {
            id: 'live-link',
            label: 'Open live product',
            type: 'live',
            url: 'https://example.com/dss',
            isEnabled: true,
          },
        ],
      }),
    ])

    expect(result).toEqual([
      {
        accent: 'cyan',
        excerpt: 'A modular developer platform.',
        href: 'https://example.com/dss',
        id: '7',
        image: {
          alt: 'DSS Universe dashboard',
          src: '/api/media/file/dss-dashboard.webp',
        },
        linkLabel: 'Open live product',
        previewLabel: 'Build. Ship. Evolve.',
        progress: 82,
        stack: ['Next.js', 'Node.js'],
        stage: 'In Development',
        status: 'Active mission',
        title: 'DSS Universe',
      },
    ])
  })

  it('uses truthful disabled CTA and safe visual defaults when optional project content is absent', () => {
    const result = buildFeaturedProjectViewModels([
      asProject({
        id: 8,
        title: 'Concept',
        excerpt: 'Early product exploration.',
        cardTagline: null,
        stage: 'idea',
        progress: 140,
        publishedAt: '2026-07-01T12:00:00.000Z',
        featuredImage: null,
        coverImage: null,
        techStack: [],
        links: [
          {
            id: 'empty-link',
            label: 'Explore',
            type: 'other',
            url: null,
            isEnabled: true,
          },
        ],
      }),
      asProject({
        id: 9,
        title: 'Released',
        excerpt: 'A released project.',
        stage: 'released',
        progress: -5,
        publishedAt: '2026-07-01T12:00:00.000Z',
        techStack: [],
        links: [],
      }),
    ])

    expect(result[0]).toMatchObject({
      accent: 'cyan',
      linkLabel: 'Coming soon',
      previewLabel: 'Concept',
      progress: 100,
      stage: 'Idea',
      status: 'Concept',
    })
    expect(result[0]).not.toHaveProperty('href')

    expect(result[1]).toMatchObject({
      accent: 'violet',
      progress: 0,
      stage: 'Released',
      status: 'Live product',
    })
  })
})
