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
      name: 'footer',
      label: 'Footer',
      type: 'group',
      fields: [
        {
          name: 'navigation',
          type: 'array',
          maxRows: 8,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'copyrightPrefix',
          type: 'text',
          defaultValue: 'Built with ❤️, clean architecture and',
        },
        {
          name: 'copyrightEmphasis',
          type: 'text',
          defaultValue: 'lot',
        },
        {
          name: 'copyrightSuffix',
          type: 'text',
          defaultValue: 'of ☕️.',
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
