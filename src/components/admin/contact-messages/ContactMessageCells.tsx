// Portfolio Admin Experience - Contact Message Cells v1
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

function initials(name: string): string {
  return name
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function ContactMessageSubjectCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const subject = asText(cellData, 'Untitled enquiry')
  const name = asText(row.name, 'Unknown sender')
  const email = asText(row.email)
  const message = asText(row.message)
  const status = asText(row.status, 'new').toLowerCase()
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const href = id
    ? `/admin/collections/contact-messages/${encodeURIComponent(id)}`
    : '/admin/collections/contact-messages'

  return (
    <Link
      aria-label={`Open message ${subject}`}
      className={`portfolio-admin-message-cell is-${status}`}
      href={href}
    >
      <span aria-hidden="true" className="portfolio-admin-message-cell__avatar">
        {initials(name)}
        {status === 'new' ? <i /> : null}
      </span>

      <span className="portfolio-admin-message-cell__copy">
        <span>
          <strong>{subject}</strong>
          <small>
            {name}
            {email ? ` · ${email}` : ''}
          </small>
        </span>
        {message ? <p>{message}</p> : null}
      </span>

      <span aria-hidden="true" className="portfolio-admin-message-cell__open">
        ↗
      </span>
    </Link>
  )
}

export function ContactMessageStatusCell({ cellData }: DefaultCellComponentProps) {
  const status = asText(cellData, 'new').toLowerCase()
  const labels: Record<string, string> = {
    archived: 'Archived',
    new: 'New',
    read: 'Read',
  }

  return (
    <span className={`portfolio-admin-message-status is-${status}`}>
      <i aria-hidden="true" />
      {labels[status] || status}
    </span>
  )
}

export function ContactMessageSourceCell({ cellData }: DefaultCellComponentProps) {
  const source = asText(cellData, 'website').replace(/[-_]+/gu, ' ')

  return (
    <span className="portfolio-admin-source-badge" title={source}>
      {source}
    </span>
  )
}
