import type { ReactNode } from 'react'
import { RouteTransitionIndicator } from '@/components/loading'
import { MotionRuntime } from '@/components/motion'
import { HashNavigationRuntime } from '@/components/navigation'

import { SiteHeader } from './SiteHeader'

import { SkipLink } from './SkipLink'
type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <SkipLink />
      <SiteHeader />
      <RouteTransitionIndicator />
      <main className="site-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <MotionRuntime />
      <HashNavigationRuntime />
    </div>
  )
}
