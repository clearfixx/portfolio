import type { ReactNode } from 'react'

export type PublicPageVariant = 'detail' | 'index'

type PublicPageShellProps = {
  children: ReactNode
  className?: string
  variant?: PublicPageVariant
}

export function PublicPageShell({ children, className, variant = 'index' }: PublicPageShellProps) {
  const classes = ['public-page', `public-page--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} data-public-page-variant={variant}>
      <div className="public-page__ambient" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="site-container public-page__container">{children}</div>
    </div>
  )
}
