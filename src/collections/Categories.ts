import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

import { slugField } from '@/fields'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'type', 'sortOrder'],
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ sourceField: 'title' }),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'shared',
      options: [
        {
          label: 'Project',
          value: 'project',
        },
        {
          label: 'Blog',
          value: 'blog',
        },
        {
          label: 'Tech Stack',
          value: 'tech-stack',
        },
        {
          label: 'Shared',
          value: 'shared',
        },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        description: 'Optional parent category.',
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
