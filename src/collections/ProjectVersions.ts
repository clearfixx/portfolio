import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const ProjectVersions: CollectionConfig = {
  slug: 'project-versions',
  admin: {
    useAsTitle: 'version',
    defaultColumns: ['version', 'title', 'project', 'releaseDate', 'isCurrent', 'isStable'],
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      hasMany: false,
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      admin: {
        description: 'Version number or label, e.g. 1.0.0, Phase 2.2, MVP.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'releaseDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'breakingChanges',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'isStable',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marks the current visible project version.',
      },
    },
  ],
}
