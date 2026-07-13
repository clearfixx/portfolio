import process from 'node:process'

import type { Homepage, TechStack } from '../src/payload-types'

const CARD_TECHNOLOGIES = {
  backend: ['nestjs', 'nodejs', 'prisma', 'postgresql'],
  devops: ['docker', 'aws', 'cicd', 'monitoring'],
  frontend: ['nextjs', 'react', 'typescript', 'scss'],
  workflow: ['git', 'github', 'vscode', 'eslint', 'prettier'],
} as const

async function main() {
  process.loadEnvFile('.env')

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'tech-stack',
    depth: 0,
    limit: 100,
    pagination: false,
  })

  const technologies = result.docs as TechStack[]
  const bySlug = new Map(
    technologies.flatMap((technology) =>
      technology.slug ? [[technology.slug, technology.id] as const] : [],
    ),
  )

  const missingSlugs = new Set<string>()

  const relationshipIds = (slugs: readonly string[]) =>
    slugs.flatMap((slug) => {
      const id = bySlug.get(slug)

      if (id === undefined) {
        missingSlugs.add(slug)
        return []
      }

      return [id]
    })

  const skillsSection: NonNullable<Homepage['skillsSection']> = {
    cards: [
      {
        key: 'frontend',
        title: 'Frontend',
        badge: 'Primary stack',
        description: 'Building fast, interactive and accessible user experiences.',
        technologies: relationshipIds(CARD_TECHNOLOGIES.frontend),
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
        technologies: relationshipIds(CARD_TECHNOLOGIES.workflow),
        workflowTitle: 'Workflow',
        workflow: [
          { label: 'Plan', icon: 'plan' },
          { label: 'Code', icon: 'code' },
          { label: 'Commit', icon: 'commit' },
          { label: 'Review', icon: 'review' },
          { label: 'Deploy', icon: 'deploy' },
        ],
        focusLine: [
          { label: 'Productivity' },
          { label: 'Code quality' },
          { label: 'Collaboration' },
        ],
      },
      {
        key: 'backend',
        title: 'Backend',
        badge: 'Primary stack',
        description: 'Designing robust APIs and scalable backend systems.',
        technologies: relationshipIds(CARD_TECHNOLOGIES.backend),
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
        technologies: relationshipIds(CARD_TECHNOLOGIES.devops),
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

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      skillsSection,
    },
  })

  console.log('Homepage skills content seeded.')

  if (missingSlugs.size > 0) {
    console.warn(`Missing TechStack slugs: ${Array.from(missingSlugs).sort().join(', ')}`)
    console.warn('Create the missing TechStack records, then run this seed again.')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
