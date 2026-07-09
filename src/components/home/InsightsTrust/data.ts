export type CodeTokenType =
  | 'keyword'
  | 'type'
  | 'property'
  | 'string'
  | 'function'
  | 'boolean'
  | 'operator'
  | 'punctuation'
  | 'comment'
  | 'plain'

export type CodeToken = {
  value: string
  type?: CodeTokenType
}

export type InsightArticleImage = {
  src: string
  alt: string
}

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
  image?: InsightArticleImage
  codeTitle: string
  codeLines: CodeToken[][]
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

  // Коли буде реальна картинка статті, просто додаси:
  // image: {
  //   src: '/images/articles/maintainable-ui-systems.webp',
  //   alt: 'Maintainable UI systems article preview',
  // },

  codeTitle: 'components/Button.tsx',
  codeLines: [
    [
      { value: 'type', type: 'keyword' },
      { value: ' ButtonProps ', type: 'type' },
      { value: '= ', type: 'operator' },
      { value: '{', type: 'punctuation' },
    ],
    [
      { value: '  variant', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: "'primary'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'secondary'", type: 'string' },
    ],
    [
      { value: '  size', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: "'sm'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'md'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'lg'", type: 'string' },
    ],
    [
      { value: '  loading', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: 'boolean', type: 'type' },
    ],
    [{ value: '}', type: 'punctuation' }],
    [],
    [
      { value: 'export', type: 'keyword' },
      { value: ' function ', type: 'keyword' },
      { value: 'Button', type: 'function' },
      { value: '(props) ', type: 'plain' },
      { value: '{', type: 'punctuation' },
    ],
    [
      { value: '  return ', type: 'keyword' },
      { value: '<button ', type: 'function' },
      { value: '{...props}', type: 'property' },
      { value: ' />', type: 'function' },
    ],
    [{ value: '}', type: 'punctuation' }],
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
