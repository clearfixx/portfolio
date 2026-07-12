import Link from 'next/link'
import { missionTechStack } from './data'

export function MissionIntro() {
  return (
    <div
      className="current-mission__content"
      data-motion="slide-left"
      data-motion-duration="section"
      data-motion-delay="1"
    >
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

      <p className="current-mission__stack-label">Mission stack</p>

      <ul className="current-mission__tech-list" aria-label="Mission tech stack">
        {missionTechStack.map((technology) => (
          <li className="current-mission__tech-item" key={technology}>
            {technology}
          </li>
        ))}
      </ul>

      <Link className="current-mission__link" href="/projects/dss-universe">
        View Mission Control
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}
