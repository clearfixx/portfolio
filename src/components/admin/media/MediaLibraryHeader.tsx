// Portfolio Admin Experience - Media Library Header v1

import Link from 'next/link'
import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'amber' | 'cyan' | 'green' | 'purple'

async function countMedia(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'media',
      overrideAccess: false,
      user,
      ...(where ? { where } : {}),
    })

    return result.totalDocs
  } catch {
    return 0
  }
}

function Metric({
  code,
  description,
  label,
  tone,
  value,
}: {
  code: string
  description: string
  label: string
  tone: Tone
  value: number
}) {
  return (
    <article className={`portfolio-admin-media-stat is-${tone}`}>
      <div>
        <span>{label}</span>
        <code>{code}</code>
      </div>
      <strong>{value}</strong>
      <p>{description}</p>
      <i aria-hidden="true" />
    </article>
  )
}

export default async function MediaLibraryHeader({
  hasCreatePermission,
  newDocumentURL,
  payload,
  user,
}: BeforeListServerProps) {
  const [total, publicAssets, externalAssets, unsorted] = await Promise.all([
    countMedia(payload, user),
    countMedia(payload, user, {
      isPublic: { equals: true },
    }),
    countMedia(payload, user, {
      externalProvider: { exists: true },
    }),
    countMedia(payload, user, {
      or: [{ folder: { exists: false } }, { folder: { equals: '' } }],
    }),
  ])

  return (
    <section className="portfolio-admin-media-overview">
      <header className="portfolio-admin-media-overview__header">
        <div>
          <span className="portfolio-admin-media-overview__eyebrow">Asset registry</span>
          <h2>Media library</h2>
          <p>
            Manage public assets, editorial metadata, file organization, and mirrored social media
            across {total} {total === 1 ? 'asset' : 'assets'}.
          </p>
        </div>

        {hasCreatePermission && newDocumentURL ? (
          <Link className="portfolio-admin-button is-primary" href={newDocumentURL}>
            <span aria-hidden="true">+</span>
            Upload asset
          </Link>
        ) : null}
      </header>

      <div className="portfolio-admin-media-overview__metrics">
        <Metric
          code="ALL"
          description="Files registered in the library"
          label="Total assets"
          tone="cyan"
          value={total}
        />
        <Metric
          code="PUB"
          description="Available on public pages"
          label="Public"
          tone="green"
          value={publicAssets}
        />
        <Metric
          code="EXT"
          description="Mirrored from external providers"
          label="External"
          tone="purple"
          value={externalAssets}
        />
        <Metric
          code="ORG"
          description="Assets without a folder key"
          label="Unsorted"
          tone={unsorted > 0 ? 'amber' : 'green'}
          value={unsorted}
        />
      </div>
    </section>
  )
}
