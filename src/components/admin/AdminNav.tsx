// Portfolio Admin Experience — topbar and metrics refinement
'use client'

import { Link, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

import { AdminMark } from './brand/AdminMark'

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

type NavEntity = ClientEntity & {
  href: string
  kind: 'collection' | 'global'
}

type NavGroup = {
  entities: NavEntity[]
  label: string
}

const FIXED_GROUPS: Array<{ label: string; slugs: string[] }> = [
  {
    label: 'Content',
    slugs: ['projects', 'blog-posts', 'testimonials'],
  },
  {
    label: 'Library',
    slugs: ['media', 'categories', 'tech-stack', 'project-versions'],
  },
  {
    label: 'Inbox',
    slugs: ['contact-messages', 'newsletter-subscribers', 'notifications'],
  },
  {
    label: 'Website',
    slugs: ['homepage', 'profile', 'contact', 'social'],
  },
  {
    label: 'Optimization',
    slugs: ['seo'],
  },
  {
    label: 'System',
    slugs: ['site-settings', 'users'],
  },
]

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

const HIDDEN_TECHNICAL_SLUG_PATTERN =
  /(^payload-|cache|job-stats|jobs-stats|locked-documents|migrations|preferences)/i
const INTEGRATION_SLUG_PATTERN = /(github|instagram|(^|-)x-feed|analytics|feed-settings)/i
const INTEGRATION_ORDER = [
  'dss-github-feed-settings',
  'dss-x-feed-settings',
  'dss-instagram-feed-settings',
  'analytics',
]

function entityLabel(entity: ClientEntity): string {
  const override = LABEL_OVERRIDES[entity.slug]
  if (override) return override

  if (typeof entity.labels === 'string') {
    return entity.labels
  }

  return entity.labels?.plural ?? entity.labels?.singular ?? entity.slug
}

function NavGlyph({ slug }: { slug: string }) {
  const commonProps = {
    'aria-hidden': true,
    fill: 'none',
    height: 18,
    viewBox: '0 0 24 24',
    width: 18,
  }

  if (/project/.test(slug)) {
    return (
      <svg {...commonProps}>
        <path d="M4 7.5h6l2-2h8v13H4v-11Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (/message|subscriber|notification/.test(slug)) {
    return (
      <svg {...commonProps}>
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m5 7 7 6 7-6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (/media|categor|tech|version/.test(slug)) {
    return (
      <svg {...commonProps}>
        <path d="M5 5h14v14H5V5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m7.5 16 3.2-3.7 2.4 2.4 2.1-2.5 1.8 2.1" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (/github|instagram|x-feed|analytics|feed/.test(slug)) {
    return (
      <svg {...commonProps}>
        <path d="M5 16.5 9 12l3 3 7-8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="5" cy="16.5" fill="currentColor" r="1.2" />
        <circle cx="9" cy="12" fill="currentColor" r="1.2" />
        <circle cx="12" cy="15" fill="currentColor" r="1.2" />
        <circle cx="19" cy="7" fill="currentColor" r="1.2" />
      </svg>
    )
  }

  if (/setting|user|seo/.test(slug)) {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M5 5h14v14H5V5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function Group({ group, pathname }: { group: NavGroup; pathname: string }) {
  if (group.entities.length === 0) {
    return null
  }

  return (
    <section className="portfolio-admin-nav__group">
      <h2>{group.label}</h2>
      <ul>
        {group.entities.map((entity) => {
          const active = pathname === entity.href || pathname.startsWith(`${entity.href}/`)

          return (
            <li key={`${entity.kind}-${entity.slug}`}>
              <Link
                className={active ? 'is-active' : undefined}
                href={entity.href}
                prefetch={false}
              >
                <NavGlyph slug={entity.slug} />
                <span>{entityLabel(entity)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function AdminNav() {
  const pathname = usePathname()
  const { config } = useConfig()
  const clientConfig = config as unknown as ClientConfigShape
  const adminRoute = clientConfig.routes?.admin ?? '/admin'

  const collections = (clientConfig.collections ?? [])
    .filter(
      (entity) => entity.admin?.hidden !== true && !HIDDEN_TECHNICAL_SLUG_PATTERN.test(entity.slug),
    )
    .map<NavEntity>((entity) => ({
      ...entity,
      href: `${adminRoute}/collections/${entity.slug}`,
      kind: 'collection',
    }))

  const globals = (clientConfig.globals ?? [])
    .filter(
      (entity) => entity.admin?.hidden !== true && !HIDDEN_TECHNICAL_SLUG_PATTERN.test(entity.slug),
    )
    .map<NavEntity>((entity) => ({
      ...entity,
      href: `${adminRoute}/globals/${entity.slug}`,
      kind: 'global',
    }))

  const allEntities = [...collections, ...globals]
  const assigned = new Set<string>()

  const groups: NavGroup[] = FIXED_GROUPS.map((definition) => {
    const entities = definition.slugs
      .map((slug) => allEntities.find((entity) => entity.slug === slug))
      .filter((entity): entity is NavEntity => Boolean(entity))

    entities.forEach((entity) => assigned.add(`${entity.kind}:${entity.slug}`))

    return {
      entities,
      label: definition.label,
    }
  })

  const integrations = allEntities
    .filter((entity) => {
      const key = `${entity.kind}:${entity.slug}`
      const matches = INTEGRATION_SLUG_PATTERN.test(entity.slug)

      if (matches) {
        assigned.add(key)
      }

      return matches
    })
    .sort((left, right) => {
      const leftIndex = INTEGRATION_ORDER.indexOf(left.slug)
      const rightIndex = INTEGRATION_ORDER.indexOf(right.slug)
      const normalizedLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex
      const normalizedRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex

      return normalizedLeft - normalizedRight
    })

  const resolvedGroups: NavGroup[] = [
    ...groups.slice(0, 4),
    { entities: integrations, label: 'Integrations' },
    ...groups.slice(4),
  ]

  return (
    <nav aria-label="Admin navigation" className="portfolio-admin-nav">
      <div className="portfolio-admin-nav__brand">
        <div className="portfolio-admin-nav__brand-identity">
          <AdminMark
            className="portfolio-admin-nav__brand-mark"
            href={adminRoute}
            title="Andrii Kulahin"
          />
          <Link className="portfolio-admin-nav__brand-copy" href={adminRoute} prefetch={false}>
            <strong>Portfolio</strong>
            <small>Control Room</small>
          </Link>
        </div>
      </div>

      <div className="portfolio-admin-nav__scroll">
        <section className="portfolio-admin-nav__group portfolio-admin-nav__overview">
          <h2>Overview</h2>
          <ul>
            <li>
              <Link
                className={pathname === adminRoute ? 'is-active' : undefined}
                href={adminRoute}
                prefetch={false}
              >
                <NavGlyph slug="dashboard" />
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </section>

        {resolvedGroups.map((group) => (
          <Group group={group} key={group.label} pathname={pathname} />
        ))}
      </div>
    </nav>
  )
}
