// Portfolio Admin Experience - Project Version Cells v1
'use client'

import Link from 'next/link'
import type { DefaultCellComponentProps } from 'payload'

type RecordValue = Record<string, unknown>

function record(value: unknown): RecordValue {
  return value && typeof value === 'object' ? (value as RecordValue) : {}
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function relationshipLabel(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned project'
  }

  const project = record(value)

  return text(project.title, text(project.name, text(project.slug, 'Assigned project')))
}

function formatDate(value: unknown): string {
  if (typeof value !== 'string' || !value) {
    return 'Unscheduled'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function BooleanBadge({
  active,
  activeLabel,
  inactiveLabel,
  tone,
}: {
  active: boolean
  activeLabel: string
  inactiveLabel: string
  tone: 'green' | 'purple'
}) {
  return (
    <span className={`portfolio-admin-release-badge is-${tone}${active ? ' is-active' : ''}`}>
      <i aria-hidden="true" />
      {active ? activeLabel : inactiveLabel}
    </span>
  )
}

export function ProjectVersionIdentityCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const version = text(cellData, 'Version not set')
  const title = text(row.title, 'Untitled release')
  const summary = text(row.summary, 'No release summary')
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const href = id
    ? `/admin/collections/project-versions/${encodeURIComponent(id)}`
    : '/admin/collections/project-versions'

  return (
    <Link className="portfolio-admin-release-cell" href={href}>
      <span className="portfolio-admin-release-cell__mark">
        {version.slice(0, 3).toUpperCase()}
      </span>
      <span className="portfolio-admin-release-cell__copy">
        <strong>
          <code>{version}</code>
          <span>{title}</span>
        </strong>
        <small>{summary}</small>
      </span>
      <span aria-hidden="true" className="portfolio-admin-release-cell__arrow">
        ↗
      </span>
    </Link>
  )
}

export function ProjectVersionProjectCell({ cellData }: DefaultCellComponentProps) {
  return (
    <span className={`portfolio-admin-release-project${cellData ? '' : ' is-missing'}`}>
      <i aria-hidden="true" />
      {cellData ? relationshipLabel(cellData) : 'Project missing'}
    </span>
  )
}

export function ProjectVersionDateCell({ cellData }: DefaultCellComponentProps) {
  return (
    <span className={`portfolio-admin-release-date${cellData ? '' : ' is-missing'}`}>
      <i aria-hidden="true" />
      {formatDate(cellData)}
    </span>
  )
}

export function ProjectVersionCurrentCell({ cellData }: DefaultCellComponentProps) {
  return (
    <BooleanBadge
      active={cellData === true}
      activeLabel="Current"
      inactiveLabel="Previous"
      tone="purple"
    />
  )
}

export function ProjectVersionStableCell({ cellData }: DefaultCellComponentProps) {
  return (
    <BooleanBadge
      active={cellData === true}
      activeLabel="Stable"
      inactiveLabel="Unstable"
      tone="green"
    />
  )
}

export function ProjectVersionBreakingCell({ cellData }: DefaultCellComponentProps) {
  const count = Array.isArray(cellData) ? cellData.length : 0

  return (
    <span className={`portfolio-admin-release-breaking${count > 0 ? ' has-breaking' : ''}`}>
      <i aria-hidden="true">{count > 0 ? '!' : '✓'}</i>
      {count > 0 ? `${count} ${count === 1 ? 'change' : 'changes'}` : 'No breaking changes'}
    </span>
  )
}
