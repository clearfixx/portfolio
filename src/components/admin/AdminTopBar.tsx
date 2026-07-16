// Portfolio Admin Experience — topbar and metrics refinement
// Portfolio Admin Experience — stable workspace shell recovery
// Portfolio Admin Experience — viewport shell geometry and projects import repair
'use client'

import { useAuth, useConfig, useNav } from '@payloadcms/ui'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type EntityLabels =
  | string
  | {
      plural?: string
      singular?: string
    }

type ClientEntity = {
  admin?: {
    hidden?: boolean
  }
  labels?: EntityLabels
  slug: string
}

type ClientConfigShape = {
  collections?: ClientEntity[]
  globals?: ClientEntity[]
  routes?: {
    admin?: string
  }
}

type AdminCommand = {
  href: string
  keywords: string
  label: string
  section: string
}

const HIDDEN_TECHNICAL_SLUG_PATTERN =
  /(^payload-|cache|job-stats|jobs-stats|locked-documents|migrations|preferences)/i

const LABEL_OVERRIDES: Record<string, string> = {
  analytics: 'Analytics',
  'blog-posts': 'Blog Posts',
  categories: 'Categories',
  contact: 'Contact',
  'contact-messages': 'Contact Messages',
  'dss-github-feed-settings': 'GitHub Feed',
  'dss-instagram-feed-settings': 'Instagram Feed',
  'dss-x-feed-settings': 'X Feed',
  homepage: 'Homepage',
  media: 'Media',
  'newsletter-subscribers': 'Newsletter Subscribers',
  notifications: 'Notifications',
  profile: 'Profile',
  projects: 'Projects',
  'project-versions': 'Project Versions',
  seo: 'SEO',
  'site-settings': 'Site Settings',
  social: 'Social Links',
  'tech-stack': 'Tech Stack',
  testimonials: 'Testimonials',
  users: 'Users',
}

const SECTION_BY_SLUG: Record<string, string> = {
  analytics: 'Integrations',
  'blog-posts': 'Content',
  categories: 'Library',
  contact: 'Website',
  'contact-messages': 'Inbox',
  'dss-github-feed-settings': 'Integrations',
  'dss-instagram-feed-settings': 'Integrations',
  'dss-x-feed-settings': 'Integrations',
  homepage: 'Website',
  media: 'Library',
  'newsletter-subscribers': 'Inbox',
  notifications: 'Inbox',
  profile: 'Website',
  projects: 'Content',
  'project-versions': 'Library',
  seo: 'Optimization',
  'site-settings': 'System',
  social: 'Website',
  'tech-stack': 'Library',
  testimonials: 'Content',
  users: 'System',
}

function titleCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function entityLabel(entity: ClientEntity): string {
  const override = LABEL_OVERRIDES[entity.slug]
  if (override) return override

  if (typeof entity.labels === 'string') return entity.labels

  return entity.labels?.plural ?? entity.labels?.singular ?? titleCase(entity.slug)
}

function operatorInitials(value: string): string {
  const parts = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0]?.charAt(0) ?? ''}${parts[1]?.charAt(0) ?? ''}`.toUpperCase()
  }

  const compact = parts[0] ?? 'AK'
  return compact.slice(0, 2).toUpperCase()
}

function resolveBreadcrumbs(pathname: string, adminRoute: string): [string, string] {
  const relativePath = pathname.startsWith(adminRoute)
    ? pathname.slice(adminRoute.length)
    : pathname
  const segments = relativePath.split('/').filter(Boolean)

  if (segments.length === 0) return ['Overview', 'Dashboard']
  if (segments[0] === 'account') return ['System', 'Account']

  if ((segments[0] === 'collections' || segments[0] === 'globals') && segments[1]) {
    const slug = segments[1]
    return [SECTION_BY_SLUG[slug] ?? 'Control Room', LABEL_OVERRIDES[slug] ?? titleCase(slug)]
  }

  return ['Control Room', titleCase(segments.at(-1) ?? 'Dashboard')]
}

function SidebarToggleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="portfolio-admin-sidebar-toggle"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        className="portfolio-admin-sidebar-toggle__frame"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        width="18"
        x="3"
        y="4"
      />
      <path
        className="portfolio-admin-sidebar-toggle__rail"
        d="M9 4v16"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        className="portfolio-admin-sidebar-toggle__chevron"
        d="m14 9 3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="M6.5 10a5.5 5.5 0 0 1 11 0v3.3l1.5 2.2H5l1.5-2.2V10Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M10 18a2.2 2.2 0 0 0 4 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="m8 10 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export default function AdminTopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { config } = useConfig()
  const { logOut, user } = useAuth()
  const { navOpen } = useNav()
  const [commandOpen, setCommandOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [userOpen, setUserOpen] = useState(false)
  const commandInputRef = useRef<HTMLInputElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const clientConfig = config as unknown as ClientConfigShape
  const adminRoute = clientConfig.routes?.admin ?? '/admin'
  const breadcrumbs = resolveBreadcrumbs(pathname, adminRoute)
  const environment = process.env.NODE_ENV === 'development' ? 'Local' : 'Production'

  const userRecord = user as unknown as { email?: string; name?: string } | null
  const email = userRecord?.email ?? 'operator@portfolio.local'
  const operatorName = userRecord?.name?.trim() || email.split('@')[0] || 'Operator'
  const initials = operatorInitials(operatorName)

  const commands = useMemo<AdminCommand[]>(() => {
    const collectionCommands = (clientConfig.collections ?? [])
      .filter(
        (entity) =>
          entity.admin?.hidden !== true && !HIDDEN_TECHNICAL_SLUG_PATTERN.test(entity.slug),
      )
      .map((entity) => ({
        href: `${adminRoute}/collections/${entity.slug}`,
        keywords: `${entity.slug} ${entityLabel(entity)} collection`,
        label: entityLabel(entity),
        section: SECTION_BY_SLUG[entity.slug] ?? 'Content',
      }))

    const globalCommands = (clientConfig.globals ?? [])
      .filter(
        (entity) =>
          entity.admin?.hidden !== true && !HIDDEN_TECHNICAL_SLUG_PATTERN.test(entity.slug),
      )
      .map((entity) => ({
        href: `${adminRoute}/globals/${entity.slug}`,
        keywords: `${entity.slug} ${entityLabel(entity)} global settings`,
        label: entityLabel(entity),
        section: SECTION_BY_SLUG[entity.slug] ?? 'Website',
      }))

    return [
      {
        href: adminRoute,
        keywords: 'overview dashboard home control room',
        label: 'Dashboard',
        section: 'Overview',
      },
      ...collectionCommands,
      ...globalCommands,
      {
        href: `${adminRoute}/account`,
        keywords: 'account profile operator user',
        label: 'Account',
        section: 'System',
      },
    ]
  }, [adminRoute, clientConfig.collections, clientConfig.globals])

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return commands.slice(0, 9)

    return commands
      .filter((command) =>
        `${command.section} ${command.label} ${command.keywords}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 9)
  }, [commands, query])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setCommandOpen(false)
        setUserOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!commandOpen) return

    const frame = window.requestAnimationFrame(() => commandInputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [commandOpen])

  useEffect(() => {
    if (!userOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [userOpen])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.portfolioAdminNav = navOpen ? 'open' : 'closed'

    return () => {
      delete root.dataset.portfolioAdminNav
    }
  }, [navOpen])

  const navigateTo = (href: string) => {
    setCommandOpen(false)
    setQuery('')
    router.push(href)
  }

  const toggleSidebar = () => {
    document.querySelector<HTMLButtonElement>('.nav-toggler')?.click()
  }

  if (
    pathname.startsWith(`${adminRoute}/login`) ||
    pathname.startsWith(`${adminRoute}/forgot`) ||
    pathname.startsWith(`${adminRoute}/reset`)
  ) {
    return null
  }

  return (
    <>
      <header className="portfolio-admin-topbar" data-nav-open={navOpen ? 'true' : 'false'}>
        <div className="portfolio-admin-topbar__left">
          <button
            aria-expanded={navOpen}
            aria-label={navOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="portfolio-admin-topbar__nav-toggle"
            onClick={toggleSidebar}
            title={navOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            type="button"
          >
            <SidebarToggleIcon />
          </button>

          <nav aria-label="Breadcrumb" className="portfolio-admin-topbar__breadcrumbs">
            <ol>
              <li>{breadcrumbs[0]}</li>
              <li aria-current="page">{breadcrumbs[1]}</li>
            </ol>
          </nav>

          <span className="portfolio-admin-topbar__environment">
            <i aria-hidden="true" />
            {environment}
          </span>
        </div>

        <button
          aria-haspopup="dialog"
          className="portfolio-admin-topbar__search"
          onClick={() => setCommandOpen(true)}
          type="button"
        >
          <SearchIcon />
          <span>Search control room</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="portfolio-admin-topbar__right">
          <Link
            className="portfolio-admin-topbar__site-link"
            href="/"
            rel="noreferrer"
            target="_blank"
          >
            <span>View site</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            aria-label="Open notifications"
            className="portfolio-admin-topbar__icon-button"
            href={`${adminRoute}/collections/notifications`}
            title="Notifications"
          >
            <BellIcon />
            <i aria-hidden="true" />
          </Link>

          <div className="portfolio-admin-operator" ref={userMenuRef}>
            <button
              aria-expanded={userOpen}
              aria-haspopup="menu"
              className="portfolio-admin-operator__trigger"
              onClick={() => setUserOpen((current) => !current)}
              type="button"
            >
              <span className="portfolio-admin-operator__mark" aria-hidden="true">
                <span>{initials}</span>
              </span>
              <span className="portfolio-admin-operator__copy">
                <strong>{operatorName}</strong>
                <small>
                  <i aria-hidden="true" />
                  Administrator
                </small>
              </span>
              <span className="portfolio-admin-operator__chevron">
                <ChevronIcon />
              </span>
            </button>

            {userOpen ? (
              <div className="portfolio-admin-operator__menu" role="menu">
                <div className="portfolio-admin-operator__identity">
                  <span>System operator</span>
                  <strong>{operatorName}</strong>
                  <small>{email}</small>
                </div>

                <div className="portfolio-admin-operator__menu-links">
                  <Link
                    href={`${adminRoute}/account`}
                    onClick={() => setUserOpen(false)}
                    role="menuitem"
                  >
                    <span>Operator profile</span>
                    <small>Account and security</small>
                  </Link>
                  <Link
                    href={`${adminRoute}/globals/site-settings`}
                    onClick={() => setUserOpen(false)}
                    role="menuitem"
                  >
                    <span>Site settings</span>
                    <small>System configuration</small>
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setUserOpen(false)}
                    rel="noreferrer"
                    role="menuitem"
                    target="_blank"
                  >
                    <span>Open portfolio</span>
                    <small>Launch public site ↗</small>
                  </Link>
                </div>

                <button
                  className="portfolio-admin-operator__logout"
                  onClick={() => void logOut()}
                  role="menuitem"
                  type="button"
                >
                  <span>Terminate session</span>
                  <small>Sign out securely</small>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {commandOpen ? (
        <div
          className="portfolio-admin-command"
          onMouseDown={() => setCommandOpen(false)}
          role="presentation"
        >
          <section
            aria-label="Control room search"
            aria-modal="true"
            className="portfolio-admin-command__dialog"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="portfolio-admin-command__input-shell">
              <SearchIcon />
              <input
                aria-label="Search admin destinations"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && filteredCommands[0]) {
                    event.preventDefault()
                    navigateTo(filteredCommands[0].href)
                  }
                }}
                placeholder="Search pages, collections and settings..."
                ref={commandInputRef}
                type="search"
                value={query}
              />
              <kbd>ESC</kbd>
            </div>

            <div className="portfolio-admin-command__results">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <button key={command.href} onClick={() => navigateTo(command.href)} type="button">
                    <span>
                      <small>{command.section}</small>
                      <strong>{command.label}</strong>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))
              ) : (
                <div className="portfolio-admin-command__empty">
                  <strong>No destination found</strong>
                  <span>Try another collection, setting or module name.</span>
                </div>
              )}
            </div>

            <footer>
              <span>
                <kbd>↵</kbd> Open first result
              </span>
              <span>
                <kbd>ESC</kbd> Close
              </span>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  )
}
