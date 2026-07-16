// Portfolio Admin Experience - Contact Message Operations v1
'use client'

import { useAllFormFields } from '@payloadcms/ui'

type FieldState = {
  value?: unknown
}

type MessageStatus = 'archived' | 'new' | 'read'

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default function ContactMessageOperations() {
  const [fields, dispatchFields] = useAllFormFields()
  const status = text((fields.status as FieldState | undefined)?.value, 'new') as MessageStatus
  const archivedAt = (fields.archivedAt as FieldState | undefined)?.value
  const source = text((fields.source as FieldState | undefined)?.value, 'website')

  const setStatus = (nextStatus: MessageStatus) => {
    dispatchFields({
      path: 'status',
      type: 'UPDATE',
      value: nextStatus,
    })

    dispatchFields({
      path: 'archivedAt',
      type: 'UPDATE',
      value:
        nextStatus === 'archived'
          ? typeof archivedAt === 'string' && archivedAt
            ? archivedAt
            : new Date().toISOString()
          : null,
    })
  }

  return (
    <aside className={`portfolio-admin-message-operations is-${status}`}>
      <header>
        <div>
          <span>Inbox state</span>
          <strong>{status === 'new' ? 'Unread' : status}</strong>
        </div>
        <i aria-hidden="true" />
      </header>

      <div className="portfolio-admin-message-operations__source">
        <span>Source</span>
        <strong title={source}>{source.replace(/[-_]+/gu, ' ')}</strong>
      </div>

      <div className="portfolio-admin-message-operations__actions">
        <button
          className={status === 'new' ? 'is-active' : ''}
          onClick={() => setStatus('new')}
          type="button"
        >
          Mark unread
        </button>
        <button
          className={status === 'read' ? 'is-active is-read' : 'is-read'}
          onClick={() => setStatus('read')}
          type="button"
        >
          Mark read
        </button>
        <button
          className={status === 'archived' ? 'is-active is-archive' : 'is-archive'}
          onClick={() => setStatus('archived')}
          type="button"
        >
          Archive
        </button>
      </div>

      <p>Inbox actions update the form. Use Save to persist the new state.</p>
    </aside>
  )
}
