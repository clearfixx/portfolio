import type { ReactNode } from 'react'

import styles from './PublicPageShell.module.scss'

export type PublicPageVariant = 'detail' | 'index'

type PublicPageShellProps = {
  children: ReactNode
  className?: string
  variant?: PublicPageVariant
}

export function PublicPageShell({ children, className, variant = 'index' }: PublicPageShellProps) {
  const classes = [styles.page, className].filter(Boolean).join(' ')

  return (
    <div className={classes} data-public-page-variant={variant}>
      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
      </div>

      <div className={`site-container ${styles.container}`}>{children}</div>
    </div>
  )
}
