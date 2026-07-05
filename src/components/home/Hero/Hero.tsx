import type { Homepage } from '@/payload-types'

import { Editor } from './Editor'
import { Terminal } from './Terminal'

type HeroProps = {
  hero: Homepage['hero']
}

const metrics = [
  { label: 'Projects', value: '12+' },
  { label: 'Stack', value: 'Full-stack' },
  { label: 'Status', value: 'Available' },
]

const statusCards = [
  { label: 'Current Mission', value: 'Portfolio v1.0' },
  { label: 'Architecture', value: 'CMS Ready' },
  { label: 'Build Mode', value: 'Active' },
]

export function Hero({ hero }: HeroProps) {
  return (
    <section className="home-hero">
      <div className="hero-circuit" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="site-container home-hero__grid">
        <aside className="home-hero__left">
          <Terminal />



          <div className="hero-progress-card">
            <div className="panel-header">
              <span>Core Systems</span>
              <strong>STABLE</strong>
            </div>

            {[
              ['Frontend', 96],
              ['Backend', 88],
              ['Architecture', 94],
            ].map(([label, value]) => (
              <div className="hero-progress" key={label}>
                <span>
                  {label} <strong>{value}%</strong>
                </span>
                <div>
                  <i style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="home-hero__center">
          <p className="home-hero__eyebrow">{hero?.eyebrow ?? 'Developer Mission Control'}</p>

          <h1 className="home-hero__title">
            <span>I don’t just build websites.</span>
            <strong>I build systems</strong>
            <em>that solve real problems.</em>
          </h1>

          <p className="home-hero__subtitle">
            {hero?.subtitle ??
              'Software engineer focused on scalable web platforms, clean architecture, Payload CMS, Next.js, and interfaces that feel alive.'}
          </p>

          <div className="home-hero__actions">
            <a className="button button--primary" href={hero?.primaryCtaUrl ?? '#projects'}>
              {hero?.primaryCtaLabel ?? 'Explore missions'}
            </a>

            <a className="button button--secondary" href={hero?.secondaryCtaUrl ?? '#contact'}>
              {hero?.secondaryCtaLabel ?? 'Contact channel'}
            </a>
          </div>

          <a className="scroll-indicator" href="#projects">
            <span>Scroll to explore</span>
            <i />
          </a>
        </div>

        <aside className="home-hero__right">
          <Editor />

          <div className="hero-status-stack">
            {statusCards.map((card) => (
              <div className="hero-status-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </div>
        </aside>

        <div className="hero-metrics">
          {metrics.map((metric) => (
            <div className="hero-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
