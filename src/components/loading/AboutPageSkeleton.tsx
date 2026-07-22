import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

import styles from '@/app/(frontend)/styles/pages/about.module.scss'

const TIMELINE = [0, 1, 2, 3, 4]
const PRINCIPLES = [0, 1, 2, 3, 4, 5]
const PROCESS = [0, 1, 2, 3, 4, 5, 6]
const DETAILS = [0, 1, 2, 3, 4, 5]
const EXPERIENCE = [0, 1, 2, 3, 4, 5]
const SUMMARY = [0, 1, 2]

function Line({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`loading-skeleton__line ${styles.skeletonLine} ${className}`}
    />
  )
}

function SkeletonSectionHeading() {
  return (
    <div className={styles.skeletonSectionHeading}>
      <Line />
      <div>
        <Line />
        <Line />
      </div>
    </div>
  )
}

export function AboutPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading engineering profile" className={styles.skeletonPage}>
      <section aria-hidden="true" className={styles.skeletonStage}>
        <div className={styles.skeletonGrid} />
        <SiteHeaderSkeleton activeItem="about" />

        <main className={`site-container ${styles.skeletonMain}`}>
          <div className={styles.skeletonBreadcrumbs}>
            <Line />
            <i />
            <Line />
          </div>

          <section className={styles.skeletonHero}>
            <div className={styles.skeletonHeroCopy}>
              <Line className={styles.skeletonEyebrow} />

              <div className={styles.skeletonTitleGroup}>
                <Line />
                <Line />
                <Line />
              </div>

              <div className={styles.skeletonCopy}>
                <Line />
                <Line />
              </div>

              <div className={styles.skeletonActions}>
                <Line />
                <Line />
                <Line />
              </div>

              <div className={styles.skeletonMetrics}>
                {SUMMARY.map((item) => (
                  <span key={item}>
                    <Line />
                    <Line />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skeletonConsole}>
              <div className={styles.skeletonConsoleGrid} />

              <div className={styles.skeletonIdentity}>
                <span className={styles.skeletonOrbit} />
                <span className={styles.skeletonOrbitInner} />
                <div className={styles.skeletonAvatar}>
                  <Line />
                  <Line />
                </div>
                <Line className={styles.skeletonOnline} />
              </div>

              <div className={styles.skeletonIdentityDetails}>
                {DETAILS.map((row) => (
                  <span key={row}>
                    <Line />
                    <Line />
                  </span>
                ))}
              </div>

              <footer className={styles.skeletonTelemetry}>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <Line />
              </footer>
            </div>
          </section>

          <section className={styles.skeletonPanel}>
            <SkeletonSectionHeading />

            <div className={styles.skeletonTimeline}>
              {TIMELINE.map((item) => (
                <article key={item}>
                  <div>
                    <i />
                    <Line />
                  </div>
                  <Line />
                  <Line />
                  <div>
                    <Line />
                    <Line />
                    <Line />
                  </div>
                  <span>
                    <Line />
                    <Line />
                    <Line />
                  </span>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.skeletonColumns}>
            <section className={styles.skeletonPanel}>
              <SkeletonSectionHeading />

              <div className={styles.skeletonCards}>
                {PRINCIPLES.map((item) => (
                  <article key={item}>
                    <i />
                    <Line />
                    <Line />
                    <Line />
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.skeletonPanel}>
              <SkeletonSectionHeading />

              <div className={styles.skeletonProcess}>
                {PROCESS.map((item) => (
                  <span key={item}>
                    <i />
                    <Line />
                    <Line />
                  </span>
                ))}
              </div>

              <div className={styles.skeletonDetail}>
                <div>
                  <Line />
                  <Line />
                  <Line />
                  <Line />
                </div>
                <div>
                  <Line />
                  <Line />
                  <Line />
                  <Line />
                </div>
              </div>
            </section>
          </div>

          <div className={styles.skeletonColumnsBalanced}>
            <section className={styles.skeletonPanel}>
              <SkeletonSectionHeading />

              <div className={styles.skeletonExperience}>
                {EXPERIENCE.map((item) => (
                  <span key={item}>
                    <Line />
                    <Line />
                    <i />
                    <Line />
                  </span>
                ))}
              </div>

              <div className={styles.skeletonSummaryCards}>
                {SUMMARY.map((item) => (
                  <article key={item}>
                    <Line />
                    <Line />
                    <Line />
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.skeletonPanel}>
              <SkeletonSectionHeading />

              <div className={styles.skeletonFocus}>
                <div>
                  <Line />
                  <Line />
                  <Line />
                  <Line />
                </div>
                <i />
              </div>

              <div className={styles.skeletonFocusCards}>
                <article>
                  <Line />
                  <Line />
                  <Line />
                </article>
                <article>
                  <Line />
                  <Line />
                  <Line />
                </article>
              </div>
            </section>
          </div>
        </main>
      </section>
    </div>
  )
}
