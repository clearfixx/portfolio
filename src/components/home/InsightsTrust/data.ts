export type InsightArticle = {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  href: string
  icon: 'terminal' | 'cube'
}

export type FeaturedInsightArticle = InsightArticle & {
  label: string
  codeTitle: string
  codeLines: string[]
}

export type ClientFeedbackItem = {
  id: string
  author: string
  role: string
  quote: string
  verified: boolean
}

export type TrustMetric = {
  id: string
  label: string
  value: string
  icon: 'code' | 'calendar' | 'commit' | 'users'
}

export const featuredInsightArticle: FeaturedInsightArticle = {
  id: 'maintainable-ui-systems',
  title: 'Building Maintainable UI Systems',
  excerpt:
    'How I structure design systems and component architecture for scalable and consistent frontend development.',
  date: 'May 8, 2026',
  readTime: '8 min read',
  category: 'Architecture',
  href: '/articles/building-maintainable-ui-systems',
  icon: 'terminal',
  label: 'Featured',
  codeTitle: 'components/Button.tsx',
  codeLines: [
    'type ButtonProps = {',
    "  variant?: 'primary' | 'secondary'",
    "  size?: 'sm' | 'md' | 'lg'",
    '  loading?: boolean',
    '}',
    '',
    'export function Button(props) {',
    '  return <button {...props} />',
    '}',
  ],
}

export const insightArticles: InsightArticle[] = [
  {
    id: 'portfolio-sections-system-thinking',
    title: 'Why Portfolio Sections Need System Thinking',
    excerpt:
      'Breaking down how a system approach makes portfolio websites more scalable and easier to maintain.',
    date: 'Apr 26, 2026',
    readTime: '6 min read',
    category: 'Frontend',
    href: '/articles/portfolio-sections-system-thinking',
    icon: 'terminal',
  },
  {
    id: 'building-dss-universe',
    title: 'Lessons from Building DSS Universe',
    excerpt:
      'Key takeaways from building a complex platform for decision support systems in the sports industry.',
    date: 'Apr 12, 2026',
    readTime: '10 min read',
    category: 'Case Study',
    href: '/articles/building-dss-universe',
    icon: 'cube',
  },
]

export const clientFeedback: ClientFeedbackItem[] = [
  {
    id: 'architecture-feedback',
    author: 'Confidential Client',
    role: 'Product founder',
    quote:
      'Andrii is not just a developer. He thinks like an architect and delivers solutions that scale.',
    verified: true,
  },
  {
    id: 'delivery-feedback',
    author: 'Confidential Client',
    role: 'Project owner',
    quote:
      'Professional, reliable and always one step ahead. The quality of his code and communication is outstanding.',
    verified: true,
  },
]

export const trustMetrics: TrustMetric[] = [
  {
    id: 'projects',
    label: 'Projects completed',
    value: '18+',
    icon: 'code',
  },
  {
    id: 'experience',
    label: 'Years of experience',
    value: '12+',
    icon: 'calendar',
  },
  {
    id: 'commits',
    label: 'Commits pushed',
    value: '6 241+',
    icon: 'commit',
  },
  {
    id: 'clients',
    label: 'Happy clients',
    value: '20+',
    icon: 'users',
  },
]
