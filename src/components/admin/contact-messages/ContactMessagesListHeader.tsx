// Portfolio Admin Experience - Contact Inbox Header v1

import type { BeforeListServerProps, Where } from 'payload'

type Tone = 'cyan' | 'green' | 'purple' | 'slate'

type MetricProps = {
  code: string
  description: string
  label: string
  tone: Tone
  value: number
}

async function countMessages(
  payload: BeforeListServerProps['payload'],
  user: BeforeListServerProps['user'],
  where?: Where,
): Promise<number> {
  try {
    const result = await payload.count({
      collection: 'contact-messages',
      overrideAccess: false,
      user,
      ...(where ? { where } : {}),
    })

    return result.totalDocs
  } catch {
    return 0
  }
}

function Metric({ code, description, label, tone, value }: MetricProps) {
  return (
    <article className={`portfolio-admin-inbox-stat is-${tone}`}>
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

export default async function ContactMessagesListHeader({ payload, user }: BeforeListServerProps) {
  const [total, unread, read, archived] = await Promise.all([
    countMessages(payload, user),
    countMessages(payload, user, {
      status: {
        equals: 'new',
      },
    }),
    countMessages(payload, user, {
      status: {
        equals: 'read',
      },
    }),
    countMessages(payload, user, {
      status: {
        equals: 'archived',
      },
    }),
  ])

  return (
    <section className="portfolio-admin-inbox-overview">
      <header className="portfolio-admin-inbox-overview__header">
        <div>
          <span className="portfolio-admin-inbox-overview__eyebrow">Communication desk</span>
          <h2>Message inbox</h2>
          <p>
            Triage enquiries, identify unread conversations, and archive resolved messages across{' '}
            {total} {total === 1 ? 'message' : 'messages'}.
          </p>
        </div>
      </header>

      <div className="portfolio-admin-inbox-overview__metrics">
        <Metric
          code="NEW"
          description="Waiting to be reviewed"
          label="Unread"
          tone="purple"
          value={unread}
        />
        <Metric code="RED" description="Already opened" label="Read" tone="cyan" value={read} />
        <Metric
          code="ARC"
          description="Moved out of the active inbox"
          label="Archived"
          tone="slate"
          value={archived}
        />
        <Metric
          code="ALL"
          description="All received contact messages"
          label="Total"
          tone="green"
          value={total}
        />
      </div>
    </section>
  )
}
