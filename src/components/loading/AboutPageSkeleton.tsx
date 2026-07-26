import {
  PublicSkeletonFrame,
  SkeletonBreadcrumbs,
  SkeletonDescription,
  SkeletonEyebrow,
  SkeletonLine,
  SkeletonTitle,
} from './PublicSkeletonPrimitives'

const DETAILS = [0, 1, 2, 3, 4]
const SUMMARY = [0, 1, 2]
const TIMELINE = [0, 1, 2, 3, 4]
const PRINCIPLES = [0, 1, 2, 3]
const PROCESS = [0, 1, 2, 3]

function ProfileConsoleSkeleton() {
  return (
    <div className="about-page-skeleton__console">
      <header>
        <span>
          <i />
          <i />
          <i />
        </span>
        <SkeletonLine />
        <SkeletonLine />
      </header>

      <div className="about-page-skeleton__console-body">
        <aside>
          <i className="is-active" />
          <i />
          <i />
          <i />
        </aside>

        <div className="about-page-skeleton__avatar-stage">
          <span className="is-orbit" />
          <span className="is-orbit-inner" />
          <div className="is-avatar">
            <SkeletonLine />
            <SkeletonLine />
          </div>
          <i className="is-online" />
        </div>

        <div className="about-page-skeleton__console-details">
          {DETAILS.map((detail) => (
            <span key={detail}>
              <SkeletonLine />
              <SkeletonLine />
            </span>
          ))}
        </div>
      </div>

      <footer>
        <span>
          <i />
          <i />
          <i />
        </span>
        <SkeletonLine />
      </footer>
    </div>
  )
}

export function AboutPageSkeleton() {
  return (
    <PublicSkeletonFrame activeItem="about" label="Loading engineering profile">
      <SkeletonBreadcrumbs />

      <section className="public-skeleton__hero about-page-skeleton__hero">
        <div className="public-skeleton__hero-copy">
          <SkeletonEyebrow />
          <SkeletonTitle accentWidth="74%" leadingWidth="84%" />
          <SkeletonDescription lines={3} />

          <div className="about-page-skeleton__hero-actions">
            <SkeletonLine />
            <SkeletonLine />
          </div>
        </div>

        <ProfileConsoleSkeleton />
      </section>

      <section className="about-page-skeleton__identity">
        <div className="about-page-skeleton__portrait">
          <span />
          <i />
          <b />
        </div>

        <div className="about-page-skeleton__identity-copy">
          <SkeletonLine className="is-kicker" />
          <SkeletonLine className="is-title" />
          <span>
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
          </span>

          <div>
            {SUMMARY.map((item) => (
              <article key={item}>
                <i />
                <span>
                  <SkeletonLine />
                  <SkeletonLine />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page-skeleton__timeline">
        {TIMELINE.map((item) => (
          <article key={item}>
            <span>
              <i />
              <SkeletonLine />
            </span>
            <SkeletonLine className="is-title" />
            <SkeletonLine />
            <SkeletonLine />
            <div>
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
            </div>
          </article>
        ))}
      </section>

      <section className="about-page-skeleton__principles">
        {PRINCIPLES.map((item) => (
          <article key={item}>
            <i />
            <SkeletonLine className="is-title" />
            <SkeletonLine />
            <SkeletonLine />
          </article>
        ))}
      </section>

      <section className="about-page-skeleton__process">
        {PROCESS.map((item) => (
          <article key={item}>
            <i />
            <span>
              <SkeletonLine />
              <SkeletonLine className="is-title" />
              <SkeletonLine />
            </span>
          </article>
        ))}
      </section>
    </PublicSkeletonFrame>
  )
}

// page-specific-unified-skeletons-v1-9
