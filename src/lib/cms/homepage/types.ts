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
