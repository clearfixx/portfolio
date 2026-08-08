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
import type { HeroTelemetryItem } from '@/lib/cms/homepage'
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

function readTelemetryMetric(metrics: HeroTelemetryItem[], key: string, fallback: string): string {
  const metric = metrics.find((item) => item.key === key)

  if (!metric || metric.value === null) {
    return fallback
  }

  return `${metric.value}${metric.suffix}`
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
  const heroTelemetry = homepageContent.hero.telemetry.stats
  const yearsBuilding = readTelemetryMetric(heroTelemetry, 'experience', '—')
  const codeCommitments = readTelemetryMetric(heroTelemetry, 'commits', '—')
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
