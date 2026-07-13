import process from 'node:process'

import type { Homepage, TechStack } from '../src/payload-types'

type SkillsSection = NonNullable<Homepage['skillsSection']>
type SkillCard = NonNullable<SkillsSection['cards']>[number]
type SkillCardKey = SkillCard['key']

type TechnologySeed = {
  color: string
  description: string
  documentationUrl: string
  featured: boolean
  name: string
  officialUrl: string
  slug: string
  sortOrder: number
}

const TECHNOLOGIES: TechnologySeed[] = [
  {
    name: 'Next.js',
    slug: 'nextjs',
    description: 'React framework for production web applications.',
    color: '#000000',
    officialUrl: 'https://nextjs.org',
    documentationUrl: 'https://nextjs.org/docs',
    featured: true,
    sortOrder: 10,
  },
  {
    name: 'React',
    slug: 'react',
    description: 'Library for building component-based user interfaces.',
    color: '#61DAFB',
    officialUrl: 'https://react.dev',
    documentationUrl: 'https://react.dev/learn',
    featured: true,
    sortOrder: 20,
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Strongly typed programming language built on JavaScript.',
    color: '#3178C6',
    officialUrl: 'https://www.typescriptlang.org',
    documentationUrl: 'https://www.typescriptlang.org/docs',
    featured: true,
    sortOrder: 30,
  },
  {
    name: 'SCSS',
    slug: 'scss',
    description: 'CSS preprocessor syntax provided by Sass.',
    color: '#CC6699',
    officialUrl: 'https://sass-lang.com',
    documentationUrl: 'https://sass-lang.com/documentation',
    featured: false,
    sortOrder: 40,
  },
  {
    name: 'Git',
    slug: 'git',
    description: 'Distributed version control system.',
    color: '#F05032',
    officialUrl: 'https://git-scm.com',
    documentationUrl: 'https://git-scm.com/doc',
    featured: false,
    sortOrder: 50,
  },
  {
    name: 'GitHub',
    slug: 'github',
    description: 'Collaborative source control and software delivery platform.',
    color: '#181717',
    officialUrl: 'https://github.com',
    documentationUrl: 'https://docs.github.com',
    featured: false,
    sortOrder: 60,
  },
  {
    name: 'VS Code',
    slug: 'vscode',
    description: 'Extensible source code editor used in the daily workflow.',
    color: '#007ACC',
    officialUrl: 'https://code.visualstudio.com',
    documentationUrl: 'https://code.visualstudio.com/docs',
    featured: false,
    sortOrder: 70,
  },
  {
    name: 'ESLint',
    slug: 'eslint',
    description: 'Static analysis and code-quality tooling for JavaScript.',
    color: '#4B32C3',
    officialUrl: 'https://eslint.org',
    documentationUrl: 'https://eslint.org/docs/latest',
    featured: false,
    sortOrder: 80,
  },
  {
    name: 'Prettier',
    slug: 'prettier',
    description: 'Opinionated source code formatter.',
    color: '#F7B93E',
    officialUrl: 'https://prettier.io',
    documentationUrl: 'https://prettier.io/docs',
    featured: false,
    sortOrder: 90,
  },
  {
    name: 'NestJS',
    slug: 'nestjs',
    description: 'Progressive Node.js framework for scalable server applications.',
    color: '#E0234E',
    officialUrl: 'https://nestjs.com',
    documentationUrl: 'https://docs.nestjs.com',
    featured: true,
    sortOrder: 100,
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    description: 'JavaScript runtime for server-side applications and tooling.',
    color: '#5FA04E',
    officialUrl: 'https://nodejs.org',
    documentationUrl: 'https://nodejs.org/docs/latest/api',
    featured: true,
    sortOrder: 110,
  },
  {
    name: 'Prisma',
    slug: 'prisma',
    description: 'Type-safe ORM and database toolkit.',
    color: '#2D3748',
    officialUrl: 'https://www.prisma.io',
    documentationUrl: 'https://www.prisma.io/docs',
    featured: true,
    sortOrder: 120,
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    description: 'Open-source relational database system.',
    color: '#4169E1',
    officialUrl: 'https://www.postgresql.org',
    documentationUrl: 'https://www.postgresql.org/docs',
    featured: true,
    sortOrder: 130,
  },
  {
    name: 'Docker',
    slug: 'docker',
    description: 'Container platform for repeatable application delivery.',
    color: '#2496ED',
    officialUrl: 'https://www.docker.com',
    documentationUrl: 'https://docs.docker.com',
    featured: true,
    sortOrder: 140,
  },
  {
    name: 'AWS',
    slug: 'aws',
    description: 'Cloud services for application infrastructure and delivery.',
    color: '#FF9900',
    officialUrl: 'https://aws.amazon.com',
    documentationUrl: 'https://docs.aws.amazon.com',
    featured: true,
    sortOrder: 150,
  },
  {
    name: 'CI/CD',
    slug: 'cicd',
    description: 'Automated integration, verification and deployment pipelines.',
    color: '#22C55E',
    officialUrl: 'https://github.com/features/actions',
    documentationUrl: 'https://docs.github.com/actions',
    featured: false,
    sortOrder: 160,
  },
  {
    name: 'Monitoring',
    slug: 'monitoring',
    description: 'Application telemetry, health checks and production observability.',
    color: '#06B6D4',
    officialUrl: 'https://opentelemetry.io',
    documentationUrl: 'https://opentelemetry.io/docs',
    featured: false,
    sortOrder: 170,
  },
]

const CARD_TECHNOLOGIES: Partial<Record<SkillCardKey, readonly string[]>> = {
  backend: ['nestjs', 'nodejs', 'prisma', 'postgresql'],
  devops: ['docker', 'aws', 'cicd', 'monitoring'],
  frontend: ['nextjs', 'react', 'typescript', 'scss'],
  workflow: ['git', 'github', 'vscode', 'eslint', 'prettier'],
}

const DEFAULT_SKILLS_SECTION: SkillsSection = {
  cards: [
    {
      key: 'frontend',
      title: 'Frontend',
      badge: 'Primary stack',
      description: 'Building fast, interactive and accessible user experiences.',
      technologies: [],
      pillsTitle: 'UI systems',
      pills: [
        { label: 'Responsive UI' },
        { label: 'Forms & Validation' },
        { label: 'Client State' },
      ],
      details: [
        {
          label: 'Projects',
          value: '12+',
          caption: 'used in',
        },
        {
          label: 'Focus areas',
          items: [{ label: 'UI / UX' }, { label: 'Performance' }, { label: 'Accessibility' }],
        },
        {
          label: 'Experience',
          value: '6+',
          caption: 'years',
        },
      ],
    },
    {
      key: 'workflow',
      title: 'Tools & Workflow',
      badge: 'Daily workflow',
      description: 'Streamlining development with efficient tools and smart workflows.',
      technologies: [],
      workflowTitle: 'Workflow',
      workflow: [
        { label: 'Plan', icon: 'plan' },
        { label: 'Code', icon: 'code' },
        { label: 'Commit', icon: 'commit' },
        { label: 'Review', icon: 'review' },
        { label: 'Deploy', icon: 'deploy' },
      ],
      focusLine: [{ label: 'Productivity' }, { label: 'Code quality' }, { label: 'Collaboration' }],
    },
    {
      key: 'backend',
      title: 'Backend',
      badge: 'Primary stack',
      description: 'Designing robust APIs and scalable backend systems.',
      technologies: [],
      pillsTitle: 'What I build',
      pills: [
        { label: 'RESTful APIs' },
        { label: 'GraphQL' },
        { label: 'Authentication' },
        { label: 'RBAC' },
      ],
      details: [
        {
          label: 'Experience',
          value: '5+',
          caption: 'years',
        },
        {
          label: 'API projects',
          value: '10+',
          caption: 'shipped',
        },
        {
          label: 'Databases',
          value: '15+',
          caption: 'designed',
        },
      ],
    },
    {
      key: 'devops',
      title: 'DevOps & Cloud',
      badge: 'Infrastructure',
      description: 'Automating, deploying and scaling applications with confidence.',
      technologies: [],
      pillsTitle: 'Cloud & infrastructure',
      pills: [
        { label: 'Containers' },
        { label: 'CI / CD' },
        { label: 'Infrastructure as Code' },
        { label: 'Monitoring' },
      ],
      details: [
        {
          label: 'Deployments',
          value: '50+',
          caption: 'automated',
        },
        {
          label: 'Uptime',
          value: '99.9%',
          caption: 'target',
        },
        {
          label: 'Environments',
          value: '6+',
          caption: 'managed',
        },
      ],
    },
    {
      key: 'architecture',
      title: 'Architectural Approach',
      badge: 'Principles',
      description:
        'I believe good architecture is about making the right things easy and the wrong things difficult.',
      principles: [
        {
          title: 'Clean Architecture',
          description: 'Separation of concerns and independence.',
          icon: 'layers',
        },
        {
          title: 'Modular Design',
          description: 'Reusable modules and composition.',
          icon: 'cube',
        },
        {
          title: 'Scalability',
          description: 'Built to grow and handle complexity.',
          icon: 'scale',
        },
        {
          title: 'Maintainability',
          description: 'Readable code today, easy to change tomorrow.',
          icon: 'wrench',
        },
        {
          title: 'Testability',
          description: 'Test early, test often, ship with confidence.',
          icon: 'flask',
        },
      ],
    },
    {
      key: 'focus',
      title: 'Current Focus',
      badge: 'Leveling up',
      description: 'Areas I am currently exploring and leveling up.',
      focusItems: [
        {
          title: 'AI Integration',
          description: 'Practical AI in developer tools.',
          icon: 'ai',
        },
        {
          title: 'System Design',
          description: 'Distributed systems and patterns.',
          icon: 'system',
        },
        {
          title: 'Automation',
          description: 'More automation, less repetitive work.',
          icon: 'automation',
        },
        {
          title: 'Edge & Performance',
          description: 'Edge computing and performance tuning.',
          icon: 'performance',
        },
      ],
    },
  ],
  description:
    'The technologies, tools and practices I use to design, build and ship scalable digital products.',
  eyebrow: 'Skills & Technologies',
  footerLabel: 'Technology is just a tool.',
  footerText: 'Problem solving is the craft.',
  title: 'My Engineering Toolkit',
}

function textOrFallback(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
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

  const existingResult = await payload.find({
    collection: 'tech-stack',
    depth: 0,
    limit: 100,
    pagination: false,
  })
  const existingBySlug = new Map(
    (existingResult.docs as TechStack[]).flatMap((technology) =>
      technology.slug ? [[technology.slug, technology] as const] : [],
    ),
  )

  const relationshipIds = new Map<string, TechStack['id']>()
  let createdCount = 0
  let repairedCount = 0

  for (const technology of TECHNOLOGIES) {
    const existing = existingBySlug.get(technology.slug)

    if (!existing) {
      const created = await payload.create({
        collection: 'tech-stack',
        data: {
          ...technology,
          visible: true,
        },
      })

      relationshipIds.set(technology.slug, created.id)
      createdCount += 1
      continue
    }

    const repaired = await payload.update({
      collection: 'tech-stack',
      id: existing.id,
      data: {
        name: textOrFallback(existing.name, technology.name),
        slug: technology.slug,
        description: textOrFallback(existing.description, technology.description),
        color: textOrFallback(existing.color, technology.color),
        officialUrl: textOrFallback(existing.officialUrl, technology.officialUrl),
        documentationUrl: textOrFallback(existing.documentationUrl, technology.documentationUrl),
        featured: existing.featured ?? technology.featured,
        visible: true,
        sortOrder:
          typeof existing.sortOrder === 'number' && existing.sortOrder > 0
            ? existing.sortOrder
            : technology.sortOrder,
      },
    })

    relationshipIds.set(technology.slug, repaired.id)
    repairedCount += 1
  }

  const idsForCard = (key: SkillCardKey): TechStack['id'][] | undefined => {
    const slugs = CARD_TECHNOLOGIES[key]

    if (!slugs) {
      return undefined
    }

    return slugs.map((slug) => {
      const id = relationshipIds.get(slug)

      if (id === undefined) {
        throw new Error(`TechStack upsert completed without a relationship ID for "${slug}".`)
      }

      return id
    })
  }

  const homepage = (await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
  })) as Homepage

  const defaultCards = DEFAULT_SKILLS_SECTION.cards ?? []
  const defaultsByKey = new Map(defaultCards.map((card) => [card.key, card] as const))
  const seen = new Set<SkillCardKey>()

  const mergedCurrentCards = (homepage.skillsSection?.cards ?? []).flatMap((card) => {
    const fallback = defaultsByKey.get(card.key)

    if (!fallback || seen.has(card.key)) {
      return []
    }

    seen.add(card.key)
    const technologies = idsForCard(card.key)

    return [
      {
        ...fallback,
        ...card,
        ...(technologies ? { technologies } : {}),
      },
    ]
  })

  const missingCards = defaultCards.flatMap((card) => {
    if (seen.has(card.key)) {
      return []
    }

    const technologies = idsForCard(card.key)

    return [
      {
        ...card,
        ...(technologies ? { technologies } : {}),
      },
    ]
  })

  const skillsSection: SkillsSection = {
    ...DEFAULT_SKILLS_SECTION,
    ...homepage.skillsSection,
    cards: [...mergedCurrentCards, ...missingCards],
  }

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      skillsSection,
    },
  })

  console.log(`TechStack ready: ${createdCount} created, ${repairedCount} repaired.`)
  console.log(`Homepage skills ready: ${skillsSection.cards?.length ?? 0} cards linked.`)
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
