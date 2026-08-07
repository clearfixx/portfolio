import type { ReactNode } from 'react'

import styles from './PublicPageHero.module.scss'

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
    <header className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">{'//'}</span>
          {eyebrow}
        </p>

        <h1 id={titleId}>{title}</h1>
        <p className={styles.description}>{description}</p>

        {meta ? <div className={styles.meta}>{meta}</div> : null}
      </div>

      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </header>
  )
}
