'use client'

import {
  ActivityIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubIcon,
  LayersIcon,
  PackageIcon,
  SearchIcon,
  SlidersIcon,
} from '@/components/icons/project'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import type { ProjectDirectoryItem, ProjectLinkViewModel } from '@/lib/cms/public-projects'

type ProjectDirectoryProps = {
  items: ProjectDirectoryItem[]
}

type FilterKey = 'all' | 'featured' | string
type SortKey = 'newest' | 'progress' | 'name'

const PAGE_SIZE = 5

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href)
}

function getMetricStageLabel(stage: ProjectDirectoryItem['stage']) {
  const labels: Record<ProjectDirectoryItem['stage'], string> = {
    idea: 'Concept',
    planning: 'Planning',
    development: 'In Progress',
    testing: 'Testing',
    released: 'Live',
    maintenance: 'Maintained',
    archived: 'Archived',
  }

  return labels[stage]
}

function buildPageItems(currentPage: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const pages = new Set<number>([1, pageCount, currentPage - 1, currentPage, currentPage + 1])

  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((left, right) => left - right)

  const result: Array<number | 'ellipsis'> = []

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1]

    if (previousPage && page - previousPage > 1) {
      result.push('ellipsis')
    }

    result.push(page)
  })

  return result
}

function DisabledProjectAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span
      aria-disabled="true"
      className="project-row__action is-disabled"
      data-placement="top"
      data-toggle="tooltip"
      data-tooltip-delay="0.3s"
      data-tooltip-title="<em>Coming soon</em>"
      role="link"
      tabIndex={0}
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRightIcon aria-hidden="true" size={13} />
    </span>
  )
}

function ProjectExternalAction({
  icon,
  label,
  link,
}: {
  icon: ReactNode
  label: string
  link: ProjectLinkViewModel
}) {
  return (
    <a
      className="project-row__action"
      href={link.href}
      rel={isExternalLink(link.href) ? 'noreferrer' : undefined}
      target={isExternalLink(link.href) ? '_blank' : undefined}
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRightIcon aria-hidden="true" size={13} />
    </a>
  )
}

export function ProjectDirectory({ items }: ProjectDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const directoryRef = useRef<HTMLElement>(null)

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].filter(Boolean),
    [items],
  )
  const hasFeatured = items.some((item) => item.featured)

  const filteredItems = useMemo(() => {
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

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const pageItems = buildPageItems(safeCurrentPage, pageCount)
  const visibleItems = filteredItems.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  )

  const changePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), pageCount)

    if (nextPage === safeCurrentPage) {
      return
    }

    setCurrentPage(nextPage)

    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      directoryRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <section ref={directoryRef} className="projects-directory" aria-label="Project registry">
      <div className="projects-directory__controls">
        <div className="projects-directory__filters" aria-label="Project filters">
          <button
            className={activeFilter === 'all' ? 'is-active' : undefined}
            type="button"
            onClick={() => {
              setActiveFilter('all')
              setCurrentPage(1)
            }}
          >
            <SlidersIcon aria-hidden="true" size={16} />
            All projects
          </button>

          {hasFeatured ? (
            <button
              className={activeFilter === 'featured' ? 'is-active' : undefined}
              type="button"
              onClick={() => {
                setActiveFilter('featured')
                setCurrentPage(1)
              }}
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
              onClick={() => {
                setActiveFilter(category)
                setCurrentPage(1)
              }}
            >
              <CodeIcon aria-hidden="true" size={16} />
              {category}
            </button>
          ))}
        </div>

        <div className="projects-directory__tools">
          <label className="projects-directory__search">
            <SearchIcon aria-hidden="true" size={17} />
            <input
              aria-label="Search projects"
              type="search"
              value={query}
              placeholder="Search projects..."
              onChange={(event) => {
                setQuery(event.target.value)
                setCurrentPage(1)
              }}
            />
          </label>

          <div className="projects-directory__sort">
            <select
              aria-label="Sort projects"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortKey)
                setCurrentPage(1)
              }}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="progress">Sort by: Progress</option>
              <option value="name">Sort by: Name</option>
            </select>
            <ChevronDownIcon aria-hidden="true" size={15} />
          </div>
        </div>
      </div>

      {visibleItems.length > 0 ? (
        <ol className="projects-directory__list">
          {visibleItems.map((project) => {
            const detailHref = `/projects/${project.slug}`
            const liveLink = project.links.find((link) => link.type === 'live')
            const githubLink = project.links.find((link) => link.type === 'github')
            const firstMetric = project.metrics[0]
            const secondMetric = project.metrics[1]

            return (
              <li key={project.id}>
                <article className={`project-row project-row--${project.stage}`}>
                  <Link className="project-row__visual" href={detailHref}>
                    {project.image ? (
                      <Image
                        alt={project.image.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1180px) 42vw, 440px"
                        src={project.image.src}
                      />
                    ) : (
                      <div className="project-row__fallback" aria-hidden="true">
                        <div className="project-row__fallback-window">
                          <div className="project-row__fallback-toolbar">
                            <span>
                              <i />
                              <i />
                              <i />
                            </span>
                            <small>project.config.ts</small>
                          </div>

                          <div className="project-row__fallback-code">
                            <span>
                              <b>const</b> project = {'{'}
                            </span>
                            <span>
                              &nbsp;&nbsp;name: <em>&apos;{project.title}&apos;</em>,
                            </span>
                            <span>
                              &nbsp;&nbsp;stage: <em>&apos;{project.stage}&apos;</em>,
                            </span>
                            <span>
                              &nbsp;&nbsp;progress: <strong>{project.progress}</strong>,
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
                        {project.technologies.slice(0, 7).map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                    ) : null}

                    <dl className="project-row__metrics">
                      <div>
                        <PackageIcon aria-hidden="true" size={17} />
                        <span>
                          <dt>{firstMetric?.label ?? 'Technologies'}</dt>
                          <dd>{firstMetric?.value ?? '—'}</dd>
                        </span>
                      </div>

                      <div>
                        <ActivityIcon aria-hidden="true" size={17} />
                        <span>
                          <dt>{secondMetric?.label ?? 'Features'}</dt>
                          <dd>{secondMetric?.value ?? '—'}</dd>
                        </span>
                      </div>

                      <div>
                        <LayersIcon aria-hidden="true" size={17} />
                        <span>
                          <dt>Status</dt>
                          <dd>{getMetricStageLabel(project.stage)}</dd>
                        </span>
                      </div>

                      <div>
                        <ClockIcon aria-hidden="true" size={17} />
                        <span>
                          <dt>Updated</dt>
                          <dd>{project.updatedLabel}</dd>
                        </span>
                      </div>
                    </dl>
                  </div>

                  <aside className="project-row__rail">
                    <div className="project-row__actions">
                      {liveLink ? (
                        <ProjectExternalAction
                          icon={<ExternalLinkIcon aria-hidden="true" size={17} />}
                          label="Live Demo"
                          link={liveLink}
                        />
                      ) : (
                        <DisabledProjectAction
                          icon={<ExternalLinkIcon aria-hidden="true" size={17} />}
                          label="Live Demo"
                        />
                      )}

                      {githubLink ? (
                        <ProjectExternalAction
                          icon={<GitHubIcon aria-hidden="true" size={17} />}
                          label="GitHub"
                          link={githubLink}
                        />
                      ) : (
                        <DisabledProjectAction
                          icon={<GitHubIcon aria-hidden="true" size={17} />}
                          label="GitHub"
                        />
                      )}

                      <Link className="project-row__action" href={detailHref}>
                        <FileTextIcon aria-hidden="true" size={17} />
                        <span>Case Study</span>
                        <ArrowUpRightIcon aria-hidden="true" size={13} />
                      </Link>
                    </div>

                    <div className="project-row__delivery">
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

      <nav className="projects-directory__pagination" aria-label="Project pages">
        <button
          aria-label="Previous project page"
          disabled={safeCurrentPage === 1}
          type="button"
          onClick={() => changePage(safeCurrentPage - 1)}
        >
          <ChevronLeftIcon aria-hidden="true" size={16} />
        </button>

        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <span aria-hidden="true" key={`ellipsis-${index}`}>
              …
            </span>
          ) : (
            <button
              aria-current={item === safeCurrentPage ? 'page' : undefined}
              className={item === safeCurrentPage ? 'is-active' : undefined}
              key={item}
              type="button"
              onClick={() => changePage(item)}
            >
              {item}
            </button>
          ),
        )}

        <button
          aria-label="Next project page"
          disabled={safeCurrentPage === pageCount}
          type="button"
          onClick={() => changePage(safeCurrentPage + 1)}
        >
          <ChevronRightIcon aria-hidden="true" size={16} />
        </button>
      </nav>
    </section>
  )
}
