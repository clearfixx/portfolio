import { engineerProfile } from './data'

export function DiagnosticsPanel() {
  return (
    <aside className="engineer-profile__diagnostics">
      <div className="engineer-profile__diagnostics-header">
        <p>System Diagnostics</p>
        <span>PASS</span>
      </div>

      <div className="engineer-profile__diagnostics-list">
        {engineerProfile.diagnostics.map((item) => (
          <div className="engineer-profile__diagnostic" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  )
}
