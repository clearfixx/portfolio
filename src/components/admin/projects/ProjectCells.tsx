// Portfolio Admin Experience — Projects list cells
'use client'

import Link from 'next/link'
import type { DefaultCellComponentProps } from 'payload'

type UnknownRecord = Record<string, unknown>

type MediaPreview = {
  alt?: string | null
  thumbnailURL?: string | null
  url?: string | null
}

const stageLabels: Record<string, string> = {
  archived: 'Archived',
  development: 'Development',
  idea: 'Idea',
  maintenance: 'Maintenance',
  planning: 'Planning',
  released: 'Released',
  testing: 'Testing',
}

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {}
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function getPreview(value: unknown): MediaPreview | null {
  return value && typeof value === 'object' ? (value as MediaPreview) : null
}

function initialsFromTitle(title: string): string {
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return initials || 'PR'
}

// Portfolio Admin Experience - project edit link v1
export function ProjectTitleCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = asRecord(rowData)
  const title = asText(cellData, 'Untitled project')
  const slug = asText(row.slug, 'slug-not-set')
  const documentID = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const preview = getPreview(row.coverImage)
  const previewURL = preview?.thumbnailURL || preview?.url || null
  const safePreviewURL = previewURL?.replace(/"/g, '%22')
  const editURL = documentID
    ? `/admin/collections/projects/${encodeURIComponent(documentID)}`
    : '/admin/collections/projects'

  return (
    <Link
      aria-label={`Edit project ${title}`}
      className="portfolio-admin-project-cell"
      href={editURL}
    >
      <span
        aria-hidden="true"
        className={`portfolio-admin-project-cell__preview${safePreviewURL ? ' has-image' : ''}`}
        style={safePreviewURL ? { backgroundImage: `url("${safePreviewURL}")` } : undefined}
      >
        {safePreviewURL ? null : initialsFromTitle(title)}
      </span>

      <span className="portfolio-admin-project-cell__copy">
        <strong>{title}</strong>
        <code>{slug}</code>
      </span>

      <span aria-hidden="true" className="portfolio-admin-project-cell__open">
        <svg fill="none" viewBox="0 0 20 20">
          <path
            d="M7 5.5h7.5V13M14.2 5.8 6 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
    </Link>
  )
}

export function ProjectStageCell({ cellData }: DefaultCellComponentProps) {
  const stage = asText(cellData, 'idea').toLowerCase()

  return (
    <span className={`portfolio-admin-stage is-${stage}`}>
      <i aria-hidden="true" />
      {stageLabels[stage] || stage}
    </span>
  )
}

export function ProjectProgressCell({ cellData }: DefaultCellComponentProps) {
  const rawValue = typeof cellData === 'number' ? cellData : Number(cellData)
  const progress = Number.isFinite(rawValue) ? Math.min(100, Math.max(0, rawValue)) : 0

  return (
    <div className="portfolio-admin-progress-cell">
      <span className="portfolio-admin-progress-cell__track">
        <span style={{ width: `${progress}%` }} />
      </span>
      <code>{Math.round(progress)}%</code>
    </div>
  )
}

export function ProjectFeaturedCell({ cellData }: DefaultCellComponentProps) {
  const featured = cellData === true

  return (
    <span
      aria-label={featured ? 'Featured project' : 'Standard project'}
      className={`portfolio-admin-featured-cell${featured ? ' is-featured' : ''}`}
      role="img"
      title={featured ? 'Featured project' : 'Standard project'}
    >
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path
          d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.8l-5.4 2.83 1.03-6.02-4.37-4.26 6.04-.88L12 3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    </span>
  )
}

export function ProjectPublishedCell({ cellData }: DefaultCellComponentProps) {
  const dateValue = typeof cellData === 'string' ? cellData : null
  const parsedDate = dateValue ? new Date(dateValue) : null
  const isValid = parsedDate && !Number.isNaN(parsedDate.getTime())
  const formatted = isValid
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(parsedDate)
    : null

  return (
    <span className={`portfolio-admin-publication-cell${formatted ? ' is-published' : ''}`}>
      <i aria-hidden="true" />
      <span>
        <strong>{formatted ? 'Published' : 'Draft'}</strong>
        <small>{formatted || 'Publication date not set'}</small>
      </span>
    </span>
  )
}
