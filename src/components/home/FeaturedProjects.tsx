import type { Project } from '@/payload-types'

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
        <div className="section-heading">
          <p className="section-heading__eyebrow">Selected work</p>
          <h2 className="section-heading__title">Featured Projects</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <p className="project-card__stage">{project.stage}</p>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__excerpt">{project.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
