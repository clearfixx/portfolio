export type SkillTechnology = {
  name: string
  shortName?: string
}

export type SkillCardTone = 'cyan' | 'blue' | 'purple' | 'green' | 'orange'

export type SkillCard = {
  id: string
  area: string
  number: string
  title: string
  description: string
  tone: SkillCardTone
  technologies: SkillTechnology[]
  details?: {
    label: string
    value: string
  }[]
}

export const skillCards: SkillCard[] = [
  {
    id: 'frontend',
    area: 'frontend',
    number: '01',
    title: 'Frontend',
    description: 'Building fast, interactive and accessible user experiences.',
    tone: 'cyan',
    technologies: [
      { name: 'Next.js', shortName: 'Next' },
      { name: 'React' },
      { name: 'TypeScript', shortName: 'TS' },
      { name: 'SCSS' },
    ],
    details: [
      { label: 'Projects', value: '12+' },
      { label: 'Focus', value: 'UI / UX' },
      { label: 'Experience', value: '6+ years' },
    ],
  },
  {
    id: 'workflow',
    area: 'workflow',
    number: '02',
    title: 'Tools & Workflow',
    description: 'Streamlining development with efficient tools and smart workflows.',
    tone: 'green',
    technologies: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'ESLint' },
      { name: 'Prettier' },
    ],
  },
  {
    id: 'backend',
    area: 'backend',
    number: '03',
    title: 'Backend',
    description: 'Designing robust APIs and scalable backend systems.',
    tone: 'cyan',
    technologies: [
      { name: 'Nest.js', shortName: 'Nest' },
      { name: 'Node.js', shortName: 'Node' },
      { name: 'Prisma' },
      { name: 'PostgreSQL', shortName: 'Postgres' },
    ],
    details: [
      { label: 'Experience', value: '5+ years' },
      { label: 'API projects', value: '10+' },
      { label: 'Databases', value: '15+' },
    ],
  },
  {
    id: 'devops',
    area: 'devops',
    number: '04',
    title: 'DevOps & Cloud',
    description: 'Automating, deploying and scaling applications with confidence.',
    tone: 'blue',
    technologies: [
      { name: 'Docker' },
      { name: 'AWS' },
      { name: 'CI / CD' },
      { name: 'Monitoring' },
    ],
  },
  {
    id: 'architecture',
    area: 'architecture',
    number: '05',
    title: 'Architectural Approach',
    description: 'Good architecture makes the right things easy and the wrong things difficult.',
    tone: 'purple',
    technologies: [
      { name: 'Clean Architecture' },
      { name: 'Modular Design' },
      { name: 'Scalability' },
      { name: 'Maintainability' },
      { name: 'Testability' },
    ],
  },
  {
    id: 'focus',
    area: 'focus',
    number: '06',
    title: 'Current Focus',
    description: 'Areas I am currently exploring and leveling up.',
    tone: 'green',
    technologies: [
      { name: 'AI Integration' },
      { name: 'System Design' },
      { name: 'Automation' },
      { name: 'Edge & Performance' },
    ],
  },
]
