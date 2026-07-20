import type { Metadata } from 'next'
import { SiteFooter } from '@/components/home'
import { PublicBreadcrumbs, PublicPageHeroFrame, PublicPageShell } from '@/components/public-page'
import Image from 'next/image'
import Link from 'next/link'

import { BlogRegistryEditor } from '@/components/blog/BlogRegistryEditor'
import { TechnicalPreviewPlaceholder } from '@/components/blog/TechnicalPreviewPlaceholder'
import type { BlogPost, Category, Media } from '@/payload-types'
import { getHomepageContent, getPublishedBlogPosts, getSiteFooterGitHubFeed } from '@/lib/cms'

import styles from './blog.module.scss'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Engineering Journal',
  description:
    'Architecture notes, implementation details, system design decisions, and lessons learned while building production software.',
  alternates: {
    canonical: '/blog',
  },
}

const POSTS_PER_PAGE = 6
const MAX_INDEX_POSTS = 250

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type BlogPageProps = {
  searchParams: Promise<{
    page?: string
    q?: string
    series?: string
    sort?: 'latest' | 'popular' | 'updated'
    topic?: string
  }>
}

type TaxonomyEntry = {
  count: number
  label: string
  slug: string
}

type JournalIconName =
  | 'archive'
  | 'arrow'
  | 'book'
  | 'calendar'
  | 'clock'
  | 'eye'
  | 'folder'
  | 'radio'
  | 'search'
  | 'sliders'
  | 'tag'

function JournalIcon({ name, size = 14 }: { name: JournalIconName; size?: number }) {
  const paths: Record<JournalIconName, import('react').ReactNode> = {
    archive: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 9h18M9 13h6M5 3h14" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    folder: (
      <>
        <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
      </>
    ),
    radio: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="13" cy="18" r="2" />
      </>
    ),
    tag: (
      <>
        <path d="M20 13 13 20l-9-9V4h7z" />
        <circle cx="8.5" cy="8.5" r="1.25" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={styles.icon}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
        {paths[name]}
      </g>
    </svg>
  )
}

function NewsletterPipeline() {
  return (
    <div aria-hidden="true" className={styles.newsletterPipeline}>
      <div className={styles.pipelineTrack}>
        <span className={styles.pipelineLine} />
        <span className={styles.pipelineSignal} />
      </div>

      <div className={styles.pipelineNodes}>
        <div>
          <span className={styles.pipelineIcon}>
            <JournalIcon name="arrow" size={15} />
          </span>
          <strong>Commit</strong>
          <small>main</small>
        </div>
        <div>
          <span className={styles.pipelineIcon}>
            <JournalIcon name="radio" size={15} />
          </span>
          <strong>Publish</strong>
          <small>journal</small>
        </div>
        <div>
          <span className={styles.pipelineIcon}>
            <JournalIcon name="folder" size={15} />
          </span>
          <strong>Feed</strong>
          <small>RSS</small>
        </div>
        <div>
          <span className={styles.pipelineIcon}>
            <JournalIcon name="book" size={15} />
          </span>
          <strong>Inbox</strong>
          <small>email</small>
        </div>
      </div>
    </div>
  )
}

const categoryOf = (post: BlogPost): Category | null =>
  typeof post.category === 'object' && post.category ? post.category : null

const coverOf = (post: BlogPost): Media | null =>
  typeof post.coverImage === 'object' && post.coverImage ? post.coverImage : null

const categoryName = (category: Category | null): string => {
  if (!category) return 'Engineering'
  return category.title || 'Engineering'
}

const categoryLabel = (post: BlogPost) => categoryName(categoryOf(post))

const publishedLabel = (post: BlogPost) =>
  post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : 'Publication pending'

const validPage = (value: string | undefined) => {
  const parsed = Number.parseInt(value || '1', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function collectCategories(posts: BlogPost[]): TaxonomyEntry[] {
  const map = new Map<string, TaxonomyEntry>()

  posts.forEach((post) => {
    const category = categoryOf(post)
    if (!category?.slug) return

    map.set(category.slug, {
      count: (map.get(category.slug)?.count || 0) + 1,
      label: categoryName(category),
      slug: category.slug,
    })
  })

  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

function collectSeries(posts: BlogPost[]): TaxonomyEntry[] {
  const map = new Map<string, TaxonomyEntry>()

  posts.forEach((post) => {
    if (!post.series) return
    const slug = post.series
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    map.set(slug, {
      count: (map.get(slug)?.count || 0) + 1,
      label: post.series,
      slug,
    })
  })

  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

function collectTags(posts: BlogPost[]): TaxonomyEntry[] {
  const map = new Map<string, TaxonomyEntry>()

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!tag?.label || !tag.slug) return

      map.set(tag.slug, {
        count: (map.get(tag.slug)?.count || 0) + 1,
        label: tag.label,
        slug: tag.slug,
      })
    })
  })

  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

function collectArchive(posts: BlogPost[]) {
  const map = new Map<string, number>()

  posts.forEach((post) => {
    if (!post.publishedAt) return
    const year = String(new Date(post.publishedAt).getFullYear())
    map.set(year, (map.get(year) || 0) + 1)
  })

  return [...map.entries()]
    .map(([year, count]) => ({ count, year }))
    .sort((a, b) => Number(b.year) - Number(a.year))
}

function ArticleImage({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const media = coverOf(post)
  const src = media && typeof media.url === 'string' ? media.url : null
  const alt = media?.alt || post.title

  if (!src) {
    return (
      <TechnicalPreviewPlaceholder
        className={styles.imageFallback}
        label={categoryLabel(post)}
        variant="code"
      />
    )
  }

  return (
    <div className={styles.imageFrame}>
      <Image
        alt={alt}
        fill
        priority={priority}
        sizes={priority ? '(max-width: 900px) 100vw, 48vw' : '(max-width: 720px) 100vw, 28vw'}
        src={src}
      />
    </div>
  )
}

function withQuery(
  values: Record<string, string | undefined>,
  overrides: Record<string, string | undefined>,
) {
  const params = new URLSearchParams()

  Object.entries({ ...values, ...overrides }).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })

  const query = params.toString()
  return query ? `/blog?${query}` : '/blog'
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const [posts, homepageContent, githubFeed] = await Promise.all([
    getPublishedBlogPosts(MAX_INDEX_POSTS),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
  ])

  const footerContent = homepageContent.siteFooter
  const categories = collectCategories(posts)
  const series = collectSeries(posts)
  const tags = collectTags(posts)
  const archive = collectArchive(posts)

  const selectedSort = params.sort || 'latest'
  const searchTerm = params.q?.trim().toLowerCase() || ''

  const filteredPosts = posts
    .filter((post) => {
      const topicMatch = !params.topic || categoryOf(post)?.slug === params.topic
      const seriesSlug = post.series
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      const seriesMatch = !params.series || seriesSlug === params.series
      const searchMatch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags?.some((tag) => tag.label.toLowerCase().includes(searchTerm))

      return topicMatch && seriesMatch && searchMatch
    })
    .sort((a, b) => {
      if (selectedSort === 'popular') return (b.views || 0) - (a.views || 0)
      if (selectedSort === 'updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }

      return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    })

  const featuredPost =
    filteredPosts.find((post) => post.isFeatured) || filteredPosts[0] || posts[0] || null
  const registryPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id)
  const totalPages = Math.max(1, Math.ceil(registryPosts.length / POSTS_PER_PAGE))
  const currentPage = Math.min(validPage(params.page), totalPages)
  const compactPages =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : currentPage <= 3
        ? [1, 2, 3, totalPages]
        : currentPage >= totalPages - 2
          ? [1, totalPages - 2, totalPages - 1, totalPages]
          : [1, currentPage - 1, currentPage, currentPage + 1, totalPages]

  const visiblePosts = registryPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const queryState = {
    q: params.q,
    series: params.series,
    sort: selectedSort,
    topic: params.topic,
  }

  return (
    <>
      <PublicPageShell className="journal-page" variant="index">
        <div className={`${styles.page} ${styles.container}`}>
          <PublicBreadcrumbs items={[{ label: 'Blog' }]} />

          <PublicPageHeroFrame
            aria-labelledby="blog-page-title"
            className={styles.hero}
            variant="index"
          >
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span aria-hidden="true">{'//'}</span>
                Engineering journal
              </p>
              <h1 id="blog-page-title">
                Engineering Journal.
                <span>Build. Document. Share.</span>
              </h1>
              <p>
                Real architecture, production notes, implementation details, and lessons learned
                from building complex systems.
              </p>

              <dl className={styles.metrics}>
                <div className={styles.metricCard}>
                  <span
                    className={`${styles.metricIcon} ${styles.metricIconCyan}`}
                    aria-hidden="true"
                  >
                    <JournalIcon name="archive" size={18} />
                  </span>
                  <div className={styles.metricCopy}>
                    <dd>{String(posts.length).padStart(2, '0')}</dd>
                    <dt>Articles</dt>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span
                    className={`${styles.metricIcon} ${styles.metricIconViolet}`}
                    aria-hidden="true"
                  >
                    <JournalIcon name="book" size={18} />
                  </span>
                  <div className={styles.metricCopy}>
                    <dd>{String(categories.length).padStart(2, '0')}</dd>
                    <dt>Topics</dt>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span
                    className={`${styles.metricIcon} ${styles.metricIconCyan}`}
                    aria-hidden="true"
                  >
                    <JournalIcon name="folder" size={18} />
                  </span>
                  <div className={styles.metricCopy}>
                    <dd>{String(series.length).padStart(2, '0')}</dd>
                    <dt>Series</dt>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span
                    className={`${styles.metricIcon} ${styles.metricIconViolet}`}
                    aria-hidden="true"
                  >
                    <JournalIcon name="radio" size={18} />
                  </span>
                  <div className={styles.metricCopy}>
                    <dd>Online</dd>
                    <dt>Status</dt>
                  </div>
                </div>
              </dl>
            </div>

            <div className={styles.editorWrap}>
              <BlogRegistryEditor
                articleCount={posts.length}
                featuredTitle={featuredPost?.title || 'No featured article'}
                seriesCount={series.length}
                topicCount={categories.length}
              />
            </div>
          </PublicPageHeroFrame>

          <div className={styles.contentLayout}>
            <div className={styles.mainColumn}>
              {featuredPost ? (
                <section className={styles.featuredSection} aria-labelledby="featured-title">
                  <header className={styles.sectionHeader}>
                    <p>
                      <span aria-hidden="true">{'//'}</span>
                      Featured article
                    </p>
                  </header>

                  <Link
                    className={styles.featuredCard}
                    href={featuredPost.slug ? `/blog/${featuredPost.slug}` : '/blog'}
                  >
                    <ArticleImage post={featuredPost} priority />
                    <div className={styles.featuredContent}>
                      <span className={styles.category}>{categoryLabel(featuredPost)}</span>
                      <h2 id="featured-title">{featuredPost.title}</h2>
                      <p>{featuredPost.excerpt}</p>

                      <div className={styles.metaRow}>
                        <span>
                          <JournalIcon name="calendar" size={12} />
                          {publishedLabel(featuredPost)}
                        </span>
                        <span>
                          <JournalIcon name="clock" size={12} />
                          {featuredPost.readingTime || 5} min read
                        </span>
                        <span>
                          <JournalIcon name="eye" size={12} />
                          {(featuredPost.views || 0).toLocaleString('en')} views
                        </span>
                        <strong>
                          Read article
                          <JournalIcon name="arrow" size={13} />
                        </strong>
                      </div>
                    </div>
                  </Link>
                </section>
              ) : null}

              <section className={styles.articlesSection} aria-labelledby="articles-title">
                <header className={styles.sectionHeader}>
                  <div>
                    <p>
                      <span aria-hidden="true">{'//'}</span>
                      Latest articles
                    </p>
                    <h2 id="articles-title">Notes from the build process.</h2>
                  </div>
                  <span>{registryPosts.length} entries</span>
                </header>

                <div className={styles.toolbar}>
                  <nav className={styles.tabs} aria-label="Article sorting">
                    {(['latest', 'popular', 'updated'] as const).map((sort) => (
                      <Link
                        aria-current={selectedSort === sort ? 'page' : undefined}
                        href={withQuery(queryState, { page: undefined, sort })}
                        key={sort}
                      >
                        {sort[0].toUpperCase() + sort.slice(1)}
                      </Link>
                    ))}
                  </nav>

                  <form className={styles.filters}>
                    <input name="sort" type="hidden" value={selectedSort} />
                    <label className={styles.search}>
                      <JournalIcon name="search" size={13} />
                      <input
                        defaultValue={params.q}
                        name="q"
                        placeholder="Search articles..."
                        type="search"
                      />
                    </label>

                    <select defaultValue={params.topic || ''} name="topic">
                      <option value="">All topics</option>
                      {categories.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <select defaultValue={params.series || ''} name="series">
                      <option value="">All series</option>
                      {series.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <button type="submit">
                      <JournalIcon name="sliders" size={13} />
                      Apply
                    </button>
                  </form>
                </div>

                <ul className={styles.articleGrid}>
                  {visiblePosts.map((post) => (
                    <li key={post.id}>
                      <Link className={styles.articleCard} href={`/blog/${post.slug}`}>
                        <ArticleImage post={post} />
                        <span aria-hidden="true" className={styles.cardIndex}>
                          {String(
                            (currentPage - 1) * POSTS_PER_PAGE +
                              visiblePosts.findIndex((item) => item.id === post.id) +
                              1,
                          ).padStart(2, '0')}
                        </span>
                        <div className={styles.articleContent}>
                          <div>
                            <span className={styles.category}>{categoryLabel(post)}</span>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                          </div>

                          <div className={styles.articleMeta}>
                            <span>
                              <JournalIcon name="calendar" size={12} />
                              {publishedLabel(post)}
                            </span>
                            <span>
                              <JournalIcon name="clock" size={12} />
                              {post.readingTime || 5} min
                            </span>
                            <span>
                              <JournalIcon name="eye" size={12} />
                              {(post.views || 0).toLocaleString('en')}
                            </span>
                            <JournalIcon name="arrow" size={13} />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className={styles.rail}>
              <section className={styles.railCard}>
                <h2>
                  <JournalIcon name="radio" size={14} />
                  Latest transmissions
                </h2>
                <ul className={styles.transmissions}>
                  {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>
                      <Link href={post.slug ? `/blog/${post.slug}` : '/blog'}>
                        <span aria-hidden="true" />
                        <div>
                          <strong>{post.title}</strong>
                          <small>{publishedLabel(post)}</small>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className={styles.sync}>
                  <span aria-hidden="true" />
                  <JournalIcon name="radio" size={12} />
                  Journal_sync: <strong>online</strong>
                </div>
              </section>

              <section className={styles.railCard}>
                <h2>
                  <JournalIcon name="folder" size={14} />
                  Topics
                </h2>
                <ul className={styles.railList}>
                  {categories.map((item) => (
                    <li key={item.slug}>
                      <Link href={withQuery(queryState, { page: undefined, topic: item.slug })}>
                        <span>{item.label}</span>
                        <strong>{item.count}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.railCard}>
                <h2>
                  <JournalIcon name="book" size={14} />
                  Series
                </h2>
                <ul className={styles.seriesList}>
                  {series.map((item) => (
                    <li key={item.slug}>
                      <Link href={withQuery(queryState, { page: undefined, series: item.slug })}>
                        <span aria-hidden="true">◇</span>
                        <div>
                          <strong>{item.label}</strong>
                          <small>{item.count} articles</small>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.railCard}>
                <h2>
                  <JournalIcon name="tag" size={14} />
                  Popular tags
                </h2>
                <ul className={styles.tags}>
                  {tags.slice(0, 14).map((tag) => (
                    <li key={tag.slug}>{tag.label}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.railCard}>
                <h2>
                  <JournalIcon name="archive" size={14} />
                  Archive
                </h2>
                <ul className={styles.railList}>
                  {archive.map((item) => (
                    <li key={item.year}>
                      <span>{item.year}</span>
                      <strong>{item.count}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>

          {totalPages > 1 ? (
            <section className={styles.paginationSection} aria-label="Journal pagination">
              <div className={styles.paginationSummary}>
                <p>
                  <span aria-hidden="true">{'//'}</span>
                  Journal index
                </p>
                <strong>
                  Page {currentPage} of {totalPages}
                </strong>
                <span>{registryPosts.length} indexed entries</span>
              </div>

              <nav className={styles.pagination} aria-label="Blog pagination">
                <Link
                  aria-disabled={currentPage === 1}
                  aria-label="First page"
                  href={withQuery(queryState, { page: undefined })}
                >
                  «
                </Link>
                <Link
                  aria-disabled={currentPage === 1}
                  aria-label="Previous page"
                  href={withQuery(queryState, {
                    page: currentPage - 1 <= 1 ? undefined : String(currentPage - 1),
                  })}
                >
                  ‹
                </Link>

                {compactPages.map((pageNumber, index) => {
                  const previousPage = compactPages[index - 1]
                  const hasGap = previousPage !== undefined && pageNumber - previousPage > 1

                  return (
                    <span className={styles.paginationItem} key={pageNumber}>
                      {hasGap ? <i aria-hidden="true">…</i> : null}
                      <Link
                        aria-current={pageNumber === currentPage ? 'page' : undefined}
                        href={withQuery(queryState, {
                          page: pageNumber === 1 ? undefined : String(pageNumber),
                        })}
                      >
                        {pageNumber}
                      </Link>
                    </span>
                  )
                })}

                <Link
                  aria-disabled={currentPage === totalPages}
                  aria-label="Next page"
                  href={withQuery(queryState, {
                    page: String(Math.min(totalPages, currentPage + 1)),
                  })}
                >
                  ›
                </Link>
                <Link
                  aria-disabled={currentPage === totalPages}
                  aria-label="Last page"
                  href={withQuery(queryState, { page: String(totalPages) })}
                >
                  »
                </Link>
              </nav>

              <div className={styles.paginationControls}>
                <form>
                  {params.q ? <input name="q" type="hidden" value={params.q} /> : null}
                  {params.topic ? <input name="topic" type="hidden" value={params.topic} /> : null}
                  {params.series ? (
                    <input name="series" type="hidden" value={params.series} />
                  ) : null}
                  <input name="sort" type="hidden" value={selectedSort} />

                  <label>
                    <span>Jump to page</span>
                    <select defaultValue={String(currentPage)} name="page">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (pageNumber) => (
                          <option key={pageNumber} value={pageNumber}>
                            {pageNumber}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <button type="submit">
                    Go
                    <JournalIcon name="arrow" size={13} />
                  </button>
                </form>
              </div>
            </section>
          ) : null}

          <section className={styles.newsletter}>
            <div className={styles.newsletterCopy}>
              <p>
                <span aria-hidden="true">{'//'}</span>
                Journal updates
              </p>
              <h2>Stay close to the build process.</h2>
              <span>
                New architecture notes, implementation decisions, and engineering lessons.
              </span>
            </div>

            <NewsletterPipeline />

            <form>
              <label>
                <span className={styles.srOnly}>Email address</span>
                <input placeholder="Enter your email" type="email" />
              </label>
              <button type="submit">
                Subscribe
                <JournalIcon name="arrow" size={14} />
              </button>
            </form>
          </section>
        </div>
      </PublicPageShell>

      {footerContent ? <SiteFooter content={footerContent} githubFeed={githubFeed} /> : null}
    </>
  )
}
