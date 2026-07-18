'use client'

import type { DocumentViewClientProps, FormField } from 'payload'
import { DefaultEditView, useDocumentInfo } from '@payloadcms/ui'

import { AdminDocumentHeader } from './AdminDocumentHeader'
import { AdminDocumentShell } from './AdminDocumentShell'
import { AdminSaveControls } from './AdminSaveControls'
import type { AdminStatusTone } from './types'

const editorDescriptions: Record<string, string> = {
  analytics: 'Manage analytics providers, measurement identifiers, and tracking behavior.',
  'blog-posts': 'Shape the article, publishing metadata, taxonomy, and search presentation.',
  categories: 'Define a reusable classification for portfolio and editorial content.',
  contact: 'Manage public contact details and availability information.',
  'contact-messages':
    'Review the enquiry, manage its workflow, and preserve correspondence context.',
  homepage: 'Compose the portfolio homepage from reusable editorial sections.',
  media: 'Manage the asset preview, accessible metadata, organization, and visibility.',
  notifications: 'Review operational notifications and their read state.',
  projects: 'Build the project story, presentation, delivery data, and publishing readiness.',
  'project-versions': 'Record release history and connect a version to its parent project.',
  profile: 'Maintain the public profile, biography, capabilities, and availability.',
  seo: 'Configure global search, social sharing, and indexing defaults.',
  'site-settings': 'Control site identity, availability, locale, and maintenance settings.',
  social: 'Maintain public social profiles and external destinations.',
  testimonials: 'Review client feedback, moderation state, attribution, and publication details.',
  'tech-stack': 'Maintain technology identity, brand metadata, and portfolio visibility.',
}

const editorLabels: Record<string, string> = {
  'blog-posts': 'Blog post',
  categories: 'Category',
  'contact-messages': 'Contact message',
  media: 'Media asset',
  projects: 'Project',
  'project-versions': 'Project version',
  testimonials: 'Testimonial',
  'tech-stack': 'Technology',
}

function humanize(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function fieldValue(field: FormField | undefined): unknown {
  return field?.value
}

function text(value: unknown): string {
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

function formatUpdated(value: unknown): string {
  if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date)) {
    return 'Not saved'
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) return 'Not saved'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  }).format(date)
}

function formatFileSize(value: unknown): string {
  const bytes = typeof value === 'number' ? value : Number(value)

  if (!Number.isFinite(bytes) || bytes <= 0) return 'Pending upload'

  const units = ['B', 'KB', 'MB', 'GB']
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const amount = bytes / 1024 ** unit

  return `${amount >= 10 || unit === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[unit]}`
}

export default function AdminDocumentView(props: DocumentViewClientProps) {
  const {
    collectionSlug,
    currentEditor,
    globalSlug,
    id,
    initialData,
    isEditing,
    isLocked,
    lastUpdateTime,
    unpublishedVersionCount,
    versionCount,
  } = useDocumentInfo()
  const editorId = collectionSlug ?? globalSlug ?? 'document'
  const editorLabel = editorLabels[editorId] ?? humanize(editorId)
  const read = (path: string) => text(fieldValue(props.formState[path]))
  const title =
    read('title') ||
    read('subject') ||
    read('name') ||
    read('alt') ||
    read('email') ||
    read('version') ||
    `New ${editorLabel}`
  const rawStatus = read('status') || read('stage') || (isEditing || id ? 'Saved' : 'Draft')
  const normalizedStatus = rawStatus.toLowerCase()
  const tone: AdminStatusTone =
    normalizedStatus === 'published' ||
    normalizedStatus === 'released' ||
    normalizedStatus === 'approved'
      ? 'published'
      : normalizedStatus === 'archived' || normalizedStatus === 'rejected'
        ? 'archived'
        : normalizedStatus === 'pending' || normalizedStatus === 'testing'
          ? 'warning'
          : 'draft'
  const description =
    editorDescriptions[editorId] ??
    `Manage ${humanize(editorId).toLowerCase()} content and publishing settings.`
  const editorIdentity =
    currentEditor && typeof currentEditor === 'object'
      ? text(currentEditor.name) || text(currentEditor.email) || 'Administrator'
      : 'Administrator'
  const dimensions = [read('width'), read('height')].filter(Boolean).join(' × ')
  const metadata = [
    { label: 'Document', value: isEditing || id ? 'Existing' : 'New' },
    { label: 'Identifier', value: id ? String(id) : 'Assigned after save' },
    { label: 'Updated', value: formatUpdated(lastUpdateTime) },
    { label: 'Editor', value: editorIdentity },
    {
      label: 'Versions',
      value: versionCount
        ? `${versionCount} saved · ${unpublishedVersionCount} draft`
        : 'Initial version',
    },
    {
      label: editorId === 'media' ? 'Asset' : 'System state',
      value:
        editorId === 'media'
          ? `${read('mimeType') || 'File type pending'} · ${formatFileSize(fieldValue(props.formState.filesize))}${dimensions ? ` · ${dimensions}` : ''}`
          : isLocked
            ? 'Locked for editing'
            : 'Available for editing',
    },
  ]
  const status = { label: humanize(rawStatus), tone }
  const hasFieldHero =
    editorId === 'categories' || editorId === 'tech-stack' || editorId === 'project-versions'

  return (
    <AdminDocumentShell id={editorId}>
      {hasFieldHero ? null : (
        <div className="admin-document-hero">
          <AdminDocumentHeader
            description={description}
            eyebrow={editorLabel}
            metadata={metadata}
            status={status}
            title={title}
          />
        </div>
      )}
      <div className="admin-document-shell__view">
        <DefaultEditView {...props} SaveButton={<AdminSaveControls initialData={initialData} />} />
      </div>
    </AdminDocumentShell>
  )
}
