import { LayersIcon } from '@/components/icons/project'
import { ProjectsRegistryEditor } from '@/components/projects/ProjectsRegistryEditor'
import type { Metadata } from 'next'
import Image from 'next/image'

import { SiteFooter } from '@/components/home'
import { ProjectDirectory, ProjectsIndexCTA } from '@/components/projects'
import { PublicBreadcrumbs, PublicPageHeroFrame, PublicPageShell } from '@/components/public-page'
import { getHomepageContent, getProjects, getSiteFooterGitHubFeed } from '@/lib/cms'
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
  const [projects, homepageContent, githubFeed] = await Promise.all([
    getProjects(48),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
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
  const yearsBuilding = readMetric(homepageMetrics, ['year'], '12+')
  const codeCommitments = readMetric(homepageMetrics, ['commit'], '—')
  const footerContent = homepageContent.siteFooter

  return (
    <>
      <PublicPageShell className="projects-page" variant="index">
        <PublicBreadcrumbs items={[{ label: 'Projects' }]} />

        <PublicPageHeroFrame className="projects-index-hero" variant="index">
          <div className="projects-index-hero__copy">
            <p className="projects-index-hero__eyebrow">
              <LayersIcon aria-hidden="true" size={15} />
              Project registry
            </p>

            <h1>
              All Projects <span aria-hidden="true" />
            </h1>

            <p className="projects-index-hero__description">
              A collection of systems I&apos;ve designed, built, and shipped. From idea to
              production.
            </p>

            <section className="projects-index-metrics" aria-label="Project metrics">
              <article>
                <span>Total projects</span>
                <strong>{items.length}</strong>
                <small>and counting</small>
              </article>

              <article>
                <span>Open source</span>
                <strong>{openSourceCount}</strong>
                <small>projects</small>
              </article>

              <article>
                <span>Years building</span>
                <strong>{yearsBuilding}</strong>
                <small>of experience</small>
              </article>

              <article>
                <span>Code commitments</span>
                <strong>{codeCommitments}</strong>
                <small>across all projects</small>
              </article>
            </section>
          </div>

          <div className="projects-index-hero__visual">
            {heroImage ? (
              <Image
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 42vw"
                src={heroImage.src}
              />
            ) : (
              <ProjectsRegistryEditor
                activeCount={items.filter((item) => item.stage !== 'archived').length}
                featuredTitle={heroItem?.title ?? 'Portfolio'}
                progress={heroItem?.progress ?? 0}
                projectCount={items.length}
              />
            )}
          </div>
        </PublicPageHeroFrame>

        <ProjectDirectory items={items} />

        {footerContent ? (
          <ProjectsIndexCTA socialLinks={footerContent.profile.socialLinks} />
        ) : null}
      </PublicPageShell>

      {footerContent ? <SiteFooter content={footerContent} githubFeed={githubFeed} /> : null}
    </>
  )
}
