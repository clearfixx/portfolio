import type { CurrentMissionProjectViewModel } from '@/lib/cms/homepage'

type MissionIntroProps = {
  project: CurrentMissionProjectViewModel
}

export function MissionIntro({ project }: MissionIntroProps) {
  return (
    <div
      className="current-mission__content"
      data-motion="slide-left"
      data-motion-duration="section"
      data-motion-delay="1"
    >
      <p className="current-mission__tagline">{project.tagline}</p>

      <div className="current-mission__copy">
        <p>{project.excerpt}</p>
        <p>
          {project.stage}
          {project.version ? ` · Version ${project.version}` : null}
          {` · ${project.progress}% complete`}
        </p>
      </div>

      {project.stack.length > 0 ? (
        <>
          <p className="current-mission__stack-label">Mission stack</p>
          <ul className="current-mission__tech-list" aria-label={`${project.title} tech stack`}>
            {project.stack.map((technology) => (
              <li className="current-mission__tech-item" key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {project.cta ? (
        <a
          className="current-mission__link"
          href={project.cta.href}
          rel={project.cta.external ? 'noreferrer' : undefined}
          target={project.cta.external ? '_blank' : undefined}
        >
          {project.cta.label}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="current-mission__link" aria-disabled="true">
          Case study in preparation
        </span>
      )}
    </div>
  )
}
