// Portfolio Admin Experience - Testimonial Document Controls v1
'use client'

import { useFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default function TestimonialDocumentControls() {
  const state = useFormFields(([fields]) => ({
    rating: (fields.rating as FieldState | undefined)?.value,
    source: (fields.source as FieldState | undefined)?.value,
    status: (fields.status as FieldState | undefined)?.value,
  }))

  const status = text(state.status, 'pending').toLowerCase()
  const source = text(state.source, 'Direct')
  const ratingValue = Number(state.rating)
  const rating = Number.isFinite(ratingValue) ? Math.min(5, Math.max(0, ratingValue)) : 0

  return (
    <div className="portfolio-admin-testimonial-command">
      <span className={`portfolio-admin-testimonial-command__status is-${status}`}>
        <i aria-hidden="true" />
        {status}
      </span>

      <span className="portfolio-admin-testimonial-command__rating">
        <strong>{rating > 0 ? rating : '—'}</strong>
        <small>/ 5</small>
      </span>

      <span className="portfolio-admin-testimonial-command__source" title={source}>
        {source}
      </span>
    </div>
  )
}
