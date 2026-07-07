import { EngineerIntro } from './EngineerIntro'
import { JourneyPanel } from './JourneyPanel'
import { PhilosophyPanel } from './PhilosophyPanel'
import { ProfilePanel } from './ProfilePanel'

export function EngineerProfile() {
  return (
    <section className="engineer-profile-section" id="engineer-profile">
      <div className="site-container">
        <div className="engineer-profile__frame">
          <div className="engineer-profile__section-index" aria-hidden="true">
            <span>01</span>
            <i />
          </div>

          <EngineerIntro />

          <div className="engineer-profile__grid">
            <ProfilePanel />
            <JourneyPanel />
            <PhilosophyPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
