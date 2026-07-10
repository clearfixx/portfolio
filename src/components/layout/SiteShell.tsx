import type { ReactNode } from 'react'
import { MotionRuntime } from '@/components/motion'

import { SiteHeader } from './SiteHeader'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <MotionRuntime />
      <SiteHeader />
      <main className="site-main">{children}</main>
    </div>
  )
}
