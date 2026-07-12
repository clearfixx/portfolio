import type { Contact, Homepage } from '@/payload-types'

import {
  getContact,
  getFeaturedProjects,
  getFeaturedTechStack,
  getHomepage,
  getProfile,
  getProjectsCount,
} from '../queries'
import { buildFeaturedProjectViewModels, getSelectedFeaturedProjects } from './featured-projects'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import type { FeaturedProjectViewModel, HeroViewModel } from './types'

const FEATURED_PROJECT_LIMIT = 3

export type HomepageContent = {
  contact: Contact
  featuredProjects: FeaturedProjectViewModel[]
  hero: HeroViewModel
  homepage: Homepage
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [homepage, contact, profile, projectsCount] = await Promise.all([
    getHomepage(),
    getContact(),
    getProfile(),
    getProjectsCount(),
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
    contact,
    featuredProjects: buildFeaturedProjectViewModels(projects),
    hero: buildHeroViewModel({
      homepage,
      profile,
      projectsCount,
      technologies,
    }),
    homepage,
  }
}
