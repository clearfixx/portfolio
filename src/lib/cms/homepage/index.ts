export { buildContactSectionViewModel } from './contact'
export { buildCurrentMissionViewModel } from './current-mission'
export { buildEngineerProfileViewModel } from './engineer-profile'
export {
  buildFeaturedProjectViewModel,
  buildFeaturedProjectViewModels,
  getSelectedFeaturedProjects,
  isPublishedProject,
} from './featured-projects'
export { buildHeroViewModel, calculateExperienceYears, getSelectedTechStack } from './hero'
export { getHomepageContent } from './getHomepageContent'
export type { HomepageContent } from './getHomepageContent'
export type {
  ContactAvailabilityTone,
  ContactChannelIcon,
  ContactChannelViewModel,
  ContactSectionViewModel,
  ContactSocialIcon,
  ContactSocialLinkViewModel,
  CurrentMissionLinkViewModel,
  CurrentMissionProjectViewModel,
  CurrentMissionViewModel,
  EngineerJourneyItemViewModel,
  EngineerPrincipleIcon,
  EngineerPrincipleViewModel,
  EngineerProfileImageViewModel,
  EngineerProfileStatViewModel,
  EngineerProfileStatusTone,
  EngineerProfileViewModel,
  FeaturedProjectAccent,
  FeaturedProjectImage,
  FeaturedProjectViewModel,
  HeroTechIcon,
  HeroTechItem,
  HeroTelemetryItem,
  HeroTelemetryViewModel,
  HeroViewModel,
} from './types'
export { calculateCompletedProjectsTotal } from './project-metrics'
