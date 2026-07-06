import { DiagnosticsPanel } from './DiagnosticsPanel'
import { EngineerIntro } from './EngineerIntro'
import { ProfileCard } from './ProfileCard'

export function EngineerProfile() {
  return (
    <section className="engineer-profile-section" id="engineer-profile">
      <div className="site-container">
        <EngineerIntro />

        <div className="engineer-profile__layout">
          <ProfileCard />
          <DiagnosticsPanel />
        </div>
      </div>
    </section>
  )
}
