// Portfolio Admin Experience - Contact Message Document Controls v1
'use client'

import { useFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default function ContactMessageDocumentControls() {
  const state = useFormFields(([fields]) => ({
    email: (fields.email as FieldState | undefined)?.value,
    source: (fields.source as FieldState | undefined)?.value,
    status: (fields.status as FieldState | undefined)?.value,
    subject: (fields.subject as FieldState | undefined)?.value,
  }))

  const status = text(state.status, 'new').toLowerCase()
  const source = text(state.source, 'website').replace(/[-_]+/gu, ' ')
  const email = text(state.email)
  const subject = text(state.subject, 'Contact enquiry')
  const replyHref = email
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`
    : undefined

  return (
    <div className="portfolio-admin-message-command">
      <span className={`portfolio-admin-message-command__status is-${status}`}>
        <i aria-hidden="true" />
        {status === 'new' ? 'Unread' : status}
      </span>

      <span className="portfolio-admin-message-command__source" title={source}>
        {source}
      </span>

      {replyHref ? (
        <a className="portfolio-admin-message-command__reply" href={replyHref}>
          Reply
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  )
}
