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

  return [
    {
      url: getSiteUrl(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
