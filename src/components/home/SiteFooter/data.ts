export type FooterSocialLink = {
  id: string
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x' | 'telegram' | 'mail'
}

export type FooterXPost = {
  id: string
  content: string
  date: string
  time: string
  replies: number
  reposts: number
  likes: number
}

export type FooterSnapshot = {
  id: string
  title: string
  kind: 'code' | 'ui' | 'desk' | 'quote' | 'terminal' | 'coffee'
  subtitle?: string
}

export type FooterLink = {
  id: string
  label: string
  href: string
}

export const footerBio = {
  name: 'Andrii Kulahin',
  role: 'Software Engineer',
  image: '/images/profile/engineer-profile.png',
  description: [
    'I build scalable web systems with clean architecture, thoughtful interfaces, and predictable delivery.',
    'Focused on performance, reliability and creating value for real users.',
  ],
  availability: 'Open for freelance & product work',
}

export const footerSocialLinks: FooterSocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/clearfixx',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: 'linkedin',
  },
  {
    id: 'x',
    label: 'X',
    href: '#',
    icon: 'x',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/ak_dev',
    icon: 'telegram',
  },
  {
    id: 'mail',
    label: 'Email',
    href: 'mailto:andrii.kulahin.dev@gmail.com',
    icon: 'mail',
  },
]

export const footerXPosts: FooterXPost[] = [
  {
    id: 'post-1',
    content: "Clean architecture isn't about layers. It's about making change cheap.",
    date: 'May 9, 2026',
    time: '9:41 AM',
    replies: 12,
    reposts: 34,
    likes: 128,
  },
  {
    id: 'post-2',
    content: 'Design systems pay off when your product starts to scale.',
    date: 'May 8, 2026',
    time: '6:22 PM',
    replies: 8,
    reposts: 21,
    likes: 96,
  },
  {
    id: 'post-3',
    content: 'Shipped a new feature behind a flag. Small steps, big impact.',
    date: 'May 7, 2026',
    time: '11:08 AM',
    replies: 5,
    reposts: 17,
    likes: 72,
  },
]

export const footerSnapshots: FooterSnapshot[] = [
  {
    id: 'snapshot-1',
    title: 'Code Snapshot',
    subtitle: 'Typed component work',
    kind: 'code',
  },
  {
    id: 'snapshot-2',
    title: 'UI Flow',
    subtitle: 'From idea to impact',
    kind: 'ui',
  },
  {
    id: 'snapshot-3',
    title: 'Workspace',
    subtitle: 'Build environment',
    kind: 'desk',
  },
  {
    id: 'snapshot-4',
    title: 'Build. Ship. Repeat.',
    subtitle: 'Visual note',
    kind: 'quote',
  },
  {
    id: 'snapshot-5',
    title: 'Terminal Logs',
    subtitle: 'Production mindset',
    kind: 'terminal',
  },
  {
    id: 'snapshot-6',
    title: 'Coffee Break',
    subtitle: 'Fuel for systems',
    kind: 'coffee',
  },
]

export const footerLinks: FooterLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
  },
  {
    id: 'articles',
    label: 'Articles',
    href: '/blog',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/#contact',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    href: '/privacy',
  },
]
