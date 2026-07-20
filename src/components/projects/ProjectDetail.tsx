import {
  ApiGatewayIcon,
  ArrowUpRightIcon,
  BrainIcon,
  CalendarIcon,
  ClockIcon,
  CodeIcon,
  CommunityIcon,
  DatabaseArchitectureIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FrontendArchitectureIcon,
  GitHubIcon,
  MediaIcon,
  ModulesIcon,
  ResearchIcon,
  ServicesArchitectureIcon,
  ShieldCheckIcon,
} from '@/components/icons/project'
import type { ComponentType } from 'react'
import type { ProjectIconProps } from '@/components/icons/project'
import Link from 'next/link'

import { PublicPageHeroFrame } from '@/components/public-page'

import type { Project, ProjectVersion } from '@/payload-types'
import {
  getProjectCategory,
  getProjectImage,
  getProjectLink,
  getProjectLinks,
  getProjectStageLabel,
  getProjectTechnologies,
  isPopulatedMedia,
} from '@/lib/cms/public-projects'

import { ProjectMediaCarousel, type ProjectMediaSlide } from './ProjectMediaCarousel'
import { ProjectCodePreview } from './ProjectCodePreview'
import { ProjectRichText } from './ProjectRichText'
import { ProjectVisualPlaceholder } from './ProjectVisualPlaceholder'
import { ProjectScreenshotCarousel } from './ProjectScreenshotCarousel'

type ProjectDetailProps = {
  project: Project
  versions: ProjectVersion[]
}

const DEFAULT_CODE_PREVIEW = `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3001)
}

bootstrap()`

const featureIconMap: Record<string, ComponentType<ProjectIconProps>> = {
  ai: BrainIcon,
  community: CommunityIcon,
  media: MediaIcon,
  modules: ModulesIcon,
  research: ResearchIcon,
  security: ShieldCheckIcon,
}

const featureIconFallbacks: ComponentType<ProjectIconProps>[] = [
  CommunityIcon,
  ResearchIcon,
  BrainIcon,
  MediaIcon,
  ShieldCheckIcon,
  ModulesIcon,
]

const architectureIconMap: Record<string, ComponentType<ProjectIconProps>> = {
  api: ApiGatewayIcon,
  database: DatabaseArchitectureIcon,
  frontend: FrontendArchitectureIcon,
  services: ServicesArchitectureIcon,
}

const architectureIconFallbacks: ComponentType<ProjectIconProps>[] = [
  FrontendArchitectureIcon,
  ApiGatewayIcon,
  ServicesArchitectureIcon,
  DatabaseArchitectureIcon,
]

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Not specified'
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? 'Not specified' : dateFormatter.format(date)
}

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href)
}

function buildGallerySlides(project: Project): ProjectMediaSlide[] {
  return [...(project.gallery ?? [])]
    .filter(
      (item) => isPopulatedMedia(item.image) && item.image.isPublic !== false && item.image.url,
    )
    .sort((left, right) => {
      if (left.isFeatured !== right.isFeatured) {
        return left.isFeatured ? -1 : 1
      }

      return (left.sortOrder ?? 0) - (right.sortOrder ?? 0)
    })
    .map((item) => {
      const image = isPopulatedMedia(item.image) ? item.image : null

      return {
        src: image?.url ?? '',
        alt: item.alt,
        caption: item.caption ?? undefined,
      }
    })
    .filter((slide) => Boolean(slide.src))
}

function buildHeroSlides(project: Project, gallerySlides: ProjectMediaSlide[]) {
  const image = getProjectImage(project)
  const slides: ProjectMediaSlide[] = image
    ? [
        {
          src: image.src,
          alt: image.alt,
        },
        ...gallerySlides,
      ]
    : gallerySlides

  const uniqueSlides = slides.filter(
    (slide, index, collection) =>
      collection.findIndex((candidate) => candidate.src === slide.src) === index,
  )

  return uniqueSlides
}

function resolveFeatureIcon(icon: string | null | undefined, index: number) {
  const iconKey = icon?.trim().toLowerCase()

  return (
    (iconKey ? featureIconMap[iconKey] : undefined) ??
    featureIconFallbacks[index % featureIconFallbacks.length]
  )
}

function resolveArchitectureIcon(icon: string | null | undefined, index: number) {
  const iconKey = icon?.trim().toLowerCase()

  return (
    (iconKey ? architectureIconMap[iconKey] : undefined) ??
    architectureIconFallbacks[index % architectureIconFallbacks.length]
  )
}

export function ProjectDetail({ project, versions }: ProjectDetailProps) {
  const category = getProjectCategory(project)
  const technologies = getProjectTechnologies(project)
  const gallerySlides = buildGallerySlides(project)
  const heroSlides = buildHeroSlides(project, gallerySlides)
  const screenshotSlides = gallerySlides
  const links = getProjectLinks(project)
  const liveLink = getProjectLink(links, 'live')
  const githubUrl = project.github?.url?.trim()
  const githubLink =
    getProjectLink(links, 'github') ??
    (githubUrl
      ? {
          href: githubUrl,
          label: 'GitHub',
          type: 'github' as const,
        }
      : undefined)
  const highlights = project.highlights ?? []
  const architecture = project.architecture ?? []
  const roadmap = project.roadmap ?? []
  const metrics = project.caseStudyMetrics ?? []
  const stageLabel = getProjectStageLabel(project.stage)
  const progress = Math.min(100, Math.max(0, Math.round(project.progress ?? 0)))
  const visibleCategory = category.toLowerCase() === 'uncategorized' ? null : category
  const codePreview = project.caseStudyCode?.code?.trim() || DEFAULT_CODE_PREVIEW
  const codeFilePath =
    project.caseStudyCode?.filePath?.trim() || `${project.slug}/apps/api/src/main.ts`
  const codeLanguage = project.caseStudyCode?.language || 'typescript'

  return (
    <article className="project-case">
      <PublicPageHeroFrame className="project-case__hero" variant="detail">
        <div className="project-case__hero-copy">
          <p className={`project-case__status is-${project.stage}`}>
            <span aria-hidden="true" />
            {stageLabel}
          </p>

          <h1 id="project-page-title">{project.title}</h1>
          <p className="project-case__tagline">{project.cardTagline || project.excerpt}</p>
          <p className="project-case__excerpt">{project.excerpt}</p>

          {technologies.length > 0 ? (
            <ul
              className="project-case__hero-stack"
              id="project-tech-stack"
              aria-label="Project technology stack"
            >
              {technologies.slice(0, 8).map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : null}

          <div className="project-case__hero-actions">
            {liveLink ? (
              <a
                className="project-case__button project-case__button--primary"
                href={liveLink.href}
                rel={isExternalLink(liveLink.href) ? 'noreferrer' : undefined}
                target={isExternalLink(liveLink.href) ? '_blank' : undefined}
              >
                Live demo
                <ExternalLinkIcon aria-hidden="true" size={16} />
              </a>
            ) : null}

            {githubLink ? (
              <a
                className="project-case__button"
                href={githubLink.href}
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon aria-hidden="true" size={16} />
                GitHub
              </a>
            ) : null}

            <a className="project-case__button" href="#project-overview">
              <FileTextIcon aria-hidden="true" size={16} />
              Case study
            </a>
          </div>
        </div>

        <div className="project-case__hero-media">
          {heroSlides.length > 0 ? (
            <ProjectMediaCarousel priority slides={heroSlides} />
          ) : (
            <ProjectVisualPlaceholder
              project={project}
              technologies={technologies}
              variant="hero"
            />
          )}
        </div>
      </PublicPageHeroFrame>

      <div className="project-case__workspace">
        <div className="project-case__workspace-main">
          <nav className="project-case__tabs" aria-label="Project sections">
            <a href="#project-overview">Overview</a>
            {highlights.length > 0 ? <a href="#project-features">Features</a> : null}
            {technologies.length > 0 ? <a href="#project-tech-stack">Tech stack</a> : null}
            {architecture.length > 0 ? <a href="#project-architecture">Architecture</a> : null}
            {roadmap.length > 0 ? <a href="#project-roadmap">Roadmap</a> : null}
            {versions.length > 0 ? <a href="#project-changelog">Changelog</a> : null}
          </nav>

          <section
            className="project-case-panel project-case__overview-panel"
            id="project-overview"
          >
            <header className="project-case-panel__header">
              <h2>About the project</h2>
              <CodeIcon aria-hidden="true" size={24} />
            </header>

            <div className="project-case__overview">
              <div className="project-case__overview-copy">
                <div className="project-case__rich-text">
                  <ProjectRichText data={project.description} />
                </div>

                {highlights.length > 0 ? (
                  <div className="project-case__overview-highlights">
                    {highlights.slice(0, 4).map((highlight, index) => {
                      const HighlightIcon = resolveFeatureIcon(highlight.icon, index)

                      return (
                        <article key={highlight.id ?? highlight.title}>
                          <span className="project-case__overview-icon">
                            <HighlightIcon aria-hidden="true" size={27} />
                          </span>
                          <div>
                            <h3>{highlight.title}</h3>
                            <p>{highlight.description}</p>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              <ProjectCodePreview
                code={codePreview}
                filePath={codeFilePath}
                language={codeLanguage}
              />
            </div>
          </section>

          {highlights.length > 0 ? (
            <section
              className="project-case-panel project-case__features-panel"
              id="project-features"
            >
              <header className="project-case-panel__header">
                <h2>Core features</h2>
                <a href="#project-features">See all features →</a>
              </header>

              <div className="project-case__features">
                {highlights.map((highlight, index) => {
                  const FeatureIcon = resolveFeatureIcon(highlight.icon, index)

                  return (
                    <article key={highlight.id ?? highlight.title}>
                      <span aria-hidden="true">
                        <FeatureIcon size={25} />
                      </span>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.description}</p>
                    </article>
                  )
                })}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="project-case__workspace-sidebar">
          <section className="project-case-card">
            <p>Project status</p>
            <strong className={`project-case-card__status is-${project.stage}`}>
              <span aria-hidden="true" />
              {stageLabel}
            </strong>

            <dl>
              <div>
                <dt>
                  <CalendarIcon aria-hidden="true" size={16} />
                  Since
                </dt>
                <dd>{formatDate(project.startedAt)}</dd>
              </div>
              <div>
                <dt>
                  <ClockIcon aria-hidden="true" size={16} />
                  Last update
                </dt>
                <dd>{formatDate(project.updatedAt)}</dd>
              </div>
              <div>
                <dt>
                  <CodeIcon aria-hidden="true" size={16} />
                  Version
                </dt>
                <dd>{project.currentVersion || 'Unversioned'}</dd>
              </div>
              <div>
                <dt>
                  <GitHubIcon aria-hidden="true" size={16} />
                  Repository
                </dt>
                <dd>{project.github?.repo || 'Private / unavailable'}</dd>
              </div>
              {visibleCategory ? (
                <div>
                  <dt>Category</dt>
                  <dd>{visibleCategory}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="project-case-card project-case-card--metrics">
            <p>Key metrics</p>

            <dl>
              {metrics.map((metric) => (
                <div key={metric.id ?? metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                  {metric.detail ? <small>{metric.detail}</small> : null}
                </div>
              ))}
            </dl>

            <div className="project-case-card__coverage">
              <div>
                <span>Delivery progress</span>
                <strong>{progress}%</strong>
              </div>
              <div aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </section>
        </aside>
      </div>

      {architecture.length > 0 || roadmap.length > 0 ? (
        <div className="project-case__systems">
          {architecture.length > 0 ? (
            <section className="project-case-panel" id="project-architecture">
              <header className="project-case-panel__header">
                <h2>Architecture overview</h2>
                <a href="#project-architecture">View full diagram →</a>
              </header>

              <div className="project-case__architecture-flow">
                {architecture.map((group, index) => {
                  const ArchitectureIcon = resolveArchitectureIcon(group.icon, index)

                  return (
                    <div className="project-case__architecture-step" key={group.id ?? group.title}>
                      <article>
                        <span className="project-case__architecture-icon">
                          <ArchitectureIcon aria-hidden="true" size={36} />
                        </span>
                        <strong>{group.title}</strong>
                        {group.description ? <p>{group.description}</p> : null}
                        <ul>
                          {(group.items ?? []).map((item) => (
                            <li key={item.id ?? item.label}>{item.label}</li>
                          ))}
                        </ul>
                      </article>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}

          {roadmap.length > 0 ? (
            <section className="project-case-panel" id="project-roadmap">
              <header className="project-case-panel__header">
                <h2>Roadmap</h2>
                <a href="#project-roadmap">View full roadmap →</a>
              </header>

              <ol className="project-case__roadmap">
                {roadmap.map((milestone) => (
                  <li
                    className={`is-${milestone.status}`}
                    key={milestone.id ?? `${milestone.version}-${milestone.title}`}
                  >
                    <span aria-hidden="true" />
                    <div>
                      <div>
                        {milestone.version ? <strong>{milestone.version}</strong> : null}
                        <h3>{milestone.title}</h3>
                        {milestone.timeframe ? <time>{milestone.timeframe}</time> : null}
                      </div>
                      {milestone.description ? <p>{milestone.description}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      ) : null}

      <div
        className={
          versions.length > 0
            ? 'project-case__lower'
            : 'project-case__lower project-case__lower--screenshots-only'
        }
      >
        {versions.length > 0 ? (
          <section className="project-case-panel" id="project-changelog">
            <header className="project-case-panel__header">
              <h2>Recent changelog</h2>
              <a href="#project-changelog">View full changelog →</a>
            </header>

            <ol className="project-case__changelog">
              {versions.slice(0, 6).map((version) => (
                <li key={version.id}>
                  <strong>v{version.version}</strong>
                  <div>
                    <span>{version.title}</span>
                    <p>{version.summary}</p>
                  </div>
                  <time dateTime={version.releaseDate ?? undefined}>
                    {formatDate(version.releaseDate)}
                  </time>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="project-case-panel project-case__screenshots" id="project-gallery">
          <header className="project-case-panel__header">
            <h2>Screenshots</h2>
            {screenshotSlides.length > 0 ? (
              <a href="#project-gallery">View full gallery →</a>
            ) : null}
          </header>

          {screenshotSlides.length > 0 ? (
            <ProjectScreenshotCarousel slides={screenshotSlides} />
          ) : (
            <ProjectVisualPlaceholder
              project={project}
              technologies={technologies}
              variant="screenshots"
            />
          )}
        </section>
      </div>

      <section className="project-case__cta">
        <p>Interested in this project?</p>
        <h2>Let&apos;s build something amazing together.</h2>
        <div>
          <Link href="/#contact">Email me</Link>
          {githubLink ? (
            <a href={githubLink.href} rel="noreferrer" target="_blank">
              <GitHubIcon aria-hidden="true" size={16} />
              GitHub
            </a>
          ) : null}
          <Link href="/#contact">
            Let&apos;s talk
            <ArrowUpRightIcon aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </article>
  )
}
