import type { Metadata } from 'next'
import Link from 'next/link'

import { getProjects } from '@/lib/cms'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software products, experiments, and engineering case studies.',
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="public-page public-page--projects" aria-labelledby="projects-page-title">
      <div className="site-container public-page__inner">
        <header className="public-page__header">
          <p className="public-page__eyebrow">Portfolio // Projects</p>
          <h1 id="projects-page-title">Projects</h1>
          <p>
            A growing collection of products, platforms, and engineering systems built from idea to
            release.
          </p>
        </header>

        {projects.length > 0 ? (
          <ul className="public-page__list">
            {projects.map((project) => {
              const href = project.slug ? `/projects/${project.slug}` : '/projects'

              return (
                <li key={project.id}>
                  <article>
                    <p>{project.stage}</p>
                    <h2>
                      <Link href={href}>{project.title}</Link>
                    </h2>
                    <p>{project.excerpt}</p>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : (
          <p role="status">No published projects are available yet.</p>
        )}
      </div>
    </section>
  )
}
