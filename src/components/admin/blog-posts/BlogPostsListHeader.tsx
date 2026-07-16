// Portfolio Admin Experience - Blog Posts List Header v1

import Link from 'next/link'

import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'amber' | 'cyan' | 'green' | 'purple'

type MetricProps = {
  code: string
  description: string
  label: string
  tone: Tone
  value: number
}

async function countPosts(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'blog-posts',
      overrideAccess: false,
      user,
      ...(where ? { where } : {}),
    })

    return result.totalDocs
  } catch {
    return 0
  }
}

function Metric({ code, description, label, tone, value }: MetricProps) {
  return (
    <article className={`portfolio-admin-blog-stat is-${tone}`}>
      <div className="portfolio-admin-blog-stat__topline">
        <span>{label}</span>
        <code>{code}</code>
      </div>

      <strong>{value}</strong>
      <p>{description}</p>

      <span aria-hidden="true" className="portfolio-admin-blog-stat__signal">
        <i />
        <i />
        <i />
      </span>
    </article>
  )
}

export default async function BlogPostsListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, published, drafts, archived, needsAttention] = await Promise.all([
    countPosts(payload, user),
    countPosts(payload, user, {
      status: {
        equals: 'published',
      },
    }),
    countPosts(payload, user, {
      status: {
        equals: 'draft',
      },
    }),
    countPosts(payload, user, {
      status: {
        equals: 'archived',
      },
    }),
    countPosts(payload, user, {
      or: [
        {
          coverImage: {
            exists: false,
          },
        },
        {
          category: {
            exists: false,
          },
        },
        {
          author: {
            exists: false,
          },
        },
        {
          and: [
            {
              status: {
                equals: 'published',
              },
            },
            {
              publishedAt: {
                exists: false,
              },
            },
          ],
        },
      ],
    }),
  ])

  return (
    <section className="portfolio-admin-blog-overview">
      <header className="portfolio-admin-blog-overview__header">
        <div>
          <span className="portfolio-admin-blog-overview__eyebrow">Editorial pipeline</span>
          <h2>Publishing desk</h2>
          <p>
            Track editorial state, taxonomy, media coverage, and publication readiness across{' '}
            {total} {total === 1 ? 'article' : 'articles'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            New article
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-blog-overview__metrics">
        <Metric
          code="PUB"
          description="Visible in the public journal"
          label="Published"
          tone="cyan"
          value={published}
        />
        <Metric
          code="DFT"
          description="Still inside the editorial workflow"
          label="Drafts"
          tone="purple"
          value={drafts}
        />
        <Metric
          code="ARC"
          description="Removed from active publication"
          label="Archived"
          tone="green"
          value={archived}
        />
        <Metric
          code="REV"
          description="Missing media, taxonomy, author, or date"
          label="Needs attention"
          tone={needsAttention > 0 ? 'amber' : 'green'}
          value={needsAttention}
        />
      </div>
    </section>
  )
}
