import type { ComponentType, SVGProps } from 'react'

type SectionFooterIcon = ComponentType<SVGProps<SVGSVGElement>>

type SectionFooterProps = {
  icon: SectionFooterIcon
  label: string
  text: string
}

export function SectionFooter({ icon: Icon, label, text }: SectionFooterProps) {
  return (
    <footer className="portfolio-section__footer" data-motion="scale-in" data-motion-duration="ui">
      <div className="portfolio-section__footer-capsule">
        <span className="portfolio-section__footer-icon" aria-hidden="true">
          <Icon className="portfolio-section__footer-icon-svg" />
        </span>

        <span className="portfolio-section__footer-content">
          <strong>{label}</strong>
          <span>{text}</span>
        </span>
      </div>
    </footer>
  )
}
