import type { Project } from '@/payload-types'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <p className="project-card__stage">{project.stage}</p>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__excerpt">{project.excerpt}</p>
    </article>
  )
}
