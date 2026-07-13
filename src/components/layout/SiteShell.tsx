import type { ReactNode } from 'react'
import { MotionRuntime } from '@/components/motion'

import { SiteHeader } from './SiteHeader'

import { SkipLink } from './SkipLink'
type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <MotionRuntime />
      <SkipLink />
      <SiteHeader />
      <main className="site-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
