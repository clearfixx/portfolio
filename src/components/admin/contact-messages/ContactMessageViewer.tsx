// Portfolio Admin Experience - Contact Message Viewer v1
'use client'

import { useField, useFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

type ContactMessageViewerProps = {
  path: string
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function initials(name: string): string {
  return name
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export default function ContactMessageViewer({ path }: ContactMessageViewerProps) {
  const { value } = useField<string>({ path })
  const state = useFormFields(([fields]) => ({
    email: (fields.email as FieldState | undefined)?.value,
    message: (fields.message as FieldState | undefined)?.value,
    name: (fields.name as FieldState | undefined)?.value,
    source: (fields.source as FieldState | undefined)?.value,
    status: (fields.status as FieldState | undefined)?.value,
  }))

  const subject = text(value, 'Untitled enquiry')
  const name = text(state.name, 'Unknown sender')
  const email = text(state.email)
  const message = text(state.message, 'No message body was provided.')
  const source = text(state.source, 'website').replace(/[-_]+/gu, ' ')
  const status = text(state.status, 'new').toLowerCase()
  const replyHref = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`
    : undefined

  return (
    <article className={`portfolio-admin-message-viewer is-${status}`}>
      <header className="portfolio-admin-message-viewer__sender">
        <span aria-hidden="true" className="portfolio-admin-message-viewer__avatar">
          {initials(name)}
          {status === 'new' ? <i /> : null}
        </span>

        <div>
          <span>From</span>
          <strong>{name}</strong>
          {email ? <a href={`mailto:${encodeURIComponent(email)}`}>{email}</a> : null}
        </div>

        <span className="portfolio-admin-message-viewer__source" title={source}>
          {source}
        </span>
      </header>

      <div className="portfolio-admin-message-viewer__content">
        <span>Subject</span>
        <h2>{subject}</h2>
        <div className="portfolio-admin-message-viewer__body">{message}</div>
      </div>

      <footer className="portfolio-admin-message-viewer__footer">
        {replyHref ? (
          <a className="portfolio-admin-message-viewer__reply" href={replyHref}>
            Reply by email
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="portfolio-admin-message-viewer__reply is-disabled">
            Sender email unavailable
          </span>
        )}

        <small>Inbound message content is read-only.</small>
      </footer>
    </article>
  )
}
