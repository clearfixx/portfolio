import Image from 'next/image'

import { CubeIcon } from '@/components/icons'
import type { FeaturedProjectViewModel } from '@/lib/cms/homepage'

type ProjectCardProps = {
  project: FeaturedProjectViewModel
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const progressStyle = {
    width: `${project.progress}%`,
  }
  const isExternalLink = project.href ? /^https?:\/\//i.test(project.href) : false

  return (
    <article className={`featured-project-card featured-project-card--${project.accent}`}>
      <header className="featured-project-card__top">
        <span className="featured-project-card__index">{String(index).padStart(2, '0')}</span>
        <span className="featured-project-card__stage">{project.stage}</span>
        <span className="featured-project-card__percent">{project.progress}%</span>
      </header>

      {project.image ? (
        <div className="featured-project-card__image-preview">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1180px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="featured-project-card__preview" aria-hidden="true">
          <div className="featured-project-card__preview-sidebar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="featured-project-card__preview-content">
            <p>{project.previewLabel}</p>
            <span>{project.status}</span>
          </div>
        </div>
      )}

      <div className="featured-project-card__title-row">
        <span className="featured-project-card__icon" aria-hidden="true">
          <CubeIcon />
        </span>
        <h3 className="featured-project-card__title">{project.title}</h3>
      </div>

      <p className="featured-project-card__excerpt">{project.excerpt}</p>

      {project.stack.length > 0 ? (
        <ul className="featured-project-card__stack" aria-label={`${project.title} tech stack`}>
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      ) : null}

      <div className="featured-project-card__progress-row">
        <div className="featured-project-card__progress" aria-hidden="true">
          <span style={progressStyle} />
        </div>
        <strong>{project.progress}%</strong>
      </div>

      {project.href ? (
        <a
          className="featured-project-card__link"
          href={project.href}
          rel={isExternalLink ? 'noreferrer' : undefined}
          target={isExternalLink ? '_blank' : undefined}
        >
          {project.linkLabel}
          <span aria-hidden="true">→</span>
        </a>
      ) : (
        <span className="featured-project-card__link" aria-disabled="true">
          {project.linkLabel}
        </span>
      )}
    </article>
  )
}
