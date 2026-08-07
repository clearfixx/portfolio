import type { MetadataRoute } from 'next'

import {
  getPublishedBlogPostSitemapEntries,
  getPublishedProjectSitemapEntries,
  getSeo,
} from '@/lib/cms'
import { FALLBACK_SITE_URL } from '@/lib/config'

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/+$/, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeo()

  if (seo.sitemapEnabled === false) {
    return []
  }

  const [blogPosts, projects] = await Promise.all([
    getPublishedBlogPostSitemapEntries(),
    getPublishedProjectSitemapEntries(),
  ])
  const siteUrl = getSiteUrl()
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contacts`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
