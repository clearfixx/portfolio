// Portfolio Admin Experience - Tech Stack List Header v1
import Link from 'next/link'
import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'amber' | 'cyan' | 'green' | 'purple'

async function countTechnologies(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'tech-stack',
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

export default async function TechStackListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, visible, featured, needsLinks] = await Promise.all([
    countTechnologies(payload, user),
    countTechnologies(payload, user, {
      visible: { equals: true },
    }),
    countTechnologies(payload, user, {
      featured: { equals: true },
    }),
    countTechnologies(payload, user, {
      or: [
        { officialUrl: { exists: false } },
        { officialUrl: { equals: '' } },
        { documentationUrl: { exists: false } },
        { documentationUrl: { equals: '' } },
      ],
    }),
  ])

  return (
    <section className="portfolio-admin-taxonomy-overview is-tech-stack">
      <header className="portfolio-admin-taxonomy-overview__header">
        <div>
          <span className="portfolio-admin-taxonomy-overview__eyebrow">Technology registry</span>
          <h1>Stack catalog</h1>
          <p>
            Maintain technology identity, classification, visibility, and official resources across{' '}
            {total} {total === 1 ? 'technology' : 'technologies'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            Add technology
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-taxonomy-overview__metrics">
        <Metric
          code="ALL"
          description="Registered technologies"
          label="Total stack"
          tone="cyan"
          value={total}
        />
        <Metric
          code="VIS"
          description="Available on public pages"
          label="Visible"
          tone="green"
          value={visible}
        />
        <Metric
          code="FTR"
          description="Highlighted technologies"
          label="Featured"
          tone="purple"
          value={featured}
        />
        <Metric
          code="URL"
          description="Missing website or documentation"
          label="Needs links"
          tone={needsLinks > 0 ? 'amber' : 'green'}
          value={needsLinks}
        />
      </div>
    </section>
  )
}
