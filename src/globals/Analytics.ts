import type { GlobalConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Analytics: GlobalConfig = {
  slug: 'analytics',
  label: 'Analytics',

  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },

  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable or disable analytics on the public website.',
      },
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      admin: {
        description: 'Google Analytics measurement ID, e.g. G-XXXXXXXXXX.',
      },
    },
    {
      name: 'plausibleDomain',
      type: 'text',
      admin: {
        description: 'Plausible Analytics domain, e.g. example.com.',
      },
    },
  ],
}
