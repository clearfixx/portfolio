import type { CSSProperties, ReactNode } from 'react'

import { SiteHeaderSkeleton } from './SiteHeaderSkeleton'

type PublicSkeletonActiveItem = 'about' | 'blog' | 'contact' | 'projects'

type PublicSkeletonFrameProps = {
  activeItem: PublicSkeletonActiveItem
  children: ReactNode
  label: string
}

export function SkeletonLine({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return <span aria-hidden="true" className={`public-skeleton__line ${className}`} style={style} />
}

export function SkeletonBreadcrumbs() {
  return (
    <div className="public-skeleton__breadcrumbs">
      <SkeletonLine />
      <i />
      <SkeletonLine />
    </div>
  )
}

export function SkeletonEyebrow() {
  return (
    <div className="public-skeleton__eyebrow">
      <i />
      <SkeletonLine />
    </div>
  )
}

export function SkeletonTitle({
  accentWidth = '70%',
  leadingWidth = '88%',
}: {
  accentWidth?: string
  leadingWidth?: string
}) {
  return (
    <div className="public-skeleton__title">
      <SkeletonLine
        className="is-leading"
        style={{ '--skeleton-width': leadingWidth } as CSSProperties}
      />
      <SkeletonLine
        className="is-accent"
        style={{ '--skeleton-width': accentWidth } as CSSProperties}
      />
    </div>
  )
}

export function SkeletonDescription({ lines = 2 }: { lines?: number }) {
  return (
    <div className="public-skeleton__description">
      {Array.from({ length: lines }, (_, index) => (
        <SkeletonLine
          className={index === lines - 1 ? 'is-description-last' : undefined}
          key={index}
        />
      ))}
    </div>
  )
}

export function SkeletonMetrics({ count = 4 }: { count?: number }) {
  return (
    <div className="public-skeleton__metrics">
      {Array.from({ length: count }, (_, index) => (
        <article key={index}>
          <i />
          <span>
            <SkeletonLine />
            <SkeletonLine />
          </span>
        </article>
      ))}
    </div>
  )
}

export function EditorSkeleton({ variant }: { variant: 'blog' | 'projects' }) {
  const rows = Array.from({ length: 9 }, (_, index) => index)

  return (
    <div className="public-skeleton__editor" data-editor-variant={variant}>
      <header>
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>
          <i />
          <SkeletonLine />
          <SkeletonLine />
        </span>
        <SkeletonLine />
      </header>

      <div className="public-skeleton__editor-tab">
        <i />
        <SkeletonLine />
        <b />
      </div>

      <div className="public-skeleton__editor-workspace">
        <aside>
          <i />
          <i />
          <i />
          <i />
        </aside>

        <div>
          {rows.map((row) => (
            <span key={row}>
              <SkeletonLine />
              <SkeletonLine className={`is-code-${(row % 5) + 1}`} />
            </span>
          ))}
        </div>

        <aside className="is-minimap">
          {rows.map((row) => (
            <i key={row} />
          ))}
        </aside>
      </div>

      <footer>
        <SkeletonLine />
        <i />
        <SkeletonLine />
        <i />
        <SkeletonLine />
      </footer>
    </div>
  )
}

export function PublicSkeletonFrame({ activeItem, children, label }: PublicSkeletonFrameProps) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      className={`public-page-loading public-page-loading--${activeItem}`}
      role="status"
    >
      <section aria-hidden="true" className="public-skeleton">
        <div className="public-skeleton__ambient" />

        <SiteHeaderSkeleton activeItem={activeItem} />

        <main className="site-container public-skeleton__main">{children}</main>
      </section>
    </div>
  )
}

// page-specific-unified-skeletons-v1-9

// public-skeleton-types-navbar-repair-v1-11

// public-skeleton-navbar-repair-v1-12
