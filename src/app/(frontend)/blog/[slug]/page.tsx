import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BlogArticleActions } from '@/components/blog/BlogArticleActions'
import { TechnicalPreviewPlaceholder } from '@/components/blog/TechnicalPreviewPlaceholder'
import { BlogArticleReveal } from '@/components/blog/BlogArticleReveal'
import { BlogArticleToc } from '@/components/blog/BlogArticleToc'
import { BlogPostRichText } from '@/components/blog/BlogPostRichText'
import { SiteFooter } from '@/components/home'
import { PublicBreadcrumbs, PublicPageHeroFrame, PublicPageShell } from '@/components/public-page'
import {
  getBlogFeedbackCounts,
  getBlogPostBySlug,
  getHomepageContent,
  getProfile,
  getPublishedBlogPosts,
  getSiteFooterGitHubFeed,
} from '@/lib/cms'
import type { BlogPost, Category, Media } from '@/payload-types'

import styles from '@/app/(frontend)/styles/pages/blog-article.module.scss'

export const revalidate = 300

const longDateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

type ArticleIconName = 'arrow' | 'calendar' | 'clock' | 'eye' | 'folder' | 'radio' | 'tag'

function ArticleIcon({ name, size = 14 }: { name: ArticleIconName; size?: number }) {
  const paths: Record<ArticleIconName, import('react').ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
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
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    folder: <path d="M3 6h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
    radio: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    ),
    tag: (
      <>
        <path d="M20 13 13 20l-9-9V4h7Z" />
        <circle cx="8.5" cy="8.5" r="1.3" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

function categoryLabel(post: BlogPost): string {
  return typeof post.category === 'object' && post.category
    ? (post.category as Category).title
    : 'Engineering'
}

function mediaFrom(value: number | Media | null | undefined): Media | null {
  return typeof value === 'object' && value ? value : null
}

type ProfileStatus = 'available' | 'focused' | 'unavailable'

const PROFILE_STATUS_LABELS: Record<ProfileStatus, string> = {
  available: 'Available',
  focused: 'Focused',
  unavailable: 'Unavailable',
}

function normalizeProfileStatus(value: string | null | undefined): ProfileStatus {
  return value === 'focused' || value === 'unavailable' ? value : 'available'
}

function initialsFromName(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return initials || 'PF'
}

function publishedLabel(post: BlogPost): string {
  return post.publishedAt
    ? longDateFormatter.format(new Date(post.publishedAt))
    : 'Publication pending'
}

function viewLabel(value: number | null | undefined): string {
  const views = value ?? 0

  if (views >= 1000) {
    return `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}k views`
  }

  return `${views} views`
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  const cover = mediaFrom(post.seo?.ogImage || post.coverImage)

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      images: cover?.url ? [{ url: cover.url, alt: cover.alt }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const [post, allPosts, homepageContent, githubFeed, profile] = await Promise.all([
    getBlogPostBySlug(slug),
    getPublishedBlogPosts(250),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
    getProfile(),
  ])

  if (!post) {
    notFound()
  }

  const feedbackCounts = await getBlogFeedbackCounts(post.id)
  const postIndex = allPosts.findIndex((entry) => entry.id === post.id)
  const previousPost = postIndex >= 0 ? allPosts[postIndex + 1] : null
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null
  const relatedPosts = allPosts
    .filter((entry) => entry.id !== post.id)
    .filter((entry) => {
      const sameCategory =
        typeof entry.category === 'object' &&
        entry.category &&
        typeof post.category === 'object' &&
        post.category &&
        entry.category.id === post.category.id
      const sameSeries = Boolean(post.series && entry.series === post.series)

      return sameCategory || sameSeries
    })
    .slice(0, 3)

  const cover = mediaFrom(post.coverImage)
  const footerContent = homepageContent.siteFooter
  const publishedAt = publishedLabel(post)
  const updatedAt = longDateFormatter.format(new Date(post.updatedAt))
  const readingTime = post.readingTime ?? 5
  const tags = post.tags ?? []
  const series = post.series || 'Independent note'
  const difficulty = post.difficulty || 'intermediate'
  const authorName = profile.name.trim() || 'Portfolio author'
  const authorRole = profile.role.trim() || 'Software Engineer'
  const authorBio =
    profile.shortBio?.trim() || profile.fullBio?.trim() || 'Profile details are being updated.'
  const authorStatus = normalizeProfileStatus(profile.status)
  const authorStatusLabel = profile.availability?.trim() || PROFILE_STATUS_LABELS[authorStatus]
  const authorPortrait = mediaFrom(profile.portrait)
  const authorInitials = initialsFromName(authorName)
  const keyTakeaways = (post.keyTakeaways ?? []).filter((item) => item.text?.trim())
  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'article-content', label: 'Article' },
    ...(keyTakeaways.length > 0 ? [{ id: 'key-takeaways', label: 'Key takeaways' }] : []),
    ...(relatedPosts.length > 0 ? [{ id: 'related-articles', label: 'Related articles' }] : []),
  ]

  return (
    <>
      <PublicPageShell className="journal-article-page" variant="detail">
        <div className={`${styles.page} ${styles.container}`}>
          <PublicBreadcrumbs
            items={[
              {
                href: '/blog',
                label: 'Blog',
              },
              {
                label: post.title,
              },
            ]}
          />

          <article aria-labelledby="article-page-title">
            <BlogArticleReveal />

            <PublicPageHeroFrame className={styles.heroGrid} variant="detail">
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>
                  <span aria-hidden="true">{'//'}</span>
                  {categoryLabel(post)}
                </p>

                <h1 id="article-page-title">{post.title}</h1>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.heroMeta}>
                  <span>
                    <ArticleIcon name="calendar" />
                    {publishedAt}
                  </span>
                  <span>
                    <ArticleIcon name="clock" />
                    {readingTime} min read
                  </span>
                  <span>
                    <ArticleIcon name="eye" />
                    {viewLabel(post.views)}
                  </span>
                  <span>
                    <ArticleIcon name="radio" />
                    Updated {updatedAt}
                  </span>
                </div>
              </div>

              <aside className={styles.statusCard} aria-label="Article status">
                <div>
                  <span>Status</span>
                  <strong className={styles.liveStatus}>
                    <i aria-hidden="true" />
                    Published
                  </strong>
                </div>
                <div>
                  <span>Series</span>
                  <strong>{series}</strong>
                </div>
                <div>
                  <span>Difficulty</span>
                  <strong className={styles.difficulty}>{difficulty}</strong>
                </div>
                <div>
                  <span>Version</span>
                  <strong>v1.0</strong>
                </div>
              </aside>
            </PublicPageHeroFrame>

            <div className={styles.articleGrid}>
              <aside className={styles.leftRail}>
                <BlogArticleToc items={tocItems} />

                <div className={styles.leftCta}>
                  <span>Enjoying the read?</span>
                  <p>Get new architecture notes and implementation lessons.</p>
                  <Link href="/contacts">
                    Let&apos;s talk
                    <ArticleIcon name="arrow" size={13} />
                  </Link>
                </div>
              </aside>

              <div className={styles.articleColumn}>
                {cover?.url ? (
                  <figure className={styles.cover}>
                    <Image
                      alt={cover.alt}
                      fill
                      priority
                      sizes="(max-width: 900px) 100vw, 760px"
                      src={cover.url}
                    />
                    {cover.caption ? <figcaption>{cover.caption}</figcaption> : null}
                  </figure>
                ) : (
                  <div className={styles.coverFallback} aria-hidden="true">
                    <div>
                      <span>AUTH</span>
                      <span>API</span>
                      <span>DATA</span>
                    </div>
                    <strong>Engineering system map</strong>
                  </div>
                )}

                <section className={styles.overview} data-article-reveal id="overview">
                  <p className={styles.sectionEyebrow}>Overview</p>
                  <p>{post.excerpt}</p>

                  <div className={styles.note}>
                    <span>Engineering note</span>
                    <p>
                      The strongest architecture decisions are the ones that remain understandable
                      after the implementation grows.
                    </p>
                  </div>
                </section>

                <section className={styles.richText} id="article-content">
                  <BlogPostRichText data={post.content} />
                </section>

                {keyTakeaways.length > 0 ? (
                  <section className={styles.takeaways} data-article-reveal id="key-takeaways">
                    <p className={styles.sectionEyebrow}>Key takeaways</p>
                    <div>
                      {keyTakeaways.map((takeaway, index) => (
                        <article key={takeaway.id ?? `${post.id}-takeaway-${index}`}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <p>{takeaway.text}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}

                <BlogArticleActions
                  initialCounts={feedbackCounts}
                  slug={post.slug}
                  title={post.title}
                />

                <nav className={styles.articleNavigation} aria-label="Article navigation">
                  {previousPost ? (
                    <Link href={`/blog/${previousPost.slug}`}>
                      <span>Previous article</span>
                      <strong>{previousPost.title}</strong>
                    </Link>
                  ) : (
                    <span />
                  )}

                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`}>
                      <span>Next article</span>
                      <strong>{nextPost.title}</strong>
                    </Link>
                  ) : null}
                </nav>
              </div>

              <aside className={styles.rightRail}>
                <div className={styles.authorCard}>
                  <div className={styles.authorAvatar}>
                    {authorPortrait?.url ? (
                      <Image
                        alt={authorPortrait.alt || `Portrait of ${authorName}`}
                        fill
                        sizes="52px"
                        src={authorPortrait.url}
                      />
                    ) : (
                      authorInitials
                    )}
                  </div>
                  <div>
                    <strong>{authorName}</strong>
                    <span>{authorRole}</span>
                    <small data-status={authorStatus}>
                      <i aria-hidden="true" />
                      {authorStatusLabel}
                    </small>
                  </div>
                  <p>{authorBio}</p>
                  <Link href="/about">
                    View full profile
                    <ArticleIcon name="arrow" size={13} />
                  </Link>
                </div>

                <div className={styles.progressCard}>
                  <p>Reading progress</p>
                  <BlogArticleActions mode="progress" slug={post.slug} title={post.title} />
                  <div>
                    <span>Estimated time</span>
                    <strong>{readingTime} min</strong>
                  </div>
                </div>

                {tags.length > 0 ? (
                  <div className={styles.tagsCard}>
                    <p>
                      <ArticleIcon name="tag" />
                      Tags
                    </p>
                    <div>
                      {tags.map((tag) => (
                        <Link href={`/blog?topic=${tag.slug}`} key={tag.id || tag.slug}>
                          {tag.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className={styles.seriesCard}>
                  <p>
                    <ArticleIcon name="folder" />
                    Series
                  </p>
                  <strong>{series}</strong>
                  <span>{difficulty} level</span>
                </div>
              </aside>
            </div>

            {relatedPosts.length > 0 ? (
              <section
                className={styles.related}
                data-article-reveal
                id="related-articles"
                aria-labelledby="related-articles-title"
              >
                <header>
                  <p className={styles.sectionEyebrow}>Continue reading</p>
                  <h2 id="related-articles-title">Related articles</h2>
                </header>

                <div>
                  {relatedPosts.map((relatedPost) => {
                    const relatedCover = mediaFrom(relatedPost.coverImage)

                    return (
                      <Link
                        className={styles.relatedCard}
                        href={`/blog/${relatedPost.slug}`}
                        key={relatedPost.id}
                      >
                        <div className={styles.relatedImage}>
                          {relatedCover?.url ? (
                            <Image
                              alt={relatedCover.alt}
                              fill
                              sizes="(max-width: 700px) 100vw, 33vw"
                              src={relatedCover.url}
                            />
                          ) : (
                            <TechnicalPreviewPlaceholder
                              label={categoryLabel(relatedPost)}
                              variant="terminal"
                            />
                          )}
                        </div>

                        <div className={styles.relatedContent}>
                          <span>{categoryLabel(relatedPost)}</span>
                          <h3>{relatedPost.title}</h3>
                          <p>
                            {publishedLabel(relatedPost)} · {relatedPost.readingTime ?? 5} min read
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ) : null}

            <section className={styles.discuss} data-article-reveal>
              <div>
                <p className={styles.sectionEyebrow}>Questions?</p>
                <h2>Let&apos;s discuss the implementation.</h2>
                <p>Have a question about the architecture or want to build something similar?</p>
              </div>
              <Link href="/contacts">
                Start a conversation
                <ArticleIcon name="arrow" />
              </Link>
            </section>
          </article>
        </div>
      </PublicPageShell>

      {footerContent ? <SiteFooter content={footerContent} githubFeed={githubFeed} /> : null}
    </>
  )
}
