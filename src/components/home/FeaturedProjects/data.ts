export type FeaturedProject = {
  id: string
  title: string
  slug: string
  stage: string
  progress: number
  excerpt: string
  stack: string[]
  status: string
}

export const featuredProjects = [
  {
    id: 'dss-universe',
    title: 'DSS Universe',
    slug: 'dss-universe',
    stage: 'In Development',
    progress: 68,
    status: 'Active mission',
    excerpt:
      'A modular developer platform that connects research, community, AI tools, academy, CMS, and mission control in one ecosystem.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Payload CMS'],
  },
  {
    id: 'jdmgram',
    title: 'JDMGram',
    slug: 'jdmgram',
    stage: 'MVP Complete',
    progress: 82,
    status: 'Archived prototype',
    excerpt:
      'A social platform concept for car enthusiasts with posts, profiles, garages, comments, notifications, and moderation tools.',
    stack: ['Next.js', 'NestJS', 'Prisma', 'Tailwind', 'JWT'],
  },
  {
    id: 'barbershop',
    title: 'Gentlemen’s Barbershop',
    slug: 'gentlemens-barbershop',
    stage: 'Concept',
    progress: 34,
    status: 'Design phase',
    excerpt:
      'A booking-focused barbershop platform with landing page, service flow, personal cabinet, barber dashboard, and admin panel.',
    stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'Zustand'],
  },
] satisfies FeaturedProject[]
