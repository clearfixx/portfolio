export type HeroTechIcon =
  'docker' | 'generic' | 'github' | 'next' | 'node' | 'postgres' | 'prisma' | 'tailwind' | 'ts'

export type HeroTechItem = {
  id: string
  icon: HeroTechIcon
  label: string
}

export type HeroTelemetryItem = {
  label: string
  suffix: string
  value: number | null
}

export type HeroTelemetryViewModel = {
  activity?: {
    detail: string
    label: string
  }
  stats: HeroTelemetryItem[]
}

export type HeroViewModel = {
  eyebrow: string
  headline: {
    subtitle: string
    subtitleAccent?: string
    title: string
    titleAccent?: string
  }
  name: {
    accent: string
    leading: string
  }
  primaryAction: {
    href: string
    label: string
  }
  role: string
  secondaryAction: {
    href: string
    label: string
  }
  techStack: HeroTechItem[]
  telemetry: HeroTelemetryViewModel
}
export type FeaturedProjectAccent = 'cyan' | 'violet'

export type FeaturedProjectImage = {
  alt: string
  src: string
}

export type FeaturedProjectViewModel = {
  accent: FeaturedProjectAccent
  excerpt: string
  href?: string
  id: string
  image?: FeaturedProjectImage
  linkLabel: string
  previewLabel: string
  progress: number
  stack: string[]
  stage: string
  status: string
  title: string
}
export type ContactChannelIcon = 'clock' | 'mail' | 'phone' | 'pin' | 'telegram'

export type ContactSocialIcon = 'github' | 'linkedin' | 'telegram' | 'x'

export type ContactAvailabilityTone = 'available' | 'focused' | 'unavailable'

export type ContactChannelViewModel = {
  external: boolean
  href?: string
  icon: ContactChannelIcon
  id: string
  label: string
  value: string
}

export type ContactSocialLinkViewModel = {
  href: string
  icon: ContactSocialIcon
  id: string
  label: string
}

export type ContactSectionViewModel = {
  availability: {
    label: string
    tone: ContactAvailabilityTone
  }
  channels: ContactChannelViewModel[]
  description: string
  eyebrow: string
  footer: {
    label: string
    text: string
  }
  form: {
    description: string
    enabled: boolean
    title: string
  }
  location?: string
  socialLinks: ContactSocialLinkViewModel[]
  title: {
    accent?: string
    leading: string
    trailing?: string
  }
}
export type CurrentMissionLinkViewModel = {
  external: boolean
  href: string
  label: string
}

export type CurrentMissionProjectViewModel = {
  cta?: CurrentMissionLinkViewModel
  excerpt: string
  id: string
  progress: number
  stage: string
  stack: string[]
  tagline: string
  title: string
  version?: string
}

export type CurrentMissionViewModel = {
  description: string
  eyebrow: string
  footer: {
    label: string
    text: string
  }
  project?: CurrentMissionProjectViewModel
  title: string
}
export type EngineerProfileStatusTone = 'available' | 'focused' | 'unavailable'

export type EngineerProfileImageViewModel = {
  alt: string
  src: string
}

export type EngineerProfileStatViewModel = {
  id: string
  label: string
  value: string
}

export type EngineerJourneyItemViewModel = {
  accent: boolean
  description: string
  id: string
  title: string
  year: string
}

export type EngineerPrincipleIcon = 'architecture' | 'code' | 'documentation' | 'rocket'

export type EngineerPrincipleViewModel = {
  description: string
  icon: EngineerPrincipleIcon
  id: string
  number: string
  title: string
}

export type EngineerProfileViewModel = {
  description: string
  eyebrow: string
  footer: {
    label: string
    text: string
  }
  journey: {
    footer: string
    items: EngineerJourneyItemViewModel[]
    meta: string
    title: string
  }
  principles: {
    items: EngineerPrincipleViewModel[]
    meta: string
    title: string
  }
  profile: {
    bio: string
    id: string
    image: EngineerProfileImageViewModel
    location?: string
    name: string
    role: string
    stats: EngineerProfileStatViewModel[]
    status: {
      label: string
      tone: EngineerProfileStatusTone
    }
  }
  title: string
}

export type SkillCardKey = 'architecture' | 'backend' | 'devops' | 'focus' | 'frontend' | 'workflow'

export type SkillCardTone = 'blue' | 'cyan' | 'green' | 'orange' | 'purple'

export type SkillCardIcon = 'browser' | 'cloud' | 'focus' | 'layers' | 'server' | 'workflow'

export type SkillTechnology = {
  id: string
  name: string
  shortName?: string
}

export type SkillDetail = {
  caption?: string
  items?: string[]
  label: string
  value?: string
}

export type SkillWorkflowStep = {
  icon: 'code' | 'commit' | 'deploy' | 'plan' | 'review'
  label: string
}

export type SkillPrinciple = {
  description: string
  icon: 'cube' | 'flask' | 'layers' | 'scale' | 'wrench'
  title: string
}

export type SkillFocusItem = {
  description: string
  icon: 'ai' | 'automation' | 'performance' | 'system'
  title: string
}

export type SkillCard = {
  area: SkillCardKey
  badge: string
  description: string
  details?: SkillDetail[]
  focusItems?: SkillFocusItem[]
  focusLine?: string[]
  icon: SkillCardIcon
  id: string
  number: string
  pills?: string[]
  pillsTitle?: string
  principles?: SkillPrinciple[]
  technologies?: SkillTechnology[]
  title: string
  tone: SkillCardTone
  workflow?: SkillWorkflowStep[]
  workflowTitle?: string
}

export type SkillsSectionViewModel = {
  cards: SkillCard[]
  description: string
  eyebrow: string
  footer: {
    label: string
    text: string
  }
  title: string
}

export type InsightsTitleTone = 'accent' | 'muted' | 'plain'

export type InsightsTitleSegmentViewModel = {
  text: string
  tone: InsightsTitleTone
}

export type InsightsArticleIcon = 'cube' | 'terminal'

export type InsightsArticleImageViewModel = {
  alt: string
  src: string
}

export type InsightsArticleViewModel = {
  category: string
  date: string
  excerpt: string
  href?: string
  icon: InsightsArticleIcon
  id: string
  image?: InsightsArticleImageViewModel
  readTime: string
  title: string
}

export type InsightsFeaturedArticleViewModel = InsightsArticleViewModel & {
  label: string
}

export type InsightsFeedbackViewModel = {
  author: string
  avatar?: InsightsArticleImageViewModel
  id: string
  initials: string
  quote: string
  role: string
  verified: boolean
}

export type InsightsTrustMetricIcon = 'calendar' | 'code' | 'commit' | 'users'

export type InsightsTrustMetricViewModel = {
  icon: InsightsTrustMetricIcon
  id: string
  label: string
  value: string
}

export type InsightsTrustViewModel = {
  articles: {
    cta?: {
      href: string
      label: string
    }
    featured?: InsightsFeaturedArticleViewModel
    items: InsightsArticleViewModel[]
    title: string
  }
  description: string
  eyebrow: string
  feedback: {
    items: InsightsFeedbackViewModel[]
    title: string
  }
  footer: {
    label: string
    text: string
  }
  metrics: {
    items: InsightsTrustMetricViewModel[]
    title: string
  }
  title: InsightsTitleSegmentViewModel[]
}

export type DeliveryPipelineMetricKey = 'maintainable' | 'milestones' | 'predictable'

export type DeliveryPipelineMetricIcon = 'flag' | 'progress' | 'shield'

export type DeliveryPipelineMetricViewModel = {
  description: string
  icon: DeliveryPipelineMetricIcon
  id: DeliveryPipelineMetricKey
  title: string
}

export type DeliveryPipelinePhaseKey =
  'architecture' | 'development' | 'discovery' | 'interface' | 'launch'

export type DeliveryPipelinePhaseIcon = 'architecture' | 'code' | 'interface' | 'rocket' | 'search'

export type DeliveryPipelinePhaseStatus = 'complete' | 'pending' | 'progress'

export type DeliveryPipelinePhaseViewModel = {
  icon: DeliveryPipelinePhaseIcon
  id: DeliveryPipelinePhaseKey
  items: string[]
  number: string
  status: DeliveryPipelinePhaseStatus
  title: string
}

export type DeliveryPipelineTitleViewModel = {
  accent?: string
  leading: string
  trailing?: string
}

export type DeliveryPipelineViewModel = {
  description: string
  eyebrow: string
  footer: {
    label: string
    text: string
  }
  metrics: DeliveryPipelineMetricViewModel[]
  phases: DeliveryPipelinePhaseViewModel[]
  title: DeliveryPipelineTitleViewModel
}

export type SiteFooterSocialIcon = 'github' | 'linkedin' | 'mail' | 'telegram' | 'x'

export type SiteFooterSocialLinkViewModel = {
  external: boolean
  href: string
  icon: SiteFooterSocialIcon
  id: string
  label: string
}

export type SiteFooterPostViewModel = {
  content: string
  href?: string
  date: string
  id: string
  likes: number
  replies: number
  reposts: number
  time: string
}

export type SiteFooterSnapshotKind = 'code' | 'coffee' | 'desk' | 'quote' | 'terminal' | 'ui'

export type SiteFooterImageViewModel = {
  alt: string
  src: string
}

export type SiteFooterSnapshotViewModel = {
  id: string
  image?: SiteFooterImageViewModel
  kind: SiteFooterSnapshotKind
  subtitle?: string
  title: string
}

export type SiteFooterLinkViewModel = {
  href: string
  id: string
  label: string
}

export type SiteFooterGitHubCommitViewModel = {
  committedAt: string
  href: string
  id: string
  repository: string
  repositoryHref: string
  shortSha: string
  timeLabel: string
  title: string
}

export type SiteFooterGitHubFeedViewModel = {
  commits: SiteFooterGitHubCommitViewModel[]
  href: string
  linkLabel: string
  state: 'fresh' | 'stale'
  statusLabel: string
  subtitle: string
  title: string
}

export type SiteFooterViewModel = {
  copyright: {
    emphasis: string
    prefix: string
    suffix: string
    year: number
  }
  newsletter: {
    buttonLabel: string
    description: string
    note: string
    placeholder: string
    title: string
  }
  navigation: SiteFooterLinkViewModel[]
  profile: {
    availability: {
      active: boolean
      detail: string
      label: string
    }
    connectLabel: string
    description: string[]
    image: SiteFooterImageViewModel
    name: string
    role: string
    socialLinks: SiteFooterSocialLinkViewModel[]
  }
  snapshots: {
    href?: string
    items: SiteFooterSnapshotViewModel[]
    linkLabel: string
    subtitle: string
    title: string
  }
  xFeed: {
    handle: string
    href?: string
    linkLabel: string
    posts: SiteFooterPostViewModel[]
    title: string
  }
}
