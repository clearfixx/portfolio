import { PUBLIC_CONTENT } from '@/lib/config'

import {
  getContact,
  getPublishedBlogPosts,
  getApprovedTestimonials,
  getFeaturedProjects,
  getFeaturedTechStack,
  getHomepage,
  getProfile,
  getProjectsCount,
  getSocial,
  getVisibleTechStack,
  getSiteSettings,
} from '../queries'
import { buildContactSectionViewModel } from './contact'
import { buildCurrentMissionViewModel } from './current-mission'
import { buildDeliveryPipelineViewModel } from './delivery-pipeline'
import { buildEngineerProfileViewModel } from './engineer-profile'
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from './featured-projects'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import { buildInsightsTrustViewModel } from './insights-trust'
import { buildSkillsSectionViewModel } from './skills'
import { buildSiteFooterViewModel } from './site-footer'
import { calculateCompletedProjectsTotal } from './project-metrics'
import type {
  ContactSectionViewModel,
  CurrentMissionViewModel,
  EngineerProfileViewModel,
  FeaturedProjectViewModel,
  HeroViewModel,
  InsightsTrustViewModel,
  SkillsSectionViewModel,
  DeliveryPipelineViewModel,
  SiteFooterViewModel,
} from './types'

export type HomepageContent = {
  contact: ContactSectionViewModel | null
  currentMission: CurrentMissionViewModel | null
  deliveryPipeline: DeliveryPipelineViewModel | null
  engineerProfile: EngineerProfileViewModel | null
  featuredProjects: FeaturedProjectViewModel[]
  hero: HeroViewModel
  insightsTrust: InsightsTrustViewModel | null
  skills: SkillsSectionViewModel
  siteFooter: SiteFooterViewModel | null
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [
    homepage,
    contact,
    profile,
    publishedProjectsCount,
    social,
    publishedArticles,
    approvedTestimonials,
    siteSettings,
  ] = await Promise.all([
    getHomepage(),
    getContact(),
    getProfile(),
    getProjectsCount(),
    getSocial(),
    getPublishedBlogPosts(PUBLIC_CONTENT.homepage.articleLimit),
    getApprovedTestimonials(PUBLIC_CONTENT.homepage.testimonialLimit),
    getSiteSettings(),
  ])

  const completedProjectsCount = calculateCompletedProjectsTotal(
    profile.completedProjectsOutsidePortfolio,
    publishedProjectsCount,
  )

  const visibleTechStack = await getVisibleTechStack()

  const selectedTechStack = getSelectedTechStack(homepage.selectedTechStack)
  const selectedFeaturedProjects = getSelectedFeaturedProjects(homepage.featuredProjects).slice(
    0,
    PUBLIC_CONTENT.homepage.featuredProjectLimit,
  )

  const [technologies, projects] = await Promise.all([
    selectedTechStack.length > 0
      ? Promise.resolve(selectedTechStack)
      : getFeaturedTechStack(PUBLIC_CONTENT.homepage.featuredTechStackLimit),
    selectedFeaturedProjects.length > 0
      ? Promise.resolve(selectedFeaturedProjects)
      : getFeaturedProjects(PUBLIC_CONTENT.homepage.featuredProjectLimit),
  ])

  return {
    contact:
      homepage.contactSection?.enabled === false
        ? null
        : buildContactSectionViewModel({
            contact,
            homepage,
            profile,
            social,
          }),
    currentMission: buildCurrentMissionViewModel(homepage),
    deliveryPipeline: buildDeliveryPipelineViewModel(homepage),
    engineerProfile: buildEngineerProfileViewModel({
      homepage,
      profile,
      projectsCount: completedProjectsCount,
    }),
    featuredProjects: buildFeaturedProjectViewModels(projects),
    siteFooter: buildSiteFooterViewModel({
      contact,
      homepage,
      profile,
      siteSettings,
      social,
    }),
    skills: buildSkillsSectionViewModel(homepage, visibleTechStack),
    insightsTrust: buildInsightsTrustViewModel({
      articles: publishedArticles,
      homepage,
      profile,
      projectsCount: completedProjectsCount,
      testimonials: approvedTestimonials,
    }),
    hero: buildHeroViewModel({
      homepage,
      profile,
      projectsCount: completedProjectsCount,
      technologies,
    }),
  }
}
