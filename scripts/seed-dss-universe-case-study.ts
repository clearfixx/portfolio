import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const payload = await getPayload({ config })

const result = await payload.find({
  collection: 'projects',
  limit: 1,
  where: {
    slug: {
      equals: 'dss-universe',
    },
  },
})

const project = result.docs[0]

if (!project) {
  throw new Error('DSS Universe project was not found.')
}

await payload.update({
  collection: 'projects',
  id: project.id,
  data: {
    startedAt: project.startedAt ?? '2024-01-15T00:00:00.000Z',
    github: {
      ...project.github,
      owner: project.github?.owner || 'clearfixx',
      repo: project.github?.repo || 'dss-universe',
      url: project.github?.url || 'https://github.com/clearfixx/dss-universe',
      showStats: project.github?.showStats ?? true,
    },
    caseStudyCode: {
      filePath: 'apps/api/src/main.ts',
      language: 'typescript',
      code: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3001)
}

bootstrap()`,
    },
    highlights:
      project.highlights && project.highlights.length > 0
        ? project.highlights
        : [
            {
              title: 'Community Hub',
              icon: 'community',
              description:
                'A modular community space with discussions, profiles, permissions, and real-time interaction.',
            },
            {
              title: 'Research Lab',
              icon: 'research',
              description:
                'Structured research, knowledge sharing, experiments, and long-form technical material.',
            },
            {
              title: 'AI Core',
              icon: 'ai',
              description:
                'A shared intelligence layer for search, recommendations, summarization, and assistance.',
            },
            {
              title: 'Media Platform',
              icon: 'media',
              description:
                'Reusable media infrastructure for uploads, metadata, ownership, and delivery workflows.',
            },
            {
              title: 'Identity and Access',
              icon: 'security',
              description:
                'Role- and permission-based access control with secure sessions and extensible policies.',
            },
            {
              title: 'Modular Architecture',
              icon: 'modules',
              description:
                'Independent modules built around stable contracts so the platform can evolve safely.',
            },
          ],
    caseStudyMetrics: [
      {
        label: 'Applications',
        value: '2',
        detail: 'Next.js web and NestJS API',
      },
      {
        label: 'Core packages',
        value: '4',
        detail: 'UI, types, ESLint, TypeScript',
      },
      {
        label: 'IAM permissions',
        value: '13',
        detail: 'Seeded platform permissions',
      },
      {
        label: 'Current phase',
        value: '2.6.7',
        detail: 'Avatar and media integration',
      },
    ],
    architecture: [
      {
        title: 'Frontend',
        icon: 'frontend',
        description: 'Public application and product experience.',
        items: [{ label: 'Next.js App Router' }, { label: 'React' }, { label: 'TypeScript' }],
      },
      {
        title: 'API Gateway',
        icon: 'api',
        description: 'Application entry point and transport boundary.',
        items: [{ label: 'NestJS' }, { label: 'REST API' }, { label: 'Swagger' }],
      },
      {
        title: 'Services',
        icon: 'services',
        description: 'Independent platform modules and domain logic.',
        items: [
          { label: 'Authentication' },
          { label: 'Users' },
          { label: 'Media' },
          { label: 'Permissions' },
        ],
      },
      {
        title: 'Database',
        icon: 'database',
        description: 'Persistent state, cache, and local infrastructure.',
        items: [
          { label: 'PostgreSQL' },
          { label: 'Prisma' },
          { label: 'Redis' },
          { label: 'Docker' },
        ],
      },
    ],
    roadmap: [
      {
        version: '2.6.6',
        title: 'Authentication Architecture Refactoring',
        status: 'completed',
        timeframe: 'Completed',
        description:
          'Separated authentication domain, application, and infrastructure responsibilities.',
      },
      {
        version: '2.6.7',
        title: 'Avatar and Media Integration',
        status: 'current',
        timeframe: 'Current',
        description:
          'Connect user avatars to the first-class Media platform and profile workflows.',
      },
      {
        version: '2.6.8',
        title: 'Search',
        status: 'planned',
        timeframe: 'Next',
        description: 'Introduce reusable search foundations for platform modules.',
      },
      {
        version: '2.6.9',
        title: 'Pagination',
        status: 'planned',
        timeframe: 'Planned',
        description: 'Standardize pagination contracts across API and web application surfaces.',
      },
    ],
  },
})

const releases = [
  {
    version: '0.2.6.6',
    title: 'Authentication architecture refactoring',
    releaseDate: '2026-07-02T00:00:00.000Z',
    summary:
      'Separated authentication responsibilities and completed the module and core auth documentation.',
    isCurrent: false,
    isStable: true,
  },
  {
    version: '0.2.6.7',
    title: 'Avatar and media integration',
    releaseDate: '2026-07-19T00:00:00.000Z',
    summary:
      'Connected the avatar workflow to the first-class Media platform and profile architecture.',
    isCurrent: true,
    isStable: false,
  },
]

for (const release of releases) {
  const existing = await payload.find({
    collection: 'project-versions',
    limit: 1,
    where: {
      and: [
        {
          project: {
            equals: project.id,
          },
        },
        {
          version: {
            equals: release.version,
          },
        },
      ],
    },
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'project-versions',
      id: existing.docs[0].id,
      data: {
        project: project.id,
        ...release,
      },
    })
  } else {
    await payload.create({
      collection: 'project-versions',
      data: {
        project: project.id,
        ...release,
      },
    })
  }
}

console.log('DSS Universe exact mockup content updated.')
process.exit(0)
