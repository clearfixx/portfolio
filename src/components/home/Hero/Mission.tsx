import type { ReactNode } from 'react'

import type { HeroViewModel } from '@/lib/cms'

type MissionProps = {
  content: HeroViewModel
}

function renderAccent(
  text: string,
  accent: string | undefined,
  element: 'em' | 'strong',
): ReactNode {
  if (!accent) return text

  const index = text.toLocaleLowerCase().indexOf(accent.toLocaleLowerCase())

  if (index < 0) return text

  const before = text.slice(0, index)
  const match = text.slice(index, index + accent.length)
  const after = text.slice(index + accent.length)

  if (element === 'strong') {
    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    )
  }

  return (
    <>
      {before}
      <em>{match}</em>
      {after}
    </>
  )
}

export function Mission({ content }: MissionProps) {
  const subtitleLines = content.headline.subtitle.split(/\r?\n/)

  return (
    <main className="hero-mission">
      <p className="hero-mission__intro">{content.eyebrow}</p>
      <h1 className="hero-mission__name">
        {content.name.leading ? `${content.name.leading} ` : ''}
        <strong>{content.name.accent}</strong>
      </h1>
      <p className="hero-mission__title">
        {renderAccent(content.headline.title, content.headline.titleAccent, 'strong')}
        {subtitleLines.map((line, index) => (
          <span key={`${line}-${index}`}>
            <br />
            {renderAccent(line, content.headline.subtitleAccent, 'em')}
          </span>
        ))}
      </p>
      <div className="hero-mission__actions">
        <a className="hero-button hero-button--primary" href={content.primaryAction.href}>
          {content.primaryAction.label}
        </a>
        <a className="hero-button hero-button--secondary" href={content.secondaryAction.href}>
          {content.secondaryAction.label} <span>↓</span>
        </a>
      </div>
      <a className="hero-scroll" href="#projects">
        <span>Scroll to explore</span>
        <i />
      </a>
    </main>
  )
}
