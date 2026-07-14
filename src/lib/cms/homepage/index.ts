export { buildSiteFooterViewModel } from './site-footer'
export { buildDeliveryPipelineViewModel } from './delivery-pipeline'
export { buildInsightsTrustViewModel } from './insights-trust'
export { buildSkillsSectionViewModel } from './skills'
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
  SkillCard,
  SkillCardIcon,
  SkillCardKey,
  SkillCardTone,
  SkillDetail,
  SkillFocusItem,
  SkillPrinciple,
  SkillTechnology,
  SkillWorkflowStep,
  SkillsSectionViewModel,
} from './types'
export { calculateCompletedProjectsTotal } from './project-metrics'
export type {
  InsightsArticleIcon,
  InsightsArticleImageViewModel,
  InsightsArticleViewModel,
  InsightsFeedbackViewModel,
  InsightsFeaturedArticleViewModel,
  InsightsTitleSegmentViewModel,
  InsightsTitleTone,
  InsightsTrustMetricIcon,
  InsightsTrustMetricViewModel,
  InsightsTrustViewModel,
} from './types'
export type {
  DeliveryPipelineMetricIcon,
  DeliveryPipelineMetricKey,
  DeliveryPipelineMetricViewModel,
  DeliveryPipelinePhaseIcon,
  DeliveryPipelinePhaseKey,
  DeliveryPipelinePhaseStatus,
  DeliveryPipelinePhaseViewModel,
  DeliveryPipelineTitleViewModel,
  DeliveryPipelineViewModel,
} from './types'
export type {
  SiteFooterImageViewModel,
  SiteFooterLinkViewModel,
  SiteFooterPostViewModel,
  SiteFooterSnapshotKind,
  SiteFooterSnapshotViewModel,
  SiteFooterSocialIcon,
  SiteFooterSocialLinkViewModel,
  SiteFooterViewModel,
} from './types'
export { buildSiteFooterGitHubFeedViewModel, getSiteFooterGitHubFeed } from './github-feed'
export type { SiteFooterGitHubCommitViewModel, SiteFooterGitHubFeedViewModel } from './types'
