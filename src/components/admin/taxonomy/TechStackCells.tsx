// Portfolio Admin Experience - Tech Stack Cells v1
'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { DefaultCellComponentProps } from 'payload'

type RecordValue = Record<string, unknown>

function record(value: unknown): RecordValue {
  return value && typeof value === 'object' ? (value as RecordValue) : {}
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function safeColor(value: unknown): string {
  const color = text(value)
  return /^#[0-9a-f]{3,8}$/iu.test(color) ? color : 'var(--portfolio-admin-cyan)'
}

function relationshipLabel(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned'
  }

  const category = record(value)
  return text(category.title, text(category.name, 'Assigned'))
}

export function TechnologyNameCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const name = text(cellData, 'Unnamed technology')
  const slug = text(row.slug, 'icon-key-not-set')
  const description = text(row.description, 'No description')
  const color = safeColor(row.color)
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const href = id
    ? `/admin/collections/tech-stack/${encodeURIComponent(id)}`
    : '/admin/collections/tech-stack'

  return (
    <Link className="portfolio-admin-technology-cell" href={href}>
      <span
        className="portfolio-admin-technology-cell__mark"
        style={
          {
            '--technology-color': color,
          } as CSSProperties
        }
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
      <span className="portfolio-admin-technology-cell__copy">
        <strong>{name}</strong>
        <small>
          <code>{slug}</code>
          <span aria-hidden="true"> · </span>
          {description}
        </small>
      </span>
      <span aria-hidden="true" className="portfolio-admin-technology-cell__arrow">
        ↗
      </span>
    </Link>
  )
}

export function TechnologyCategoryCell({ cellData }: DefaultCellComponentProps) {
  return (
    <span className={`portfolio-admin-technology-category${cellData ? '' : ' is-missing'}`}>
      {cellData ? relationshipLabel(cellData) : 'Uncategorized'}
    </span>
  )
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
    <span className={`portfolio-admin-boolean-badge is-${tone}${active ? ' is-active' : ''}`}>
      <i aria-hidden="true" />
      {active ? activeLabel : inactiveLabel}
    </span>
  )
}

export function TechnologyFeaturedCell({ cellData }: DefaultCellComponentProps) {
  return (
    <BooleanBadge
      active={cellData === true}
      activeLabel="Featured"
      inactiveLabel="Standard"
      tone="purple"
    />
  )
}

export function TechnologyVisibleCell({ cellData }: DefaultCellComponentProps) {
  return (
    <BooleanBadge
      active={cellData === true}
      activeLabel="Visible"
      inactiveLabel="Hidden"
      tone="green"
    />
  )
}

export function TechnologyLinksCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const officialURL = text(cellData)
  const documentationURL = text(row.documentationUrl)

  return (
    <span className="portfolio-admin-technology-links">
      {officialURL ? (
        <a href={officialURL} rel="noreferrer" target="_blank">
          Official ↗
        </a>
      ) : (
        <span>Missing website</span>
      )}
      {documentationURL ? (
        <a href={documentationURL} rel="noreferrer" target="_blank">
          Docs ↗
        </a>
      ) : (
        <span>Missing docs</span>
      )}
    </span>
  )
}

export function TechnologySortCell({ cellData }: DefaultCellComponentProps) {
  const order = Number(cellData)

  return (
    <code className="portfolio-admin-taxonomy-order">{Number.isFinite(order) ? order : 0}</code>
  )
}
