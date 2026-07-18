// Portfolio Admin Experience - Tech Stack Editor v1
'use client'

import { useFormFields } from '@payloadcms/ui'
import type { CSSProperties, ReactNode } from 'react'

type TechnologyValues = {
  category: unknown
  color: string
  description: string
  documentationUrl: string
  featured: boolean
  name: string
  officialUrl: string
  slug: string
  sortOrder: number
  visible: boolean
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function number(value: unknown, fallback = 0): number {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : fallback
}

function boolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function relationshipLabel(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned category'
  }

  if (!value || typeof value !== 'object') {
    return 'Uncategorized'
  }

  const category = value as Record<string, unknown>

  return text(category.title, text(category.name, text(category.label, 'Assigned category')))
}

function safeColor(value: unknown): string {
  const color = text(value)

  return /^#[0-9a-f]{3,8}$/iu.test(color) ? color : '#32d7e7'
}

function isValidURL(value: string): boolean {
  if (!value) {
    return false
  }

  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function useTechnologyValues(): TechnologyValues {
  return useFormFields(([fields]) => ({
    category: fields.category?.value,
    color: text(fields.color?.value),
    description: text(fields.description?.value),
    documentationUrl: text(fields.documentationUrl?.value),
    featured: boolean(fields.featured?.value),
    name: text(fields.name?.value),
    officialUrl: text(fields.officialUrl?.value),
    slug: text(fields.slug?.value),
    sortOrder: number(fields.sortOrder?.value),
    visible: boolean(fields.visible?.value, true),
  }))
}

function StatusPill({
  active,
  children,
  tone,
}: {
  active: boolean
  children: ReactNode
  tone: 'cyan' | 'green' | 'purple'
}) {
  return (
    <span className={`portfolio-admin-technology-status is-${tone}${active ? ' is-active' : ''}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

function ResourceLink({ href, label }: { href: string; label: string }) {
  const valid = isValidURL(href)

  return valid ? (
    <a href={href} rel="noreferrer" target="_blank">
      <span>{label}</span>
      <i aria-hidden="true">↗</i>
    </a>
  ) : (
    <span className="is-missing">
      <span>{label}</span>
      <i aria-hidden="true">—</i>
    </span>
  )
}

export function TechnologyWorkspace() {
  const {
    category,
    color,
    description,
    documentationUrl,
    featured,
    name,
    officialUrl,
    slug,
    sortOrder,
    visible,
  } = useTechnologyValues()

  const resolvedName = name || 'Unnamed technology'
  const resolvedSlug = slug || 'icon-key-not-set'
  const resolvedColor = safeColor(color)
  const resolvedCategory = relationshipLabel(category)
  const initials = resolvedName.slice(0, 2).toUpperCase()

  return (
    <section
      className="portfolio-admin-technology-workspace"
      style={
        {
          '--technology-brand': resolvedColor,
        } as CSSProperties
      }
    >
      <div className="portfolio-admin-technology-workspace__copy">
        <span className="portfolio-admin-technology-workspace__eyebrow">Technology profile</span>

        <div className="portfolio-admin-technology-workspace__title-row">
          <h2>{resolvedName}</h2>

          <div className="portfolio-admin-technology-workspace__statuses">
            <StatusPill active={visible} tone="green">
              {visible ? 'Visible' : 'Hidden'}
            </StatusPill>

            <StatusPill active={featured} tone="purple">
              {featured ? 'Featured' : 'Standard'}
            </StatusPill>
          </div>
        </div>

        <code>{resolvedSlug}</code>

        <p>
          {description ||
            'Add a concise explanation so editors and visitors understand where this technology fits.'}
        </p>

        <dl>
          <div>
            <dt>Category</dt>
            <dd>{resolvedCategory}</dd>
          </div>

          <div>
            <dt>Brand</dt>
            <dd>{color || resolvedColor}</dd>
          </div>

          <div>
            <dt>Order</dt>
            <dd>{sortOrder}</dd>
          </div>
        </dl>

        <div className="portfolio-admin-technology-workspace__links">
          <ResourceLink href={officialUrl} label="Official" />
          <ResourceLink href={documentationUrl} label="Documentation" />
        </div>
      </div>

      <div
        aria-label={`${resolvedName} brand preview`}
        className="portfolio-admin-technology-orbit"
      >
        <span className="portfolio-admin-technology-orbit__label">Brand signal</span>

        <i aria-hidden="true" className="is-outer" />
        <i aria-hidden="true" className="is-inner" />

        <div className="portfolio-admin-technology-orbit__core">
          <span>{initials}</span>
          <strong>{resolvedName}</strong>
          <code>{resolvedSlug}</code>
        </div>

        <span className="portfolio-admin-technology-orbit__category">{resolvedCategory}</span>
      </div>
    </section>
  )
}

export function TechnologyClassification() {
  const { category, featured, name, visible } = useTechnologyValues()
  const resolvedCategory = relationshipLabel(category)

  return (
    <section className="portfolio-admin-technology-classification">
      <header>
        <div>
          <span>Registry placement</span>
          <strong>{name || 'Current technology'}</strong>
        </div>

        <code>{category ? 'ASSIGNED' : 'UNSORTED'}</code>
      </header>

      <div className="portfolio-admin-technology-classification__path">
        <span>Technology registry</span>
        <i aria-hidden="true">/</i>
        <strong>{resolvedCategory}</strong>
        <i aria-hidden="true">/</i>
        <b>{name || 'Current technology'}</b>
      </div>

      <div className="portfolio-admin-technology-classification__states">
        <StatusPill active={visible} tone="green">
          {visible ? 'Publicly visible' : 'Hidden from public pages'}
        </StatusPill>

        <StatusPill active={featured} tone="purple">
          {featured ? 'Homepage highlight' : 'Standard catalog item'}
        </StatusPill>
      </div>
    </section>
  )
}

export function TechnologyResources() {
  const { documentationUrl, officialUrl } = useTechnologyValues()
  const officialReady = isValidURL(officialUrl)
  const documentationReady = isValidURL(documentationUrl)

  return (
    <section className="portfolio-admin-technology-resources">
      <header>
        <div>
          <span>Resource diagnostics</span>
          <strong>
            {officialReady && documentationReady
              ? 'Official references complete'
              : 'Complete the technology references'}
          </strong>
        </div>

        <code>{[officialReady, documentationReady].filter(Boolean).length}/2</code>
      </header>

      <div className="portfolio-admin-technology-resources__grid">
        <article className={officialReady ? 'is-ready' : ''}>
          <span>Official website</span>
          <strong>{officialReady ? 'Valid external destination' : 'Missing or invalid URL'}</strong>
          <ResourceLink href={officialUrl} label="Open official site" />
        </article>

        <article className={documentationReady ? 'is-ready' : ''}>
          <span>Documentation</span>
          <strong>
            {documentationReady ? 'Valid documentation destination' : 'Missing or invalid URL'}
          </strong>
          <ResourceLink href={documentationUrl} label="Open documentation" />
        </article>
      </div>
    </section>
  )
}

function ReadinessCheck({
  complete,
  description,
  label,
}: {
  complete: boolean
  description: string
  label: string
}) {
  return (
    <li className={complete ? 'is-complete' : ''}>
      <span aria-hidden="true">{complete ? '✓' : '○'}</span>

      <div>
        <strong>{label}</strong>
        <small>{description}</small>
      </div>
    </li>
  )
}

export function TechnologyReadiness() {
  const { category, color, description, documentationUrl, name, officialUrl, slug } =
    useTechnologyValues()

  const checks = [
    {
      complete: Boolean(name && slug),
      description: 'Name and icon key',
      label: 'Identity',
    },
    {
      complete: Boolean(description),
      description: 'Tooltip-friendly explanation',
      label: 'Description',
    },
    {
      complete: /^#[0-9a-f]{3,8}$/iu.test(color),
      description: 'Valid hexadecimal brand color',
      label: 'Brand color',
    },
    {
      complete: Boolean(category),
      description: 'Technology or shared category',
      label: 'Classification',
    },
    {
      complete: isValidURL(officialUrl),
      description: 'Official website destination',
      label: 'Official URL',
    },
    {
      complete: isValidURL(documentationUrl),
      description: 'Documentation destination',
      label: 'Documentation',
    },
  ]

  const completed = checks.filter((check) => check.complete).length
  const percentage = Math.round((completed / checks.length) * 100)
  const remaining = checks.length - completed

  return (
    <aside
      className="portfolio-admin-technology-readiness"
      style={
        {
          '--technology-readiness': `${percentage}%`,
        } as CSSProperties
      }
    >
      <header>
        <div>
          <span>Stack readiness</span>
          <strong>{percentage}%</strong>
        </div>

        <i aria-hidden="true">
          <b />
        </i>
      </header>

      <p>
        {remaining === 0
          ? 'This technology profile is complete.'
          : `${remaining} ${remaining === 1 ? 'check needs' : 'checks need'} attention.`}
      </p>

      <ul>
        {checks.map((check) => (
          <ReadinessCheck key={check.label} {...check} />
        ))}
      </ul>
    </aside>
  )
}
