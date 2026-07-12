import { CubeIcon } from '@/components/icons'
import type { FeaturedProjectViewModel } from '@/lib/cms/homepage'

import { PortfolioSection } from '../PortfolioSection'
import { ProjectCard } from './ProjectCard'

type FeaturedProjectsProps = {
  projects: FeaturedProjectViewModel[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <PortfolioSection
      id="projects"
      eyebrow="Engineering Portfolio"
      title="Selected Projects"
      description="A showcase of products I've built across different domains. Each project is a reflection of solving real problems with code."
      number="02"
      footer={{
        icon: CubeIcon,
        label: 'From ideas to production',
        text: 'building digital products that solve real problems.',
      }}
    >
      {projects.length > 0 ? (
        <div className="featured-projects__grid">
          {projects.map((project, index) => (
            <ProjectCard index={index + 1} project={project} key={project.id} />
          ))}
        </div>
      ) : (
        <p className="featured-projects__empty" role="status">
          Project case studies are being prepared for publication.
        </p>
      )}
    </PortfolioSection>
  )
}
