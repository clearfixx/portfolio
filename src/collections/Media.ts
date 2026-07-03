import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'folder', 'isPublic', 'sortOrder'],
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Accessible alternative text. Required for public images.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional human-readable image caption.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Optional author, source, or attribution note.',
      },
    },
    {
      name: 'folder',
      type: 'text',
      admin: {
        description: 'Simple folder/group key, e.g. projects, blog, seo, homepage.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Allow this media item to be used on public pages.',
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
  upload: true,
}
