import 'dotenv/config'

import config from '../src/payload.config'
import type { Project } from '../src/payload-types'
import { getPayload } from 'payload'

const SEED_PREFIX = 'pagination-demo-'
const PROJECT_COUNT = 24

const projectNames = [
  'Nebula Commerce',
  'Atlas Operations',
  'Pulse Analytics',
  'Orbit Knowledge',
  'Nova Workspace',
  'Vertex Commerce',
  'Signal Observatory',
  'Helix Documentation',
  'Vector Control',
  'Lumen Studio',
  'Quantum Dashboard',
  'Relay Infrastructure',
  'Polaris Community',
  'Flux Automation',
  'Prism Identity',
  'Horizon Learning',
  'Beacon Monitoring',
  'Nexus Collaboration',
  'Cipher Security',
  'Astra Deployment',
  'Matrix Content',
  'Echo Messaging',
  'Coreline Platform',
  'Zenith Insights',
] as const

const excerpts = [
  'A modular operational workspace for teams that need clear workflows, measurable progress, and reliable delivery.',
  'A focused product system combining structured content, live metrics, automation, and extensible integrations.',
  'An engineering-led platform designed around maintainability, performance, and a calm administrative experience.',
  'A scalable digital product that turns fragmented tools and data into one coherent working environment.',
] as const

const stages: Project['stage'][] = [
  'development',
  'testing',
  'released',
  'maintenance',
  'planning',
  'idea',
]

function createFallbackDescription(title: string) {
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
              text: `${title} is a temporary pagination test project created for the public project registry.`,
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
  } satisfies NonNullable<Project['description']>
}

function getRelationIds<T extends string | number>(
  value: null | undefined | T | Array<T | { id: T }> | { id: T },
): T[] {
  if (!value) {
    return []
  }

  const values = Array.isArray(value) ? value : [value]

  return values.map((item) => (typeof item === 'object' && item !== null ? item.id : item))
}

async function findSourceProject() {
  const payload = await getPayload({ config })

  const preferred = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 1,
    where: {
      slug: {
        equals: 'dss-universe',
      },
    },
  })

  if (preferred.docs[0]) {
    return {
      payload,
      source: preferred.docs[0],
    }
  }

  const fallback = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 1,
    sort: '-publishedAt',
  })

  return {
    payload,
    source: fallback.docs[0],
  }
}

async function cleanup() {
  const payload = await getPayload({ config })
  let removed = 0

  while (true) {
    const result = await payload.find({
      collection: 'projects',
      depth: 0,
      limit: 100,
      where: {
        slug: {
          like: SEED_PREFIX,
        },
      },
    })

    const demoProjects = result.docs.filter((project) => project.slug.startsWith(SEED_PREFIX))

    if (demoProjects.length === 0) {
      break
    }

    for (const project of demoProjects) {
      await payload.delete({
        collection: 'projects',
        id: project.id,
      })

      removed += 1
      console.log(`Deleted ${project.slug}`)
    }
  }

  console.log(
    removed === 0
      ? 'No pagination demo projects were found.'
      : `Removed ${removed} pagination demo projects.`,
  )
}

async function seed() {
  const { payload, source } = await findSourceProject()

  const sourceCategory = getRelationIds(source?.category)[0]
  const sourceTechStack = getRelationIds(source?.techStack)
  const description = source?.description ?? createFallbackDescription('Pagination Demo Project')

  let created = 0
  let skipped = 0

  for (let index = 0; index < PROJECT_COUNT; index += 1) {
    const number = index + 1
    const slug = `${SEED_PREFIX}${String(number).padStart(2, '0')}`
    const existing = await payload.find({
      collection: 'projects',
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

    const title = projectNames[index]
    const stage = stages[index % stages.length]
    const progress =
      stage === 'released'
        ? 100
        : stage === 'maintenance'
          ? 92
          : stage === 'testing'
            ? 78
            : stage === 'development'
              ? 38 + ((index * 7) % 34)
              : stage === 'planning'
                ? 18
                : 6

    const publishedAt = new Date(Date.UTC(2024, 11 - (index % 12), 25 - (index % 20), 12, 0, 0))
    const startedAt = new Date(Date.UTC(2023, index % 12, 1 + (index % 20), 12, 0, 0))

    const selectedTechStack =
      sourceTechStack.length > 0
        ? sourceTechStack.slice(0, Math.max(2, 3 + (index % Math.min(5, sourceTechStack.length))))
        : []

    await payload.create({
      collection: 'projects',
      data: {
        title,
        slug,
        excerpt: excerpts[index % excerpts.length],
        cardTagline: `Pagination test project ${number} of ${PROJECT_COUNT}.`,
        description,
        category: sourceCategory,
        techStack: selectedTechStack,
        stage,
        progress,
        currentVersion: `0.${(index % 9) + 1}.${index % 4}`,
        isFeatured: index === 5 || index === 14,
        publishedAt: publishedAt.toISOString(),
        startedAt: startedAt.toISOString(),
        releasedAt:
          stage === 'released' || stage === 'maintenance' ? publishedAt.toISOString() : undefined,
        links:
          index % 4 === 0
            ? [
                {
                  isEnabled: true,
                  label: 'GitHub',
                  type: 'github',
                  url: 'https://github.com/clearfixx',
                },
              ]
            : [],
      },
    })

    created += 1
    console.log(`Created ${slug}: ${title}`)
  }

  const total = await payload.count({
    collection: 'projects',
  })

  console.log('')
  console.log(`Created: ${created}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Total projects in database: ${total.totalDocs}`)
  console.log(
    'Pagination demo is ready. Open /projects and test filters, sorting, and page navigation.',
  )
  console.log('Cleanup command: pnpm exec tsx scripts/seed-project-pagination.ts --cleanup')
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
    console.error('Pagination project seed failed.')

    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(error)
    }

    process.exit(1)
  })
