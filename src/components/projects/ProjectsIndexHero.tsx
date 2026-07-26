import { LayersIcon } from '@/components/icons/project'
import { PublicPageHeroFrame } from '@/components/public-page'
import Image from 'next/image'

import { ProjectsRegistryEditor } from './ProjectsRegistryEditor'

import styles from './ProjectsIndexHero.module.scss'

type ProjectsIndexHeroImage = {
  alt: string
  src: string
}

type ProjectsIndexHeroProps = {
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
          Project registry
        </p>

        <h1>
          All <span>Projects</span>
        </h1>

        <p className={styles.description}>
          A collection of systems I&apos;ve designed, built, and shipped. From idea to production.
        </p>

        <section className={styles.metrics} aria-label="Project metrics">
          <article>
            <span>Total projects</span>
            <strong>{projectCount}</strong>
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
