import type { MetadataRoute } from 'next'

import { getSeo } from '@/lib/cms'

const fallbackSiteUrl = 'http://localhost:3000'

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/+$/, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeo()

  if (seo.sitemapEnabled === false) {
    return []
  }

  const siteUrl = getSiteUrl()

  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/contacts`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
