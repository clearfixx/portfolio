import {
  ContactCTA,
  CurrentMission,
  FeaturedProjects,
  Hero,
  TestimonialsSection,
} from '@/components/home'
import {
  getApprovedTestimonials,
  getContact,
  getFeaturedProjects,
  getHomepage,
} from '@/lib/cms'

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

      <ContactCTA contact={contact} contactSection={homepage.contactSection} />
    </>
  )
}
