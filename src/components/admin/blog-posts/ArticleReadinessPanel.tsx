// Portfolio Admin Experience - Article Readiness Panel v1
'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useFormFields } from '@payloadcms/ui'

type FieldState = {
  rows?: unknown[]
  value?: unknown
}

type ReadinessCheck = {
  description: string
  label: string
  ready: boolean
}

function asField(value: unknown): FieldState | undefined {
  return value && typeof value === 'object' ? (value as FieldState) : undefined
}

function hasText(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') {
    return false
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return true
}

function hasRows(field: FieldState | undefined): boolean {
  return Array.isArray(field?.rows) && field.rows.length > 0
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

function countWords(value: unknown): number {
  const fragments: string[] = []
  collectText(value, fragments)

  return fragments.join(' ').trim().split(/\s+/u).filter(Boolean).length
}

function getReadingTime(words: number): number {
  return words > 0 ? Math.max(1, Math.ceil(words / 220)) : 0
}

export default function ArticleReadinessPanel() {
  const fields = useFormFields(([formFields]) => formFields)
  const read = (path: string): FieldState | undefined => asField(fields[path])

  const title = read('title')?.value
  const slug = read('slug')?.value
  const excerpt = read('excerpt')?.value
  const content = read('content')?.value
  const coverImage = read('coverImage')?.value
  const category = read('category')?.value
  const author = read('author')?.value
  const publishedAt = read('publishedAt')?.value
  const tags = read('tags')
  const metaTitle = read('seo.metaTitle')?.value
  const metaDescription = read('seo.metaDescription')?.value

  const words = countWords(content)
  const readingTime = getReadingTime(words)

  const checks: ReadinessCheck[] = [
    {
      label: 'Identity',
      description: 'Title, slug, and excerpt',
      ready: hasText(title) && hasText(slug) && hasText(excerpt),
    },
    {
      label: 'Article body',
      description: 'At least 120 words of editorial content',
      ready: words >= 120,
    },
    {
      label: 'Media',
      description: 'Primary cover image',
      ready: hasValue(coverImage),
    },
    {
      label: 'Taxonomy',
      description: 'Category and at least one tag',
      ready: hasValue(category) && hasRows(tags),
    },
    {
      label: 'Attribution',
      description: 'Assigned article author',
      ready: hasValue(author),
    },
    {
      label: 'Publication',
      description: 'Publication date is configured',
      ready: hasValue(publishedAt),
    },
    {
      label: 'SEO',
      description: 'Search title and description',
      ready: hasText(metaTitle) && hasText(metaDescription),
    },
  ]

  const readyCount = checks.filter((check) => check.ready).length
  const score = Math.round((readyCount / checks.length) * 100)
  const slugValue = hasText(slug) ? String(slug).trim() : ''
  const style = {
    '--article-readiness-score': `${score}%`,
  } as CSSProperties

  return (
    <aside className="portfolio-admin-article-readiness" style={style}>
      <header className="portfolio-admin-article-readiness__header">
        <div>
          <span>Article readiness</span>
          <strong>{score}%</strong>
        </div>

        <span
          aria-label={`${readyCount} of ${checks.length} checks complete`}
          className="portfolio-admin-article-readiness__meter"
          role="img"
        >
          <i />
        </span>
      </header>

      <div className="portfolio-admin-article-readiness__reading">
        <span>
          <strong>{readingTime}</strong>
          <small>min read</small>
        </span>
        <span>
          <strong>{words}</strong>
          <small>words</small>
        </span>
      </div>

      <p className="portfolio-admin-article-readiness__summary">
        {readyCount === checks.length
          ? 'All core editorial checks are complete.'
          : `${checks.length - readyCount} editorial ${
              checks.length - readyCount === 1 ? 'check needs' : 'checks need'
            } attention.`}
      </p>

      <div className="portfolio-admin-article-readiness__checks">
        {checks.map((check) => (
          <div
            className={`portfolio-admin-article-readiness__check${check.ready ? ' is-ready' : ''}`}
            key={check.label}
          >
            <span aria-hidden="true">
              {check.ready ? (
                <svg fill="none" viewBox="0 0 20 20">
                  <path
                    d="m5 10.2 3.1 3.1L15.4 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </span>

            <div>
              <strong>{check.label}</strong>
              <small>{check.description}</small>
            </div>
          </div>
        ))}
      </div>

      {slugValue ? (
        <Link
          className="portfolio-admin-article-readiness__preview"
          href={`/articles/${encodeURIComponent(slugValue)}`}
          target="_blank"
        >
          Preview article
          <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <span className="portfolio-admin-article-readiness__preview is-disabled">
          Add a slug to enable preview
        </span>
      )}
    </aside>
  )
}
