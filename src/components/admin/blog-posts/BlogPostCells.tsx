// Portfolio Admin Experience - Blog Post Cells v1
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

function getMedia(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  return value as UnknownRecord
}

function getCategoryTitle(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned'
  }

  const category = asRecord(value)
  return asText(category.title, asText(category.name, 'Assigned'))
}

function collectText(value: unknown, result: string[]): void {
  if (typeof value === 'string') {
    result.push(value)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, result))
    return
  }

  if (!value || typeof value !== 'object') {
    return
  }

  const record = value as UnknownRecord

  if (typeof record.text === 'string') {
    result.push(record.text)
  }

  Object.entries(record).forEach(([key, nested]) => {
    if (key !== 'text' && key !== 'type' && key !== 'version') {
      collectText(nested, result)
    }
  })
}

function estimateReadingTime(content: unknown, excerpt: unknown): number {
  const fragments: string[] = []
  collectText(content, fragments)

  if (fragments.length === 0 && typeof excerpt === 'string') {
    fragments.push(excerpt)
  }

  const words = fragments.join(' ').trim().split(/\s+/u).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 220))
}

function initials(title: string): string {
  return title
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function BlogPostTitleCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const title = asText(cellData, 'Untitled article')
  const slug = asText(row.slug, 'slug-not-set')
  const documentID = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const cover = getMedia(row.coverImage)
  const coverURL = asText(cover?.thumbnailURL, asText(cover?.url))
  const safeCoverURL = coverURL.replace(/"/g, '%22')
  const readingTime = estimateReadingTime(row.content, row.excerpt)
  const editURL = documentID
    ? `/admin/collections/blog-posts/${encodeURIComponent(documentID)}`
    : '/admin/collections/blog-posts'

  return (
    <Link aria-label={`Edit article ${title}`} className="portfolio-admin-blog-cell" href={editURL}>
      <span
        aria-hidden="true"
        className={`portfolio-admin-blog-cell__preview${safeCoverURL ? ' has-image' : ''}`}
        style={safeCoverURL ? { backgroundImage: `url("${safeCoverURL}")` } : undefined}
      >
        {safeCoverURL ? null : initials(title)}
      </span>

      <span className="portfolio-admin-blog-cell__copy">
        <strong>{title}</strong>
        <span>
          <code>{slug}</code>
          <i aria-hidden="true" />
          <small>{readingTime} min read</small>
        </span>
      </span>

      <span aria-hidden="true" className="portfolio-admin-blog-cell__open">
        ↗
      </span>
    </Link>
  )
}

export function BlogPostStatusCell({ cellData }: DefaultCellComponentProps) {
  const status = asText(cellData, 'draft').toLowerCase()
  const labels: Record<string, string> = {
    archived: 'Archived',
    draft: 'Draft',
    published: 'Published',
  }

  return (
    <span className={`portfolio-admin-blog-status is-${status}`}>
      <i aria-hidden="true" />
      {labels[status] || status}
    </span>
  )
}

export function BlogPostCategoryCell({ cellData }: DefaultCellComponentProps) {
  if (!cellData) {
    return <span className="portfolio-admin-blog-category is-empty">Uncategorized</span>
  }

  return <span className="portfolio-admin-blog-category">{getCategoryTitle(cellData)}</span>
}

export function BlogPostPublishedCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const status = asText(row.status, 'draft').toLowerCase()
  const rawDate = typeof cellData === 'string' ? cellData : ''
  const date = rawDate ? new Date(rawDate) : null
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null

  const label = status === 'published' ? 'Published' : status === 'archived' ? 'Archived' : 'Draft'

  return (
    <span className={`portfolio-admin-blog-date is-${status}`}>
      <i aria-hidden="true" />
      <span>
        <strong>{label}</strong>
        <small>
          {validDate
            ? new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).format(validDate)
            : 'No publication date'}
        </small>
      </span>
    </span>
  )
}
