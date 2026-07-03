import type { GlobalConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',

  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },

  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Portfolio',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultLanguage',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Українська',
          value: 'uk',
        },
      ],
    },
    {
      name: 'maintenanceMode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Temporarily hide the public website.',
      },
    },
  ],
}
