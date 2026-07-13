import process from 'node:process'

import type { Homepage, SiteSetting, Social } from '../src/payload-types'

const DEFAULT_FOOTER_SECTION: NonNullable<Homepage['footerSection']> = {
  availabilityLabel: 'Available',
  connectLabel: 'Connect',
  enabled: true,
  instagramLinkLabel: 'View on Instagram',
  newsletterButtonLabel: 'Gimme!',
  newsletterDescription: 'Notes on engineering, architecture and better products.',
  newsletterNote: 'No spam. Unsubscribe anytime.',
  newsletterPlaceholder: "What's a good email address?",
  newsletterTitle: 'Build Notes',
  snapshots: [
    {
      kind: 'code',
      subtitle: 'Typed component work',
      title: 'Code Snapshot',
    },
    {
      kind: 'ui',
      subtitle: 'From idea to impact',
      title: 'UI Flow',
    },
    {
      kind: 'desk',
      subtitle: 'Build environment',
      title: 'Workspace',
    },
    {
      kind: 'quote',
      subtitle: 'Visual note',
      title: 'Build. Ship. Repeat.',
    },
    {
      kind: 'terminal',
      subtitle: 'Production mindset',
      title: 'Terminal Logs',
    },
    {
      kind: 'coffee',
      subtitle: 'Fuel for systems',
      title: 'Coffee Break',
    },
  ],
  snapshotsSubtitle: 'Instagram visual log',
  snapshotsTitle: 'Build Snapshots',
  xHandle: '@ak_dev',
  xLinkLabel: 'View more on X',
  xPosts: [
    {
      content: "Clean architecture isn't about layers.\nIt's about making change cheap.",
      likes: 128,
      publishedAt: '2026-05-09T09:41:00.000Z',
      replies: 12,
      reposts: 34,
    },
    {
      content: 'Design systems pay off when your product starts to scale.',
      likes: 96,
      publishedAt: '2026-05-08T18:22:00.000Z',
      replies: 8,
      reposts: 21,
    },
    {
      content: 'Shipped a new feature behind a flag.\nSmall steps, big impact.',
      likes: 72,
      publishedAt: '2026-05-07T11:08:00.000Z',
      replies: 5,
      reposts: 17,
    },
  ],
  xTitle: 'X Signals',
}

const DEFAULT_SITE_FOOTER: NonNullable<SiteSetting['footer']> = {
  copyrightEmphasis: 'lot',
  copyrightPrefix: 'Built with ❤️, clean architecture and',
  copyrightSuffix: 'of ☕️.',
  navigation: [
    { href: '/#hero', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#engineer-profile', label: 'About' },
    { href: '/#skills-technologies', label: 'Stack' },
    { href: '/#contact', label: 'Contact' },
  ],
}

async function main() {
  process.loadEnvFile('.env')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing after loading .env')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })

  const [homepage, siteSettings, social] = await Promise.all([
    payload.findGlobal({
      slug: 'homepage',
      depth: 0,
    }) as Promise<Homepage>,
    payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
    }) as Promise<SiteSetting>,
    payload.findGlobal({
      slug: 'social',
      depth: 0,
    }) as Promise<Social>,
  ])

  await Promise.all([
    payload.updateGlobal({
      slug: 'homepage',
      data: {
        footerSection: {
          ...DEFAULT_FOOTER_SECTION,
          ...homepage.footerSection,
          snapshots: homepage.footerSection?.snapshots?.length
            ? homepage.footerSection.snapshots
            : DEFAULT_FOOTER_SECTION.snapshots,
          xPosts: homepage.footerSection?.xPosts?.length
            ? homepage.footerSection.xPosts
            : DEFAULT_FOOTER_SECTION.xPosts,
        },
      },
    }),
    payload.updateGlobal({
      slug: 'site-settings',
      data: {
        defaultLanguage: siteSettings.defaultLanguage || 'en',
        footer: {
          ...DEFAULT_SITE_FOOTER,
          ...siteSettings.footer,
          navigation: siteSettings.footer?.navigation?.length
            ? siteSettings.footer.navigation
            : DEFAULT_SITE_FOOTER.navigation,
        },
        maintenanceMode: siteSettings.maintenanceMode ?? false,
        siteDescription:
          siteSettings.siteDescription?.trim() ||
          'Software engineering portfolio featuring scalable web systems, product work, and technical insights.',
        siteName: siteSettings.siteName?.trim() || 'Andrii Kulahin Portfolio',
      },
    }),
    payload.updateGlobal({
      slug: 'social',
      data: {
        githubUrl: social.githubUrl ?? 'https://github.com/clearfixx',
        instagramUrl: social.instagramUrl ?? 'https://www.instagram.com/',
        linkedinUrl: social.linkedinUrl ?? 'https://www.linkedin.com/',
        telegramUrl: social.telegramUrl ?? 'https://t.me/ak_dev',
        xUrl: social.xUrl ?? 'https://x.com/',
      },
    }),
  ])

  console.log(
    'Site Footer ready: profile sources, social links, curated feeds, snapshots, newsletter copy, navigation and copyright configured.',
  )
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
