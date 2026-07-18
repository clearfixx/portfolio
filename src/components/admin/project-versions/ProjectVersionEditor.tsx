// Portfolio Admin Experience - Project Version Editor v1
'use client'

import { useFormFields } from '@payloadcms/ui'
import type { CSSProperties, ReactNode } from 'react'

type FieldState = {
  rows?: unknown[]
  value?: unknown
}

type ReleaseValues = {
  breakingChanges: unknown[]
  highlights: unknown[]
  isCurrent: boolean
  isStable: boolean
  project: unknown
  releaseDate: string
  summary: string
  title: string
  version: string
}

function asField(value: unknown): FieldState | undefined {
  return value && typeof value === 'object' ? (value as FieldState) : undefined
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function asRows(value: unknown): unknown[] {
  const state = asField(value)

  if (Array.isArray(state?.rows)) return state.rows
  if (Array.isArray(state?.value)) return state.value

  return []
}

function projectLabel(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return 'Assigned project'
  }

  if (!value || typeof value !== 'object') {
    return 'Project not linked'
  }

  const project = value as Record<string, unknown>

  return asText(project.title, asText(project.name, asText(project.slug, 'Assigned project')))
}

function formatDate(value: string): string {
  if (!value) return 'Release date not scheduled'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Invalid release date'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function useReleaseValues(): ReleaseValues {
  return useFormFields(([fields]) => ({
    breakingChanges: asRows(fields.breakingChanges),
    highlights: asRows(fields.highlights),
    isCurrent: fields.isCurrent?.value === true,
    isStable: fields.isStable?.value !== false,
    project: fields.project?.value,
    releaseDate: asText(fields.releaseDate?.value),
    summary: asText(fields.summary?.value),
    title: asText(fields.title?.value),
    version: asText(fields.version?.value),
  }))
}

function Badge({
  active,
  children,
  tone,
}: {
  active: boolean
  children: ReactNode
  tone: 'amber' | 'green' | 'purple'
}) {
  return (
    <span className={`portfolio-admin-version-status is-${tone}${active ? ' is-active' : ''}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

export function ReleaseWorkspace() {
  const state = useReleaseValues()
  const version = state.version || 'Version not set'
  const title = state.title || 'Untitled release'
  const project = projectLabel(state.project)

  return (
    <section className="portfolio-admin-version-workspace">
      <div className="portfolio-admin-version-workspace__copy">
        <span className="portfolio-admin-version-workspace__eyebrow">Release profile</span>

        <div className="portfolio-admin-version-workspace__title-row">
          <code>{version}</code>
          <h2>{title}</h2>
        </div>

        <div className="portfolio-admin-version-workspace__statuses">
          <Badge active={state.isCurrent} tone="purple">
            {state.isCurrent ? 'Current' : 'Previous'}
          </Badge>
          <Badge active={state.isStable} tone="green">
            {state.isStable ? 'Stable' : 'Unstable'}
          </Badge>
          <Badge active={state.breakingChanges.length > 0} tone="amber">
            {state.breakingChanges.length > 0
              ? `${state.breakingChanges.length} breaking`
              : 'No breaking changes'}
          </Badge>
        </div>

        <p>
          {state.summary ||
            'Add a concise summary that explains what changed and why this release matters.'}
        </p>

        <dl>
          <div>
            <dt>Project</dt>
            <dd>{project}</dd>
          </div>
          <div>
            <dt>Release date</dt>
            <dd>{formatDate(state.releaseDate)}</dd>
          </div>
          <div>
            <dt>Highlights</dt>
            <dd>{state.highlights.length}</dd>
          </div>
          <div>
            <dt>Migration risk</dt>
            <dd>{state.breakingChanges.length > 0 ? 'Requires attention' : 'Low'}</dd>
          </div>
        </dl>
      </div>

      <div className="portfolio-admin-version-orbit">
        <span className="portfolio-admin-version-orbit__label">Release signal</span>
        <i aria-hidden="true" className="is-outer" />
        <i aria-hidden="true" className="is-inner" />

        <div className="portfolio-admin-version-orbit__core">
          <span>{version}</span>
          <strong>{title}</strong>
          <small>{project}</small>
        </div>

        <div className="portfolio-admin-version-orbit__timeline">
          <span className="is-complete">Identity</span>
          <i aria-hidden="true" />
          <span className={state.highlights.length ? 'is-complete' : ''}>Highlights</span>
          <i aria-hidden="true" />
          <span className={state.breakingChanges.length ? 'has-risk' : 'is-complete'}>Risk</span>
        </div>
      </div>
    </section>
  )
}

export function ReleaseHighlightsSummary() {
  const state = useReleaseValues()

  return (
    <section className="portfolio-admin-version-summary is-highlights">
      <header>
        <div>
          <span>Release highlights</span>
          <strong>
            {state.highlights.length
              ? `${state.highlights.length} documented`
              : 'No highlights documented yet'}
          </strong>
        </div>
        <code>{state.version || 'DRAFT'}</code>
      </header>
      <p>
        {state.highlights.length
          ? 'The changelog has a clear delivery summary.'
          : 'Add the most important capabilities, improvements, or milestones delivered in this version.'}
      </p>
    </section>
  )
}

export function ReleaseRiskSummary() {
  const state = useReleaseValues()
  const hasRisk = state.breakingChanges.length > 0

  return (
    <section className={`portfolio-admin-version-summary is-risk${hasRisk ? ' has-risk' : ''}`}>
      <header>
        <div>
          <span>Migration assessment</span>
          <strong>
            {hasRisk
              ? `${state.breakingChanges.length} migration warning${
                  state.breakingChanges.length === 1 ? '' : 's'
                }`
              : 'No breaking changes registered'}
          </strong>
        </div>
        <code>{hasRisk ? 'ATTN' : 'SAFE'}</code>
      </header>
      <p>
        {hasRisk
          ? 'Add clear upgrade instructions before publication.'
          : state.isStable
            ? 'This stable release currently presents a low migration risk.'
            : 'The release is unstable, but no explicit breaking changes are documented.'}
      </p>
    </section>
  )
}

function Check({
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

export function ReleaseReadiness() {
  const state = useReleaseValues()
  const checks = [
    {
      complete: Boolean(state.project),
      description: 'Linked portfolio project',
      label: 'Project',
    },
    {
      complete: Boolean(state.version && state.title),
      description: 'Version label and release title',
      label: 'Identity',
    },
    {
      complete: Boolean(state.summary),
      description: 'Concise release explanation',
      label: 'Summary',
    },
    {
      complete: Boolean(state.releaseDate),
      description: 'Release date configured',
      label: 'Schedule',
    },
    {
      complete: state.highlights.length > 0,
      description: 'At least one delivery highlight',
      label: 'Highlights',
    },
  ]
  const completed = checks.filter((check) => check.complete).length
  const score = Math.round((completed / checks.length) * 100)
  const remaining = checks.length - completed

  return (
    <aside
      className="portfolio-admin-version-readiness"
      style={
        {
          '--version-readiness': `${score}%`,
        } as CSSProperties
      }
    >
      <header>
        <div>
          <span>Release readiness</span>
          <strong>{score}%</strong>
        </div>
        <i aria-hidden="true">
          <b />
        </i>
      </header>

      <p>
        {remaining === 0
          ? 'All core release checks are complete.'
          : `${remaining} ${remaining === 1 ? 'check needs' : 'checks need'} attention.`}
      </p>

      <ul>
        {checks.map((check) => (
          <Check key={check.label} {...check} />
        ))}
      </ul>
    </aside>
  )
}
