import {
  ContactCTA,
  CurrentMission,
  DeliveryPipeline,
  FeaturedProjects,
  EngineerProfile,
  Hero,
  InsightsTrust,
  SkillsTechnologies,
  SiteFooter,
} from '@/components/home'
import { ScrollStack } from '@/components/motion'

import { getContact, getHomepage } from '@/lib/cms'

export default async function HomePage() {
  const [homepage, contact] = await Promise.all([getHomepage(), getContact()])

  return (
    <>
      <Hero hero={homepage.hero} />

      <CurrentMission />

      <ScrollStack className="portfolio-stack">
        <FeaturedProjects />

        <EngineerProfile />

        <SkillsTechnologies />
      </ScrollStack>

      <DeliveryPipeline />

      <InsightsTrust />

      <ContactCTA contact={contact} contactSection={homepage.contactSection} />

      <SiteFooter />
    </>
  )
}
