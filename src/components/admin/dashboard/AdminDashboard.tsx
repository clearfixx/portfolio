// Portfolio Admin Experience — topbar and metrics refinement

import Link from 'next/link'
import type { AdminViewServerProps } from 'payload'
import type { ReactNode } from 'react'

type DashboardDoc = {
  createdAt?: string
  email?: string
  id?: number | string
  name?: string
  status?: string
  subject?: string
  title?: string
  updatedAt?: string
}

type DashboardCMS = {
  count: (args: {
    collection: string
    where?: Record<string, unknown>
  }) => Promise<{ totalDocs: number }>
  find: (args: {
    collection: string
    depth?: number
    limit?: number
    sort?: string
    where?: Record<string, unknown>
  }) => Promise<{ docs: DashboardDoc[] }>
  findGlobal: (args: { slug: string }) => Promise<Record<string, unknown>>
}

type ActivityItem = {
  date?: string
  detail: string
  href: string
  title: string
  tone: 'cyan' | 'green' | 'purple'
}

async function safeCount(
  cms: DashboardCMS,
  collection: string,
  where?: Record<string, unknown>,
): Promise<number> {
  try {
    const result = await cms.count({ collection, where })
    return result.totalDocs
  } catch {
    return 0
  }
}

async function safeFind(
  cms: DashboardCMS,
  collection: string,
  limit: number,
): Promise<DashboardDoc[]> {
  try {
    const result = await cms.find({
      collection,
      depth: 0,
      limit,
      sort: '-updatedAt',
    })

    return result.docs
  } catch {
    return []
  }
}

async function safeGlobal(cms: DashboardCMS, slug: string): Promise<Record<string, unknown>> {
  try {
    return await cms.findGlobal({ slug })
  } catch {
    return {}
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function documentName(doc: DashboardDoc, fallback: string): string {
  return doc.title ?? doc.subject ?? doc.name ?? doc.email ?? fallback
}

function timestamp(doc: DashboardDoc): string | undefined {
  return doc.updatedAt ?? doc.createdAt
}

function relativeTime(value?: string): string {
  if (!value) return 'Recently'

  const date = new Date(value)
  const diff = Date.now() - date.getTime()

  if (!Number.isFinite(diff) || diff < 0) return 'Recently'

  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

type MetricKind = 'articles' | 'health' | 'messages' | 'projects'

function MetricGlyph({ kind }: { kind: MetricKind }) {
  const commonProps = {
    'aria-hidden': true,
    fill: 'none',
    viewBox: '0 0 24 24',
  }

  if (kind === 'projects') {
    return (
      <svg {...commonProps}>
        <path
          d="M4 7h6l2-2h8v14H4V7Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path d="M8 11h8M8 15h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    )
  }

  if (kind === 'articles') {
    return (
      <svg {...commonProps}>
        <rect height="16" rx="2" stroke="currentColor" strokeWidth="1.6" width="14" x="5" y="4" />
        <path
          d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  if (kind === 'messages') {
    return (
      <svg {...commonProps}>
        <path
          d="M4 6h16v11H9l-5 3V6Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path
        d="m5 12 4 4 10-10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function MetricCard({
  code,
  eyebrow,
  href,
  kind,
  note,
  suffix,
  tone,
  value,
}: {
  code: string
  eyebrow: string
  href: string
  kind: MetricKind
  note: string
  suffix?: string
  tone: 'amber' | 'cyan' | 'green' | 'purple'
  value: number
}) {
  return (
    <Link className={`portfolio-admin-metric is-${tone}`} href={href}>
      <div className="portfolio-admin-metric__header">
        <span>{eyebrow}</span>
        <span className="portfolio-admin-metric__icon">
          <MetricGlyph kind={kind} />
        </span>
      </div>
      <div className="portfolio-admin-metric__body">
        <strong>
          {value}
          {suffix ? <em>{suffix}</em> : null}
        </strong>
        <small>{note}</small>
      </div>
      <span className="portfolio-admin-metric__code">{code}</span>
      <span className="portfolio-admin-metric__signal" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </Link>
  )
}

function Panel({
  children,
  className = '',
  title,
}: {
  children: ReactNode
  className?: string
  title: string
}) {
  return (
    <section className={`portfolio-admin-panel ${className}`.trim()}>
      <header>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  )
}

export default async function AdminDashboard({ payload }: AdminViewServerProps) {
  const cms = payload as unknown as DashboardCMS

  const [
    projectCount,
    publishedProjectCount,
    draftPostCount,
    newMessageCount,
    missingCoverCount,
    recentProjects,
    recentPosts,
    recentMessages,
    siteSettings,
  ] = await Promise.all([
    safeCount(cms, 'projects'),
    safeCount(cms, 'projects', { publishedAt: { exists: true } }),
    safeCount(cms, 'blog-posts', { status: { equals: 'draft' } }),
    safeCount(cms, 'contact-messages', { status: { equals: 'new' } }),
    safeCount(cms, 'projects', { coverImage: { exists: false } }),
    safeFind(cms, 'projects', 4),
    safeFind(cms, 'blog-posts', 4),
    safeFind(cms, 'contact-messages', 5),
    safeGlobal(cms, 'site-settings'),
  ])

  const maintenanceConfig = siteSettings.maintenance
  const maintenanceEnabled =
    siteSettings.maintenanceMode === true ||
    (isRecord(maintenanceConfig) && maintenanceConfig.enabled === true)

  const attentionItems = [
    missingCoverCount > 0
      ? {
          detail: `${missingCoverCount} project${missingCoverCount === 1 ? '' : 's'} missing a cover image`,
          href: '/admin/collections/projects',
          tone: 'warning',
        }
      : null,
    draftPostCount > 0
      ? {
          detail: `${draftPostCount} draft article${draftPostCount === 1 ? '' : 's'} waiting for review`,
          href: '/admin/collections/blog-posts',
          tone: 'info',
        }
      : null,
    newMessageCount > 0
      ? {
          detail: `${newMessageCount} unread contact message${newMessageCount === 1 ? '' : 's'}`,
          href: '/admin/collections/contact-messages',
          tone: 'message',
        }
      : null,
    maintenanceEnabled
      ? {
          detail: 'Maintenance mode is enabled',
          href: '/admin/globals/site-settings',
          tone: 'danger',
        }
      : null,
  ].filter((item): item is { detail: string; href: string; tone: string } => Boolean(item))

  const activity: ActivityItem[] = [
    ...recentProjects.map((doc) => ({
      date: timestamp(doc),
      detail: 'Project updated',
      href: `/admin/collections/projects/${doc.id ?? ''}`,
      title: documentName(doc, 'Untitled project'),
      tone: 'green' as const,
    })),
    ...recentPosts.map((doc) => ({
      date: timestamp(doc),
      detail: 'Article updated',
      href: `/admin/collections/blog-posts/${doc.id ?? ''}`,
      title: documentName(doc, 'Untitled article'),
      tone: 'cyan' as const,
    })),
    ...recentMessages.map((doc) => ({
      date: timestamp(doc),
      detail: 'Contact message received',
      href: `/admin/collections/contact-messages/${doc.id ?? ''}`,
      title: documentName(doc, 'New message'),
      tone: 'purple' as const,
    })),
  ]
    .sort((left, right) => {
      const leftTime = left.date ? new Date(left.date).getTime() : 0
      const rightTime = right.date ? new Date(right.date).getTime() : 0
      return rightTime - leftTime
    })
    .slice(0, 6)

  const latestUpdate = activity[0]?.date
  const environment = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'local'

  return (
    <main className="portfolio-admin-dashboard">
      <header className="portfolio-admin-dashboard__hero">
        <div>
          <span className="portfolio-admin-dashboard__eyebrow">Overview</span>
          <h1>Welcome back, Andrii</h1>
          <p>
            Your portfolio is online.{' '}
            {attentionItems.length > 0
              ? `${attentionItems.length} item${attentionItems.length === 1 ? '' : 's'} need attention.`
              : 'Everything looks healthy.'}
          </p>
        </div>
        <div className="portfolio-admin-dashboard__actions">
          <Link
            className="portfolio-admin-button is-primary"
            href="/admin/collections/projects/create"
          >
            Create project
          </Link>
          <Link className="portfolio-admin-button" href="/admin/collections/blog-posts/create">
            Write post
          </Link>
        </div>
      </header>

      <section className="portfolio-admin-dashboard__metrics" aria-label="Content metrics">
        <MetricCard
          code="LIVE"
          eyebrow="Published projects"
          href="/admin/collections/projects"
          kind="projects"
          note={`${projectCount} total projects`}
          tone="cyan"
          value={publishedProjectCount}
        />
        <MetricCard
          code="QUEUE"
          eyebrow="Draft articles"
          href="/admin/collections/blog-posts"
          kind="articles"
          note="Ready for editorial review"
          tone="purple"
          value={draftPostCount}
        />
        <MetricCard
          code="INBOX"
          eyebrow="New messages"
          href="/admin/collections/contact-messages"
          kind="messages"
          note="Contact form requests"
          tone="green"
          value={newMessageCount}
        />
        <MetricCard
          code="CHECK"
          eyebrow="Project health"
          href="/admin/collections/projects"
          kind="health"
          note={missingCoverCount === 0 ? 'Media checks passed' : 'Project media needs attention'}
          suffix="%"
          tone={missingCoverCount === 0 ? 'green' : 'amber'}
          value={
            projectCount === 0
              ? 100
              : Math.round(((projectCount - missingCoverCount) / projectCount) * 100)
          }
        />
      </section>

      <div className="portfolio-admin-dashboard__columns">
        <div className="portfolio-admin-dashboard__column is-wide">
          <Panel className="portfolio-admin-panel--attention" title="Needs attention">
            {attentionItems.length > 0 ? (
              <ul className="portfolio-admin-attention-list">
                {attentionItems.map((item) => (
                  <li className={`is-${item.tone}`} key={item.detail}>
                    <i aria-hidden="true" />
                    <Link href={item.href}>{item.detail}</Link>
                    <span>Open</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="portfolio-admin-empty-state">
                <strong>No immediate issues</strong>
                <span>Content and system checks are clear.</span>
              </div>
            )}
          </Panel>

          <Panel className="portfolio-admin-panel--activity" title="Recent activity">
            {activity.length > 0 ? (
              <ul className="portfolio-admin-activity-list">
                {activity.map((item) => (
                  <li key={`${item.href}-${item.date ?? item.title}`}>
                    <i className={`is-${item.tone}`} aria-hidden="true" />
                    <span>
                      <Link href={item.href}>{item.title}</Link>
                      <small>{item.detail}</small>
                    </span>
                    <time>{relativeTime(item.date)}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="portfolio-admin-empty-state">
                <strong>No recent activity</strong>
                <span>Updates will appear here as content changes.</span>
              </div>
            )}
          </Panel>
        </div>

        <div className="portfolio-admin-dashboard__column">
          <Panel className="portfolio-admin-panel--status" title="Site status">
            <dl className="portfolio-admin-status-list">
              <div>
                <dt>Availability</dt>
                <dd className="is-success">Online</dd>
              </div>
              <div>
                <dt>Environment</dt>
                <dd>{environment.toUpperCase()}</dd>
              </div>
              <div>
                <dt>Maintenance mode</dt>
                <dd className={maintenanceEnabled ? 'is-warning' : 'is-success'}>
                  {maintenanceEnabled ? 'Enabled' : 'Disabled'}
                </dd>
              </div>
              <div>
                <dt>Last content update</dt>
                <dd>{relativeTime(latestUpdate)}</dd>
              </div>
              <div>
                <dt>Timezone</dt>
                <dd>Europe/Kyiv</dd>
              </div>
            </dl>
            <Link
              className="portfolio-admin-panel__footer-link"
              href="/admin/globals/site-settings"
            >
              Open site settings →
            </Link>
          </Panel>

          <Panel className="portfolio-admin-panel--inbox" title="Inbox preview">
            {recentMessages.length > 0 ? (
              <ul className="portfolio-admin-inbox-list">
                {recentMessages.map((message) => (
                  <li key={String(message.id ?? documentName(message, 'message'))}>
                    <span className="portfolio-admin-inbox-list__avatar" aria-hidden="true">
                      {documentName(message, 'M').charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <Link href={`/admin/collections/contact-messages/${message.id ?? ''}`}>
                        {message.name ?? message.email ?? 'Contact request'}
                      </Link>
                      <small>{message.subject ?? 'Portfolio enquiry'}</small>
                    </span>
                    <time>{relativeTime(timestamp(message))}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="portfolio-admin-empty-state">
                <strong>Inbox is clear</strong>
                <span>New contact requests will appear here.</span>
              </div>
            )}
            <Link
              className="portfolio-admin-panel__footer-link"
              href="/admin/collections/contact-messages"
            >
              Go to contact messages →
            </Link>
          </Panel>
        </div>

        <div className="portfolio-admin-dashboard__column">
          <Panel className="portfolio-admin-panel--integrations" title="Integrations">
            <ul className="portfolio-admin-integration-list">
              <li>
                <span className="portfolio-admin-provider-icon">GH</span>
                <span>
                  <strong>GitHub</strong>
                  <small>Live commit stream</small>
                </span>
                <span className="is-success">Configured</span>
              </li>
              <li>
                <span className="portfolio-admin-provider-icon">X</span>
                <span>
                  <strong>X</strong>
                  <small>Signals feed</small>
                </span>
                <span className="is-success">Configured</span>
              </li>
              <li>
                <span className="portfolio-admin-provider-icon">IG</span>
                <span>
                  <strong>Instagram</strong>
                  <small>Media feed</small>
                </span>
                <span className="is-success">Configured</span>
              </li>
            </ul>
            <p className="portfolio-admin-panel__note">
              Open a provider monitor for live sync health and cache diagnostics.
            </p>
          </Panel>

          <Panel className="portfolio-admin-panel--quick" title="Quick actions">
            <div className="portfolio-admin-quick-actions">
              <Link href="/admin/collections/projects/create">
                <strong>Create new project</strong>
                <small>Add a portfolio case study</small>
              </Link>
              <Link href="/admin/collections/blog-posts/create">
                <strong>Write new post</strong>
                <small>Create a blog article</small>
              </Link>
              <Link href="/admin/collections/media/create">
                <strong>Upload media</strong>
                <small>Add images or files</small>
              </Link>
              <Link href="/admin/globals/homepage">
                <strong>Edit homepage</strong>
                <small>Update landing-page content</small>
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  )
}
