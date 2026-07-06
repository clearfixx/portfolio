import { MissionIntro } from './MissionIntro'
import { MissionPreview } from './MissionPreview'

export function CurrentMission() {
  return (
    <section className="current-mission-section" aria-labelledby="current-mission-title">
      <div className="site-container">
        <div className="current-mission">
          <MissionIntro />
          <MissionPreview />
        </div>
      </div>
    </section>
  )
}
