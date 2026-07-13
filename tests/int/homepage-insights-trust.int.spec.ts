import { describe, expect, it } from 'vitest'

import type { BlogPost, Homepage, Profile, Testimonial } from '@/payload-types'
import { buildInsightsTrustViewModel } from '@/lib/cms/homepage'

const NOW = new Date('2026-06-01T12:00:00.000Z')

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asProfile(value: Partial<Profile>): Profile {
  return value as Profile
}

function asArticle(value: Partial<BlogPost>): BlogPost {
  return value as BlogPost
}

function asTestimonial(value: Partial<Testimonial>): Testimonial {
  return value as Testimonial
}

function lexicalContent(words: string): BlogPost['content'] {
  return {
    root: {
      children: [
        {
          children: [
            {
              text: words,
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'root',
    },
  } as BlogPost['content']
}

describe('homepage insights and trust content', () => {
  it('maps selected published articles and approved testimonials', () => {
    const featured = asArticle({
      id: 1,
      title: 'Featured article',
      slug: 'featured-article',
      excerpt: 'Featured excerpt.',
      content: lexicalContent(Array.from({ length: 221 }, () => 'word').join(' ')),
      status: 'published',
      publishedAt: '2026-05-10T09:00:00.000Z',
      category: {
        id: 10,
        title: 'Architecture',
      },
      coverImage: {
        id: 11,
        alt: 'Architecture diagram',
        url: '/media/article.webp',
      },
    })
    const compact = asArticle({
      id: 2,
      title: 'Compact article',
      slug: 'compact-article',
      excerpt: 'Compact excerpt.',
      content: lexicalContent('A small article body.'),
      status: 'published',
      publishedAt: '2026-05-01T09:00:00.000Z',
      relatedProject: {
        id: 20,
        title: 'DSS Universe',
      },
    })
    const draft = asArticle({
      id: 3,
      title: 'Draft',
      slug: 'draft',
      excerpt: 'Draft.',
      content: lexicalContent('Draft.'),
      status: 'draft',
      publishedAt: '2026-05-20T09:00:00.000Z',
    })
    const approved = asTestimonial({
      id: 30,
      name: 'Jane Client',
      role: 'Founder',
      company: 'Studio',
      message: 'Excellent delivery.',
      status: 'approved',
      approvedAt: '2026-05-15T09:00:00.000Z',
    })
    const pending = asTestimonial({
      id: 31,
      name: 'Pending Client',
      message: 'Not public.',
      status: 'pending',
      approvedAt: '2026-05-16T09:00:00.000Z',
    })

    const result = buildInsightsTrustViewModel({
      articles: [draft, compact],
      homepage: asHomepage({
        insightsTrustSection: {
          enabled: true,
          title: 'Latest Articles & Client Feedback',
          titleAccent: 'Articles',
          titleMuted: 'Feedback',
          articleLinksEnabled: true,
          articlesCtaEnabled: true,
          articlesCtaLabel: 'All notes',
          articlesCtaUrl: '/articles',
          featuredArticle: featured,
          selectedArticles: [compact, draft],
          selectedTestimonials: [approved, pending],
        },
      }),
      now: NOW,
      profile: asProfile({
        careerStartedAt: '2020-01-01T00:00:00.000Z',
        metrics: [
          {
            key: 'commits',
            label: 'Commits pushed',
            value: 6241,
            suffix: '+',
            enabled: true,
          },
        ],
      }),
      projectsCount: 9,
      testimonials: [pending],
    })

    expect(result?.articles.featured).toMatchObject({
      category: 'Architecture',
      href: '/articles/featured-article',
      icon: 'terminal',
      image: {
        alt: 'Architecture diagram',
        src: '/media/article.webp',
      },
      label: 'Featured',
      readTime: '2 min read',
      title: 'Featured article',
    })
    expect(result?.articles.items).toEqual([
      expect.objectContaining({
        href: '/articles/compact-article',
        icon: 'cube',
        title: 'Compact article',
      }),
    ])
    expect(result?.articles.cta).toEqual({
      href: '/articles',
      label: 'All notes',
    })
    expect(result?.feedback.items).toEqual([
      expect.objectContaining({
        author: 'Jane Client',
        initials: 'JC',
        quote: 'Excellent delivery.',
        role: 'Founder · Studio',
        verified: true,
      }),
    ])
    expect(result?.metrics.items).toEqual([
      {
        icon: 'code',
        id: 'projects',
        label: 'Projects completed',
        value: '9+',
      },
      {
        icon: 'calendar',
        id: 'experience',
        label: 'Years of experience',
        value: '6+',
      },
      {
        icon: 'commit',
        id: 'commits',
        label: 'Commits pushed',
        value: '6,241+',
      },
    ])
  })

  it('uses published and approved fallbacks while keeping placeholder links disabled', () => {
    const article = asArticle({
      id: 1,
      title: 'Fallback article',
      slug: 'fallback',
      excerpt: 'Fallback excerpt.',
      content: lexicalContent('Fallback body.'),
      status: 'published',
      publishedAt: '2026-05-01T09:00:00.000Z',
    })
    const future = asArticle({
      id: 2,
      title: 'Future article',
      slug: 'future',
      excerpt: 'Future excerpt.',
      content: lexicalContent('Future body.'),
      status: 'published',
      publishedAt: '2027-01-01T09:00:00.000Z',
    })
    const approved = asTestimonial({
      id: 3,
      name: 'Client',
      message: 'Approved feedback.',
      status: 'approved',
      approvedAt: '2026-05-01T09:00:00.000Z',
    })

    const result = buildInsightsTrustViewModel({
      articles: [future, article],
      homepage: asHomepage({
        insightsTrustSection: {},
      }),
      now: NOW,
      profile: asProfile({
        metrics: [],
      }),
      projectsCount: 0,
      testimonials: [approved],
    })

    expect(result?.articles.featured).toMatchObject({
      href: undefined,
      title: 'Fallback article',
    })
    expect(result?.articles.cta).toBeUndefined()
    expect(result?.feedback.items).toHaveLength(1)
    expect(result?.title).toEqual([
      { text: 'Latest ', tone: 'plain' },
      { text: 'Articles', tone: 'accent' },
      { text: ' & Client ', tone: 'plain' },
      { text: 'Feedback', tone: 'muted' },
    ])
  })

  it('returns null when the section is disabled', () => {
    const result = buildInsightsTrustViewModel({
      articles: [],
      homepage: asHomepage({
        insightsTrustSection: {
          enabled: false,
        },
      }),
      now: NOW,
      profile: asProfile({}),
      projectsCount: 0,
      testimonials: [],
    })

    expect(result).toBeNull()
  })
})
