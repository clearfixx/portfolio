import { engineerProfile } from './data'

export function ProfileCard() {
  return (
    <article className="engineer-profile__card">
      <div className="engineer-profile__avatar" aria-hidden="true">
        AK
      </div>

      <div>
        <div className="engineer-profile__status-row">
          <span className="engineer-profile__status-dot" />
          <span>{engineerProfile.status}</span>
        </div>

        <h3>Andrii Kulahin</h3>

        <p>{engineerProfile.mission}</p>
      </div>

      <div className="engineer-profile__highlights">
        {engineerProfile.highlights.map((highlight) => (
          <span className="engineer-profile__highlight" key={highlight}>
            {highlight}
          </span>
        ))}
      </div>
    </article>
  )
}
