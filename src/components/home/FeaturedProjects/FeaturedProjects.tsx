import Link from 'next/link'
import { CubeIcon } from '@/components/icons'

import { PortfolioSection } from '../PortfolioSection'
import { featuredProjects } from './data'
import { ProjectCard } from './ProjectCard'

export function FeaturedProjects() {
  return (
    <PortfolioSection
      id="projects"
      eyebrow="Engineering Portfolio"
      title="Selected Projects"
      description="A showcase of products I've built across different domains. Each project is a reflection of solving real problems with code."
      number="02"
      headerAction={
        <Link className="featured-projects__view-all" href="/projects">
          View all projects
          <span aria-hidden="true">→</span>
        </Link>
      }
      footer={{
        icon: CubeIcon,
        label: 'From ideas to production',
        text: 'building digital products that solve real problems.',
      }}
    >
      <div className="featured-projects__grid">
        {featuredProjects.map((project, index) => (
          <ProjectCard index={index + 1} project={project} key={project.id} />
        ))}
      </div>
    </PortfolioSection>
  )
}
