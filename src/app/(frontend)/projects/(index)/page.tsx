import type { Metadata } from 'next'

import { SiteFooter } from '@/components/home'
import { StreamedMotionBoundary } from '@/components/motion'
import { ProjectDirectory, ProjectsIndexCTA, ProjectsIndexHero } from '@/components/projects'
import { PublicBreadcrumbs, PublicPageShell } from '@/components/public-page'
import {
  getHomepageContent,
  getProjects,
  getSiteFooterGitHubFeed,
  getSiteSettings,
} from '@/lib/cms'
import { PUBLIC_CONTENT } from '@/lib/config'
import { buildProjectDirectoryItems, getProjectImage } from '@/lib/cms/public-projects'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software products, experiments, and engineering case studies.',
  alternates: {
    canonical: '/projects',
  },
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
  const [projects, homepageContent, githubFeed, siteSettings] = await Promise.all([
    getProjects(PUBLIC_CONTENT.projects.indexQueryLimit),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
    getSiteSettings(),
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

  return (
    <StreamedMotionBoundary>
      <PublicPageShell className="projects-page" variant="index">
        <PublicBreadcrumbs items={[{ label: 'Projects' }]} />

        <ProjectsIndexHero
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
          <ProjectsIndexCTA socialLinks={footerContent.profile.socialLinks} />
        ) : null}
      </PublicPageShell>

      {footerContent ? <SiteFooter content={footerContent} githubFeed={githubFeed} /> : null}
    </StreamedMotionBoundary>
  )
}
