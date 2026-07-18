// Portfolio Admin Experience - Category Editor v1
'use client'

import { useFormFields } from '@payloadcms/ui'
import type { CSSProperties, ReactNode } from 'react'

type CategoryType = 'blog' | 'project' | 'shared' | 'tech-stack'

type CategoryValues = {
  description: string
  parent: unknown
  slug: string
  sortOrder: number
  title: string
  type: CategoryType
}

const TYPE_META: Record<
  CategoryType,
  {
    code: string
    description: string
    label: string
    tone: string
  }
> = {
  blog: {
    code: 'BLG',
    description: 'Editorial taxonomy for articles, journal entries, and publishing.',
    label: 'Blog',
    tone: 'green',
  },
  project: {
    code: 'PRJ',
    description: 'Portfolio taxonomy for case studies, products, and delivery work.',
    label: 'Project',
    tone: 'purple',
  },
  shared: {
    code: 'SHR',
    description: 'Reusable taxonomy that may be shared across multiple content areas.',
    label: 'Shared',
    tone: 'amber',
  },
  'tech-stack': {
    code: 'TEC',
    description: 'Technology taxonomy for frameworks, infrastructure, and tooling.',
    label: 'Tech Stack',
    tone: 'cyan',
  },
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function number(value: unknown, fallback = 0): number {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : fallback
}

function categoryType(value: unknown): CategoryType {
  return value === 'blog' || value === 'project' || value === 'shared' || value === 'tech-stack'
    ? value
    : 'shared'
}

function parentLabel(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned parent'
  }

  if (!value || typeof value !== 'object') {
    return 'Root'
  }

  const parent = value as Record<string, unknown>

  return text(parent.title, text(parent.name, text(parent.label, 'Assigned parent')))
}

function useCategoryValues(): CategoryValues {
  return useFormFields(([fields]) => ({
    description: text(fields.description?.value),
    parent: fields.parent?.value,
    slug: text(fields.slug?.value),
    sortOrder: number(fields.sortOrder?.value),
    title: text(fields.title?.value),
    type: categoryType(fields.type?.value),
  }))
}

function StatusPill({ children, tone }: { children: ReactNode; tone: string }) {
  return (
    <span className={`portfolio-admin-category-status is-${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

export function CategoryWorkspace() {
  const { description, parent, slug, sortOrder, title, type } = useCategoryValues()
  const meta = TYPE_META[type]
  const resolvedTitle = title || 'Untitled category'
  const resolvedSlug = slug || 'slug-not-generated'
  const resolvedParent = parentLabel(parent)

  return (
    <section className="portfolio-admin-category-workspace">
      <div className="portfolio-admin-category-workspace__copy">
        <span className="portfolio-admin-category-workspace__eyebrow">Taxonomy node</span>

        <div className="portfolio-admin-category-workspace__title-row">
          <h2>{resolvedTitle}</h2>
          <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
        </div>

        <code>/{resolvedSlug}</code>

        <p>
          {description ||
            'Add a concise description so editors understand when this category should be used.'}
        </p>

        <dl>
          <div>
            <dt>Parent</dt>
            <dd>{resolvedParent}</dd>
          </div>
          <div>
            <dt>Order</dt>
            <dd>{sortOrder}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{meta.code}</dd>
          </div>
        </dl>
      </div>

      <div
        aria-label={`${resolvedTitle} taxonomy node preview`}
        className={`portfolio-admin-category-node is-${meta.tone}`}
      >
        <span className="portfolio-admin-category-node__parent">{resolvedParent}</span>
        <i aria-hidden="true" />
        <div>
          <small>{meta.code}</small>
          <strong>{resolvedTitle}</strong>
          <code>{resolvedSlug}</code>
        </div>
        <span className="portfolio-admin-category-node__scope">{meta.label}</span>
      </div>
    </section>
  )
}

export function CategoryHierarchy() {
  const { parent, title, type } = useCategoryValues()
  const meta = TYPE_META[type]
  const resolvedParent = parentLabel(parent)
  const resolvedTitle = title || 'Current category'

  return (
    <section className="portfolio-admin-category-hierarchy">
      <header>
        <div>
          <span>Hierarchy preview</span>
          <strong>{parent ? 'Nested taxonomy node' : 'Root taxonomy node'}</strong>
        </div>
        <StatusPill tone={meta.tone}>{meta.code}</StatusPill>
      </header>

      <div className="portfolio-admin-category-hierarchy__path">
        <span className="is-root">Taxonomy</span>
        <i aria-hidden="true">/</i>
        {parent ? (
          <>
            <span>{resolvedParent}</span>
            <i aria-hidden="true">/</i>
          </>
        ) : null}
        <strong>{resolvedTitle}</strong>
      </div>

      <p>{meta.description}</p>
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

export function CategoryReadiness() {
  const { description, slug, title, type } = useCategoryValues()

  const checks = [
    {
      complete: Boolean(title),
      description: 'Readable category name',
      label: 'Title',
    },
    {
      complete: Boolean(slug),
      description: 'Stable URL identifier',
      label: 'Slug',
    },
    {
      complete: Boolean(type),
      description: 'Content usage scope',
      label: 'Classification',
    },
    {
      complete: Boolean(description),
      description: 'Editorial usage guidance',
      label: 'Description',
    },
  ]

  const complete = checks.filter((check) => check.complete).length
  const percentage = Math.round((complete / checks.length) * 100)
  const remaining = checks.length - complete

  return (
    <aside
      className="portfolio-admin-category-readiness"
      style={
        {
          '--category-readiness': `${percentage}%`,
        } as CSSProperties
      }
    >
      <header>
        <div>
          <span>Category readiness</span>
          <strong>{percentage}%</strong>
        </div>
        <i aria-hidden="true">
          <b />
        </i>
      </header>

      <p>
        {remaining === 0
          ? 'This taxonomy node is ready to use.'
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
