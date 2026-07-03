import type { GlobalConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',

  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'contactFormEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable the public contact form.',
      },
    },
  ],
}
