import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

const TABS = [0, 1, 2, 3, 4]
const STACK = [0, 1, 2, 3, 4, 5]
const HERO_CODE_ROWS = [0, 1, 2, 3, 4, 5]
const OVERVIEW_LINES = [0, 1, 2, 3, 4]
const CODE_ROWS = [0, 1, 2, 3, 4, 5, 6]
const HIGHLIGHTS = [0, 1, 2, 3]
const FEATURES = [0, 1, 2, 3, 4, 5]
const ARCHITECTURE = [0, 1, 2, 3]
const CHANGELOG = [0, 1, 2]
const GALLERY = [0, 1, 2]

function SkeletonLine({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

function ProjectDetailMediaSkeleton() {
  return (
    <div className="project-detail-skeleton__media">
      <div className="project-detail-skeleton__media-chrome">
        <span>
          <i />
          <i />
          <i />
        </span>
        <SkeletonLine />
      </div>

      <div className="project-detail-skeleton__media-body">
        <aside>
          <SkeletonLine />
          <i className="is-active" />
          <i />
          <i />
          <i />
          <i />
        </aside>

        <div className="project-detail-skeleton__media-content">
          <SkeletonLine className="project-detail-skeleton__media-eyebrow" />
          <SkeletonLine className="project-detail-skeleton__media-title" />
          <SkeletonLine className="project-detail-skeleton__media-copy" />

          <div className="project-detail-skeleton__media-metrics">
            {[0, 1, 2].map((metric) => (
              <span key={metric}>
                <SkeletonLine />
                <SkeletonLine />
              </span>
            ))}
          </div>

          <div className="project-detail-skeleton__media-code">
            {HERO_CODE_ROWS.map((row) => (
              <span key={row}>
                <SkeletonLine
                  className={`project-detail-skeleton__media-code-line project-detail-skeleton__media-code-line--${
                    (row % 4) + 1
                  }`}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="project-detail-skeleton__media-thumbs">
        {[0, 1, 2, 3].map((thumb) => (
          <span className={thumb === 0 ? 'is-active' : undefined} key={thumb}>
            <i />
            <SkeletonLine />
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectDetailPanelHeader({ short = false }: { short?: boolean }) {
  return (
    <div className="project-detail-skeleton__panel-header">
      <span>
        <SkeletonLine />
        <SkeletonLine className={short ? 'is-short' : undefined} />
      </span>
      <i />
    </div>
  )
}

export function ProjectDetailPageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project case study"
      className="project-detail-loading"
    >
      <section aria-hidden="true" className="project-detail-skeleton">
        <div className="project-detail-skeleton__grid" />

        <SiteHeaderSkeleton activeItem="projects" />

        <main className="site-container project-detail-skeleton__main">
          <div className="project-detail-skeleton__breadcrumbs">
            <SkeletonLine />
            <i />
            <SkeletonLine />
            <i />
            <SkeletonLine />
          </div>

          <section className="project-detail-skeleton__hero">
            <div className="project-detail-skeleton__hero-copy">
              <div className="project-detail-skeleton__status">
                <i />
                <SkeletonLine />
              </div>

              <SkeletonLine className="project-detail-skeleton__category" />
              <SkeletonLine className="project-detail-skeleton__title" />

              <div className="project-detail-skeleton__tagline">
                <SkeletonLine />
                <SkeletonLine />
              </div>

              <div className="project-detail-skeleton__excerpt">
                <SkeletonLine />
                <SkeletonLine />
              </div>

              <div className="project-detail-skeleton__stack">
                {STACK.map((item) => (
                  <SkeletonLine
                    className={`project-detail-skeleton__stack-item project-detail-skeleton__stack-item--${
                      (item % 3) + 1
                    }`}
                    key={item}
                  />
                ))}
              </div>

              <div className="project-detail-skeleton__actions">
                <SkeletonLine className="is-primary" />
                <SkeletonLine />
                <SkeletonLine />
              </div>
            </div>

            <ProjectDetailMediaSkeleton />
          </section>

          <nav className="project-detail-skeleton__tabs">
            {TABS.map((tab) => (
              <span className={tab === 0 ? 'is-active' : undefined} key={tab}>
                <SkeletonLine />
              </span>
            ))}
          </nav>

          <div className="project-detail-skeleton__workspace">
            <div className="project-detail-skeleton__workspace-main">
              <section className="project-detail-skeleton__panel project-detail-skeleton__overview">
                <ProjectDetailPanelHeader />

                <div className="project-detail-skeleton__overview-grid">
                  <div className="project-detail-skeleton__overview-copy">
                    <SkeletonLine className="project-detail-skeleton__lead" />

                    <div>
                      {OVERVIEW_LINES.map((line) => (
                        <SkeletonLine
                          className={`project-detail-skeleton__paragraph-line project-detail-skeleton__paragraph-line--${
                            (line % 4) + 1
                          }`}
                          key={line}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="project-detail-skeleton__code-card">
                    <div className="project-detail-skeleton__code-head">
                      <SkeletonLine />
                      <SkeletonLine />
                    </div>

                    <div className="project-detail-skeleton__code-body">
                      {CODE_ROWS.map((row) => (
                        <span key={row}>
                          <SkeletonLine />
                          <SkeletonLine
                            className={`project-detail-skeleton__code-line project-detail-skeleton__code-line--${
                              (row % 4) + 1
                            }`}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-detail-skeleton__highlights">
                  {HIGHLIGHTS.map((highlight) => (
                    <article key={highlight}>
                      <i />
                      <span>
                        <SkeletonLine />
                        <SkeletonLine />
                        <SkeletonLine />
                      </span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="project-detail-skeleton__panel">
                <ProjectDetailPanelHeader short />

                <div className="project-detail-skeleton__features">
                  {FEATURES.map((feature) => (
                    <article key={feature}>
                      <i />
                      <SkeletonLine />
                      <SkeletonLine />
                      <SkeletonLine />
                    </article>
                  ))}
                </div>
              </section>

              <section className="project-detail-skeleton__panel">
                <ProjectDetailPanelHeader />

                <div className="project-detail-skeleton__architecture">
                  {ARCHITECTURE.map((step) => (
                    <article key={step}>
                      <i />
                      <SkeletonLine />
                      <SkeletonLine />
                      <b />
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="project-detail-skeleton__sidebar">
              <section>
                <SkeletonLine />
                <div className="project-detail-skeleton__sidebar-list">
                  {[0, 1, 2, 3].map((item) => (
                    <span key={item}>
                      <i />
                      <b>
                        <SkeletonLine />
                        <SkeletonLine />
                      </b>
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <SkeletonLine />
                <div className="project-detail-skeleton__progress">
                  <span>
                    <SkeletonLine />
                    <SkeletonLine />
                  </span>
                  <i>
                    <b />
                  </i>
                </div>
              </section>

              <section>
                <SkeletonLine />
                <div className="project-detail-skeleton__sidebar-actions">
                  {[0, 1, 2].map((item) => (
                    <span key={item}>
                      <i />
                      <SkeletonLine />
                      <b />
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <div className="project-detail-skeleton__lower">
            <section className="project-detail-skeleton__panel">
              <ProjectDetailPanelHeader short />

              <div className="project-detail-skeleton__changelog">
                {CHANGELOG.map((entry) => (
                  <article key={entry}>
                    <SkeletonLine />
                    <i />
                    <span>
                      <SkeletonLine />
                      <SkeletonLine />
                      <SkeletonLine />
                    </span>
                    <SkeletonLine />
                  </article>
                ))}
              </div>
            </section>

            <section className="project-detail-skeleton__panel">
              <ProjectDetailPanelHeader />

              <div className="project-detail-skeleton__gallery">
                {GALLERY.map((image) => (
                  <figure key={image}>
                    <span>
                      <i />
                      <i />
                      <i />
                      <SkeletonLine />
                      <SkeletonLine />
                    </span>
                    <SkeletonLine />
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <section className="project-detail-skeleton__cta">
            <div>
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine className="is-short" />
            </div>

            <div>
              <SkeletonLine />
              <SkeletonLine />
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}
