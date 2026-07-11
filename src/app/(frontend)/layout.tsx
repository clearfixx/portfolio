import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SiteShell } from '@/components/layout'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getSeo, getSiteSettings } from '@/lib/cms'

import './styles.scss'

const fallbackSiteUrl = 'http://localhost:3000'

function getMetadataBase(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl)
}

export async function generateMetadata(): Promise<Metadata> {
  const [seo, siteSettings] = await Promise.all([getSeo(), getSiteSettings()])

  const title = seo.defaultMetaTitle || siteSettings.siteName
  const description = seo.defaultMetaDescription || siteSettings.siteDescription
  const defaultOgImage =
    seo.defaultOgImage && typeof seo.defaultOgImage === 'object' ? seo.defaultOgImage : null
  const hasOpenGraphImage = Boolean(defaultOgImage?.url)
  const shouldIndex = seo.robots === 'index-follow'
  const shouldFollow = seo.robots !== 'noindex-nofollow'

  return {
    metadataBase: getMetadataBase(),
    applicationName: siteSettings.siteName,
    title: {
      default: title,
      template: `%s | ${siteSettings.siteName}`,
    },
    description,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
    },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: siteSettings.siteName,
      title,
      description,
      locale: siteSettings.defaultLanguage === 'uk' ? 'uk_UA' : 'en_US',
      images:
        hasOpenGraphImage && defaultOgImage?.url
          ? [
              {
                url: defaultOgImage.url,
                alt: defaultOgImage.alt,
                width: defaultOgImage.width ?? undefined,
                height: defaultOgImage.height ?? undefined,
              },
            ]
          : undefined,
    },
    twitter: {
      card: hasOpenGraphImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images:
        hasOpenGraphImage && defaultOgImage?.url ? [defaultOgImage.url] : undefined,
    },
  }
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
