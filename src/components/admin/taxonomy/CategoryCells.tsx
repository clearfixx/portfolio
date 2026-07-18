// Portfolio Admin Experience - Category Cells v1
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
    return 'Assigned category'
  }

  const category = record(value)
  return text(category.title, text(category.name, 'Assigned category'))
}

export function CategoryTitleCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const title = text(cellData, 'Untitled category')
  const slug = text(row.slug, 'slug-not-set')
  const description = text(row.description, 'No description')
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const href = id
    ? `/admin/collections/categories/${encodeURIComponent(id)}`
    : '/admin/collections/categories'

  return (
    <Link className="portfolio-admin-category-cell" href={href}>
      <span className="portfolio-admin-category-cell__mark">{title.slice(0, 2).toUpperCase()}</span>
      <span className="portfolio-admin-category-cell__copy">
        <strong>{title}</strong>
        <small>
          <code>{slug}</code>
          <span aria-hidden="true"> · </span>
          {description}
        </small>
      </span>
      <span aria-hidden="true" className="portfolio-admin-category-cell__arrow">
        ↗
      </span>
    </Link>
  )
}

export function CategoryTypeCell({ cellData }: DefaultCellComponentProps) {
  const type = text(cellData, 'shared').toLowerCase()
  const labels: Record<string, string> = {
    blog: 'Blog',
    project: 'Project',
    shared: 'Shared',
    'tech-stack': 'Tech Stack',
  }

  return (
    <span className={`portfolio-admin-taxonomy-badge is-${type}`}>
      <i aria-hidden="true" />
      {labels[type] || type}
    </span>
  )
}

export function CategoryParentCell({ cellData }: DefaultCellComponentProps) {
  return (
    <span className={`portfolio-admin-taxonomy-parent${cellData ? '' : ' is-root'}`}>
      <i aria-hidden="true" />
      {cellData ? relationshipLabel(cellData) : 'Root category'}
    </span>
  )
}

export function CategorySortCell({ cellData }: DefaultCellComponentProps) {
  const order = Number(cellData)

  return (
    <code className="portfolio-admin-taxonomy-order">{Number.isFinite(order) ? order : 0}</code>
  )
}
