import type { Metadata } from 'next'

import {
  PublicEmptyState,
  PublicIndexCard,
  PublicPageHero,
  PublicPageShell,
} from '@/components/public-page'
import { getPublishedBlogPosts } from '@/lib/cms'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Engineering notes, project stories, architecture decisions, and experiments.',
  alternates: {
    canonical: '/blog',
  },
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(12)
  const publishedCount = posts.length

  return (
    <PublicPageShell className="public-page--blog">
      <PublicPageHero
        eyebrow="Portfolio / Build Notes"
        title="Blog"
        titleId="blog-page-title"
        description="Engineering notes about architecture, implementation choices, product systems, and the lessons that only appear while building."
        meta={
          <>
            <span>Editorial stream</span>
            <span>{publishedCount} published</span>
          </>
        }
        aside={
          <div className="public-page-telemetry public-page-telemetry--violet">
            <span>BUILD_NOTES</span>
            <strong>{String(publishedCount).padStart(2, '0')}</strong>
            <small>articles online</small>
          </div>
        }
      />

      <section className="public-page-section" aria-labelledby="blog-registry-title">
        <header className="public-page-section__header">
          <div>
            <p>Latest transmissions</p>
            <h2 id="blog-registry-title">Notes from the build process.</h2>
          </div>
          <span>{String(publishedCount).padStart(2, '0')} entries</span>
        </header>

        {posts.length > 0 ? (
          <ul className="public-index-grid public-index-grid--blog">
            {posts.map((post, index) => {
              const href = post.slug ? `/blog/${post.slug}` : '/blog'
              const publishedAt = post.publishedAt
                ? dateFormatter.format(new Date(post.publishedAt))
                : 'Publication pending'

              return (
                <li key={post.id}>
                  <PublicIndexCard
                    accent={index % 2 === 0 ? 'violet' : 'cyan'}
                    ctaLabel="Read article"
                    eyebrow="Build note"
                    excerpt={post.excerpt}
                    href={href}
                    meta={publishedAt}
                    title={post.title}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <PublicEmptyState
            title="No published articles yet"
            description="Published engineering notes will appear here automatically."
          />
        )}
      </section>
    </PublicPageShell>
  )
}
