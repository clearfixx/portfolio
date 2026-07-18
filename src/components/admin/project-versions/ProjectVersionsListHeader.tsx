// Portfolio Admin Experience - Project Versions List Header v1
import Link from 'next/link'
import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'amber' | 'cyan' | 'green' | 'purple'

async function countVersions(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'project-versions',
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
    <article className={`portfolio-admin-release-metric is-${tone}`}>
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

export default async function ProjectVersionsListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, current, stable, breaking] = await Promise.all([
    countVersions(payload, user),
    countVersions(payload, user, {
      isCurrent: { equals: true },
    }),
    countVersions(payload, user, {
      isStable: { equals: true },
    }),
    countVersions(payload, user, {
      'breakingChanges.title': { exists: true },
    }),
  ])

  return (
    <section className="portfolio-admin-release-overview">
      <header className="portfolio-admin-release-overview__header">
        <div>
          <span className="portfolio-admin-release-overview__eyebrow">Release registry</span>
          <h1>Version history</h1>
          <p>
            Track release identity, stability, current visibility, and migration risk across {total}{' '}
            {total === 1 ? 'project version' : 'project versions'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            New version
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-release-overview__metrics">
        <Metric
          code="ALL"
          description="All registered releases"
          label="Total versions"
          tone="cyan"
          value={total}
        />
        <Metric
          code="CUR"
          description="Current visible releases"
          label="Current"
          tone="purple"
          value={current}
        />
        <Metric
          code="STB"
          description="Marked production-stable"
          label="Stable"
          tone="green"
          value={stable}
        />
        <Metric
          code="BRK"
          description="Contain migration warnings"
          label="Breaking"
          tone={breaking > 0 ? 'amber' : 'green'}
          value={breaking}
        />
      </div>
    </section>
  )
}
