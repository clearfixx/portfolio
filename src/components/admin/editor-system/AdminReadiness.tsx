import type { CSSProperties, ReactNode } from 'react'
import type { AdminReadinessResult } from './types'

export function AdminReadiness({
  footer,
  label,
  result,
  summary,
}: {
  footer?: ReactNode
  label: string
  result: AdminReadinessResult
  summary?: ReactNode
}) {
  const remaining = result.checks.filter((check) => !check.ready).length

  return (
    <aside
      className={`admin-readiness is-${result.state}`}
      style={{ '--admin-readiness-score': `${result.score}%` } as CSSProperties}
    >
      <header className="admin-readiness__header">
        <div>
          <span>{label}</span>
          <strong>{result.score}%</strong>
        </div>
        <span
          aria-label={`${result.completed} of ${result.total} weighted checks complete`}
          className="admin-readiness__meter"
          role="img"
        >
          <i />
        </span>
      </header>
      <p className="admin-readiness__summary">
        {summary ??
          (remaining === 0
            ? 'All core checks are complete.'
            : `${remaining} ${remaining === 1 ? 'check needs' : 'checks need'} attention.`)}
      </p>
      <div className="admin-readiness__checks">
        {result.checks.map((check) => (
          <div className={`admin-readiness__check${check.ready ? ' is-ready' : ''}`} key={check.id}>
            <span aria-hidden="true">{check.ready ? '✓' : '○'}</span>
            <div>
              <strong>{check.label}</strong>
              {check.description ? <small>{check.description}</small> : null}
            </div>
          </div>
        ))}
      </div>
      {footer ? <div className="admin-readiness__footer">{footer}</div> : null}
    </aside>
  )
}
