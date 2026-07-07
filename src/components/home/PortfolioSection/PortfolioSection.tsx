import type { ComponentType, ReactNode, SVGProps } from 'react'

import { SectionFooter } from './SectionFooter'

type PortfolioSectionFooter = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  text: string
}

type PortfolioSectionProps = {
  id: string
  eyebrow: string
  title: ReactNode
  description: string
  number: string
  footer: PortfolioSectionFooter
  children: ReactNode
}

export function PortfolioSection({
  id,
  eyebrow,
  title,
  description,
  number,
  footer,
  children,
}: PortfolioSectionProps) {
  const titleId = `${id}-title`

  return (
    <section className="portfolio-section" id={id} aria-labelledby={titleId}>
      <div className="site-container">
        <div className="portfolio-section__frame">
          <div className="portfolio-section__number" aria-hidden="true">
            <span>{number}</span>
            <i />
          </div>

          <header className="portfolio-section__header">
            <p className="portfolio-section__eyebrow">
              <span>{'//'}</span>
              <span>{eyebrow}</span>
            </p>

            <h2 className="portfolio-section__title" id={titleId}>
              {title}
            </h2>

            <p className="portfolio-section__description">{description}</p>
          </header>

          <div className="portfolio-section__body">{children}</div>

          <SectionFooter {...footer} />
        </div>
      </div>
    </section>
  )
}
