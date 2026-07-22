// about-live-data-integration-v2

export type AboutProfileIconName =
  | 'architecture'
  | 'arrow'
  | 'automation'
  | 'code'
  | 'compass'
  | 'layers'
  | 'performance'
  | 'product'
  | 'signal'
  | 'system'

export type AboutActionTone = 'primary' | 'secondary'
export type AboutSignalTone = 'cyan' | 'purple'

export type AboutSectionHeadingViewModel = {
  description: string
  enabled: boolean
  eyebrow: string
  title: string
}

export type AboutHeroActionViewModel = {
  href: string
  icon: AboutProfileIconName
  id: string
  label: string
  tone: AboutActionTone
}

export type AboutHeroSignalViewModel = {
  id: string
  label: string
  value: string
}

export type AboutProfileImageViewModel = {
  alt: string
  src: string
}

export type AboutProfileViewModel = {
  availability: string
  experience: string
  focus: string
  initials: string
  location: string
  name: string
  portrait?: AboutProfileImageViewModel
  profileId: string
  role: string
  statusLabel: string
}

export type AboutCareerItemViewModel = {
  description: string
  id: string
  period: string
  role: string
  stack: string[]
}

export type AboutPrincipleViewModel = {
  description: string
  icon: AboutProfileIconName
  id: string
  title: string
}

export type AboutOperatingStepViewModel = {
  code: string
  id: string
  label: string
  output: string
}

export type AboutLabelValueViewModel = {
  id: string
  label: string
  value: string
}

export type AboutOutputViewModel = {
  description: string
  id: string
  title: string
}

export type AboutTelemetryViewModel = {
  id: string
  label: string
  tone: AboutSignalTone
  value: string
}

export type AboutExperienceItemViewModel = {
  area: string
  example: string
  id: string
  level: 'Advanced' | 'Lead' | 'Working experience'
  score: number
}

export type AboutSummaryItemViewModel = {
  description: string
  id: string
  label: string
  title: string
}

export type AboutFocusProjectViewModel = {
  description: string
  href: string
  title: string
}

export type AboutFocusCardViewModel = {
  description: string
  eyebrow: string
  footerLabel: string
  footerValue: string
  icon: AboutProfileIconName
  id: string
  status: string
  tags: string[]
  title: string
  tone: AboutSignalTone
}

export type AboutPersonalSignalViewModel = {
  description: string
  id: string
  title: string
}

export type AboutPageViewModel = {
  breadcrumbLabel: string
  career: AboutSectionHeadingViewModel & {
    items: AboutCareerItemViewModel[]
  }
  cta: {
    description: string
    enabled: boolean
    eyebrow: string
    href: string
    label: string
    title: string
    titleAccent: string
  }
  currentFocus: AboutSectionHeadingViewModel & {
    cards: AboutFocusCardViewModel[]
    primaryLabel: string
    primaryLinkLabel: string
    primaryProject: AboutFocusProjectViewModel
  }
  experience: AboutSectionHeadingViewModel & {
    items: AboutExperienceItemViewModel[]
    summary: AboutSummaryItemViewModel[]
  }
  hero: {
    actions: AboutHeroActionViewModel[]
    availabilityLabel: string
    description: string
    enabled: boolean
    eyebrow: string
    signals: AboutHeroSignalViewModel[]
    title: string
    titleAccent: string
  }
  operatingSystem: AboutSectionHeadingViewModel & {
    currentStage: {
      description: string
      items: string[]
      label: string
      title: string
    }
    guardrails: {
      eyebrow: string
      items: AboutLabelValueViewModel[]
      status: string
      title: string
    }
    outputs: {
      eyebrow: string
      items: AboutOutputViewModel[]
      status: string
      title: string
    }
    steps: AboutOperatingStepViewModel[]
    telemetry: AboutTelemetryViewModel[]
  }
  personalSignals: AboutSectionHeadingViewModel & {
    items: AboutPersonalSignalViewModel[]
  }
  principles: AboutSectionHeadingViewModel & {
    items: AboutPrincipleViewModel[]
  }
  profile: AboutProfileViewModel
  seo: {
    canonical: string
    description: string
    title: string
  }
}
