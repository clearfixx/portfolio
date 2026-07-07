import type { ReactNode } from 'react'

type SectionFooterProps = {
  icon: ReactNode
  label: string
  text: string
}

export function SectionFooter({ icon, label, text }: SectionFooterProps) {
  return (
    <footer className="portfolio-section__footer">
      <div className="portfolio-section__footer-capsule">
        <span className="portfolio-section__footer-icon" aria-hidden="true">
          {icon}
        </span>

        <span className="portfolio-section__footer-content">
          <strong>{label}</strong>
          <span>{text}</span>
        </span>
      </div>
    </footer>
  )
}
