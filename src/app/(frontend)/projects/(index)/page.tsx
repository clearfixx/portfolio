import type { Metadata } from 'next'

import { SiteFooter } from '@/components/home'
import { StreamedMotionBoundary } from '@/components/motion'
import { ProjectDirectory, ProjectsIndexCTA, ProjectsIndexHero } from '@/components/projects'
import { PublicBreadcrumbs, PublicPageShell } from '@/components/public-page'
import {
  getHomepageContent,
  getProjects,
  getPublicPages,
  getSiteFooterGitHubFeed,
  getSiteSettings,
} from '@/lib/cms'
import { PUBLIC_CONTENT } from '@/lib/config'
import { buildProjectDirectoryItems, getProjectImage } from '@/lib/cms/public-projects'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const publicPages = await getPublicPages()
  const seo = publicPages.projects.seo

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      type: 'website',
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonical,
    },
  }
}

type HomepageMetric = {
  label?: string | null
  value?: string | number | null
}

function readMetric(metrics: HomepageMetric[], searchTerms: string[], fallback: string) {
  const metric = metrics.find((item) => {
    const label = item.label?.toLocaleLowerCase() ?? ''

    return searchTerms.some((term) => label.includes(term))
  })

  if (metric?.value === null || metric?.value === undefined || metric.value === '') {
    return fallback
  }

  return String(metric.value)
}

export default async function ProjectsPage() {
  const [projects, homepageContent, githubFeed, siteSettings, publicPages] = await Promise.all([
    getProjects(PUBLIC_CONTENT.projects.indexQueryLimit),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
    getSiteSettings(),
    getPublicPages(),
  ])

  const items = buildProjectDirectoryItems(projects)
  const heroProject = projects.find((project) => project.isFeatured) ?? projects[0]
  const heroImage = heroProject ? getProjectImage(heroProject) : undefined
  const heroItem = items.find((item) => item.id === String(heroProject?.id)) ?? items[0]
  const openSourceCount = items.filter((item) =>
    item.links.some((link) => link.type === 'github'),
  ).length
  const homepageMetrics = ((homepageContent.hero as { metrics?: HomepageMetric[] } | undefined)
    ?.metrics ?? []) as HomepageMetric[]
  const yearsBuilding = readMetric(homepageMetrics, ['year'], '—')
  const codeCommitments = readMetric(homepageMetrics, ['commit'], '—')
  const footerContent = homepageContent.siteFooter
  const pageContent = publicPages.projects.index
  const ctaContent = publicPages.projects.cta

  return (
    <StreamedMotionBoundary>
      <PublicPageShell className="projects-page" variant="index">
        <PublicBreadcrumbs items={[{ label: pageContent.breadcrumbLabel }]} />

        <ProjectsIndexHero
          content={pageContent}
          activeCount={items.filter((item) => item.stage !== 'archived').length}
          codeCommitments={codeCommitments}
          featuredTitle={heroItem?.title ?? siteSettings.siteName}
          heroImage={heroImage}
          openSourceCount={openSourceCount}
          progress={heroItem?.progress ?? 0}
          projectCount={items.length}
          yearsBuilding={yearsBuilding}
        />

        <ProjectDirectory items={items} />

        {footerContent ? (
          <ProjectsIndexCTA content={ctaContent} socialLinks={footerContent.profile.socialLinks} />
        ) : null}
      </PublicPageShell>

      {footerContent ? <SiteFooter content={footerContent} githubFeed={githubFeed} /> : null}
    </StreamedMotionBoundary>
  )
}
