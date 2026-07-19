import type { ReactNode } from 'react'

type PublicPageShellProps = {
  children: ReactNode
  className?: string
}

export function PublicPageShell({ children, className }: PublicPageShellProps) {
  const classes = ['public-page', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="public-page__ambient" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="site-container public-page__container">{children}</div>
    </div>
  )
}
