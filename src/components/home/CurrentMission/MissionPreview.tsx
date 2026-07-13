import type { CurrentMissionProjectViewModel } from '@/lib/cms/homepage'

import {
  architectureLayers,
  conceptMetrics,
  previewNavSections,
  productAreas,
} from './mission-preview.fixture'
import { SidebarSection } from './SidebarSection'

type MissionPreviewProps = {
  project: CurrentMissionProjectViewModel
}

export function MissionPreview({ project }: MissionPreviewProps) {
  const progress = `${project.progress}%`

  return (
    <div
      className="dss-preview"
      aria-label={`${project.title} product concept preview`}
      data-motion="slide-right"
      data-motion-duration="section"
      data-motion-delay="2"
    >
      <header className="dss-preview__topbar">
        <span className="dss-preview__topbar-title">Product Concept Preview</span>

        <div className="dss-preview__topbar-actions">
          <span className="dss-preview__online">
            <span aria-hidden="true" />
            Prototype
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
            <span>{project.title}</span>
          </div>

          <nav className="dss-preview__nav" aria-label="Product concept navigation">
            {previewNavSections.map((section) => (
              <SidebarSection {...section} key={section.title} />
            ))}
          </nav>

          <div className="dss-preview__profile-card">
            <div className="dss-preview__profile-header">
              <span className="dss-preview__profile-avatar" aria-hidden="true">
                AK
              </span>
              <div>
                <strong>Product Architect</strong>
                <p>Concept Preview</p>
              </div>
            </div>

            <div className="dss-preview__profile-meta">
              <span>Portfolio Lab</span>
              <span>Design System</span>
            </div>

            <div className="dss-preview__profile-xp">
              <div>
                <span>Mission Progress</span>
                <strong>{progress}</strong>
              </div>
              <p>
                <span style={{ width: progress }} />
              </p>
            </div>
          </div>

          <div className="dss-preview__system-card">
            <div>
              <p>Preview Mode</p>
              <strong>Blueprint</strong>
              <span>Concept interface preview</span>
            </div>
            <ul>
              <li>No live telemetry</li>
              <li>CMS-backed project data</li>
            </ul>
          </div>
        </aside>

        <div className="dss-preview__workspace">
          <div className="dss-preview__heading">
            <div>
              <h3>{project.title}</h3>
              <p>
                {project.stage}
                {project.version ? ` · v${project.version}` : null}
              </p>
            </div>
          </div>

          <div className="dss-preview__metrics">
            {conceptMetrics.map((metric) => (
              <article className="dss-preview__metric-card" key={metric.label}>
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
                <span>{metric.detail}</span>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="dss-preview__main-grid">
            <article className="dss-preview__activity-card">
              <div className="dss-preview__card-header">
                <h4>Product Areas</h4>
                <span>Concept Map</span>
              </div>

              <ul>
                {productAreas.map((area) => (
                  <li key={area.title}>
                    <span
                      className={`dss-preview__activity-icon dss-preview__activity-icon--${area.type}`}
                      aria-hidden="true"
                    >
                      {area.icon}
                    </span>
                    <div>
                      <strong>{area.title}</strong>
                      <p>{area.module}</p>
                    </div>
                    <span className="dss-preview__activity-meta">{area.meta}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dss-preview__health-card">
              <div className="dss-preview__card-header">
                <h4>Architecture Layers</h4>
                <span>Blueprint</span>
              </div>

              <div
                className="dss-preview__health-ring"
                aria-label={`${project.progress}% project progress`}
              >
                <strong>{progress}</strong>
                <span>Progress</span>
              </div>

              <ul>
                {architectureLayers.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dss-preview__missions-card">
              <div className="dss-preview__card-header">
                <h4>Project Status</h4>
              </div>

              <ul>
                <li>
                  <div>
                    <strong>{project.title}</strong>
                    <span>{project.stage}</span>
                  </div>
                  <p>
                    <span style={{ width: progress }} />
                  </p>
                  <em>{progress}</em>
                </li>
              </ul>
            </article>
          </div>

          <footer className="dss-preview__footer">
            <div className="dss-preview__planet" aria-hidden="true" />

            <div>
              <h4>{project.title}</h4>
              <p>{project.excerpt}</p>
            </div>

            <dl>
              <div>
                <dt>Stage</dt>
                <dd>{project.stage}</dd>
              </div>
              <div>
                <dt>Progress</dt>
                <dd>{progress}</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>{project.version ?? 'Roadmap'}</dd>
              </div>
            </dl>

            {project.cta ? (
              <a
                href={project.cta.href}
                rel={project.cta.external ? 'noreferrer' : undefined}
                target={project.cta.external ? '_blank' : undefined}
              >
                {project.cta.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="dss-preview__footer-status" aria-disabled="true">
                Preview only
              </span>
            )}
          </footer>
        </div>
      </div>
    </div>
  )
}
