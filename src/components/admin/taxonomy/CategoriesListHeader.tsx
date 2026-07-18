// Portfolio Admin Experience - Categories List Header v1
import Link from 'next/link'
import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'amber' | 'cyan' | 'green' | 'purple'

async function countCategories(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'categories',
      overrideAccess: false,
      user,
      ...(where ? { where } : {}),
    })

    return result.totalDocs
  } catch {
    return 0
  }
}

function Metric({
  code,
  description,
  label,
  tone,
  value,
}: {
  code: string
  description: string
  label: string
  tone: Tone
  value: number
}) {
  return (
    <article className={`portfolio-admin-taxonomy-metric is-${tone}`}>
      <header>
        <span>{label}</span>
        <code>{code}</code>
      </header>
      <strong>{value}</strong>
      <small>{description}</small>
      <i aria-hidden="true" />
    </article>
  )
}

export default async function CategoriesListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, project, blog, reusable] = await Promise.all([
    countCategories(payload, user),
    countCategories(payload, user, {
      type: { equals: 'project' },
    }),
    countCategories(payload, user, {
      type: { equals: 'blog' },
    }),
    countCategories(payload, user, {
      or: [{ type: { equals: 'tech-stack' } }, { type: { equals: 'shared' } }],
    }),
  ])

  return (
    <section className="portfolio-admin-taxonomy-overview is-categories">
      <header className="portfolio-admin-taxonomy-overview__header">
        <div>
          <span className="portfolio-admin-taxonomy-overview__eyebrow">Taxonomy architecture</span>
          <h1>Category map</h1>
          <p>
            Organize project, editorial, and reusable classification across {total}{' '}
            {total === 1 ? 'category' : 'categories'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            New category
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-taxonomy-overview__metrics">
        <Metric
          code="ALL"
          description="All taxonomy records"
          label="Total categories"
          tone="cyan"
          value={total}
        />
        <Metric
          code="PRJ"
          description="Project classification"
          label="Project"
          tone="purple"
          value={project}
        />
        <Metric
          code="BLG"
          description="Editorial classification"
          label="Blog"
          tone="green"
          value={blog}
        />
        <Metric
          code="USE"
          description="Technology and shared taxonomy"
          label="Reusable"
          tone="amber"
          value={reusable}
        />
      </div>
    </section>
  )
}
