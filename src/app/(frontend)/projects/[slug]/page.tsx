import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProjectBySlug } from '@/lib/cms'

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

  return (
    <article className="public-page public-page--project">
      <div className="site-container public-page__inner">
        <nav aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="public-page__header">
          <p className="public-page__eyebrow">
            {project.stage} · {project.progress ?? 0}% complete
          </p>
          <h1>{project.title}</h1>
          <p>{project.excerpt}</p>
        </header>

        <dl>
          <div>
            <dt>Stage</dt>
            <dd>{project.stage}</dd>
          </div>
          <div>
            <dt>Progress</dt>
            <dd>{project.progress ?? 0}%</dd>
          </div>
          {project.currentVersion ? (
            <div>
              <dt>Current version</dt>
              <dd>{project.currentVersion}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  )
}
