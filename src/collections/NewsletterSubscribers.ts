import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '@/access'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'source', 'subscribedAt', 'createdAt'],
  },
  access: {
    read: authenticatedAccess,
    create: () => false,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Unsubscribed',
          value: 'unsubscribed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'site-footer',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
