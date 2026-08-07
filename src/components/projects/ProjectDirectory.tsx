'use client'

import {
  ActivityIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
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

import { ProjectRegistryPreview } from './ProjectRegistryPreview'
import emptyStyles from './ProjectDirectoryEmpty.module.scss'
import shellStyles from './ProjectDirectoryShell.module.scss'
import contentStyles from './ProjectDirectoryContent.module.scss'
import footerStyles from './ProjectDirectoryFooter.module.scss'
import metricsStyles from './ProjectDirectoryMetrics.module.scss'
import controlsStyles from './ProjectDirectoryControls.module.scss'
import paginationStyles from './ProjectDirectoryPagination.module.scss'
import visualStyles from './ProjectDirectoryVisual.module.scss'
// project-directory-css-module-v1

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

function formatProjectVersion(value: string | undefined) {
  const normalized = value?.trim()

  if (!normalized) {
    return 'Rolling'
  }

  return /^v/i.test(normalized) ? normalized : `v${normalized}`
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
      className={`${footerStyles.action} ${footerStyles.disabled}`}
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
      className={footerStyles.action}
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
    <section ref={directoryRef} className={shellStyles.directory} aria-label="Project registry">
      <div className={controlsStyles.controls}>
        <div className={controlsStyles.filters} aria-label="Project filters">
          <button
            className={activeFilter === 'all' ? controlsStyles.active : undefined}
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
              className={activeFilter === 'featured' ? controlsStyles.active : undefined}
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
              className={activeFilter === category ? controlsStyles.active : undefined}
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

        <div className={controlsStyles.tools}>
          <label className={controlsStyles.search}>
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

          <div className={controlsStyles.sort}>
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
        <ol className={shellStyles.list}>
          {visibleItems.map((project) => {
            const detailHref = `/projects/${project.slug}`
            const liveLink = project.links.find((link) => link.type === 'live')
            const githubLink = project.links.find((link) => link.type === 'github')
            const firstMetric = project.metrics[0]
            const secondMetric = project.metrics[1]

            return (
              <li key={project.id}>
                <article className={shellStyles.row} data-stage={project.stage}>
                  <Link className={visualStyles.visual} href={detailHref}>
                    {project.image ? (
                      <>
                        <Image
                          alt={project.image.alt}
                          fill
                          sizes="(max-width: 940px) 100vw, (max-width: 1240px) 36vw, 440px"
                          src={project.image.src}
                        />

                        <span className={visualStyles.imageStatus}>
                          {project.featured ? 'Featured' : project.stageLabel}
                        </span>

                        <span className={visualStyles.imageStripe} aria-hidden="true">
                          <span className={visualStyles.imageStripeMode}>
                            <i />
                            Product view
                          </span>
                          <span>{project.slug}</span>
                          <span>{project.technologies[0] ?? 'Interface'}</span>
                          <strong>{project.progress}%</strong>
                        </span>

                        {/* project-image-mini-stripe-v34 */}
                      </>
                    ) : (
                      <ProjectRegistryPreview project={project} />
                    )}
                  </Link>

                  <div className={contentStyles.content}>
                    <div className={contentStyles.meta}>
                      <p className={contentStyles.category}>{project.category}</p>

                      <div className={contentStyles.metaDetails}>
                        <span className={contentStyles.stage}>
                          <i aria-hidden="true" />
                          {project.stageLabel}
                        </span>

                        <span className={contentStyles.updated}>
                          <ClockIcon aria-hidden="true" size={14} />
                          {project.updatedLabel}
                        </span>
                      </div>
                    </div>

                    <h3 className={contentStyles.heading}>
                      <Link href={detailHref}>{project.title}</Link>
                    </h3>

                    <p className={contentStyles.excerpt}>{project.excerpt}</p>

                    {project.technologies.length > 0 ? (
                      <ul className={contentStyles.stack} aria-label={`${project.title} stack`}>
                        {project.technologies.slice(0, 7).map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                    ) : null}

                    <dl className={metricsStyles.metrics}>
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

                      <div className={metricsStyles.progressMetric}>
                        <span>
                          <dt>Progress</dt>
                          <dd>
                            <span className={metricsStyles.progress} aria-hidden="true">
                              <span style={{ width: `${project.progress}%` }} />
                            </span>
                            <strong>{project.progress}%</strong>
                          </dd>
                        </span>
                      </div>
                    </dl>

                    <footer className={footerStyles.footer}>
                      <div
                        className={footerStyles.actions}
                        aria-label={`${project.title} project actions`}
                      >
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

                        <Link className={footerStyles.action} href={detailHref}>
                          <FileTextIcon aria-hidden="true" size={17} />
                          <span>Case Study</span>
                          <ArrowUpRightIcon aria-hidden="true" size={13} />
                        </Link>

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
                      </div>

                      <div
                        className={footerStyles.release}
                        aria-label={`${project.title} release information`}
                      >
                        <span>
                          <small>Release</small>
                          <strong>{formatProjectVersion(project.version)}</strong>
                        </span>

                        <span>
                          <small>Since</small>
                          <strong>{project.sinceYear}</strong>
                        </span>
                      </div>

                      {/* project-release-meta-v36 */}
                    </footer>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className={emptyStyles.empty} role="status">
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

      {pageCount > 1 ? (
        <section className={paginationStyles.paginationSection} aria-label="Project pagination">
          <div className={paginationStyles.paginationSummary}>
            <p>
              <span aria-hidden="true">{'//'}</span>
              Project index
            </p>
            <strong>
              Page {safeCurrentPage} of {pageCount}
            </strong>
            <span>{filteredItems.length} indexed entries</span>
          </div>

          <nav className={paginationStyles.pagination} aria-label="Project pages">
            <button
              aria-label="First project page"
              disabled={safeCurrentPage === 1}
              type="button"
              onClick={() => changePage(1)}
            >
              «
            </button>

            <button
              aria-label="Previous project page"
              disabled={safeCurrentPage === 1}
              type="button"
              onClick={() => changePage(safeCurrentPage - 1)}
            >
              ‹
            </button>

            {pageItems.map((item, index) =>
              item === 'ellipsis' ? (
                <span aria-hidden="true" key={`ellipsis-${index}`}>
                  …
                </span>
              ) : (
                <button
                  aria-current={item === safeCurrentPage ? 'page' : undefined}
                  className={item === safeCurrentPage ? paginationStyles.active : undefined}
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
              ›
            </button>

            <button
              aria-label="Last project page"
              disabled={safeCurrentPage === pageCount}
              type="button"
              onClick={() => changePage(pageCount)}
            >
              »
            </button>
          </nav>

          <div className={paginationStyles.paginationControls}>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                changePage(Number(formData.get('page')))
              }}
            >
              <label>
                <span>Jump to page</span>
                <select defaultValue={String(safeCurrentPage)} key={safeCurrentPage} name="page">
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                    <option key={pageNumber} value={pageNumber}>
                      {pageNumber}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit">
                Go
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </section>
  )
}
