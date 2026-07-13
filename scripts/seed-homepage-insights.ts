import process from 'node:process'

import type { BlogPost, Homepage, Testimonial } from '../src/payload-types'

type RelationshipId = BlogPost['id']

const ARTICLE_SEEDS = [
  {
    excerpt:
      'How I structure design systems and component architecture for scalable and consistent frontend development.',
    publishedAt: '2026-05-08T09:00:00.000Z',
    slug: 'building-maintainable-ui-systems',
    title: 'Building Maintainable UI Systems',
  },
  {
    excerpt:
      'Breaking down how a system approach makes portfolio websites more scalable and easier to maintain.',
    publishedAt: '2026-04-26T09:00:00.000Z',
    slug: 'portfolio-sections-system-thinking',
    title: 'Why Portfolio Sections Need System Thinking',
  },
  {
    excerpt:
      'Key takeaways from building a complex platform for decision support systems and engineering workflows.',
    publishedAt: '2026-04-12T09:00:00.000Z',
    slug: 'building-dss-universe',
    title: 'Lessons from Building DSS Universe',
  },
] as const

const TESTIMONIAL_SEEDS = [
  {
    approvedAt: '2026-05-10T09:00:00.000Z',
    company: 'Confidential',
    marker: 'portfolio-seed:architecture-feedback',
    message:
      'Andrii is not just a developer. He thinks like an architect and delivers solutions that scale.',
    name: 'Confidential Client',
    role: 'Product founder',
  },
  {
    approvedAt: '2026-05-09T09:00:00.000Z',
    company: 'Confidential',
    marker: 'portfolio-seed:delivery-feedback',
    message:
      'Professional, reliable and always one step ahead. The quality of his code and communication is outstanding.',
    name: 'Confidential Client',
    role: 'Project owner',
  },
] as const

function lexicalParagraph(text: string): BlogPost['content'] {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  } as BlogPost['content']
}

async function main() {
  process.loadEnvFile('.env')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing after loading .env')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })

  const articleIds = new Map<string, RelationshipId>()
  let createdArticles = 0

  for (const seed of ARTICLE_SEEDS) {
    const existing = await payload.find({
      collection: 'blog-posts',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: seed.slug,
        },
      },
    })
    const article = existing.docs[0] as BlogPost | undefined

    if (article) {
      articleIds.set(seed.slug, article.id)
      continue
    }

    const created = await payload.create({
      collection: 'blog-posts',
      data: {
        content: lexicalParagraph(seed.excerpt),
        excerpt: seed.excerpt,
        publishedAt: seed.publishedAt,
        slug: seed.slug,
        status: 'published',
        title: seed.title,
      },
    })

    articleIds.set(seed.slug, created.id)
    createdArticles += 1
  }

  const testimonialIds = new Map<string, RelationshipId>()
  let createdTestimonials = 0

  for (const seed of TESTIMONIAL_SEEDS) {
    const existing = await payload.find({
      collection: 'testimonials',
      depth: 0,
      limit: 1,
      where: {
        source: {
          equals: seed.marker,
        },
      },
    })
    const testimonial = existing.docs[0] as Testimonial | undefined

    if (testimonial) {
      testimonialIds.set(seed.marker, testimonial.id)
      continue
    }

    const created = await payload.create({
      collection: 'testimonials',
      data: {
        approvedAt: seed.approvedAt,
        company: seed.company,
        message: seed.message,
        name: seed.name,
        role: seed.role,
        source: seed.marker,
        status: 'approved',
      },
    })

    testimonialIds.set(seed.marker, created.id)
    createdTestimonials += 1
  }

  const requiredArticleId = (slug: string): RelationshipId => {
    const id = articleIds.get(slug)

    if (id === undefined) {
      throw new Error(`Missing seeded BlogPost ID for "${slug}".`)
    }

    return id
  }

  const requiredTestimonialId = (marker: string): RelationshipId => {
    const id = testimonialIds.get(marker)

    if (id === undefined) {
      throw new Error(`Missing seeded Testimonial ID for "${marker}".`)
    }

    return id
  }

  const homepage = (await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
  })) as Homepage

  const current = homepage.insightsTrustSection

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      insightsTrustSection: {
        articlesCtaEnabled: current?.articlesCtaEnabled ?? false,
        articlesCtaLabel: current?.articlesCtaLabel ?? 'View all articles',
        articlesCtaUrl: current?.articlesCtaUrl ?? '/articles',
        articlesTitle: current?.articlesTitle ?? 'Latest Articles',
        articleLinksEnabled: current?.articleLinksEnabled ?? false,
        description:
          current?.description ??
          'Build notes, engineering thoughts and client feedback collected from real project work.',
        enabled: current?.enabled ?? true,
        eyebrow: current?.eyebrow ?? 'INSIGHTS & TRUST',
        featuredArticle: requiredArticleId('building-maintainable-ui-systems'),
        featuredLabel: current?.featuredLabel ?? 'Featured',
        feedbackTitle: current?.feedbackTitle ?? 'Client Feedback',
        footerLabel: current?.footerLabel ?? 'Real projects. Real feedback. Real impact.',
        footerText: current?.footerText ?? 'Built with passion. Delivered with precision.',
        selectedArticles: [
          requiredArticleId('portfolio-sections-system-thinking'),
          requiredArticleId('building-dss-universe'),
        ],
        selectedTestimonials: TESTIMONIAL_SEEDS.map((seed) => requiredTestimonialId(seed.marker)),
        title: current?.title ?? 'Latest Articles & Client Feedback',
        titleAccent: current?.titleAccent ?? 'Articles',
        titleMuted: current?.titleMuted ?? 'Feedback',
        trustTitle: current?.trustTitle ?? 'Trust Signals',
      },
    },
  })

  console.log(
    `Insights seed ready: ${createdArticles} articles and ${createdTestimonials} testimonials created.`,
  )
  console.log('Homepage Insights & Trust relationships are configured.')
  console.log('Article links remain disabled until real article pages are implemented.')
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
