// Portfolio Admin Experience - Article Document Controls v1
'use client'

import Link from 'next/link'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

const statusLabels: Record<string, string> = {
  archived: 'Archived',
  draft: 'Draft',
  published: 'Published',
}

function readText(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
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

  const record = value as Record<string, unknown>

  if (typeof record.text === 'string') {
    result.push(record.text)
  }

  Object.entries(record).forEach(([key, nested]) => {
    if (key !== 'text' && key !== 'type' && key !== 'version') {
      collectText(nested, result)
    }
  })
}

function readingTime(value: unknown): number {
  const fragments: string[] = []
  collectText(value, fragments)

  const words = fragments.join(' ').trim().split(/\s+/u).filter(Boolean).length

  return words > 0 ? Math.max(1, Math.ceil(words / 220)) : 0
}

function formatUpdated(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date)) {
    return null
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  }).format(date)
}

export default function ArticleDocumentControls() {
  const { isEditing, lastUpdateTime } = useDocumentInfo()
  const state = useFormFields(([fields]) => ({
    content: (fields.content as FieldState | undefined)?.value,
    slug: (fields.slug as FieldState | undefined)?.value,
    status: (fields.status as FieldState | undefined)?.value,
  }))

  const status = readText(state.status, 'draft').toLowerCase()
  const slug = readText(state.slug)
  const minutes = readingTime(state.content)
  const updated = formatUpdated(lastUpdateTime)

  return (
    <div className="portfolio-admin-article-command">
      <span className={`portfolio-admin-article-command__status is-${status}`}>
        <i aria-hidden="true" />
        {statusLabels[status] || status}
      </span>

      <span className="portfolio-admin-article-command__reading">
        <strong>{minutes}</strong>
        <small>min read</small>
      </span>

      {isEditing && updated ? (
        <span className="portfolio-admin-article-command__updated">
          Updated <time>{updated}</time>
        </span>
      ) : null}

      {slug ? (
        <Link
          className="portfolio-admin-article-command__preview"
          href={`/articles/${encodeURIComponent(slug)}`}
          target="_blank"
        >
          Preview
          <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <span className="portfolio-admin-article-command__preview is-disabled">Preview</span>
      )}
    </div>
  )
}
