import {
  ContactCTA,
  FeaturedProjects,
  Hero,
  TechStackSection,
  TestimonialsSection,
} from '@/components/home'
import {
  getApprovedTestimonials,
  getContact,
  getFeaturedProjects,
  getFeaturedTechStack,
  getHomepage,
} from '@/lib/cms'

export default async function HomePage() {
  const [homepage, featuredProjects, featuredTechStack, testimonials, contact] = await Promise.all([
    getHomepage(),
    getFeaturedProjects(),
    getFeaturedTechStack(),
    getApprovedTestimonials(),
    getContact(),
  ])

  return (
    <>
      <Hero hero={homepage.hero} />
      <FeaturedProjects projects={featuredProjects} />
      <TechStackSection technologies={featuredTechStack} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA contact={contact} contactSection={homepage.contactSection} />
    </>
  )
}
