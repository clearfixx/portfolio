import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogPostBySlug } from '@/lib/cms'

export const revalidate = 300

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

  return (
    <article className="public-page public-page--article">
      <div className="site-container public-page__inner">
        <nav aria-label="Breadcrumb">
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="public-page__header">
          <p className="public-page__eyebrow">Build Note</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          {post.publishedAt ? (
            <time dateTime={post.publishedAt}>
              {new Intl.DateTimeFormat('en', {
                dateStyle: 'long',
              }).format(new Date(post.publishedAt))}
            </time>
          ) : null}
        </header>
      </div>
    </article>
  )
}
