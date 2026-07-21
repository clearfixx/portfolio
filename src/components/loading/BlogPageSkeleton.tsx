import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

const METRICS = [0, 1, 2, 3]
const CODE_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const ARTICLES = [0, 1, 2, 3, 4, 5]
const RAIL_ITEMS = [0, 1, 2, 3]
const FILTERS = [0, 1, 2]

function SkeletonLine({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

function RegistryEditorSkeleton() {
  return (
    <div className="blog-page-skeleton__editor">
      <div className="blog-page-skeleton__editor-title">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>
          <i />
          <SkeletonLine />
          <SkeletonLine />
        </span>
        <SkeletonLine />
      </div>

      <div className="blog-page-skeleton__editor-tab">
        <span>
          <i />
          <SkeletonLine />
          <b />
        </span>
      </div>

      <div className="blog-page-skeleton__editor-workspace">
        <aside>
          <i />
          <i />
          <i />
          <i />
        </aside>

        <div>
          {CODE_ROWS.map((row) => (
            <span key={row}>
              <SkeletonLine />
              <SkeletonLine className={`is-code-${(row % 5) + 1}`} />
            </span>
          ))}
        </div>

        <aside className="is-minimap">
          {CODE_ROWS.map((row) => (
            <i key={row} />
          ))}
        </aside>
      </div>

      <div className="blog-page-skeleton__editor-status">
        <SkeletonLine />
        <i />
        <SkeletonLine />
        <i />
        <SkeletonLine />
      </div>
    </div>
  )
}

function FeaturedArticleSkeleton() {
  return (
    <article className="blog-page-skeleton__featured">
      <div className="blog-page-skeleton__featured-image">
        <span>
          <i />
          <i />
          <i />
          <SkeletonLine />
        </span>
        <div>
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </div>
        <SkeletonLine className="is-badge" />
      </div>

      <div className="blog-page-skeleton__featured-content">
        <div>
          <SkeletonLine className="is-category" />
          <SkeletonLine className="is-title" />
          <span className="blog-page-skeleton__copy">
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
          </span>
        </div>

        <footer>
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine className="is-action" />
        </footer>
      </div>
    </article>
  )
}

function ArticleCardSkeleton({ index }: { index: number }) {
  return (
    <article className="blog-page-skeleton__article">
      <div className="blog-page-skeleton__article-image">
        <span>
          <i />
          <i />
          <i />
        </span>
        <SkeletonLine />
        <SkeletonLine />
      </div>

      <div className="blog-page-skeleton__article-body">
        <header>
          <SkeletonLine />
          <SkeletonLine />
        </header>
        <SkeletonLine className={`is-title is-title-${(index % 3) + 1}`} />
        <span className="blog-page-skeleton__copy">
          <SkeletonLine />
          <SkeletonLine />
        </span>

        <div className="blog-page-skeleton__tags">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </div>

        <footer>
          <SkeletonLine />
          <i />
          <SkeletonLine />
          <SkeletonLine className="is-action" />
        </footer>
      </div>
    </article>
  )
}

export function BlogPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog" className="blog-loading">
      <section aria-hidden="true" className="blog-page-skeleton">
        <div className="blog-page-skeleton__grid" />
        <SiteHeaderSkeleton activeItem="blog" />

        <main className="site-container blog-page-skeleton__main">
          <div className="blog-page-skeleton__breadcrumbs">
            <SkeletonLine />
            <i />
            <SkeletonLine />
          </div>

          <section className="blog-page-skeleton__hero">
            <div>
              <span className="blog-page-skeleton__eyebrow">
                <i />
                <SkeletonLine />
              </span>
              <SkeletonLine className="blog-page-skeleton__hero-title" />
              <SkeletonLine className="blog-page-skeleton__hero-title is-accent" />

              <span className="blog-page-skeleton__description">
                <SkeletonLine />
                <SkeletonLine />
              </span>

              <div className="blog-page-skeleton__metrics">
                {METRICS.map((metric) => (
                  <article key={metric}>
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                  </article>
                ))}
              </div>
            </div>

            <RegistryEditorSkeleton />
          </section>

          <section className="blog-page-skeleton__content">
            <div className="blog-page-skeleton__label">
              <i />
              <SkeletonLine />
            </div>

            <div className="blog-page-skeleton__top">
              <FeaturedArticleSkeleton />

              <aside className="blog-page-skeleton__rail">
                <section>
                  <header>
                    <SkeletonLine />
                    <i />
                  </header>
                  <div>
                    {RAIL_ITEMS.map((item) => (
                      <span key={item}>
                        <i />
                        <SkeletonLine />
                        <SkeletonLine />
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <header>
                    <SkeletonLine />
                    <i />
                  </header>
                  <div className="blog-page-skeleton__rail-tags">
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine />
                  </div>
                </section>

                <section className="is-sync">
                  <span>
                    <i />
                    <SkeletonLine />
                  </span>
                  <SkeletonLine />
                  <SkeletonLine />
                  <b>
                    <i />
                  </b>
                </section>
              </aside>
            </div>

            <div className="blog-page-skeleton__articles-heading">
              <span>
                <i />
                <SkeletonLine />
              </span>
              <SkeletonLine />
            </div>

            <div className="blog-page-skeleton__toolbar">
              <div>
                {FILTERS.map((filter) => (
                  <SkeletonLine className={`is-filter-${filter + 1}`} key={filter} />
                ))}
              </div>
              <div>
                <SkeletonLine className="is-search" />
                <SkeletonLine className="is-sort" />
              </div>
            </div>

            <div className="blog-page-skeleton__articles">
              {ARTICLES.map((article) => (
                <ArticleCardSkeleton index={article} key={article} />
              ))}
            </div>

            <nav className="blog-page-skeleton__pagination">
              <div>
                {[0, 1, 2, 3, 4].map((item) => (
                  <SkeletonLine className={item === 2 ? 'is-active' : undefined} key={item} />
                ))}
              </div>
              <SkeletonLine />
            </nav>

            <section className="blog-page-skeleton__newsletter">
              <div>
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
              </div>
              <div>
                <SkeletonLine />
                <SkeletonLine />
              </div>
            </section>
          </section>
        </main>
      </section>
    </div>
  )
}
