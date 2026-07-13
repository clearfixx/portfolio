import type { EngineerProfileViewModel } from '@/lib/cms/homepage'

type JourneyPanelProps = {
  journey: EngineerProfileViewModel['journey']
}

export function JourneyPanel({ journey }: JourneyPanelProps) {
  return (
    <article className="engineer-profile__panel engineer-profile__journey-panel">
      <header className="engineer-profile__panel-header">
        <h3>{journey.title}</h3>
        <span>{journey.meta}</span>
      </header>

      {journey.items.length > 0 ? (
        <div className="journey">
          {journey.items.map((item, index) => (
            <div
              key={item.id}
              className={`journey__item ${item.accent ? 'journey__item--accent' : ''}`}
            >
              <div className="journey__year">{item.year}</div>

              <div className="journey__line">
                <span className="journey__dot" />
                {index !== journey.items.length - 1 ? (
                  <span className="journey__connector" />
                ) : null}
              </div>

              <div className="journey__content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="engineer-profile__empty" role="status">
          Engineering journey is being updated.
        </p>
      )}

      <footer className="journey__footer">{journey.footer}</footer>
    </article>
  )
}
