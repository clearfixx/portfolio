export type FeaturedProject = {
  id: string
  title: string
  slug: string
  stage: string
  progress: number
  excerpt: string
  stack: string[]
  status: string
  previewLabel: string
  previewImage?: string
  accent: 'cyan' | 'violet'
}

export const featuredProjects = [
  {
    id: 'jdmgram',
    title: 'JDMGram',
    slug: 'jdmgram',
    stage: 'In Development',
    progress: 82,
    status: 'Active mission',
    previewLabel: 'Connect. Share. Drive.',
    accent: 'cyan',
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
    previewLabel: 'Precision. Style. Confidence.',
    accent: 'violet',
    excerpt:
      'A booking-focused barbershop platform with landing page, service flow, personal cabinet, barber dashboard, and admin panel.',
    stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'Zustand'],
  },
  {
    id: 'kinoplay',
    title: 'KinoPlay',
    slug: 'kinoplay',
    stage: 'MVP Complete',
    progress: 75,
    status: 'Product prototype',
    previewLabel: 'Watch movies anywhere, anytime.',
    accent: 'cyan',
    excerpt:
      'A movie discovery and streaming platform with watchlists, trailers, ratings, and personalized recommendations.',
    stack: ['Next.js', 'TMDB API', 'Tailwind', 'PostgreSQL', 'Redis'],
  },
] satisfies FeaturedProject[]
