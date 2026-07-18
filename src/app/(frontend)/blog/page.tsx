import type { Metadata } from 'next'
import Link from 'next/link'

import { getPublishedBlogPosts } from '@/lib/cms'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Engineering notes, project stories, architecture decisions, and experiments.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(12)

  return (
    <section className="public-page public-page--blog" aria-labelledby="blog-page-title">
      <div className="site-container public-page__inner">
        <header className="public-page__header">
          <p className="public-page__eyebrow">Portfolio // Build Notes</p>
          <h1 id="blog-page-title">Blog</h1>
          <p>
            Notes about product engineering, architecture, implementation choices, and lessons
            learned while building.
          </p>
        </header>

        {posts.length > 0 ? (
          <ul className="public-page__list">
            {posts.map((post) => {
              const href = post.slug ? `/blog/${post.slug}` : '/blog'

              return (
                <li key={post.id}>
                  <article>
                    {post.publishedAt ? (
                      <time dateTime={post.publishedAt}>
                        {new Intl.DateTimeFormat('en', {
                          dateStyle: 'medium',
                        }).format(new Date(post.publishedAt))}
                      </time>
                    ) : null}
                    <h2>
                      <Link href={href}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : (
          <p role="status">No published articles are available yet.</p>
        )}
      </div>
    </section>
  )
}
