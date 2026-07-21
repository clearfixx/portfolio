import Link from 'next/link'
import type { ReactNode } from 'react'

type PublicIndexCardProps = {
  accent?: 'cyan' | 'violet'
  badges?: string[]
  ctaLabel: string
  eyebrow: string
  excerpt: string
  href: string
  meta?: ReactNode
  title: string
}

export function PublicIndexCard({
  accent = 'cyan',
  badges = [],
  ctaLabel,
  eyebrow,
  excerpt,
  href,
  meta,
  title,
}: PublicIndexCardProps) {
  return (
    <Link className={`public-index-card public-index-card--${accent}`} href={href}>
      <span className="public-index-card__line" aria-hidden="true" />

      <div className="public-index-card__top">
        <span>{eyebrow}</span>
        <span aria-hidden="true">↗</span>
      </div>

      <div className="public-index-card__body">
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </div>

      {badges.length > 0 ? (
        <ul className="public-index-card__badges" aria-label={`${title} metadata`}>
          {badges.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
      ) : null}

      <div className="public-index-card__footer">
        <span>{meta}</span>
        <strong>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </strong>
      </div>
    </Link>
  )
}
