import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteShell } from '@/components/layout'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
