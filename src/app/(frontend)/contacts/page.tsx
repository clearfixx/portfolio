import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ContactsPage } from '@/components/contacts/ContactsPage'
import { ContactsPageSkeleton } from '@/components/contacts/ContactsPageSkeleton'
import { SiteFooter } from '@/components/home'
import { StreamedMotionBoundary } from '@/components/motion'
import { getContactsPageContent, getSiteFooterGitHubFeed } from '@/lib/cms'

export const revalidate = 300

// contacts-page-foundation-v1
// contacts-page-manual-suspense-skeleton-v1-7

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getContactsPageContent()

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: page.seo.canonical,
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: 'website',
      url: page.seo.canonical,
    },
  }
}

async function ContactsPageContent() {
  const [content, githubFeed] = await Promise.all([
    getContactsPageContent(),
    getSiteFooterGitHubFeed(),
  ])

  return (
    <StreamedMotionBoundary>
      <ContactsPage content={content.page} />
      {content.siteFooter ? (
        <SiteFooter content={content.siteFooter} githubFeed={githubFeed} />
      ) : null}
    </StreamedMotionBoundary>
  )
}

export default function ContactsRoute() {
  return (
    <Suspense fallback={<ContactsPageSkeleton />}>
      <ContactsPageContent />
    </Suspense>
  )
}
