'use client'

import {
  ArrowUpRightIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubIcon,
  SearchIcon,
  SlidersIcon,
} from '@/components/icons/project'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { ProjectDirectoryItem, ProjectLinkViewModel } from '@/lib/cms/public-projects'

type ProjectDirectoryProps = {
  items: ProjectDirectoryItem[]
}

type FilterKey = 'all' | 'featured' | string
type SortKey = 'newest' | 'progress' | 'name'

function linkIcon(type: ProjectLinkViewModel['type']) {
  if (type === 'github') {
    return <GitHubIcon aria-hidden="true" size={15} />
  }

  if (type === 'live') {
    return <ExternalLinkIcon aria-hidden="true" size={15} />
  }

  return <FileTextIcon aria-hidden="true" size={15} />
}

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href)
}

export function ProjectDirectory({ items }: ProjectDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('newest')

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].filter(Boolean),
    [items],
  )
  const hasFeatured = items.some((item) => item.featured)

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const filtered = items.filter((item) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'featured' && item.featured) ||
        item.category === activeFilter
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.excerpt, item.category, ...item.technologies]
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })

    return [...filtered].sort((left, right) => {
      if (sort === 'progress') {
        return right.progress - left.progress
      }

      if (sort === 'name') {
        return left.title.localeCompare(right.title)
      }

      return items.indexOf(left) - items.indexOf(right)
    })
  }, [activeFilter, items, query, sort])

  return (
    <section className="projects-directory" aria-labelledby="projects-directory-title">
      <div className="projects-directory__controls">
        <div className="projects-directory__filters" aria-label="Project filters">
          <button
            className={activeFilter === 'all' ? 'is-active' : undefined}
            type="button"
            onClick={() => setActiveFilter('all')}
          >
            <SlidersIcon aria-hidden="true" size={15} />
            All projects
          </button>

          {hasFeatured ? (
            <button
              className={activeFilter === 'featured' ? 'is-active' : undefined}
              type="button"
              onClick={() => setActiveFilter('featured')}
            >
              <span aria-hidden="true">☆</span>
              Featured
            </button>
          ) : null}

          {categories.map((category) => (
            <button
              className={activeFilter === category ? 'is-active' : undefined}
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
            >
              <CodeIcon aria-hidden="true" size={15} />
              {category}
            </button>
          ))}
        </div>

        <div className="projects-directory__tools">
          <label className="projects-directory__search">
            <SearchIcon aria-hidden="true" size={16} />
            <input
              aria-label="Search projects"
              type="search"
              value={query}
              placeholder="Search projects..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <select
            aria-label="Sort projects"
            className="projects-directory__sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="newest">Newest first</option>
            <option value="progress">Highest progress</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <header className="projects-directory__heading">
        <div>
          <p>Project registry</p>
          <h2 id="projects-directory-title">Selected systems and products.</h2>
        </div>
        <span>{String(visibleItems.length).padStart(2, '0')} visible</span>
      </header>

      {visibleItems.length > 0 ? (
        <ol className="projects-directory__list">
          {visibleItems.map((project, index) => {
            const detailHref = `/projects/${project.slug}`
            const publicLinks = project.links.filter((link) =>
              ['live', 'github', 'documentation'].includes(link.type),
            )

            return (
              <li key={project.id}>
                <article className={`project-row project-row--${project.stage}`}>
                  <Link className="project-row__visual" href={detailHref}>
                    {project.image ? (
                      <Image
                        alt={project.image.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1180px) 40vw, 330px"
                        src={project.image.src}
                      />
                    ) : (
                      <div className="project-row__fallback" aria-hidden="true">
                        <div className="project-row__fallback-window">
                          <div className="project-row__fallback-bar">
                            <span />
                            <span />
                            <span />
                            <small>project.config.ts</small>
                          </div>

                          <div className="project-row__fallback-code">
                            <span>
                              <i>const</i> project = {'{'}
                            </span>
                            <span>
                              &nbsp;&nbsp;name: <b>&apos;{project.title}&apos;</b>,
                            </span>
                            <span>
                              &nbsp;&nbsp;stage: <b>&apos;{project.stage}&apos;</b>,
                            </span>
                            <span>
                              &nbsp;&nbsp;progress: <em>{project.progress}</em>,
                            </span>
                            <span>{'}'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="project-row__image-status">
                      {project.featured ? 'Featured' : project.stageLabel}
                    </span>
                  </Link>

                  <div className="project-row__content">
                    <div className="project-row__title">
                      <div>
                        <p>{project.category}</p>
                        <h3>
                          <Link href={detailHref}>{project.title}</Link>
                        </h3>
                      </div>

                      <span className="project-row__stage">
                        <i aria-hidden="true" />
                        {project.stageLabel}
                      </span>
                    </div>

                    <p className="project-row__excerpt">{project.excerpt}</p>

                    {project.technologies.length > 0 ? (
                      <ul className="project-row__stack" aria-label={`${project.title} stack`}>
                        {project.technologies.slice(0, 6).map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                    ) : null}

                    <dl className="project-row__metadata">
                      <div>
                        <dt>Version</dt>
                        <dd>{project.version ?? '—'}</dd>
                      </div>
                      <div>
                        <dt>Status</dt>
                        <dd>{project.stageLabel}</dd>
                      </div>
                      <div>
                        <dt>Updated</dt>
                        <dd>{project.updatedLabel}</dd>
                      </div>
                    </dl>
                  </div>

                  <aside className="project-row__rail">
                    <div className="project-row__actions">
                      {publicLinks.slice(0, 2).map((link) => (
                        <a
                          href={link.href}
                          key={`${link.type}-${link.href}`}
                          rel={isExternalLink(link.href) ? 'noreferrer' : undefined}
                          target={isExternalLink(link.href) ? '_blank' : undefined}
                        >
                          {linkIcon(link.type)}
                          {link.label}
                          {isExternalLink(link.href) ? (
                            <ArrowUpRightIcon aria-hidden="true" size={13} />
                          ) : null}
                        </a>
                      ))}

                      <Link href={detailHref}>
                        <FileTextIcon aria-hidden="true" size={15} />
                        Case study
                        <ArrowUpRightIcon aria-hidden="true" size={13} />
                      </Link>
                    </div>

                    <div className="project-row__progress-copy">
                      <span>Progress</span>
                      <strong>{project.progress}%</strong>
                    </div>
                    <div className="project-row__progress" aria-hidden="true">
                      <span style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="project-row__since">
                      <span>Since</span>
                      <strong>{project.sinceYear}</strong>
                    </div>
                  </aside>
                </article>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className="projects-directory__empty" role="status">
          <SearchIcon aria-hidden="true" size={24} />
          <h3>No projects match these filters.</h3>
          <p>Reset the filters or try a different search phrase.</p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all')
              setQuery('')
            }}
          >
            Reset project view
          </button>
        </div>
      )}
    </section>
  )
}
