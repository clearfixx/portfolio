// Portfolio Admin Experience - Testimonials Moderation Header v1

import Link from 'next/link'

import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'cyan' | 'green' | 'red' | 'purple'

type MetricProps = {
  code: string
  description: string
  label: string
  tone: Tone
  value: number
}

async function countTestimonials(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'testimonials',
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
    <article className={`portfolio-admin-moderation-stat is-${tone}`}>
      <div>
        <span>{label}</span>
        <code>{code}</code>
      </div>
      <strong>{value}</strong>
      <p>{description}</p>
      <i aria-hidden="true" />
    </article>
  )
}

export default async function TestimonialsListHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, pending, approved, rejected, unrated] = await Promise.all([
    countTestimonials(payload, user),
    countTestimonials(payload, user, {
      status: {
        equals: 'pending',
      },
    }),
    countTestimonials(payload, user, {
      status: {
        equals: 'approved',
      },
    }),
    countTestimonials(payload, user, {
      status: {
        equals: 'rejected',
      },
    }),
    countTestimonials(payload, user, {
      rating: {
        exists: false,
      },
    }),
  ])

  return (
    <section className="portfolio-admin-moderation-overview">
      <header className="portfolio-admin-moderation-overview__header">
        <div>
          <span className="portfolio-admin-moderation-overview__eyebrow">Trust moderation</span>
          <h2>Testimonial queue</h2>
          <p>
            Review client feedback, source context, ratings, and approval state across {total}{' '}
            {total === 1 ? 'testimonial' : 'testimonials'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            Add testimonial
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-moderation-overview__metrics">
        <Metric
          code="PND"
          description="Waiting for moderation"
          label="Pending"
          tone="purple"
          value={pending}
        />
        <Metric
          code="APR"
          description="Visible in trust sections"
          label="Approved"
          tone="green"
          value={approved}
        />
        <Metric
          code="REJ"
          description="Excluded from publication"
          label="Rejected"
          tone="red"
          value={rejected}
        />
        <Metric
          code="NRT"
          description="Feedback without a rating"
          label="Unrated"
          tone={unrated > 0 ? 'cyan' : 'green'}
          value={unrated}
        />
      </div>
    </section>
  )
}
