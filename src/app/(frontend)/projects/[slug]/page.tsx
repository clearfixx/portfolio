import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiteFooter } from '@/components/home'
import { ProjectDetail } from '@/components/projects'
import { PublicBreadcrumbs, PublicPageShell } from '@/components/public-page'
import {
  getHomepageContent,
  getProjectBySlug,
  getProjectVersions,
  getSiteFooterGitHubFeed,
} from '@/lib/cms'

export const revalidate = 300

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return {
    title: project.seo?.metaTitle || project.title,
    description: project.seo?.metaDescription || project.excerpt,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const [versions, homepageContent, githubFeed] = await Promise.all([
    getProjectVersions(project.id),
    getHomepageContent(),
    getSiteFooterGitHubFeed(),
  ])

  return (
    <>
      <PublicPageShell className="project-page" variant="detail">
        <PublicBreadcrumbs
          items={[
            {
              href: '/projects',
              label: 'Projects',
            },
            {
              label: project.title,
            },
          ]}
        />

        <ProjectDetail project={project} versions={versions} />
      </PublicPageShell>

      {homepageContent.siteFooter ? (
        <SiteFooter content={homepageContent.siteFooter} githubFeed={githubFeed} />
      ) : null}
    </>
  )
}
