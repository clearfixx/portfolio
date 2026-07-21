import type { Project } from '@/payload-types'

type ProjectVisualPlaceholderProps = {
  project: Project
  technologies: string[]
  variant: 'hero' | 'screenshots'
}

function normalizeVersion(value: string | null | undefined) {
  return value?.trim() || 'unversioned'
}

function getStageLabel(value: Project['stage']) {
  return value.replace(/-/g, ' ').toUpperCase()
}

export function ProjectVisualPlaceholder({
  project,
  technologies,
  variant,
}: ProjectVisualPlaceholderProps) {
  const stack = technologies.slice(0, 4)
  const progress = Math.min(100, Math.max(0, Math.round(project.progress ?? 0)))
  const version = normalizeVersion(project.currentVersion)

  if (variant === 'screenshots') {
    const panels = [
      {
        eyebrow: 'INTERFACE',
        title: 'Project workspace',
        lines: [project.title, getStageLabel(project.stage), `${progress}% complete`],
      },
      {
        eyebrow: 'SYSTEM',
        title: 'Architecture view',
        lines: stack.length > 0 ? stack : ['Application', 'Services', 'Data'],
      },
      {
        eyebrow: 'RELEASE',
        title: 'Delivery status',
        lines: [`Version ${version}`, `${progress}% progress`, 'Media pending'],
      },
    ]

    return (
      <div className="project-visual-placeholder project-visual-placeholder--screenshots">
        {panels.map((panel) => (
          <article key={panel.eyebrow}>
            <header>
              <span>{panel.eyebrow}</span>
              <i aria-hidden="true" />
            </header>

            <div className="project-visual-placeholder__window">
              <div className="project-visual-placeholder__rail" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="project-visual-placeholder__content">
                <small>{project.slug}</small>
                <strong>{panel.title}</strong>

                <ul>
                  {panel.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div
      aria-label={`${project.title} project media placeholder`}
      className="project-visual-placeholder project-visual-placeholder--hero"
      role="img"
    >
      <header className="project-visual-placeholder__chrome">
        <span aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <code>{project.slug}/project.preview.tsx</code>
      </header>

      <div className="project-visual-placeholder__hero-body">
        <aside aria-hidden="true">
          <strong>PROJECT</strong>
          <span className="is-active" />
          <span />
          <span />
          <span />
          <span />
        </aside>

        <div className="project-visual-placeholder__hero-main">
          <p>PROJECT_PREVIEW</p>
          <h2>{project.title}</h2>
          <span>{project.cardTagline || project.excerpt}</span>

          <dl>
            <div>
              <dt>Stage</dt>
              <dd>{getStageLabel(project.stage)}</dd>
            </div>
            <div>
              <dt>Progress</dt>
              <dd>{progress}%</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{version}</dd>
            </div>
          </dl>

          <pre>
            <code>{`const project = {
  slug: '${project.slug}',
  stage: '${project.stage}',
  progress: ${progress},
  stack: [${stack.map((item) => `'${item}'`).join(', ')}],
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
