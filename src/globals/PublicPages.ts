import type { GlobalConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

export const PUBLIC_PAGES_DEFAULT_CONTENT = {
  blog: {
    seo: {
      metaTitle: 'Engineering Journal',
      metaDescription:
        'Architecture notes, implementation details, system design decisions, and lessons learned while building production software.',
      canonical: '/blog',
    },
    index: {
      postsPerPage: 6,
      breadcrumbLabel: 'Blog',
      eyebrow: 'Engineering journal',
      title: 'Engineering Journal.',
      titleAccent: 'Build. Document. Share.',
      description:
        'Real architecture, production notes, implementation details, and lessons learned from building complex systems.',
      featuredLabel: 'Featured article',
      articlesEyebrow: 'Latest articles',
      articlesTitle: 'Notes from the build process.',
    },
    article: {
      breadcrumbLabel: 'Blog',
      fallbackCategory: 'Uncategorized',
      fallbackSeries: 'Independent note',
      ctaEyebrow: 'Enjoying the read?',
      ctaDescription: 'Get new architecture notes and implementation lessons.',
      ctaLabel: "Let's talk",
      ctaHref: '/contacts',
      overviewLabel: 'Overview',
      engineeringNoteLabel: 'Engineering note',
      engineeringNote:
        'The strongest architecture decisions are the ones that remain understandable after the implementation grows.',
      fallbackCoverTitle: 'Engineering system map',
    },
  },
  projects: {
    seo: {
      metaTitle: 'Projects',
      metaDescription: 'Selected software products, experiments, and engineering case studies.',
      canonical: '/projects',
    },
    index: {
      breadcrumbLabel: 'Projects',
      eyebrow: 'Project registry',
      title: 'All',
      titleAccent: 'Projects',
      description:
        "A collection of systems I've designed, built, and shipped. From idea to production.",
      totalProjectsLabel: 'Total projects',
      totalProjectsHint: 'and counting',
      openSourceLabel: 'Open source',
      openSourceHint: 'projects',
      yearsBuildingLabel: 'Years building',
      yearsBuildingHint: 'of experience',
      codeCommitmentsLabel: 'Code commitments',
      codeCommitmentsHint: 'across all projects',
    },
    cta: {
      terminalLabel: 'TERMINAL',
      terminalCommand: 'visitor@portfolio:~$ whoami',
      terminalPrompt: 'visitor@portfolio:~$',
      identityLines: [
        { text: 'Software engineer' },
        { text: 'System builder' },
        { text: 'Problem solver' },
        { text: 'Lifelong learner' },
      ],
      eyebrow: 'Have an idea?',
      title: "Let's build something amazing together.",
    },
  },
} as const

export const PublicPages: GlobalConfig = {
  slug: 'public-pages',
  label: 'Public Pages',
  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },
  admin: {
    group: 'Content',
    description:
      'Editorial settings for public index pages and shared article presentation content.',
  },
  fields: [
    {
      name: 'blog',
      type: 'group',
      label: 'Blog',
      fields: [
        {
          name: 'seo',
          type: 'group',
          label: 'Index SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.seo.metaTitle,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.seo.metaDescription,
            },
            {
              name: 'canonical',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.seo.canonical,
            },
          ],
        },
        {
          name: 'index',
          type: 'group',
          label: 'Index Page',
          fields: [
            {
              name: 'postsPerPage',
              type: 'number',
              required: true,
              min: 3,
              max: 24,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.postsPerPage,
              admin: {
                description: 'Number of article cards shown on each blog index page.',
              },
            },
            {
              name: 'breadcrumbLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.breadcrumbLabel,
            },
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.eyebrow,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.title,
            },
            {
              name: 'titleAccent',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.titleAccent,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.description,
            },
            {
              name: 'featuredLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.featuredLabel,
            },
            {
              name: 'articlesEyebrow',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.articlesEyebrow,
            },
            {
              name: 'articlesTitle',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.index.articlesTitle,
            },
          ],
        },
        {
          name: 'article',
          type: 'group',
          label: 'Article Presentation',
          fields: [
            {
              name: 'breadcrumbLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.breadcrumbLabel,
            },
            {
              name: 'fallbackCategory',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.fallbackCategory,
            },
            {
              name: 'fallbackSeries',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.fallbackSeries,
            },
            {
              name: 'ctaEyebrow',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.ctaEyebrow,
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.ctaDescription,
            },
            {
              name: 'ctaLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.ctaLabel,
            },
            {
              name: 'ctaHref',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.ctaHref,
            },
            {
              name: 'overviewLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.overviewLabel,
            },
            {
              name: 'engineeringNoteLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.engineeringNoteLabel,
            },
            {
              name: 'engineeringNote',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.engineeringNote,
            },
            {
              name: 'fallbackCoverTitle',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.blog.article.fallbackCoverTitle,
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'group',
      label: 'Projects',
      fields: [
        {
          name: 'seo',
          type: 'group',
          label: 'Index SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.seo.metaTitle,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.seo.metaDescription,
            },
            {
              name: 'canonical',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.seo.canonical,
            },
          ],
        },
        {
          name: 'index',
          type: 'group',
          label: 'Index Page',
          fields: [
            {
              name: 'breadcrumbLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.breadcrumbLabel,
            },
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.eyebrow,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.title,
            },
            {
              name: 'titleAccent',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.titleAccent,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.description,
            },
            {
              name: 'totalProjectsLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.totalProjectsLabel,
            },
            {
              name: 'totalProjectsHint',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.totalProjectsHint,
            },
            {
              name: 'openSourceLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.openSourceLabel,
            },
            {
              name: 'openSourceHint',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.openSourceHint,
            },
            {
              name: 'yearsBuildingLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.yearsBuildingLabel,
            },
            {
              name: 'yearsBuildingHint',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.yearsBuildingHint,
            },
            {
              name: 'codeCommitmentsLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.codeCommitmentsLabel,
            },
            {
              name: 'codeCommitmentsHint',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.index.codeCommitmentsHint,
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA',
          fields: [
            {
              name: 'terminalLabel',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.terminalLabel,
            },
            {
              name: 'terminalCommand',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.terminalCommand,
            },
            {
              name: 'terminalPrompt',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.terminalPrompt,
            },
            {
              name: 'identityLines',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.identityLines,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.eyebrow,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: PUBLIC_PAGES_DEFAULT_CONTENT.projects.cta.title,
            },
          ],
        },
      ],
    },
  ],
}
