import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

import { slugField } from '@/fields'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'featured', 'visible', 'sortOrder'],
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({
      sourceField: 'name',
      description: 'Used as the icon key for AppIcon, e.g. nextjs, react, typescript.',
    }),
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
