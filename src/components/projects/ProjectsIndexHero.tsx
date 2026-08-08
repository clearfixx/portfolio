import { LayersIcon } from '@/components/icons/project'
import { PublicPageHeroFrame } from '@/components/public-page'
import Image from 'next/image'

import { ProjectsRegistryEditor } from './ProjectsRegistryEditor'

import styles from './ProjectsIndexHero.module.scss'

type ProjectsIndexHeroImage = {
  alt: string
  src: string
}

type ProjectsIndexHeroContent = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  totalProjectsLabel: string
  totalProjectsHint: string
  openSourceLabel: string
  openSourceHint: string
  yearsBuildingLabel: string
  yearsBuildingHint: string
  codeCommitmentsLabel: string
  codeCommitmentsHint: string
}

type ProjectsIndexHeroProps = {
  content: ProjectsIndexHeroContent
  activeCount: number
  codeCommitments: string
  featuredTitle: string
  heroImage?: ProjectsIndexHeroImage
  openSourceCount: number
  progress: number
  projectCount: number
  yearsBuilding: string
}

export function ProjectsIndexHero({
  content,
  activeCount,
  codeCommitments,
  featuredTitle,
  heroImage,
  openSourceCount,
  progress,
  projectCount,
  yearsBuilding,
}: ProjectsIndexHeroProps) {
  return (
    <PublicPageHeroFrame className={styles.hero} variant="index">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <LayersIcon aria-hidden="true" size={15} />
          {content.eyebrow}
        </p>

        <h1>
          {content.title} <span>{content.titleAccent}</span>
        </h1>

        <p className={styles.description}>{content.description}</p>

        <section className={styles.metrics} aria-label="Project metrics">
          <article>
            <span>{content.totalProjectsLabel}</span>
            <strong>{projectCount}</strong>
            <small>{content.totalProjectsHint}</small>
          </article>

          <article>
            <span>{content.openSourceLabel}</span>
            <strong>{openSourceCount}</strong>
            <small>{content.openSourceHint}</small>
          </article>

          <article>
            <span>{content.yearsBuildingLabel}</span>
            <strong>{yearsBuilding}</strong>
            <small>{content.yearsBuildingHint}</small>
          </article>

          <article>
            <span>{content.codeCommitmentsLabel}</span>
            <strong>{codeCommitments}</strong>
            <small>{content.codeCommitmentsHint}</small>
          </article>
        </section>
      </div>

      <div className={styles.visual}>
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
            activeCount={activeCount}
            featuredTitle={featuredTitle}
            progress={progress}
            projectCount={projectCount}
          />
        )}
      </div>
    </PublicPageHeroFrame>
  )
}
