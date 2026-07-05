import { Editor } from './Editor'

const cards = [
  ['API Status', 'Online', 'v1.2.4', 'chart'],
  ['Database', 'Connected', 'PostgreSQL', 'database'],
  ['Build', 'Successful', '3m 42s', 'check'],
  ['Deployment', 'Ready', 'Production', 'rocket'],
] as const

function StatusIcon({ type }: { type: (typeof cards)[number][3] }) {
  if (type === 'chart') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 34L17 25L26 29L40 13" />
        <circle cx="40" cy="13" r="3" />
      </svg>
    )
  }

  if (type === 'database') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="12" rx="15" ry="6" />
        <path d="M9 12V34C9 37 16 40 24 40S39 37 39 34V12" />
        <path d="M9 23C9 26 16 29 24 29S39 26 39 23" />
      </svg>
    )
  }

  if (type === 'check') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="17" />
        <path d="M16 24L22 30L34 18" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6C31 11 34 18 32 28L40 36L30 33L24 42L18 33L8 36L16 28C14 18 17 11 24 6Z" />
      <path d="M21 18H27" />
    </svg>
  )
}

export function Workspace() {
  return (
    <aside className="hero-workspace">
      <Editor />

      <div className="hero-status-list">
        {cards.map(([label, status, meta, icon]) => (
          <div className="hero-status-card" key={label}>
            <StatusIcon type={icon} />
            <span>{label}</span>
            <strong>{status}</strong>
            <p>{meta}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
