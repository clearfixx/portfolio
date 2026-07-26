import {
  EditorSkeleton,
  PublicSkeletonFrame,
  SkeletonBreadcrumbs,
  SkeletonDescription,
  SkeletonEyebrow,
  SkeletonLine,
  SkeletonMetrics,
  SkeletonTitle,
} from './PublicSkeletonPrimitives'

const FILTERS = [0, 1, 2, 3]
const PROJECT_ROWS = [0, 1, 2]
const STACK = [0, 1, 2, 3, 4]
const ROW_METRICS = [0, 1, 2, 3]
const ACTIONS = [0, 1, 2]

function ProjectRowSkeleton({ index }: { index: number }) {
  return (
    <article className="projects-page-skeleton__row" data-skeleton-index={index}>
      <div className="projects-page-skeleton__media">
        <header>
          <span>
            <i />
            <i />
            <i />
          </span>
          <SkeletonLine />
        </header>

        <div>
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </div>

        <SkeletonLine className="is-badge" />
      </div>

      <div className="projects-page-skeleton__row-copy">
        <header>
          <span>
            <SkeletonLine />
            <SkeletonLine className="is-project-title" />
          </span>
          <SkeletonLine className="is-stage" />
        </header>

        <div className="projects-page-skeleton__row-description">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </div>

        <div className="projects-page-skeleton__stack">
          {STACK.map((item) => (
            <SkeletonLine key={item} />
          ))}
        </div>

        <footer>
          {ROW_METRICS.map((metric) => (
            <span key={metric}>
              <i />
              <b>
                <SkeletonLine />
                <SkeletonLine />
              </b>
            </span>
          ))}
        </footer>
      </div>

      <aside className="projects-page-skeleton__row-actions">
        {ACTIONS.map((action) => (
          <SkeletonLine key={action} />
        ))}
        <i />
        <span>
          <SkeletonLine />
          <SkeletonLine />
        </span>
      </aside>
    </article>
  )
}

export function ProjectsPageSkeleton() {
  return (
    <PublicSkeletonFrame activeItem="projects" label="Loading projects">
      <SkeletonBreadcrumbs />

      <section className="public-skeleton__hero projects-page-skeleton__hero">
        <div className="public-skeleton__hero-copy">
          <SkeletonEyebrow />
          <SkeletonTitle accentWidth="58%" leadingWidth="78%" />
          <SkeletonDescription />
          <SkeletonMetrics />
        </div>

        <EditorSkeleton variant="projects" />
      </section>

      <section className="projects-page-skeleton__directory">
        <div className="projects-page-skeleton__toolbar">
          <div>
            {FILTERS.map((filter) => (
              <SkeletonLine key={filter} />
            ))}
          </div>
          <div>
            <SkeletonLine className="is-search" />
            <SkeletonLine className="is-sort" />
          </div>
        </div>

        <div className="projects-page-skeleton__rows">
          {PROJECT_ROWS.map((row) => (
            <ProjectRowSkeleton index={row} key={row} />
          ))}
        </div>
      </section>
    </PublicSkeletonFrame>
  )
}

// page-specific-unified-skeletons-v1-9
