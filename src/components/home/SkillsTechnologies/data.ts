import type { TechBrandIconId } from './TechBrandIcon'

export type SkillCardTone = 'cyan' | 'blue' | 'purple' | 'green' | 'orange'

export type SkillCardIcon = 'browser' | 'workflow' | 'server' | 'cloud' | 'layers' | 'focus'

export type SkillTechnology = {
  id: TechBrandIconId
  name: string
  shortName?: string
}

export type SkillDetail = {
  label: string
  value?: string
  caption?: string
  items?: string[]
}

export type SkillWorkflowStep = {
  label: string
  icon: 'plan' | 'code' | 'commit' | 'review' | 'deploy'
}

export type SkillPrinciple = {
  title: string
  description: string
  icon: 'layers' | 'cube' | 'scale' | 'wrench' | 'flask'
}

export type SkillFocusItem = {
  title: string
  description: string
  icon: 'ai' | 'system' | 'automation' | 'performance'
}

export type SkillCard = {
  id: string
  area: string
  number: string
  title: string
  badge: string
  icon: SkillCardIcon
  description: string
  tone: SkillCardTone
  technologies?: SkillTechnology[]
  details?: SkillDetail[]
  pillsTitle?: string
  pills?: string[]
  workflowTitle?: string
  workflow?: SkillWorkflowStep[]
  focusLine?: string[]
  principles?: SkillPrinciple[]
  focusItems?: SkillFocusItem[]
}

export const skillCards: SkillCard[] = [
  {
    id: 'frontend',
    area: 'frontend',
    number: '01',
    title: 'Frontend',
    badge: 'Primary stack',
    icon: 'browser',
    description: 'Building fast, interactive and accessible user experiences.',
    tone: 'cyan',
    technologies: [
      { id: 'nextjs', name: 'Next.js', shortName: 'Next' },
      { id: 'react', name: 'React' },
      { id: 'typescript', name: 'TypeScript', shortName: 'TS' },
      { id: 'scss', name: 'SCSS' },
    ],
    pillsTitle: 'UI systems',
    pills: ['Responsive UI', 'Forms & Validation', 'Client State'],
    details: [
      { label: 'Projects', value: '12+', caption: 'used in' },
      { label: 'Focus areas', items: ['UI / UX', 'Performance', 'Accessibility'] },
      { label: 'Experience', value: '6+', caption: 'years' },
    ],
  },
  {
    id: 'workflow',
    area: 'workflow',
    number: '02',
    title: 'Tools & Workflow',
    badge: 'Daily workflow',
    icon: 'workflow',
    description: 'Streamlining development with efficient tools and smart workflows.',
    tone: 'green',
    technologies: [
      { id: 'git', name: 'Git' },
      { id: 'github', name: 'GitHub' },
      { id: 'vscode', name: 'VS Code' },
      { id: 'eslint', name: 'ESLint' },
      { id: 'prettier', name: 'Prettier' },
    ],
    workflowTitle: 'Workflow',
    workflow: [
      { label: 'Plan', icon: 'plan' },
      { label: 'Code', icon: 'code' },
      { label: 'Commit', icon: 'commit' },
      { label: 'Review', icon: 'review' },
      { label: 'Deploy', icon: 'deploy' },
    ],
    focusLine: ['Productivity', 'Code quality', 'Collaboration'],
  },
  {
    id: 'backend',
    area: 'backend',
    number: '03',
    title: 'Backend',
    badge: 'Primary stack',
    icon: 'server',
    description: 'Designing robust APIs and scalable backend systems.',
    tone: 'cyan',
    technologies: [
      { id: 'nestjs', name: 'Nest.js', shortName: 'Nest' },
      { id: 'nodejs', name: 'Node.js', shortName: 'Node' },
      { id: 'prisma', name: 'Prisma' },
      { id: 'postgresql', name: 'PostgreSQL', shortName: 'Postgres' },
    ],
    pillsTitle: 'What I build',
    pills: ['RESTful APIs', 'GraphQL', 'Authentication', 'RBAC'],
    details: [
      { label: 'Experience', value: '5+', caption: 'years' },
      { label: 'API projects', value: '10+', caption: 'shipped' },
      { label: 'Databases', value: '15+', caption: 'designed' },
    ],
  },
  {
    id: 'devops',
    area: 'devops',
    number: '04',
    title: 'DevOps & Cloud',
    badge: 'Infrastructure',
    icon: 'cloud',
    description: 'Automating, deploying and scaling applications with confidence.',
    tone: 'blue',
    technologies: [
      { id: 'docker', name: 'Docker' },
      { id: 'aws', name: 'AWS' },
      { id: 'cicd', name: 'CI / CD' },
      { id: 'monitoring', name: 'Monitoring' },
    ],
    pillsTitle: 'Cloud & infrastructure',
    pills: ['Containers', 'CI / CD', 'Infrastructure as Code', 'Monitoring'],
    details: [
      { label: 'Deployments', value: '50+', caption: 'automated' },
      { label: 'Uptime', value: '99.9%', caption: 'target' },
      { label: 'Environments', value: '6+', caption: 'managed' },
    ],
  },
  {
    id: 'architecture',
    area: 'architecture',
    number: '05',
    title: 'Architectural Approach',
    badge: 'Principles',
    icon: 'layers',
    description:
      'I believe good architecture is about making the right things easy and the wrong things difficult.',
    tone: 'purple',
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
    id: 'focus',
    area: 'focus',
    number: '06',
    title: 'Current Focus',
    badge: 'Leveling up',
    icon: 'focus',
    description: 'Areas I am currently exploring and leveling up.',
    tone: 'green',
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
]
