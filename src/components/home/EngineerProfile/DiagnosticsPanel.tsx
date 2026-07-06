import { engineerProfile } from './data'
import { SkillBar } from './SkillBar'

export function DiagnosticsPanel() {
  return (
    <aside className="engineer-profile__diagnostics">
      <div className="engineer-profile__diagnostics-header">
        <div>
          <p>System Diagnostics</p>
          <span>Core engineering strengths</span>
        </div>

        <strong>PASS</strong>
      </div>

      <div className="engineer-profile__diagnostics-list">
        {engineerProfile.diagnostics.map((item) => (
          <SkillBar key={item.label} label={item.label} value={item.level} />
        ))}
      </div>
    </aside>
  )
}
