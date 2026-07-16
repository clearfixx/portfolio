// Portfolio Admin Experience - Testimonial Moderation Panel v1
'use client'

import { useAllFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

type ModerationStatus = 'approved' | 'pending' | 'rejected'

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default function TestimonialModerationPanel() {
  const [fields, dispatchFields] = useAllFormFields()
  const status = text(
    (fields.status as FieldState | undefined)?.value,
    'pending',
  ) as ModerationStatus
  const approvedAt = (fields.approvedAt as FieldState | undefined)?.value
  const source = text((fields.source as FieldState | undefined)?.value, 'Direct')
  const ratingValue = Number((fields.rating as FieldState | undefined)?.value)
  const rating = Number.isFinite(ratingValue) ? Math.min(5, Math.max(0, ratingValue)) : 0

  const setStatus = (nextStatus: ModerationStatus) => {
    dispatchFields({
      path: 'status',
      type: 'UPDATE',
      value: nextStatus,
    })

    dispatchFields({
      path: 'approvedAt',
      type: 'UPDATE',
      value:
        nextStatus === 'approved'
          ? typeof approvedAt === 'string' && approvedAt
            ? approvedAt
            : new Date().toISOString()
          : null,
    })
  }

  return (
    <aside className={`portfolio-admin-testimonial-moderation is-${status}`}>
      <header className="portfolio-admin-testimonial-moderation__header">
        <div>
          <span>Moderation state</span>
          <strong>{status}</strong>
        </div>
        <i aria-hidden="true" />
      </header>

      <div className="portfolio-admin-testimonial-moderation__meta">
        <span>
          <small>Rating</small>
          <strong>{rating > 0 ? `${rating}/5` : 'Unrated'}</strong>
        </span>
        <span>
          <small>Source</small>
          <strong title={source}>{source}</strong>
        </span>
      </div>

      <div className="portfolio-admin-testimonial-moderation__actions">
        <button
          className={status === 'pending' ? 'is-active' : ''}
          onClick={() => setStatus('pending')}
          type="button"
        >
          Pending
        </button>
        <button
          className={status === 'approved' ? 'is-active is-approve' : 'is-approve'}
          onClick={() => setStatus('approved')}
          type="button"
        >
          Approve
        </button>
        <button
          className={status === 'rejected' ? 'is-active is-reject' : 'is-reject'}
          onClick={() => setStatus('rejected')}
          type="button"
        >
          Reject
        </button>
      </div>

      <p>Quick actions update the form. Use Save to persist the moderation decision.</p>
    </aside>
  )
}
