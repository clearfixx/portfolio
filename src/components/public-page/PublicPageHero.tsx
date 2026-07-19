import type { ReactNode } from 'react'

type PublicPageHeroProps = {
  aside?: ReactNode
  description: string
  eyebrow: string
  meta?: ReactNode
  title: string
  titleId?: string
}

export function PublicPageHero({
  aside,
  description,
  eyebrow,
  meta,
  title,
  titleId,
}: PublicPageHeroProps) {
  return (
    <header className="public-page-hero">
      <div className="public-page-hero__copy">
        <p className="public-page-hero__eyebrow">
          <span aria-hidden="true">{'//'}</span>
          {eyebrow}
        </p>

        <h1 id={titleId}>{title}</h1>
        <p className="public-page-hero__description">{description}</p>

        {meta ? <div className="public-page-hero__meta">{meta}</div> : null}
      </div>

      {aside ? <div className="public-page-hero__aside">{aside}</div> : null}
    </header>
  )
}
