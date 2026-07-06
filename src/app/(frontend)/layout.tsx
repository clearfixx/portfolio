import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteShell } from '@/components/layout'

import './styles.scss'

export const metadata: Metadata = {
  description: 'Personal portfolio powered by Next.js and Payload.',
  title: 'Portfolio',
}

type RootLayoutProps = {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
