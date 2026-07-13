import type { EngineerPrincipleIcon, EngineerProfileViewModel } from '@/lib/cms/homepage'

function PhilosophyIcon({ name }: { name: EngineerPrincipleIcon }) {
  if (name === 'architecture') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M16 4 6 9.5v13L16 28l10-5.5v-13L16 4Z" />
        <path d="M16 4v10.5m0 0L6 9.5m10 5 10-5" />
        <path d="M10.5 17.5 16 20.5l5.5-3" />
      </svg>
    )
  }

  if (name === 'documentation') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M9 5h14l3 3v19H9V5Z" />
        <path d="M23 5v5h5" />
        <path d="M13 14h10M13 18h10M13 22h6" />
      </svg>
    )
  }

  if (name === 'code') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="m13 10-6 6 6 6" />
        <path d="m19 10 6 6-6 6" />
        <path d="m17 8-2 16" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M17 4c4.5 1.1 8 4.6 9 9l-6.5 6.5-7-7L17 4Z" />
      <path d="m12.5 12.5-5 1.5-2 4 5.5-.7" />
      <path d="m19.5 19.5-1.5 5-4 2 .7-5.5" />
      <path d="M11 21 7 25" />
      <path d="M20 11.5h.01" />
    </svg>
  )
}

type PhilosophyPanelProps = {
  principles: EngineerProfileViewModel['principles']
}

export function PhilosophyPanel({ principles }: PhilosophyPanelProps) {
  return (
    <article className="engineer-profile__panel engineer-profile__philosophy-panel">
      <header className="engineer-profile__panel-header">
        <h3>{principles.title}</h3>
        <span>{principles.meta}</span>
      </header>

      {principles.items.length > 0 ? (
        <div className="philosophy-grid">
          {principles.items.map((item) => (
            <div className="philosophy-card" key={item.id}>
              <span className="philosophy-card__icon">
                <PhilosophyIcon name={item.icon} />
              </span>

              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <span className="philosophy-card__number">{item.number}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="engineer-profile__empty" role="status">
          Engineering principles are being updated.
        </p>
      )}

      <div className="engineer-profile__terminal" aria-label="Engineer terminal preview">
        <div className="engineer-profile__terminal-top">
          <span />
          <span />
          <span />
        </div>

        <div className="engineer-profile__terminal-body">
          <p className="engineer-profile__terminal-line engineer-profile__terminal-line--command">
            <span>$</span> npm run build
          </p>
          <p className="engineer-profile__terminal-line engineer-profile__terminal-line--success">
            <span>✓</span> Compiled successfully
          </p>
          <p className="engineer-profile__terminal-line engineer-profile__terminal-line--ready">
            <span>→</span> Ready for production
            <span className="engineer-profile__cursor" />
          </p>
        </div>
      </div>
    </article>
  )
}
