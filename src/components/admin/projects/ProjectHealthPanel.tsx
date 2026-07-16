// Portfolio Admin Experience - Project Health Panel v1
'use client'

import Link from 'next/link'
import { useFormFields } from '@payloadcms/ui'

type FieldState = {
  rows?: unknown[]
  value?: unknown
}

type HealthCheck = {
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

function hasRichText(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false
  }

  try {
    const serialized = JSON.stringify(value)
      .replace(/"type":"[^"]+"/g, '')
      .replace(/["{}\[\],:]/g, '')
      .trim()

    return serialized.length > 12
  } catch {
    return false
  }
}

export default function ProjectHealthPanel() {
  const fields = useFormFields(([formFields]) => formFields)

  const read = (path: string): FieldState | undefined => asField(fields[path])

  const title = read('title')?.value
  const slug = read('slug')?.value
  const excerpt = read('excerpt')?.value
  const description = read('description')?.value
  const coverImage = read('coverImage')?.value
  const category = read('category')?.value
  const techStack = read('techStack')?.value
  const highlights = read('highlights')
  const links = read('links')
  const githubURL = read('github.url')?.value
  const metaTitle = read('seo.metaTitle')?.value
  const metaDescription = read('seo.metaDescription')?.value

  const checks: HealthCheck[] = [
    {
      label: 'Identity',
      description: 'Title, slug, and summary',
      ready: hasText(title) && hasText(slug) && hasText(excerpt),
    },
    {
      label: 'Case study',
      description: 'Long-form story and highlights',
      ready: hasRichText(description) && hasRows(highlights),
    },
    {
      label: 'Media',
      description: 'Primary project cover',
      ready: hasValue(coverImage),
    },
    {
      label: 'Classification',
      description: 'Category and technology stack',
      ready: hasValue(category) && hasValue(techStack),
    },
    {
      label: 'Destinations',
      description: 'Repository or project links',
      ready: hasText(githubURL) || hasRows(links),
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

  return (
    <aside className="portfolio-admin-project-health">
      <header className="portfolio-admin-project-health__header">
        <div>
          <span>Project readiness</span>
          <strong>{score}%</strong>
        </div>

        <span
          aria-label={`${readyCount} of ${checks.length} checks complete`}
          className="portfolio-admin-project-health__meter"
          role="img"
          style={{ '--project-health-score': `${score}%` } as React.CSSProperties}
        >
          <i />
        </span>
      </header>

      <p className="portfolio-admin-project-health__summary">
        {readyCount === checks.length
          ? 'All core publishing checks are complete.'
          : `${checks.length - readyCount} publishing ${
              checks.length - readyCount === 1 ? 'check needs' : 'checks need'
            } attention.`}
      </p>

      <div className="portfolio-admin-project-health__checks">
        {checks.map((check) => (
          <div
            className={`portfolio-admin-project-health__check${check.ready ? ' is-ready' : ''}`}
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
          className="portfolio-admin-project-health__preview"
          href={`/projects/${encodeURIComponent(slugValue)}`}
          target="_blank"
        >
          Preview project
          <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <span className="portfolio-admin-project-health__preview is-disabled">
          Add a slug to enable preview
        </span>
      )}
    </aside>
  )
}
