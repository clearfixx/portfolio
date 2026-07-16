// Portfolio Admin Experience - Testimonial Cells v1
'use client'

import Link from 'next/link'

import type { DefaultCellComponentProps } from 'payload'

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {}
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function avatarURL(value: unknown): string {
  const media = asRecord(value)
  return asText(media.thumbnailURL, asText(media.url))
}

function initials(name: string): string {
  return name
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function TestimonialIdentityCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const name = asText(cellData, 'Anonymous client')
  const role = asText(row.role)
  const company = asText(row.company)
  const context = [role, company].filter(Boolean).join(' · ') || 'Client testimonial'
  const message = asText(row.message)
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const image = avatarURL(row.avatar).replace(/"/g, '%22')
  const href = id
    ? `/admin/collections/testimonials/${encodeURIComponent(id)}`
    : '/admin/collections/testimonials'

  return (
    <Link
      aria-label={`Review testimonial from ${name}`}
      className="portfolio-admin-testimonial-cell"
      href={href}
    >
      <span
        aria-hidden="true"
        className={`portfolio-admin-testimonial-cell__avatar${image ? ' has-image' : ''}`}
        style={image ? { backgroundImage: `url("${image}")` } : undefined}
      >
        {image ? null : initials(name)}
      </span>

      <span className="portfolio-admin-testimonial-cell__copy">
        <strong>{name}</strong>
        <small>{context}</small>
        {message ? <q>{message}</q> : null}
      </span>

      <span aria-hidden="true" className="portfolio-admin-testimonial-cell__open">
        ↗
      </span>
    </Link>
  )
}

export function TestimonialStatusCell({ cellData }: DefaultCellComponentProps) {
  const status = asText(cellData, 'pending').toLowerCase()

  return (
    <span className={`portfolio-admin-moderation-status is-${status}`}>
      <i aria-hidden="true" />
      {status}
    </span>
  )
}

export function TestimonialRatingCell({ cellData }: DefaultCellComponentProps) {
  const raw = typeof cellData === 'number' ? cellData : Number(cellData)
  const rating = Number.isFinite(raw) ? Math.min(5, Math.max(0, Math.round(raw))) : 0

  if (rating === 0) {
    return <span className="portfolio-admin-testimonial-rating is-empty">Unrated</span>
  }

  return (
    <span aria-label={`${rating} of 5 stars`} className="portfolio-admin-testimonial-rating">
      <span aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <i className={index < rating ? 'is-active' : ''} key={index}>
            ★
          </i>
        ))}
      </span>
      <code>{rating}.0</code>
    </span>
  )
}

export function TestimonialSourceCell({ cellData }: DefaultCellComponentProps) {
  const source = asText(cellData, 'Direct').replace(/[-_]+/gu, ' ')

  return (
    <span className="portfolio-admin-source-badge" title={source}>
      {source}
    </span>
  )
}

export function TestimonialApprovedCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const status = asText(row.status, 'pending').toLowerCase()
  const raw = typeof cellData === 'string' ? cellData : ''
  const date = raw ? new Date(raw) : null
  const valid = date && !Number.isNaN(date.getTime()) ? date : null

  return (
    <span className={`portfolio-admin-moderation-date is-${status}`}>
      <i aria-hidden="true" />
      <span>
        <strong>
          {status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Pending'}
        </strong>
        <small>
          {valid
            ? new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).format(valid)
            : status === 'approved'
              ? 'Date not set'
              : 'Awaiting review'}
        </small>
      </span>
    </span>
  )
}
