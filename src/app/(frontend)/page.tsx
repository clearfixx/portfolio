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
import { ScrollStack } from '@/components/motion'
import { getHomepageContent, getSiteFooterGitHubFeed } from '@/lib/cms'

export const revalidate = 300

export default async function HomePage() {
  const [content, githubFeed] = await Promise.all([getHomepageContent(), getSiteFooterGitHubFeed()])

  const {
    contact,
    currentMission,
    engineerProfile,
    featuredProjects,
    hero,
    skills,
    insightsTrust,
    deliveryPipeline,
    siteFooter,
  } = content

  return (
    <>
      <Hero content={hero} />
      <CurrentMission content={currentMission} />
      <ScrollStack className="portfolio-stack">
        <FeaturedProjects projects={featuredProjects} />
        <EngineerProfile content={engineerProfile} />
        <SkillsTechnologies content={skills} />
      </ScrollStack>
      {deliveryPipeline ? <DeliveryPipeline content={deliveryPipeline} /> : null}
      {insightsTrust ? <InsightsTrust content={insightsTrust} /> : null}
      <ContactCTA content={contact} />
      {siteFooter ? <SiteFooter content={siteFooter} githubFeed={githubFeed} /> : null}
    </>
  )
}
