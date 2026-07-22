import type { Metadata } from 'next'

import { EngineeringProfilePage } from '@/components/about/EngineeringProfilePage'
import { SiteFooter } from '@/components/home'
import { getAboutPageContent, getSiteFooterGitHubFeed } from '@/lib/cms'

export const revalidate = 300

// about-live-data-integration-v2

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getAboutPageContent()

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: page.seo.canonical,
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: 'profile',
      url: page.seo.canonical,
    },
  }
}

export default async function AboutPage() {
  const [content, githubFeed] = await Promise.all([
    getAboutPageContent(),
    getSiteFooterGitHubFeed(),
  ])

  return (
    <>
      <EngineeringProfilePage content={content.page} />
      {content.siteFooter ? (
        <SiteFooter content={content.siteFooter} githubFeed={githubFeed} />
      ) : null}
    </>
  )
}
