// Portfolio Admin Experience — Projects list overview
import Link from 'next/link'
import type { BeforeListServerProps, Where } from 'payload'

type MetricProps = {
  code: string
  description: string
  label: string
  tone: 'cyan' | 'green' | 'purple' | 'amber'
  value: number
}

async function countProjects(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'projects',
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
    <article className={`portfolio-admin-project-stat is-${tone}`}>
      <div className="portfolio-admin-project-stat__topline">
        <span>{label}</span>
        <code>{code}</code>
      </div>
      <strong>{value}</strong>
      <p>{description}</p>
      <span aria-hidden="true" className="portfolio-admin-project-stat__signal">
        <i />
        <i />
        <i />
      </span>
    </article>
  )
}

export default async function ProjectsListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, published, active, featured, missingCover] = await Promise.all([
    countProjects(payload, user),
    countProjects(payload, user, {
      publishedAt: {
        exists: true,
      },
    }),
    countProjects(payload, user, {
      stage: {
        in: ['planning', 'development', 'testing'],
      },
    }),
    countProjects(payload, user, {
      isFeatured: {
        equals: true,
      },
    }),
    countProjects(payload, user, {
      coverImage: {
        exists: false,
      },
    }),
  ])

  return (
    <section className="portfolio-admin-projects-overview">
      <header className="portfolio-admin-projects-overview__header">
        <div>
          <span className="portfolio-admin-projects-overview__eyebrow">Project registry</span>
          <h2>Delivery portfolio</h2>
          <p>
            Track publication readiness, delivery stage, featured placement, and media health across{' '}
            {total} {total === 1 ? 'project' : 'projects'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            New project
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-projects-overview__metrics">
        <Metric
          code="PUB"
          description="Have a publication date"
          label="Published"
          tone="cyan"
          value={published}
        />
        <Metric
          code="RUN"
          description="Planning, development, or testing"
          label="In progress"
          tone="purple"
          value={active}
        />
        <Metric
          code="FTR"
          description="Selected for prominent placement"
          label="Featured"
          tone="green"
          value={featured}
        />
        <Metric
          code="MED"
          description="Missing a primary cover image"
          label="Needs media"
          tone={missingCover > 0 ? 'amber' : 'green'}
          value={missingCover}
        />
      </div>
    </section>
  )
}
