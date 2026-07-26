import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import styles from './PublicPageHeroFrame.module.scss'

import type { PublicPageVariant } from './PublicPageShell'

type PublicPageHeroFrameProps = Omit<
  ComponentPropsWithoutRef<'header'>,
  'children' | 'className'
> & {
  children: ReactNode
  className?: string
  variant?: PublicPageVariant
}

export function PublicPageHeroFrame({
  children,
  className,
  variant = 'index',
  ...headerProps
}: PublicPageHeroFrameProps) {
  const classes = [styles.frame, className].filter(Boolean).join(' ')

  return (
    <header {...headerProps} className={classes} data-public-page-hero-variant={variant}>
      {children}
    </header>
  )
}
