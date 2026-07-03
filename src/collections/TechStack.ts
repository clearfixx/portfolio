import type { CollectionConfig } from 'payload'

import { formatSlug } from '@/utils/formatSlug'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'featured', 'visible', 'sortOrder'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used as the icon key for AppIcon, e.g. nextjs, react, typescript.',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === 'string' && value.length > 0) {
              return formatSlug(value)
            }

            if (typeof siblingData?.name === 'string') {
              return formatSlug(siblingData.name)
            }

            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short tooltip-friendly description.',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Optional brand color, e.g. #3178C6.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        description: 'Use categories with type "Tech Stack" or "Shared".',
      },
    },
    {
      name: 'officialUrl',
      type: 'text',
      admin: {
        description: 'Official website URL.',
      },
    },
    {
      name: 'documentationUrl',
      type: 'text',
      admin: {
        description: 'Official documentation URL.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in highlighted homepage sections.',
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Allow this technology to appear on public pages.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
