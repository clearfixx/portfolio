import type { Homepage } from '@/payload-types'

import { Background } from './Background'
import { Mission } from './Mission'
import { System } from './System'
import { Workspace } from './Workspace'

type HeroProps = {
  hero: Homepage['hero']
}

const techStack = [
  { label: 'Next.js', icon: 'next' },
  { label: 'TypeScript', icon: 'ts' },
  { label: 'Node.js', icon: 'node' },
  { label: 'PostgreSQL', icon: 'postgres' },
  { label: 'Prisma', icon: 'prisma' },
  { label: 'Tailwind', icon: 'tailwind' },
  { label: 'Docker', icon: 'docker' },
  { label: 'GitHub', icon: 'github' },
] as const

function TechIcon({ icon }: { icon: (typeof techStack)[number]['icon'] }) {
  if (icon === 'next') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8v8" />
        <path d="M8 8l8 8" />
        <path d="M16 8v8" />
      </svg>
    )
  }

  if (icon === 'ts') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h7" />
        <path d="M11.5 9v8" />
        <path d="M15 16.5c.7.5 2.4.7 3-.2.4-.7-.1-1.3-1.3-1.6l-.7-.2c-1.2-.3-1.8-1-1.4-1.9.5-1.1 2.2-1.2 3.4-.5" />
      </svg>
    )
  }

  if (icon === 'node') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M9 15V9l6 6V9" />
      </svg>
    )
  }

  if (icon === 'postgres') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    )
  }

  if (icon === 'prisma') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 16-10 2L12 3z" />
        <path d="M12 3L9 21" />
      </svg>
    )
  }

  if (icon === 'tailwind') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13c2-4 5-4 8-1 2 2 4 2 6-1" />
        <path d="M6 17c2-4 5-4 8-1 2 2 4 2 6-1" />
      </svg>
    )
  }

  if (icon === 'docker') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h15c-.4 3-2.8 5-6.2 5H9c-2.8 0-4.7-1.7-5-5z" />
        <path d="M7 10h3v3H7z" />
        <path d="M10 10h3v3h-3z" />
        <path d="M13 10h3v3h-3z" />
        <path d="M10 7h3v3h-3z" />
        <path d="M18 11c1.2-.8 2-.8 3 0" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3" />
      <path d="M15 22v-3.5c0-1 .1-1.5-.5-2 3.5-.4 7.5-1.7 7.5-7.5A5.8 5.8 0 0 0 20.5 5c.2-.8.2-2-.3-3 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C9 1.7 8 2 8 2c-.5 1-.5 2.2-.3 3A5.8 5.8 0 0 0 6 9c0 5.8 4 7.1 7.5 7.5-.4.4-.6.9-.6 1.7V22" />
    </svg>
  )
}

export function Hero({ hero }: HeroProps) {
  return (
    <section className="home-hero">
      <Background />
      <div className="hero-orb" aria-hidden="true" />

      <div className="site-container hero-shell">
        <div className="hero-main">
          <System />
          <Mission hero={hero} />
          <Workspace />
        </div>

        <div className="hero-tech">
          <span>Tech Stack</span>
          {techStack.map((item) => (
            <strong key={item.label}>
              <TechIcon icon={item.icon} />
              {item.label}
            </strong>
          ))}
          <em>and more...</em>
        </div>

        <div className="hero-dashboard">
          <aside>
            <span>Current Mission</span>
            <h2>
              Building <strong>DSS Universe</strong>
            </h2>
            <p>A next-generation Decision Support System for the football industry.</p>
            <a href="#projects">View Mission ↗</a>
          </aside>

          <div className="hero-dashboard__preview">
            <div className="hero-dashboard__top">DSS Universe Dashboard</div>
            <div className="hero-dashboard__stats">
              <span>
                Matches <strong>1,250</strong>
              </span>
              <span>
                Players <strong>320</strong>
              </span>
              <span>
                Reports <strong>84</strong>
              </span>
              <span>
                Accuracy <strong>92%</strong>
              </span>
            </div>
            <div className="hero-dashboard__chart" />
          </div>
        </div>
      </div>
    </section>
  )
}
