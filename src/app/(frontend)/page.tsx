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
  const { contact, currentMission, engineerProfile, featuredProjects, hero, skills } =
    await getHomepageContent()

  return (
    <>
      <Hero content={hero} />
      <CurrentMission content={currentMission} />
      <ScrollStack className="portfolio-stack">
        <FeaturedProjects projects={featuredProjects} />
        <EngineerProfile content={engineerProfile} />
        <SkillsTechnologies content={skills} />
      </ScrollStack>
      <DeliveryPipeline />
      <InsightsTrust />
      <ContactCTA content={contact} />
      <SiteFooter />
    </>
  )
}
