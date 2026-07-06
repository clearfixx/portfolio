import { missionTechStack } from './data'

export function MissionIntro() {
  return (
    <div className="current-mission__content">
      <p className="current-mission__eyebrow">Current Mission</p>

      <h2 className="current-mission__title" id="current-mission-title">
        Building <span>DSS Universe</span>
      </h2>

      <p className="current-mission__tagline">Years of ideas. One platform.</p>

      <div className="current-mission__copy">
        <p>
          A modular developer platform bringing together research, community, AI, education, CMS,
          and development tools into one connected ecosystem.
        </p>

        <p>
          The goal is simple: turn scattered developer workflows into one calm, powerful, and
          extensible space.
        </p>
      </div>

      <ul className="current-mission__tech-list" aria-label="Mission tech stack">
        {missionTechStack.map((technology) => (
          <li className="current-mission__tech-item" key={technology}>
            {technology}
          </li>
        ))}
      </ul>

      <a className="current-mission__link" href="/projects/dss-universe">
        View Mission
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
