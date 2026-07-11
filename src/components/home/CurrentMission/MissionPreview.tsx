import { SidebarSection } from './SidebarSection'
import { activeMissions, dssActivities, dssHealthItems, dssMetrics, dssNavSections } from './data'

export function MissionPreview() {
  return (
    <div
      className="dss-preview"
      aria-label="DSS Universe mission control preview"
      data-motion="slide-right"
      data-motion-duration="section"
      data-motion-delay="2"
    >
      <header className="dss-preview__topbar">
        <span className="dss-preview__topbar-title">Mission Control Preview</span>

        <div className="dss-preview__topbar-actions">
          <span className="dss-preview__online">
            <span aria-hidden="true" />
            Online
          </span>

          <span className="dss-preview__icon-button" aria-hidden="true">
            ◇
          </span>
          <span className="dss-preview__icon-button" aria-hidden="true">
            ✉
          </span>
          <span className="dss-preview__avatar" aria-hidden="true" />
        </div>
      </header>

      <div className="dss-preview__body">
        <aside className="dss-preview__sidebar">
          <div className="dss-preview__brand">
            <span className="dss-preview__brand-mark" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span>DSS Universe</span>
          </div>

          <nav className="dss-preview__nav" aria-label="DSS preview navigation">
            {dssNavSections.map((section) => (
              <SidebarSection {...section} key={section.title} />
            ))}
          </nav>

          <div className="dss-preview__profile-card">
            <div className="dss-preview__profile-header">
              <span className="dss-preview__profile-avatar" aria-hidden="true">
                AK
              </span>

              <div>
                <strong>Astronaut AK</strong>
                <p>DSS Commander</p>
              </div>
            </div>

            <div className="dss-preview__profile-meta">
              <span>Level 14</span>
              <span>Clearance A</span>
            </div>

            <div className="dss-preview__profile-xp">
              <div>
                <span>Mission XP</span>
                <strong>84%</strong>
              </div>
              <p>
                <span />
              </p>
            </div>
          </div>

          <div className="dss-preview__system-card">
            <div>
              <p>System Status</p>
              <strong>Online</strong>
              <span>All systems operational</span>
            </div>

            <ul>
              <li>API connected</li>
              <li>Services synced</li>
            </ul>
          </div>
        </aside>

        <div className="dss-preview__workspace">
          <div className="dss-preview__heading">
            <div>
              <h3>Mission Control</h3>
              <p>Overview</p>
            </div>
          </div>

          <div className="dss-preview__metrics">
            {dssMetrics.map((metric) => (
              <article className="dss-preview__metric-card" key={metric.label}>
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
                <span>{metric.change}</span>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="dss-preview__main-grid">
            <article className="dss-preview__activity-card">
              <div className="dss-preview__card-header">
                <h4>Latest Activity</h4>
                <span>Live Feed</span>
              </div>

              <ul>
                {dssActivities.map((activity) => (
                  <li key={activity.title}>
                    <span
                      className={`dss-preview__activity-icon dss-preview__activity-icon--${activity.type}`}
                      aria-hidden="true"
                    >
                      {activity.icon}
                    </span>

                    <div>
                      <strong>{activity.title}</strong>
                      <p>{activity.module}</p>
                    </div>

                    <time>{activity.time}</time>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dss-preview__health-card">
              <div className="dss-preview__card-header">
                <h4>System Health</h4>
                <span>All Systems</span>
              </div>

              <div className="dss-preview__health-ring" aria-hidden="true">
                <strong>97%</strong>
                <span>Healthy</span>
              </div>

              <ul>
                {dssHealthItems.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dss-preview__missions-card">
              <div className="dss-preview__card-header">
                <h4>Active Missions</h4>
              </div>

              <ul>
                {activeMissions.map((mission) => (
                  <li key={mission.title}>
                    <div>
                      <strong>{mission.title}</strong>
                      <span>{mission.status}</span>
                    </div>

                    <p>
                      <span style={{ width: mission.progress }} />
                    </p>

                    <em>{mission.progress}</em>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <footer className="dss-preview__footer">
            <div className="dss-preview__planet" aria-hidden="true" />

            <div>
              <h4>DSS Universe</h4>
              <p>
                A modular developer platform that connects research, community, AI tools, academy,
                and mission control in one unified ecosystem.
              </p>
            </div>

            <dl>
              <div>
                <dt>Community</dt>
                <dd>2.4k</dd>
              </div>
              <div>
                <dt>Articles</dt>
                <dd>1,248</dd>
              </div>
              <div>
                <dt>AI Requests</dt>
                <dd>15.6k</dd>
              </div>
            </dl>

            <a href="/projects/dss-universe">
              Explore DSS
              <span aria-hidden="true">↗</span>
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}
