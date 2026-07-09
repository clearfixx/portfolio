import {
  ContactCTA,
  CurrentMission,
  FeaturedProjects,
  EngineerProfile,
  Hero,
  TestimonialsSection,
  SkillsTechnologies,
} from '@/components/home'
import { getApprovedTestimonials, getContact, getHomepage } from '@/lib/cms'

export default async function HomePage() {
  const [homepage, testimonials, contact] = await Promise.all([
  getHomepage(),
  getApprovedTestimonials(),
  getContact(),
])

  return (
    <>
      <Hero hero={homepage.hero} />

      <CurrentMission />

      <FeaturedProjects />

      <TestimonialsSection testimonials={testimonials} />

      <EngineerProfile />

      <SkillsTechnologies />

      <ContactCTA contact={contact} contactSection={homepage.contactSection} />
    </>
  )
}
