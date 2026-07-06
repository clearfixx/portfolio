import { engineerProfile } from './data'

export function ProfileCard() {
  return (
    <article className="engineer-profile__card">
      <div className="engineer-profile__card-topline">
        <span>{engineerProfile.eyebrow}</span>

        <span className="engineer-profile__status">
          <span className="engineer-profile__status-dot" />
          {engineerProfile.status}
        </span>
      </div>

      <div className="engineer-profile__identity">
        <div className="engineer-profile__avatar" aria-hidden="true">
          AK
        </div>

        <div>
          <h3>{engineerProfile.name}</h3>
          <p>{engineerProfile.role}</p>
        </div>
      </div>

      <p className="engineer-profile__mission">{engineerProfile.mission}</p>

      <dl className="engineer-profile__meta">
        <div>
          <dt>Location</dt>
          <dd>{engineerProfile.location}</dd>
        </div>

        <div>
          <dt>Focus</dt>
          <dd>Frontend Architecture</dd>
        </div>
      </dl>

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
