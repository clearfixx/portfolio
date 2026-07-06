import type { dssNavSections } from './data'

type SidebarSectionProps = (typeof dssNavSections)[number]

export function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <div className="dss-preview__nav-section">
      <div className="dss-preview__nav-section-title">
        <span>{title}</span>
      </div>

      <div className="dss-preview__nav-section-items">
        {items.map((item) => (
          <span
            className={
              item.active
                ? `dss-preview__nav-item dss-preview__nav-item--active dss-preview__nav-item--${item.accent}`
                : `dss-preview__nav-item dss-preview__nav-item--${item.accent}`
            }
            key={item.title}
          >
            <span className="dss-preview__nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.title}
          </span>
        ))}
      </div>
    </div>
  )
}
