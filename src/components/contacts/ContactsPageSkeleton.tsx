import {
  PublicSkeletonFrame,
  SkeletonBreadcrumbs,
  SkeletonDescription,
  SkeletonEyebrow,
  SkeletonLine,
  SkeletonTitle,
} from '@/components/loading/PublicSkeletonPrimitives'

const STATUS_ROWS = [0, 1, 2, 3]
const CHANNELS = [0, 1, 2, 3, 4]
const FORM_FIELDS = [0, 1, 2]
const PROCESS = [0, 1, 2, 3]
const SOCIAL = [0, 1, 2, 3, 4]

function StatusConsoleSkeleton() {
  return (
    <div className="contacts-page-skeleton__status">
      <header>
        <span>
          <SkeletonLine />
          <SkeletonLine />
        </span>
        <SkeletonLine />
      </header>

      <div>
        {STATUS_ROWS.map((row) => (
          <span key={row}>
            <i />
            <SkeletonLine />
            <SkeletonLine />
          </span>
        ))}
      </div>

      <footer>
        <SkeletonLine />
        <SkeletonLine />
      </footer>
    </div>
  )
}

export function ContactsPageSkeleton() {
  return (
    <PublicSkeletonFrame activeItem="contact" label="Loading contacts page">
      <SkeletonBreadcrumbs />

      <section className="public-skeleton__hero contacts-page-skeleton__hero">
        <div className="public-skeleton__hero-copy">
          <SkeletonEyebrow />
          <SkeletonTitle accentWidth="82%" leadingWidth="70%" />
          <SkeletonDescription />

          <div className="contacts-page-skeleton__hero-actions">
            <article>
              <i />
              <span>
                <SkeletonLine />
                <SkeletonLine />
              </span>
            </article>
            <article>
              <i />
              <span>
                <SkeletonLine />
                <SkeletonLine />
              </span>
            </article>
          </div>
        </div>

        <StatusConsoleSkeleton />
      </section>

      <section className="contacts-page-skeleton__workspace">
        <article className="contacts-page-skeleton__channels">
          <header>
            <SkeletonLine />
            <SkeletonLine className="is-title" />
            <SkeletonLine />
            <SkeletonLine />
          </header>

          <div>
            {CHANNELS.map((channel) => (
              <span key={channel}>
                <i />
                <b>
                  <SkeletonLine />
                  <SkeletonLine />
                </b>
                <em />
              </span>
            ))}
          </div>

          <SkeletonLine className="is-location" />
        </article>

        <article className="contacts-page-skeleton__form-panel">
          <header>
            <SkeletonLine />
            <SkeletonLine className="is-title" />
            <SkeletonLine />
            <SkeletonLine />
          </header>

          <div className="contacts-page-skeleton__form">
            {FORM_FIELDS.map((field) => (
              <SkeletonLine key={field} />
            ))}
            <SkeletonLine className="is-message" />
            <SkeletonLine className="is-captcha" />
            <SkeletonLine className="is-submit" />
          </div>
        </article>
      </section>

      <section className="contacts-page-skeleton__process">
        <header>
          <span>
            <SkeletonLine />
            <SkeletonLine className="is-title" />
          </span>
          <span>
            <SkeletonLine />
            <SkeletonLine />
          </span>
        </header>

        <div>
          {PROCESS.map((step) => (
            <article key={step}>
              <i />
              <span>
                <SkeletonLine />
                <SkeletonLine className="is-title" />
                <SkeletonLine />
                <SkeletonLine />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="contacts-page-skeleton__social">
        <span>
          <SkeletonLine />
          <SkeletonLine className="is-title" />
          <SkeletonLine />
          <SkeletonLine />
        </span>

        <div>
          {SOCIAL.map((item) => (
            <SkeletonLine key={item} />
          ))}
        </div>
      </section>
    </PublicSkeletonFrame>
  )
}

// contacts-page-manual-suspense-skeleton-v1-7
// page-specific-unified-skeletons-v1-9
