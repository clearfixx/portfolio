import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

const METRICS = [0, 1, 2, 3]
const CODE_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const FILTERS = [0, 1, 2, 3]
const PROJECT_ROWS = [0, 1, 2]
const STACK_ITEMS = [0, 1, 2, 3, 4]
const ROW_METRICS = [0, 1, 2, 3]
const ROW_ACTIONS = [0, 1, 2]

function SkeletonLine({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

function ProjectsRegistryEditorSkeleton() {
  return (
    <div className="projects-page-skeleton__editor">
      <div className="projects-page-skeleton__editor-titlebar">
        <span className="projects-page-skeleton__traffic">
          <i />
          <i />
          <i />
        </span>

        <span className="projects-page-skeleton__editor-file">
          <i />
          <SkeletonLine className="projects-page-skeleton__editor-file-name" />
          <SkeletonLine className="projects-page-skeleton__editor-file-meta" />
        </span>

        <SkeletonLine className="projects-page-skeleton__editor-language" />
      </div>

      <div className="projects-page-skeleton__editor-tabbar">
        <span className="projects-page-skeleton__editor-tab">
          <i />
          <SkeletonLine />
          <b />
        </span>
      </div>

      <div className="projects-page-skeleton__editor-workspace">
        <aside className="projects-page-skeleton__activitybar">
          <i />
          <i />
          <i />
          <i />
        </aside>

        <div className="projects-page-skeleton__editor-code">
          {CODE_ROWS.map((row) => (
            <div className="projects-page-skeleton__editor-row" key={row}>
              <SkeletonLine className="projects-page-skeleton__editor-line-number" />
              <SkeletonLine
                className={`projects-page-skeleton__editor-code-line projects-page-skeleton__editor-code-line--${
                  (row % 5) + 1
                }`}
              />
            </div>
          ))}
        </div>

        <div className="projects-page-skeleton__minimap">
          {CODE_ROWS.map((row) => (
            <i key={row} />
          ))}
        </div>
      </div>

      <div className="projects-page-skeleton__editor-statusbar">
        <SkeletonLine />
        <i />
        <SkeletonLine />
        <i />
        <SkeletonLine />
      </div>
    </div>
  )
}

function ProjectRowSkeleton({ index }: { index: number }) {
  return (
    <article className="projects-page-skeleton__project-row">
      <div className="projects-page-skeleton__project-visual">
        <span className="projects-page-skeleton__preview-window">
          <i />
          <i />
          <i />
          <SkeletonLine className="projects-page-skeleton__preview-title" />
          <SkeletonLine className="projects-page-skeleton__preview-line projects-page-skeleton__preview-line--1" />
          <SkeletonLine className="projects-page-skeleton__preview-line projects-page-skeleton__preview-line--2" />
          <SkeletonLine className="projects-page-skeleton__preview-line projects-page-skeleton__preview-line--3" />
        </span>

        <SkeletonLine className="projects-page-skeleton__project-badge" />
      </div>

      <div className="projects-page-skeleton__project-content">
        <div className="projects-page-skeleton__project-heading">
          <div>
            <SkeletonLine className="projects-page-skeleton__project-category" />
            <SkeletonLine
              className={`projects-page-skeleton__project-title projects-page-skeleton__project-title--${
                (index % 3) + 1
              }`}
            />
          </div>

          <SkeletonLine className="projects-page-skeleton__project-stage" />
        </div>

        <div className="projects-page-skeleton__project-copy">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </div>

        <div className="projects-page-skeleton__stack">
          {STACK_ITEMS.map((item) => (
            <SkeletonLine
              className={`projects-page-skeleton__stack-item projects-page-skeleton__stack-item--${
                (item % 3) + 1
              }`}
              key={item}
            />
          ))}
        </div>

        <div className="projects-page-skeleton__row-metrics">
          {ROW_METRICS.map((metric) => (
            <span key={metric}>
              <i />
              <b>
                <SkeletonLine />
                <SkeletonLine />
              </b>
            </span>
          ))}
        </div>
      </div>

      <aside className="projects-page-skeleton__project-rail">
        <div className="projects-page-skeleton__row-actions">
          {ROW_ACTIONS.map((action) => (
            <span key={action}>
              <i />
              <SkeletonLine />
              <b />
            </span>
          ))}
        </div>

        <div className="projects-page-skeleton__delivery">
          <span>
            <SkeletonLine />
            <SkeletonLine />
          </span>
          <i>
            <b />
          </i>
          <span>
            <SkeletonLine />
            <SkeletonLine />
          </span>
        </div>
      </aside>
    </article>
  )
}

export function ProjectsPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading projects" className="projects-loading">
      <section aria-hidden="true" className="projects-page-skeleton">
        <div className="projects-page-skeleton__grid" />

        <SiteHeaderSkeleton activeItem="projects" />

        <main className="site-container projects-page-skeleton__main">
          <div className="projects-page-skeleton__breadcrumbs">
            <SkeletonLine />
            <i />
            <SkeletonLine />
          </div>

          <section className="projects-page-skeleton__hero">
            <div className="projects-page-skeleton__hero-copy">
              <span className="projects-page-skeleton__eyebrow">
                <i />
                <SkeletonLine />
              </span>

              <SkeletonLine className="projects-page-skeleton__hero-title" />

              <div className="projects-page-skeleton__hero-description">
                <SkeletonLine />
                <SkeletonLine />
              </div>

              <div className="projects-page-skeleton__metrics">
                {METRICS.map((metric) => (
                  <article key={metric}>
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                  </article>
                ))}
              </div>
            </div>

            <ProjectsRegistryEditorSkeleton />
          </section>

          <section className="projects-page-skeleton__directory">
            <div className="projects-page-skeleton__controls">
              <div className="projects-page-skeleton__filters">
                {FILTERS.map((filter) => (
                  <SkeletonLine
                    className={`projects-page-skeleton__filter projects-page-skeleton__filter--${
                      (filter % 3) + 1
                    }`}
                    key={filter}
                  />
                ))}
              </div>

              <div className="projects-page-skeleton__tools">
                <SkeletonLine className="projects-page-skeleton__search" />
                <SkeletonLine className="projects-page-skeleton__sort" />
              </div>
            </div>

            <div className="projects-page-skeleton__rows">
              {PROJECT_ROWS.map((row) => (
                <ProjectRowSkeleton index={row} key={row} />
              ))}
            </div>
          </section>

          <section className="projects-page-skeleton__cta">
            <div className="projects-page-skeleton__terminal">
              <SkeletonLine className="projects-page-skeleton__terminal-label" />
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
            </div>

            <div className="projects-page-skeleton__cta-copy">
              <SkeletonLine className="projects-page-skeleton__cta-eyebrow" />
              <SkeletonLine className="projects-page-skeleton__cta-title" />
              <SkeletonLine className="projects-page-skeleton__cta-title projects-page-skeleton__cta-title--short" />

              <div className="projects-page-skeleton__cta-links">
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
              </div>
            </div>

            <div className="projects-page-skeleton__map">
              <span />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}
