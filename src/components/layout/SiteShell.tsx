import type { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">{children}</main>
    </div>
  )
}
