import {
  getContact,
  getFeaturedProjects,
  getFeaturedTechStack,
  getHomepage,
  getProfile,
  getProjectsCount,
  getSocial,
} from '../queries'
import { buildContactSectionViewModel } from './contact'
import { buildCurrentMissionViewModel } from './current-mission'
import { buildEngineerProfileViewModel } from './engineer-profile'
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from './featured-projects'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import type {
  ContactSectionViewModel,
  CurrentMissionViewModel,
  EngineerProfileViewModel,
  FeaturedProjectViewModel,
  HeroViewModel,
} from './types'

const FEATURED_PROJECT_LIMIT = 3

export type HomepageContent = {
  contact: ContactSectionViewModel
  currentMission: CurrentMissionViewModel | null
  engineerProfile: EngineerProfileViewModel | null
  featuredProjects: FeaturedProjectViewModel[]
  hero: HeroViewModel
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [homepage, contact, profile, projectsCount, social] = await Promise.all([
    getHomepage(),
    getContact(),
    getProfile(),
    getProjectsCount(),
    getSocial(),
  ])

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
      projectsCount,
    }),
    featuredProjects: buildFeaturedProjectViewModels(projects),
    hero: buildHeroViewModel({
      homepage,
      profile,
      projectsCount,
      technologies,
    }),
  }
}
