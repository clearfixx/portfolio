import type { Contact, Homepage } from '@/payload-types'

import {
  getContact,
  getFeaturedTechStack,
  getHomepage,
  getProfile,
  getProjectsCount,
} from '../queries'
import { buildHeroViewModel, getSelectedTechStack } from './hero'
import type { HeroViewModel } from './types'

export type HomepageContent = {
  contact: Contact
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
  const technologies =
    selectedTechStack.length > 0 ? selectedTechStack : await getFeaturedTechStack(8)

  return {
    contact,
    hero: buildHeroViewModel({
      homepage,
      profile,
      projectsCount,
      technologies,
    }),
    homepage,
  }
}
