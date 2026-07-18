import type { AdminDocumentHeaderConfig } from './types'

export function AdminDocumentHeader({
  actions,
  description,
  eyebrow,
  metadata = [],
  status,
  title,
}: AdminDocumentHeaderConfig) {
  return (
    <header className="admin-document-header">
      <div className="admin-document-header__copy">
        {eyebrow ? <span className="admin-document-header__eyebrow">{eyebrow}</span> : null}
        <div className="admin-document-header__title-row">
          <h2>{title}</h2>
          {status ? (
            <span className={`admin-document-status is-${status.tone ?? 'neutral'}`}>
              <i aria-hidden="true" />
              {status.label}
            </span>
          ) : null}
        </div>
        {description ? <p>{description}</p> : null}
        {metadata.length > 0 ? (
          <dl className="admin-document-header__metadata">
            {metadata.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {actions ? <div className="admin-document-header__actions">{actions}</div> : null}
      </div>

      <div aria-label="Document system summary" className="admin-document-header__signal">
        <span>Workspace</span>
        <i />
        <div>
          <small>{eyebrow}</small>
          <strong>{title}</strong>
          <code>{status?.label ?? 'Draft'}</code>
        </div>
        <em>{status?.label ?? 'Draft'}</em>
        <ul>
          {metadata.slice(0, 4).map((item) => (
            <li key={item.label}>
              <small>{item.label}</small>
              <b>{item.value}</b>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
