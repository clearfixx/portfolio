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
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from './featured-projects'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import type { ContactSectionViewModel, FeaturedProjectViewModel, HeroViewModel } from './types'

const FEATURED_PROJECT_LIMIT = 3

export type HomepageContent = {
  contact: ContactSectionViewModel
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
    featuredProjects: buildFeaturedProjectViewModels(projects),
    hero: buildHeroViewModel({
      homepage,
      profile,
      projectsCount,
      technologies,
    }),
  }
}
