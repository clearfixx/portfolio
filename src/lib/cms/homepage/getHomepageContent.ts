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
} from '../queries'
import { buildContactSectionViewModel } from './contact'
import { buildCurrentMissionViewModel } from './current-mission'
import { buildEngineerProfileViewModel } from './engineer-profile'
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from './featured-projects'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import { buildInsightsTrustViewModel } from './insights-trust'
import { buildSkillsSectionViewModel } from './skills'
import { calculateCompletedProjectsTotal } from './project-metrics'
import type {
  ContactSectionViewModel,
  CurrentMissionViewModel,
  EngineerProfileViewModel,
  FeaturedProjectViewModel,
  HeroViewModel,
  InsightsTrustViewModel,
  SkillsSectionViewModel,
} from './types'

const FEATURED_PROJECT_LIMIT = 3

export type HomepageContent = {
  contact: ContactSectionViewModel
  currentMission: CurrentMissionViewModel | null
  engineerProfile: EngineerProfileViewModel | null
  featuredProjects: FeaturedProjectViewModel[]
  hero: HeroViewModel
  insightsTrust: InsightsTrustViewModel | null
  skills: SkillsSectionViewModel
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
  ] = await Promise.all([
    getHomepage(),
    getContact(),
    getProfile(),
    getProjectsCount(),
    getSocial(),
    getPublishedBlogPosts(6),
    getApprovedTestimonials(6),
  ])

  const completedProjectsCount = calculateCompletedProjectsTotal(
    profile.completedProjectsOutsidePortfolio,
    publishedProjectsCount,
  )

  const visibleTechStack = await getVisibleTechStack()

  const selectedTechStack = getSelectedTechStack(homepage.selectedTechStack)
  const selectedFeaturedProjects = getSelectedFeaturedProjects(homepage.featuredProjects).slice(
    0,
    FEATURED_PROJECT_LIMIT,
  )

  const [technologies, projects] = await Promise.all([
    selectedTechStack.length > 0 ? Promise.resolve(selectedTechStack) : getFeaturedTechStack(8),
    selectedFeaturedProjects.length > 0
      ? Promise.resolve(selectedFeaturedProjects)
      : getFeaturedProjects(FEATURED_PROJECT_LIMIT),
  ])

  return {
    contact: buildContactSectionViewModel({
      contact,
      homepage,
      profile,
      social,
    }),
    currentMission: buildCurrentMissionViewModel(homepage),
    engineerProfile: buildEngineerProfileViewModel({
      homepage,
      profile,
      projectsCount: completedProjectsCount,
    }),
    featuredProjects: buildFeaturedProjectViewModels(projects),
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
