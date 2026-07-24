import type { GlobalConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

const SECTION_OPTIONS = [
  { label: 'Hero', value: 'hero' },
  { label: 'Current Mission', value: 'currentMission' },
  { label: 'Featured Projects', value: 'projects' },
  { label: 'Engineer Profile', value: 'engineerProfile' },
  { label: 'Skills & Technologies', value: 'skills' },
  { label: 'Delivery Pipeline', value: 'delivery' },
  { label: 'Insights & Trust', value: 'insights' },
  { label: 'Contact', value: 'contact' },
] as const

function validateSafeHref(value: unknown): true | string {
  if (typeof value !== 'string' || !value.trim()) {
    return 'A destination URL is required.'
  }

  const href = value.trim()

  if ((href.startsWith('/') && !href.startsWith('//')) || href.startsWith('#')) {
    return true
  }

  try {
    const url = new URL(href)

    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
      ? true
      : 'Use an internal path, HTTPS URL, email, or telephone link.'
  } catch {
    return 'Enter a valid internal path or absolute URL.'
  }
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'landingLinks',
      label: 'Landing page navigation',
      type: 'array',
      maxRows: 8,
      defaultValue: [
        {
          enabled: true,
          label: 'Work',
          section: 'projects',
        },
        {
          enabled: true,
          label: 'About',
          section: 'engineerProfile',
        },
        {
          enabled: true,
          label: 'Stack',
          section: 'skills',
        },
        {
          enabled: true,
          label: 'Process',
          section: 'delivery',
        },
      ],
      admin: {
        description:
          'Ordered anchor links shown in the main navbar. A link is automatically hidden when its homepage section is disabled.',
        initCollapsed: true,
      },
      validate: (value) => {
        if (!Array.isArray(value)) {
          return true
        }

        const sections = value.flatMap((item) => {
          if (!item || typeof item !== 'object' || !('section' in item)) {
            return []
          }

          return typeof item.section === 'string' ? [item.section] : []
        })

        return new Set(sections).size === sections.length
          ? true
          : 'Each landing section can only be used once.'
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'section',
          type: 'select',
          required: true,
          options: [...SECTION_OPTIONS],
        },
      ],
    },
    {
      name: 'pagesMenu',
      label: 'Internal pages dropdown',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Explore',
        },
        {
          name: 'items',
          type: 'array',
          maxRows: 8,
          defaultValue: [
            {
              destination: 'projects',
              label: 'All Projects',
              openInNewTab: false,
            },
            {
              destination: 'articles',
              label: 'Articles',
              openInNewTab: false,
            },
          ],
          admin: {
            description:
              'Links shown inside the desktop dropdown and the Explore group of the mobile navigation.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'destination',
              type: 'select',
              required: true,
              defaultValue: 'custom',
              options: [
                {
                  label: 'Projects index',
                  value: 'projects',
                },
                {
                  label: 'Articles index',
                  value: 'articles',
                },
                {
                  label: 'Custom destination',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'href',
              label: 'Custom URL',
              type: 'text',
              admin: {
                condition: (_data, siblingData) => siblingData?.destination === 'custom',
                description:
                  'Use an internal path such as /about or a safe absolute URL such as https://example.com.',
              },
              validate: (
                value: unknown,
                { siblingData }: { siblingData?: { destination?: unknown } },
              ) => (siblingData?.destination === 'custom' ? validateSafeHref(value) : true),
            },
            {
              name: 'match',
              label: 'Active route matching',
              type: 'select',
              defaultValue: 'exact',
              options: [
                {
                  label: 'Exact route',
                  value: 'exact',
                },
                {
                  label: 'Route and descendants',
                  value: 'prefix',
                },
              ],
              admin: {
                condition: (_data, siblingData) => siblingData?.destination === 'custom',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'Header call to action',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: "Let's Talk",
        },
        {
          name: 'destination',
          type: 'select',
          required: true,
          defaultValue: 'contact',
          options: [
            {
              label: 'Homepage contact section',
              value: 'contact',
            },
            {
              label: 'Custom destination',
              value: 'custom',
            },
          ],
        },
        {
          name: 'href',
          label: 'Custom URL',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => siblingData?.destination === 'custom',
          },
          validate: (
            value: unknown,
            { siblingData }: { siblingData?: { destination?: unknown } },
          ) => (siblingData?.destination === 'custom' ? validateSafeHref(value) : true),
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (_data, siblingData) => siblingData?.destination === 'custom',
          },
        },
      ],
    },
  ],
}
