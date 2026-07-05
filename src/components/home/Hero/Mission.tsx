import type { Homepage } from '@/payload-types'

type MissionProps = {
  hero: Homepage['hero']
}

export function Mission({ hero }: MissionProps) {
  return (
    <main className="hero-mission">
      <p className="hero-mission__intro">👋 Hi, I&apos;m</p>

      <h1 className="hero-mission__name">
        Andrii <strong>Kulahin.</strong>
      </h1>

      <p className="hero-mission__title">
        I don&apos;t just build <strong>websites.</strong>
        <br />I build <em>systems</em>
        <br />that solve real problems.
      </p>

      <div className="hero-mission__actions">
        <a className="hero-button hero-button--primary" href={hero?.primaryCtaUrl ?? '#projects'}>
          {hero?.primaryCtaLabel ?? 'Explore My Work'}
        </a>

        <a className="hero-button hero-button--secondary" href={hero?.secondaryCtaUrl ?? '#contact'}>
          {hero?.secondaryCtaLabel ?? 'Download CV'} <span>↓</span>
        </a>
      </div>

      <a className="hero-scroll" href="#projects">
        <span>Scroll to explore</span>
        <i />
      </a>
    </main>
  )
}
