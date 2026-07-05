import type { ReactNode } from 'react'

import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  )
}
