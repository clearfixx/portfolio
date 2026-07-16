// Portfolio Admin Experience - Media Editor v1
// portfolio-admin-media-editor-polish-recovery-v1
'use client'

import { useFormFields } from '@payloadcms/ui'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect } from 'react'

type Primitive = boolean | number | string | null | undefined

function useValue(path: string): Primitive {
  return useFormFields(([fields]) => {
    const value = fields[path]?.value

    if (
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      typeof value === 'string' ||
      value === null ||
      typeof value === 'undefined'
    ) {
      return value
    }

    return undefined
  })
}

function text(value: Primitive, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function numberValue(value: Primitive): number | null {
  const parsed = typeof value === 'number' ? value : Number(value)

  return Number.isFinite(parsed) ? parsed : null
}

function formatBytes(value: Primitive): string {
  const bytes = numberValue(value)

  if (!bytes || bytes <= 0) {
    return 'Unknown'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const normalized = bytes / 1024 ** exponent

  return `${normalized >= 10 || exponent === 0 ? normalized.toFixed(0) : normalized.toFixed(1)} ${
    units[exponent]
  }`
}

function formatDate(value: Primitive): string {
  const raw = text(value)

  if (!raw) {
    return 'Not synced'
  }

  const date = new Date(raw)

  if (Number.isNaN(date.getTime())) {
    return raw
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function safeBackgroundURL(value: string): string {
  return value.replace(/["\\\n\r]/g, (character) => encodeURIComponent(character))
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="portfolio-admin-media-editor__meta-item">
      <span>{label}</span>
      <strong title={value}>{value}</strong>
    </div>
  )
}

function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'cyan' | 'green' | 'neutral' | 'purple'
}) {
  return (
    <span className={`portfolio-admin-media-editor__badge is-${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

export function MediaWorkspace() {
  const filename = text(useValue('filename'), 'New media asset')
  const alt = text(useValue('alt'), 'Add accessible alternative text for this asset.')
  const mimeType = text(useValue('mimeType'), 'File type unavailable')
  const previewURL = text(useValue('thumbnailURL'), text(useValue('url')))
  const filesize = formatBytes(useValue('filesize'))
  const width = numberValue(useValue('width'))
  const height = numberValue(useValue('height'))
  const dimensions = width && height ? `${width} × ${height}` : 'Unknown'
  const folder = text(useValue('folder'), 'Unsorted')
  const provider = text(useValue('externalProvider'))
  const sourceURL = text(useValue('externalSourceUrl'))
  const isPublic = useValue('isPublic') === true
  const isImage = mimeType.startsWith('image/')
  const canPreview = isImage && Boolean(previewURL)

  useEffect(() => {
    let heading: HTMLElement | null = null
    let previousTitle: string | null = null

    const frame = window.requestAnimationFrame(() => {
      const selectors = [
        '.collection-edit .doc-header__title h1',
        '.collection-edit .doc-header__title',
        '.collection-edit .document-controls__title h1',
        '.collection-edit .document-controls__title',
        '.collection-edit h1.render-title',
      ]

      heading =
        selectors
          .map((selector) => document.querySelector(selector))
          .find((element): element is HTMLElement => element instanceof HTMLElement) ?? null

      if (!heading) {
        return
      }

      previousTitle = heading.getAttribute('title')
      heading.classList.add('portfolio-admin-media-document-title')
      heading.setAttribute('title', heading.textContent?.trim() || alt)
    })

    return () => {
      window.cancelAnimationFrame(frame)

      if (!heading) {
        return
      }

      heading.classList.remove('portfolio-admin-media-document-title')

      if (previousTitle === null) {
        heading.removeAttribute('title')
      } else {
        heading.setAttribute('title', previousTitle)
      }
    }
  }, [alt])

  return (
    <section className="portfolio-admin-media-editor">
      <div className="portfolio-admin-media-editor__preview">
        <div
          aria-label={canPreview ? `Preview of ${filename}` : 'Asset preview unavailable'}
          className={`portfolio-admin-media-editor__canvas${canPreview ? ' has-image' : ''}`}
          role="img"
          style={
            canPreview
              ? {
                  backgroundImage: `url("${safeBackgroundURL(previewURL)}")`,
                }
              : undefined
          }
        >
          {canPreview ? null : (
            <div className="portfolio-admin-media-editor__empty">
              <svg aria-hidden="true" fill="none" viewBox="0 0 48 48">
                <rect
                  height="34"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="38"
                  x="5"
                  y="7"
                />
                <circle cx="17" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="m10 36 10-10 7 7 5-5 6 8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              <strong>Preview unavailable</strong>
              <span>Upload an image or save the document to generate a preview.</span>
            </div>
          )}
        </div>

        <div className="portfolio-admin-media-editor__preview-footer">
          <StatusBadge tone={isPublic ? 'green' : 'neutral'}>
            {isPublic ? 'Public' : 'Private'}
          </StatusBadge>

          {provider ? (
            <StatusBadge tone="purple">{provider}</StatusBadge>
          ) : (
            <StatusBadge>Local asset</StatusBadge>
          )}
        </div>
      </div>

      <div className="portfolio-admin-media-editor__content">
        <span className="portfolio-admin-media-editor__eyebrow">Asset workspace</span>

        <div className="portfolio-admin-media-editor__title-row">
          <div>
            <h2 title={filename}>{filename}</h2>
            <p>{alt}</p>
          </div>

          {sourceURL ? (
            <a
              className="portfolio-admin-media-editor__source-link"
              href={sourceURL}
              rel="noreferrer"
              target="_blank"
            >
              Open source
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        <div className="portfolio-admin-media-editor__meta-grid">
          <MetaItem label="File type" value={mimeType} />
          <MetaItem label="File size" value={filesize} />
          <MetaItem label="Dimensions" value={dimensions} />
          <MetaItem label="Folder" value={folder} />
        </div>
      </div>
    </section>
  )
}

function ReadinessItem({
  complete,
  description,
  label,
}: {
  complete: boolean
  description: string
  label: string
}) {
  return (
    <li className={complete ? 'is-complete' : 'is-pending'}>
      <span aria-hidden="true">{complete ? '✓' : '○'}</span>
      <div>
        <strong>{label}</strong>
        <small>{description}</small>
      </div>
    </li>
  )
}

export function MediaReadiness() {
  const alt = text(useValue('alt'))
  const folder = text(useValue('folder'))
  const visibility = useValue('isPublic')
  const mimeType = text(useValue('mimeType'))
  const width = numberValue(useValue('width'))
  const height = numberValue(useValue('height'))
  const dimensionsReady = !mimeType.startsWith('image/') || Boolean(width && height)

  const checks = [
    {
      complete: Boolean(alt),
      description: 'Accessible alternative text',
      label: 'Accessibility',
    },
    {
      complete: Boolean(folder),
      description: 'Folder key for organization',
      label: 'Organization',
    },
    {
      complete: typeof visibility === 'boolean',
      description: 'Public or private state',
      label: 'Visibility',
    },
    {
      complete: dimensionsReady,
      description: 'Image width and height detected',
      label: 'Dimensions',
    },
  ]

  const completeCount = checks.filter((check) => check.complete).length
  const percentage = Math.round((completeCount / checks.length) * 100)

  return (
    <aside className="portfolio-admin-media-readiness">
      <header>
        <div>
          <span>Asset readiness</span>
          <strong>{percentage}%</strong>
        </div>

        <div
          aria-label={`${percentage}% ready`}
          className="portfolio-admin-media-readiness__ring"
          role="img"
          style={
            {
              '--media-readiness': `${percentage * 3.6}deg`,
            } as CSSProperties
          }
        >
          <i aria-hidden="true" />
        </div>
      </header>

      <p>
        {completeCount === checks.length
          ? 'All asset checks are complete.'
          : `${checks.length - completeCount} asset ${
              checks.length - completeCount === 1 ? 'check needs' : 'checks need'
            } attention.`}
      </p>

      <ul>
        {checks.map((check) => (
          <ReadinessItem
            complete={check.complete}
            description={check.description}
            key={check.label}
            label={check.label}
          />
        ))}
      </ul>
    </aside>
  )
}

function ExternalItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="portfolio-admin-media-external__item">
      <span>{label}</span>
      <strong title={value}>{value}</strong>
    </div>
  )
}

export function MediaExternalSource() {
  const provider = text(useValue('externalProvider'))
  const externalID = text(useValue('externalId'))
  const externalKey = text(useValue('externalKey'))
  const sourceURL = text(useValue('externalSourceUrl'))
  const syncedAt = useValue('externalSyncedAt')

  if (!provider) {
    return (
      <section className="portfolio-admin-media-external is-local">
        <div className="portfolio-admin-media-external__icon">
          <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
            <path
              d="M8 10.5h6l2 2H24v10.8a2.7 2.7 0 0 1-2.7 2.7H10.7A2.7 2.7 0 0 1 8 23.3V10.5Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M11 8h5.2l2 2H24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div>
          <span>Local media</span>
          <h3>No external provider</h3>
          <p>
            This asset was uploaded directly to the portfolio media library and is not managed by a
            social feed.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="portfolio-admin-media-external">
      <header>
        <div>
          <span>External source</span>
          <h3>{provider}</h3>
          <p>
            Provider metadata is maintained by the feed sync process and displayed here as read-only
            diagnostics.
          </p>
        </div>

        <StatusBadge tone="purple">Managed mirror</StatusBadge>
      </header>

      <div className="portfolio-admin-media-external__grid">
        <ExternalItem label="Provider" value={provider} />
        <ExternalItem label="External ID" value={externalID || 'Unavailable'} />
        <ExternalItem label="Last synced" value={formatDate(syncedAt)} />
        <ExternalItem label="External key" value={externalKey || 'Unavailable'} />
      </div>

      {sourceURL ? (
        <a
          className="portfolio-admin-media-external__link"
          href={sourceURL}
          rel="noreferrer"
          target="_blank"
        >
          Open original source
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </section>
  )
}
