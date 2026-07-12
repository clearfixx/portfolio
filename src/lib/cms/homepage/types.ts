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
