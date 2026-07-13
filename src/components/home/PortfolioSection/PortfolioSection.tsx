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
  headerAction?: ReactNode
  children: ReactNode
}

export function PortfolioSection({
  id,
  eyebrow,
  title,
  description,
  number,
  footer,
  headerAction,
  children,
}: PortfolioSectionProps) {
  const titleId = `${id}-title`

  return (
    <section className="portfolio-section" id={id} aria-labelledby={titleId}>
      <div className="site-container">
        <div
          className="portfolio-section__frame"
          data-motion="scale-in"
          data-motion-duration="section"
        >
          <div
            className="portfolio-section__number"
            aria-hidden="true"
            data-motion="fade"
            data-motion-delay="1"
          >
            <span>{number}</span>
            <i />
          </div>

          <div className="portfolio-section__header-row">
            <header className="portfolio-section__header">
              <p className="portfolio-section__eyebrow" data-motion="fade" data-motion-delay="1">
                <span>{'//'}</span>
                <span>{eyebrow}</span>
              </p>

              <h2
                className="portfolio-section__title"
                id={titleId}
                data-motion="rise"
                data-motion-delay="2"
              >
                {title}
              </h2>

              <p
                className="portfolio-section__description"
                data-motion="rise"
                data-motion-delay="3"
              >
                {description}
              </p>
            </header>

            {headerAction ? (
              <div
                className="portfolio-section__header-action"
                data-motion="slide-right"
                data-motion-delay="3"
              >
                {headerAction}
              </div>
            ) : null}
          </div>

          <div className="portfolio-section__body" data-motion="rise" data-motion-delay="4">
            {children}
          </div>

          <SectionFooter {...footer} />
        </div>
      </div>
    </section>
  )
}
