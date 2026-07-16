// Portfolio Admin Experience - Project Document Controls v1
'use client'

import Link from 'next/link'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

type State = { value?: unknown }

const labels: Record<string, string> = {
  archived: 'Archived',
  development: 'Development',
  idea: 'Idea',
  maintenance: 'Maintenance',
  planning: 'Planning',
  released: 'Released',
  testing: 'Testing',
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function updatedAt(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date)) {
    return null
  }

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  }).format(date)
}

export default function ProjectDocumentControls() {
  const { isEditing, lastUpdateTime } = useDocumentInfo()
  const data = useFormFields(([fields]) => ({
    slug: (fields.slug as State | undefined)?.value,
    stage: (fields.stage as State | undefined)?.value,
    version: (fields.currentVersion as State | undefined)?.value,
  }))

  const stage = text(data.stage, 'idea').toLowerCase()
  const slug = text(data.slug)
  const version = text(data.version, 'Unversioned')
  const updated = updatedAt(lastUpdateTime)

  return (
    <div className="portfolio-admin-project-command">
      <span className={`portfolio-admin-project-command__stage is-${stage}`}>
        <i aria-hidden="true" />
        {labels[stage] || stage}
      </span>

      <span className="portfolio-admin-project-command__version">
        <small>Version</small>
        <code>{version}</code>
      </span>

      {isEditing && updated ? (
        <span className="portfolio-admin-project-command__updated">
          Updated <time>{updated}</time>
        </span>
      ) : null}

      {slug ? (
        <Link
          className="portfolio-admin-project-command__preview"
          href={`/projects/${encodeURIComponent(slug)}`}
          target="_blank"
        >
          Preview <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <span className="portfolio-admin-project-command__preview is-disabled">Preview</span>
      )}
    </div>
  )
}
