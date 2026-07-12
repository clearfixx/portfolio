import {
  ContactCTA,
  CurrentMission,
  DeliveryPipeline,
  EngineerProfile,
  FeaturedProjects,
  Hero,
  InsightsTrust,
  SiteFooter,
  SkillsTechnologies,
} from '@/components/home'
import { getHomepageContent } from '@/lib/cms'
import { ScrollStack } from '@/components/motion'

export default async function HomePage() {
  const { contact, featuredProjects, hero, homepage } = await getHomepageContent()

  return (
    <>
      <Hero content={hero} />
      <CurrentMission />
      <ScrollStack className="portfolio-stack">
        <FeaturedProjects projects={featuredProjects} />
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
