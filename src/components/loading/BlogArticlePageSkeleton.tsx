import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

const META = [0, 1, 2, 3]
const TOC = [0, 1, 2, 3, 4, 5]
const CODE = [0, 1, 2, 3, 4, 5, 6]
const GALLERY = [0, 1, 2]
const RELATED = [0, 1, 2]

function Line({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

function Paragraph({ short = false }: { short?: boolean }) {
  return (
    <div className="blog-article-skeleton__paragraph">
      {[0, 1, 2, 3, 4].map((line) => (
        <Line className={`is-line-${short && line > 2 ? 'short' : (line % 4) + 1}`} key={line} />
      ))}
    </div>
  )
}

function CodeBlock() {
  return (
    <div className="blog-article-skeleton__code">
      <header>
        <span>
          <i />
          <i />
          <i />
        </span>
        <Line />
        <Line />
      </header>
      <div>
        {CODE.map((row) => (
          <span key={row}>
            <Line />
            <Line className={`is-code-${(row % 5) + 1}`} />
          </span>
        ))}
      </div>
    </div>
  )
}

function RelatedCard({ index }: { index: number }) {
  return (
    <article className="blog-article-skeleton__related-card">
      <div className="blog-article-skeleton__related-preview">
        <span>
          <i />
          <i />
          <i />
        </span>
        <Line />
        <Line />
      </div>
      <div className="blog-article-skeleton__related-body">
        <header>
          <Line />
          <Line />
        </header>
        <Line className={`is-title is-title-${index + 1}`} />
        <div>
          <Line />
          <Line />
        </div>
        <footer>
          <Line />
          <i />
          <Line />
        </footer>
      </div>
    </article>
  )
}

export function BlogArticlePageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog article" className="blog-article-loading">
      <section aria-hidden="true" className="blog-article-skeleton">
        <div className="blog-article-skeleton__grid" />
        <SiteHeaderSkeleton activeItem="blog" />

        <main className="site-container blog-article-skeleton__main">
          <div className="blog-article-skeleton__breadcrumbs">
            <Line />
            <i />
            <Line />
            <i />
            <Line />
          </div>

          <section className="blog-article-skeleton__hero">
            <div className="blog-article-skeleton__hero-copy">
              <div className="blog-article-skeleton__status">
                <i />
                <Line />
                <Line />
              </div>
              <Line className="blog-article-skeleton__category" />
              <div className="blog-article-skeleton__title">
                <Line />
                <Line />
              </div>
              <div className="blog-article-skeleton__excerpt">
                <Line />
                <Line />
                <Line />
              </div>

              <div className="blog-article-skeleton__meta">
                {META.map((item) => (
                  <span key={item}>
                    <i />
                    <Line />
                  </span>
                ))}
              </div>

              <div className="blog-article-skeleton__author">
                <span />
                <div>
                  <Line />
                  <Line />
                </div>
              </div>
            </div>

            <div className="blog-article-skeleton__cover">
              <header>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <Line />
              </header>
              <div className="blog-article-skeleton__cover-workspace">
                <aside>
                  <i />
                  <i />
                  <i />
                  <i />
                </aside>
                <div>
                  {CODE.map((row) => (
                    <span key={row}>
                      <Line />
                      <Line className={`is-code-${(row % 5) + 1}`} />
                    </span>
                  ))}
                </div>
                <aside className="is-panel">
                  <Line />
                  <Line />
                  <Line />
                  <b>
                    <i />
                  </b>
                </aside>
              </div>
              <footer>
                <Line />
                <i />
                <Line />
                <i />
                <Line />
              </footer>
            </div>
          </section>

          <div className="blog-article-skeleton__workspace">
            <article className="blog-article-skeleton__content">
              <div className="blog-article-skeleton__lead">
                <Line />
                <Line />
                <Line />
              </div>
              <Paragraph />

              <section className="blog-article-skeleton__section">
                <div className="blog-article-skeleton__heading">
                  <Line />
                  <Line />
                </div>
                <Paragraph short />
                <blockquote>
                  <i />
                  <div>
                    <Line />
                    <Line />
                    <Line />
                  </div>
                </blockquote>
              </section>

              <section className="blog-article-skeleton__section">
                <div className="blog-article-skeleton__heading">
                  <Line />
                  <Line />
                </div>
                <CodeBlock />
              </section>

              <section className="blog-article-skeleton__section">
                <div className="blog-article-skeleton__heading">
                  <Line />
                  <Line />
                </div>
                <Paragraph short />
                <div className="blog-article-skeleton__gallery">
                  <div>
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <Line />
                    <Line />
                    <Line />
                  </div>
                  <footer>
                    {GALLERY.map((item) => (
                      <span className={item === 0 ? 'is-active' : undefined} key={item}>
                        <i />
                        <Line />
                      </span>
                    ))}
                  </footer>
                </div>
              </section>

              <Paragraph short />

              <footer className="blog-article-skeleton__article-footer">
                <div>
                  <Line />
                  <span>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div>
                  <span>
                    <Line />
                    <Line />
                  </span>
                  <span>
                    <Line />
                    <Line />
                  </span>
                </div>
              </footer>
            </article>

            <aside className="blog-article-skeleton__sidebar">
              <section className="blog-article-skeleton__toc">
                <header>
                  <Line />
                  <i />
                </header>
                <div>
                  {TOC.map((item) => (
                    <span className={item === 0 ? 'is-active' : undefined} key={item}>
                      <i />
                      <Line />
                    </span>
                  ))}
                </div>
                <footer>
                  <Line />
                  <b>
                    <i />
                  </b>
                </footer>
              </section>

              <section className="blog-article-skeleton__info">
                <Line />
                <div>
                  {META.map((item) => (
                    <span key={item}>
                      <i />
                      <b>
                        <Line />
                        <Line />
                      </b>
                    </span>
                  ))}
                </div>
              </section>

              <section className="blog-article-skeleton__share">
                <Line />
                <div>
                  {META.map((item) => (
                    <span key={item}>
                      <i />
                      <Line />
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <section className="blog-article-skeleton__related">
            <header>
              <span>
                <i />
                <Line />
              </span>
              <Line />
            </header>
            <div>
              {RELATED.map((item) => (
                <RelatedCard index={item} key={item} />
              ))}
            </div>
          </section>

          <section className="blog-article-skeleton__newsletter">
            <div>
              <Line />
              <Line />
              <Line />
            </div>
            <div>
              <Line />
              <Line />
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}
