import {
  ActivityIcon,
  BarChartIcon,
  CodeIcon,
  GitHubIcon,
  LayersIcon,
} from '@/components/icons/project'
import type { Metadata } from 'next'
import Image from 'next/image'

import { ProjectDirectory } from '@/components/projects'
import { PublicBreadcrumbs, PublicPageShell } from '@/components/public-page'
import { getProjects } from '@/lib/cms'
import { buildProjectDirectoryItems, getProjectImage } from '@/lib/cms/public-projects'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software products, experiments, and engineering case studies.',
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects(48)
  const items = buildProjectDirectoryItems(projects)
  const heroProject = projects.find((project) => project.isFeatured) ?? projects[0]
  const heroImage = heroProject ? getProjectImage(heroProject) : undefined
  const heroItem = items[0]
  const openSourceCount = items.filter((item) =>
    item.links.some((link) => link.type === 'github'),
  ).length
  const activeCount = items.filter((item) =>
    ['planning', 'development', 'testing'].includes(item.stage),
  ).length
  const averageProgress =
    items.length > 0
      ? Math.round(items.reduce((total, item) => total + item.progress, 0) / items.length)
      : 0

  return (
    <PublicPageShell className="projects-page">
      <PublicBreadcrumbs items={[{ label: 'Projects' }]} />

      <header className="projects-index-hero">
        <div className="projects-index-hero__copy">
          <p className="projects-index-hero__eyebrow">
            <LayersIcon aria-hidden="true" size={15} />
            Project registry
          </p>
          <h1>
            All Projects <span aria-hidden="true" />
          </h1>
          <p>
            A collection of systems I&apos;ve designed, built, and shipped. From first architecture
            decisions to production-ready releases.
          </p>
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
            <div className="projects-index-hero__fallback" aria-hidden="true">
              <div className="projects-index-hero__fallback-window">
                <div className="projects-index-hero__fallback-toolbar">
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                  <small>project.registry.ts</small>
                </div>

                <div className="projects-index-hero__fallback-body">
                  <CodeIcon size={32} />
                  <span>
                    <i>const</i> registry = {'{'}
                  </span>
                  <span>&nbsp;&nbsp;projects: {items.length},</span>
                  <span>&nbsp;&nbsp;active: {activeCount},</span>
                  <span>&nbsp;&nbsp;featured: &apos;{heroItem?.title ?? 'none'}&apos;</span>
                  <span>{'}'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="projects-index-metrics" aria-label="Project metrics">
        <article>
          <LayersIcon aria-hidden="true" size={18} />
          <span>Total projects</span>
          <strong>{items.length}</strong>
          <small>published case studies</small>
        </article>
        <article>
          <GitHubIcon aria-hidden="true" size={18} />
          <span>Open source</span>
          <strong>{openSourceCount}</strong>
          <small>public repositories</small>
        </article>
        <article>
          <ActivityIcon aria-hidden="true" size={18} />
          <span>Active builds</span>
          <strong>{activeCount}</strong>
          <small>currently moving</small>
        </article>
        <article>
          <BarChartIcon aria-hidden="true" size={18} />
          <span>Average progress</span>
          <strong>{averageProgress}%</strong>
          <small>across public work</small>
        </article>
      </section>

      <ProjectDirectory items={items} />
    </PublicPageShell>
  )
}
