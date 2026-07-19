import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PublicBreadcrumbs, PublicPageHero, PublicPageShell } from '@/components/public-page'
import { getBlogPostBySlug } from '@/lib/cms'

export const revalidate = 300

const longDateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
})

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishedAt = post.publishedAt
    ? longDateFormatter.format(new Date(post.publishedAt))
    : 'Publication pending'

  return (
    <PublicPageShell className="public-page--article">
      <article aria-labelledby="article-page-title">
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

        <PublicPageHero
          eyebrow="Build Note / Article"
          title={post.title}
          titleId="article-page-title"
          description={post.excerpt}
          meta={
            <>
              <span>{publishedAt}</span>
              <span>Editorial stream</span>
            </>
          }
          aside={
            <div className="public-page-telemetry public-page-telemetry--violet">
              <span>ARTICLE_STATUS</span>
              <strong>LIVE</strong>
              <small>published note</small>
            </div>
          }
        />

        <section className="public-article-summary" aria-label="Article information">
          <div>
            <span>Published</span>
            <strong>{publishedAt}</strong>
          </div>
          <div>
            <span>Format</span>
            <strong>Engineering note</strong>
          </div>
          <div>
            <span>Source</span>
            <strong>Portfolio CMS</strong>
          </div>
        </section>
      </article>
    </PublicPageShell>
  )
}
