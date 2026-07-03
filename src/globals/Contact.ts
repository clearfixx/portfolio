import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
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
