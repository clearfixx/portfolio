import type { Project } from '@/payload-types'

import { FeaturedProjectsIntro } from './FeaturedProjectsIntro'
import { ProjectCard } from './ProjectCard'

type FeaturedProjectsProps = {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="home-section" id="projects">
      <div className="site-container">
        <FeaturedProjectsIntro />

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
