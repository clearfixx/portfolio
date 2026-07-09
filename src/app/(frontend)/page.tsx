import {
  ContactCTA,
  CurrentMission,
  FeaturedProjects,
  EngineerProfile,
  Hero,
  InsightsTrust,
  SkillsTechnologies,
} from '@/components/home'
import { getContact, getHomepage } from '@/lib/cms'

export default async function HomePage() {
  const [homepage, contact] = await Promise.all([getHomepage(), getContact()])

  return (
    <>
      <Hero hero={homepage.hero} />
      <CurrentMission />
      <FeaturedProjects />
      <EngineerProfile />
      <SkillsTechnologies />
      <InsightsTrust />
      <ContactCTA contact={contact} contactSection={homepage.contactSection} />
    </>
  )
}
