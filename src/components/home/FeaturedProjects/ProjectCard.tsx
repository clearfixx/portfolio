import type { FeaturedProject } from './data'

type ProjectCardProps = {
  project: FeaturedProject
  variant?: 'primary' | 'secondary'
}

export function ProjectCard({ project, variant = 'secondary' }: ProjectCardProps) {
  return (
    <article className={`featured-project-card featured-project-card--${variant}`}>
      <div className="featured-project-card__visual" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="featured-project-card__content">
        <div className="featured-project-card__meta">
          <span>{project.stage}</span>
          <span>{project.status}</span>
          <span>{project.progress}% complete</span>
        </div>

        <h3 className="featured-project-card__title">{project.title}</h3>

        <p className="featured-project-card__excerpt">{project.excerpt}</p>

        <ul className="featured-project-card__stack" aria-label={`${project.title} tech stack`}>
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="featured-project-card__progress" aria-label={`${project.title} progress`}>
          <span style={{ width: `${project.progress}%` }} />
        </div>
      </div>
    </article>
  )
}
