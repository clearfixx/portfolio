import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

const TERMINAL_ROWS = [0, 1, 2, 3]
const METRIC_CARDS = [0, 1, 2, 3]
const EDITOR_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const STATUS_CARDS = [0, 1, 2, 3]
const TECHNOLOGIES = [0, 1, 2, 3, 4, 5, 6, 7]

function SkeletonLine({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

export function HomePageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading homepage" className="home-loading">
      <section aria-hidden="true" className="home-hero-skeleton">
        <div className="home-hero-skeleton__grid" />

        <SiteHeaderSkeleton activeItem="home" />

        <div className="site-container home-hero-skeleton__shell">
          <div className="home-hero-skeleton__dashboard">
            <aside className="home-hero-skeleton__left-column">
              <div className="home-hero-skeleton__panel home-hero-skeleton__system">
                <div className="home-hero-skeleton__panel-head">
                  <SkeletonLine className="home-hero-skeleton__panel-title" />

                  <span className="home-hero-skeleton__online">
                    <i />
                    <SkeletonLine className="home-hero-skeleton__online-line" />
                  </span>
                </div>

                <div className="home-hero-skeleton__terminal">
                  {TERMINAL_ROWS.map((row) => (
                    <div className="home-hero-skeleton__terminal-row" key={row}>
                      <span className="home-hero-skeleton__prompt" />
                      <SkeletonLine
                        className={`home-hero-skeleton__terminal-line home-hero-skeleton__terminal-line--${
                          (row % 3) + 1
                        }`}
                      />
                      <SkeletonLine className="home-hero-skeleton__terminal-state" />
                    </div>
                  ))}
                </div>

                <div className="home-hero-skeleton__progress">
                  <div className="home-hero-skeleton__progress-meta">
                    <SkeletonLine className="home-hero-skeleton__progress-value" />
                    <SkeletonLine className="home-hero-skeleton__progress-label" />
                  </div>

                  <span className="home-hero-skeleton__progress-track">
                    <i />
                  </span>
                </div>
              </div>

              <div className="home-hero-skeleton__panel home-hero-skeleton__telemetry">
                <div className="home-hero-skeleton__panel-head">
                  <SkeletonLine className="home-hero-skeleton__panel-title home-hero-skeleton__panel-title--wide" />

                  <span className="home-hero-skeleton__online">
                    <i />
                    <SkeletonLine className="home-hero-skeleton__online-line home-hero-skeleton__online-line--short" />
                  </span>
                </div>

                <div className="home-hero-skeleton__metric-grid">
                  {METRIC_CARDS.map((card) => (
                    <div className="home-hero-skeleton__metric-card" key={card}>
                      <SkeletonLine
                        className={`home-hero-skeleton__metric-value home-hero-skeleton__metric-value--${
                          (card % 3) + 1
                        }`}
                      />
                      <SkeletonLine className="home-hero-skeleton__metric-label" />
                      <span className="home-hero-skeleton__metric-rule" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="home-hero-skeleton__intro">
              <div className="home-hero-skeleton__intro-copy">
                <div className="home-hero-skeleton__greeting">
                  <span className="home-hero-skeleton__greeting-mark" />
                  <SkeletonLine className="home-hero-skeleton__greeting-line" />
                </div>

                <SkeletonLine className="home-hero-skeleton__name" />

                <div className="home-hero-skeleton__statement">
                  <SkeletonLine className="home-hero-skeleton__statement-line home-hero-skeleton__statement-line--1" />
                  <SkeletonLine className="home-hero-skeleton__statement-line home-hero-skeleton__statement-line--2" />
                  <SkeletonLine className="home-hero-skeleton__statement-line home-hero-skeleton__statement-line--3" />
                </div>

                <div className="home-hero-skeleton__actions">
                  <SkeletonLine className="home-hero-skeleton__button home-hero-skeleton__button--primary" />
                  <SkeletonLine className="home-hero-skeleton__button" />
                </div>
              </div>

              <div className="home-hero-skeleton__scroll-cue">
                <SkeletonLine className="home-hero-skeleton__scroll-label" />
                <span className="home-hero-skeleton__scroll-line">
                  <i />
                </span>
              </div>
            </div>

            <div className="home-hero-skeleton__panel home-hero-skeleton__editor">
              <div className="home-hero-skeleton__editor-head">
                <span className="home-hero-skeleton__file-icon" />

                <div className="home-hero-skeleton__file-name">
                  <SkeletonLine className="home-hero-skeleton__file-title" />
                  <SkeletonLine className="home-hero-skeleton__file-path" />
                </div>

                <span className="home-hero-skeleton__editor-language">
                  <i />
                  <SkeletonLine className="home-hero-skeleton__language-line" />
                </span>
              </div>

              <div className="home-hero-skeleton__code">
                {EDITOR_ROWS.map((row) => (
                  <div className="home-hero-skeleton__code-row" key={row}>
                    <SkeletonLine className="home-hero-skeleton__line-number" />
                    <SkeletonLine
                      className={`home-hero-skeleton__code-line home-hero-skeleton__code-line--${
                        (row % 5) + 1
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="home-hero-skeleton__editor-footer">
                <SkeletonLine className="home-hero-skeleton__editor-meta home-hero-skeleton__editor-meta--1" />
                <i />
                <SkeletonLine className="home-hero-skeleton__editor-meta home-hero-skeleton__editor-meta--2" />
                <i />
                <SkeletonLine className="home-hero-skeleton__editor-meta home-hero-skeleton__editor-meta--3" />
              </div>
            </div>

            <aside className="home-hero-skeleton__status-column">
              {STATUS_CARDS.map((card) => (
                <div
                  className="home-hero-skeleton__panel home-hero-skeleton__status-card"
                  key={card}
                >
                  <span
                    className={`home-hero-skeleton__status-icon home-hero-skeleton__status-icon--${card + 1}`}
                  >
                    <i />
                  </span>
                  <SkeletonLine className="home-hero-skeleton__status-label" />
                  <SkeletonLine className="home-hero-skeleton__status-value" />
                  <SkeletonLine className="home-hero-skeleton__status-detail" />
                </div>
              ))}
            </aside>
          </div>

          <div className="home-hero-skeleton__panel home-hero-skeleton__technology-strip">
            <SkeletonLine className="home-hero-skeleton__technology-title" />

            <div className="home-hero-skeleton__technology-list">
              {TECHNOLOGIES.map((technology) => (
                <div className="home-hero-skeleton__technology" key={technology}>
                  <span />
                  <SkeletonLine
                    className={`home-hero-skeleton__technology-line home-hero-skeleton__technology-line--${
                      (technology % 4) + 1
                    }`}
                  />
                </div>
              ))}
            </div>

            <SkeletonLine className="home-hero-skeleton__technology-more" />
          </div>
        </div>
      </section>
    </div>
  )
}
