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

const FILTERS = [0, 1, 2]
const ARTICLES = [0, 1, 2, 3]
const RAIL_ITEMS = [0, 1, 2, 3, 4]
const META = [0, 1, 2]

function ArticleCardSkeleton({ index }: { index: number }) {
  return (
    <article className="blog-page-skeleton__article" data-skeleton-index={index}>
      <div className="blog-page-skeleton__article-image">
        <header>
          <i />
          <i />
          <i />
        </header>
        <SkeletonLine />
        <SkeletonLine />
      </div>

      <section>
        <SkeletonLine className="is-category" />
        <SkeletonLine className="is-article-title" />
        <span>
          <SkeletonLine />
          <SkeletonLine />
        </span>
        <footer>
          {META.map((item) => (
            <SkeletonLine key={item} />
          ))}
        </footer>
      </section>
    </article>
  )
}

export function BlogPageSkeleton() {
  return (
    <PublicSkeletonFrame activeItem="blog" label="Loading engineering journal">
      <SkeletonBreadcrumbs />

      <section className="public-skeleton__hero blog-page-skeleton__hero">
        <div className="public-skeleton__hero-copy">
          <SkeletonEyebrow />
          <SkeletonTitle accentWidth="76%" leadingWidth="82%" />
          <SkeletonDescription />
          <SkeletonMetrics />
        </div>

        <EditorSkeleton variant="blog" />
      </section>

      <section className="blog-page-skeleton__content">
        <div className="blog-page-skeleton__toolbar">
          <div>
            {FILTERS.map((filter) => (
              <SkeletonLine key={filter} />
            ))}
          </div>
          <div>
            <SkeletonLine className="is-search" />
            <SkeletonLine className="is-filter" />
          </div>
        </div>

        <div className="blog-page-skeleton__layout">
          <div className="blog-page-skeleton__main">
            <article className="blog-page-skeleton__featured">
              <div className="blog-page-skeleton__featured-image">
                <header>
                  <i />
                  <i />
                  <i />
                  <SkeletonLine />
                </header>
                <span>
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine />
                </span>
                <SkeletonLine className="is-badge" />
              </div>

              <section>
                <SkeletonLine className="is-category" />
                <SkeletonLine className="is-featured-title" />
                <span>
                  <SkeletonLine />
                  <SkeletonLine />
                  <SkeletonLine />
                </span>
                <footer>
                  {META.map((item) => (
                    <SkeletonLine key={item} />
                  ))}
                  <SkeletonLine className="is-action" />
                </footer>
              </section>
            </article>

            <div className="blog-page-skeleton__articles">
              {ARTICLES.map((article) => (
                <ArticleCardSkeleton index={article} key={article} />
              ))}
            </div>
          </div>

          <aside className="blog-page-skeleton__rail">
            {RAIL_ITEMS.map((item) => (
              <section key={item}>
                <header>
                  <i />
                  <SkeletonLine />
                </header>
                <div>
                  {META.map((row) => (
                    <span key={row}>
                      <i />
                      <b>
                        <SkeletonLine />
                        <SkeletonLine />
                      </b>
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </aside>
        </div>
      </section>
    </PublicSkeletonFrame>
  )
}

// page-specific-unified-skeletons-v1-9
