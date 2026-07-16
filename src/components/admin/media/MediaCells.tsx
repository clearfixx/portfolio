// Portfolio Admin Experience - Media Library Cells v1
'use client'

import Link from 'next/link'
import type { DefaultCellComponentProps } from 'payload'

type RecordValue = Record<string, unknown>

function record(value: unknown): RecordValue {
  return value && typeof value === 'object' ? (value as RecordValue) : {}
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function numberValue(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function bytes(value: unknown): string {
  const size = numberValue(value)

  if (!size || size <= 0) {
    return 'Size unknown'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1)
  const normalized = size / 1024 ** exponent

  return `${normalized >= 10 || exponent === 0 ? normalized.toFixed(0) : normalized.toFixed(1)} ${
    units[exponent]
  }`
}

function fileExtension(filename: string): string {
  return filename.split('.').pop()?.slice(0, 4).toUpperCase() || 'FILE'
}

export function MediaListOnlyField() {
  return null
}

export function MediaAssetCell({ rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const filename = text(row.filename, 'Unnamed asset')
  const mimeType = text(row.mimeType, 'application/octet-stream')
  const url = text(row.thumbnailURL, text(row.url)).replace(/"/g, '%22')
  const isImage = mimeType.startsWith('image/')
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : ''
  const href = id
    ? `/admin/collections/media/${encodeURIComponent(id)}`
    : '/admin/collections/media'

  return (
    <Link className="portfolio-admin-media-asset-cell" href={href}>
      <span
        aria-hidden="true"
        className={`portfolio-admin-media-asset-cell__preview${isImage && url ? ' has-image' : ''}`}
        style={isImage && url ? { backgroundImage: `url("${url}")` } : undefined}
      >
        {isImage && url ? null : fileExtension(filename)}
      </span>

      <span className="portfolio-admin-media-asset-cell__copy">
        <strong title={filename}>{filename}</strong>
        <small>{mimeType}</small>
      </span>

      <span aria-hidden="true" className="portfolio-admin-media-asset-cell__open">
        ↗
      </span>
    </Link>
  )
}

export function MediaAltCell({ cellData, rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const alt = text(cellData, 'Missing alt text')
  const caption = text(row.caption)

  return (
    <span className="portfolio-admin-media-alt-cell">
      <strong title={alt}>{alt}</strong>
      <small title={caption || undefined}>{caption || 'No caption'}</small>
    </span>
  )
}

export function MediaFolderCell({ cellData }: DefaultCellComponentProps) {
  const folder = text(cellData)

  return (
    <span
      className={`portfolio-admin-media-folder${folder ? '' : ' is-unsorted'}`}
      title={folder || 'No folder assigned'}
    >
      <i aria-hidden="true" />
      {folder || 'Unsorted'}
    </span>
  )
}

export function MediaVisibilityCell({ cellData }: DefaultCellComponentProps) {
  const isPublic = cellData === true

  return (
    <span className={`portfolio-admin-media-visibility${isPublic ? ' is-public' : ' is-private'}`}>
      <i aria-hidden="true" />
      {isPublic ? 'Public' : 'Private'}
    </span>
  )
}

export function MediaMetaCell({ rowData }: DefaultCellComponentProps) {
  const row = record(rowData)
  const width = numberValue(row.width)
  const height = numberValue(row.height)
  const dimensions = width && height ? `${width} × ${height}` : 'No dimensions'
  const provider = text(row.externalProvider)

  return (
    <span className="portfolio-admin-media-meta-cell">
      <strong>{bytes(row.filesize)}</strong>
      <small>
        {dimensions}
        {provider ? ` · ${provider}` : ''}
      </small>
    </span>
  )
}
