import 'dotenv/config'

import config from '../src/payload.config'
import type { BlogPost, Category } from '../src/payload-types'
import { getPayload } from 'payload'

const ARTICLE_PREFIX = 'journal-demo-'
const CATEGORY_PREFIX = 'journal-topic-'
const ARTICLE_COUNT = 24

const topics = [
  {
    title: 'Architecture',
    description: 'System structure, boundaries, contracts, and long-term maintainability.',
  },
  {
    title: 'Implementation',
    description: 'Concrete implementation techniques and production engineering decisions.',
  },
  {
    title: 'System Design',
    description: 'Scalable product systems, workflows, and service composition.',
  },
  {
    title: 'Performance',
    description: 'Runtime performance, rendering, caching, and delivery optimization.',
  },
  {
    title: 'Developer Experience',
    description: 'Tooling, workflows, automation, and engineering ergonomics.',
  },
  {
    title: 'Infrastructure',
    description: 'Deployment, containers, queues, observability, and platform foundations.',
  },
  {
    title: 'Tools & Libraries',
    description: 'Frameworks, libraries, and reusable engineering systems.',
  },
  {
    title: 'UI / UX',
    description: 'Interface systems, accessibility, interaction design, and editorial UX.',
  },
] as const

const series = [
  'DSS Universe Development',
  'Payload CMS Mastery',
  'System Design Patterns',
  'Performance Engineering',
] as const

const articles = [
  'Payload CMS Customization Best Practices',
  'Designing Scalable Authorization Systems',
  'Next.js Performance Optimization Guide',
  'Building Maintainable UI Systems',
  'DSS Universe: System Architecture',
  'Developer Experience: Small Details, Big Impact',
  'Docker Compose for Local Development',
  'Practical Redis Caching Strategies',
  'Designing Reliable Background Jobs',
  'Building an Editorial Workflow in Payload',
  'Type-Safe Data Access in Next.js',
  'From Monolith to Modular Platform',
  'Accessible Navigation Systems',
  'Server Components in Production',
  'PostgreSQL Schema Design Notes',
  'Observability for Small Product Teams',
  'Design Tokens Without a UI Framework',
  'Queue Architecture with BullMQ',
  'Reliable Social Feed Synchronization',
  'Designing Admin Interfaces for Real Work',
  'Caching Public Content Safely',
  'Project Architecture That Survives Growth',
  'Testing Critical Product Workflows',
  'Shipping a Portfolio as a Product',
] as const

const excerpts = [
  'A practical breakdown of the architectural decisions, trade-offs, and implementation details behind a production-ready system.',
  'Patterns for building maintainable software without turning the codebase into a collection of disconnected abstractions.',
  'A focused engineering note covering performance, reliability, and the details that become visible only after real usage.',
  'How product thinking, interface design, and backend architecture can support one coherent developer experience.',
] as const

const tagSets = [
  ['Next.js', 'TypeScript', 'Architecture'],
  ['Payload CMS', 'Admin UX', 'Editorial'],
  ['NestJS', 'PostgreSQL', 'Authorization'],
  ['Redis', 'BullMQ', 'Infrastructure'],
  ['Performance', 'Core Web Vitals', 'Caching'],
  ['UI/UX', 'Accessibility', 'Design Systems'],
  ['Docker', 'DevOps', 'Local Development'],
  ['Testing', 'Vitest', 'Playwright'],
] as const

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createRichText(title: string, excerpt: string) {
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
              text: title,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          type: 'heading',
          tag: 'h2',
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: excerpt,
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
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This demo article exists to validate the full Engineering Journal experience: taxonomy, series, search, pagination, metadata, archive navigation, and editorial card composition.',
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
  } satisfies NonNullable<BlogPost['content']>
}

async function ensureCategories() {
  const payload = await getPayload({ config })
  const categories: Category[] = []

  for (let index = 0; index < topics.length; index += 1) {
    const topic = topics[index]
    const slug = `${CATEGORY_PREFIX}${slugify(topic.title)}`
    const existing = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (existing.docs[0]) {
      categories.push(existing.docs[0])
      continue
    }

    const category = await payload.create({
      collection: 'categories',
      data: {
        title: topic.title,
        slug,
        description: topic.description,
        type: 'blog',
        sortOrder: index,
      },
    })

    categories.push(category)
    console.log(`Created category ${slug}`)
  }

  return {
    categories,
    payload,
  }
}

async function getProjects(payload: Awaited<ReturnType<typeof getPayload>>) {
  const result = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 12,
    sort: '-publishedAt',
  })

  return result.docs
}

async function cleanup() {
  const payload = await getPayload({ config })
  let removedArticles = 0
  let removedCategories = 0

  while (true) {
    const result = await payload.find({
      collection: 'blog-posts',
      depth: 0,
      limit: 100,
      where: {
        slug: {
          like: ARTICLE_PREFIX,
        },
      },
    })

    const demoArticles = result.docs.filter((article) => article.slug.startsWith(ARTICLE_PREFIX))

    if (demoArticles.length === 0) {
      break
    }

    for (const article of demoArticles) {
      await payload.delete({
        collection: 'blog-posts',
        id: article.id,
      })
      removedArticles += 1
      console.log(`Deleted ${article.slug}`)
    }
  }

  while (true) {
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      where: {
        slug: {
          like: CATEGORY_PREFIX,
        },
      },
    })

    const demoCategories = result.docs.filter((category) =>
      category.slug.startsWith(CATEGORY_PREFIX),
    )

    if (demoCategories.length === 0) {
      break
    }

    for (const category of demoCategories) {
      await payload.delete({
        collection: 'categories',
        id: category.id,
      })
      removedCategories += 1
      console.log(`Deleted ${category.slug}`)
    }
  }

  console.log(`Removed ${removedArticles} demo articles.`)
  console.log(`Removed ${removedCategories} demo categories.`)
}

async function seed() {
  const { categories, payload } = await ensureCategories()
  const projects = await getProjects(payload)

  let created = 0
  let skipped = 0

  for (let index = 0; index < ARTICLE_COUNT; index += 1) {
    const title = articles[index]
    const slug = `${ARTICLE_PREFIX}${String(index + 1).padStart(2, '0')}-${slugify(title)}`
    const existing = await payload.find({
      collection: 'blog-posts',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (existing.docs.length > 0) {
      skipped += 1
      console.log(`Skipped existing ${slug}`)
      continue
    }

    const excerpt = excerpts[index % excerpts.length]
    const publishedAt = new Date(
      Date.UTC(2026 - Math.floor(index / 10), 4 - (index % 5), 6 - (index % 5), 10, 0, 0),
    )
    const category = categories[index % categories.length]
    const relatedProject = projects.length > 0 ? projects[index % projects.length] : null
    const selectedTags = tagSets[index % tagSets.length]

    await payload.create({
      collection: 'blog-posts',
      data: {
        title,
        slug,
        excerpt,
        content: createRichText(title, excerpt),
        category: category.id,
        tags: selectedTags.map((label) => ({
          label,
          slug: slugify(label),
        })),
        relatedProject: relatedProject?.id,
        series: series[index % series.length],
        difficulty: index % 5 === 0 ? 'advanced' : index % 3 === 0 ? 'foundation' : 'intermediate',
        isFeatured: index < 4,
        readingTime: 7 + ((index * 3) % 14),
        views: 420 + index * 137,
        status: 'published',
        publishedAt: publishedAt.toISOString(),
      },
    })

    created += 1
    console.log(`Created ${slug}`)
  }

  const total = await payload.count({
    collection: 'blog-posts',
  })

  console.log('')
  console.log(`Created: ${created}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Total blog posts in database: ${total.totalDocs}`)
  console.log('Engineering Journal demo content is ready.')
  console.log('Cleanup: pnpm exec tsx scripts/seed-blog-demo-content.ts --cleanup')
}

async function main() {
  if (process.argv.includes('--cleanup')) {
    await cleanup()
    return
  }

  await seed()
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('Engineering Journal demo seed failed.')

    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(error)
    }

    process.exit(1)
  })
