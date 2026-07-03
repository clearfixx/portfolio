import type { CollectionConfig } from 'payload'

import { formatSlug } from '@/utils/formatSlug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'stage', 'progress', 'isFeatured', 'publishedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier. Auto-generated from title when empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === 'string' && value.length > 0) {
              return formatSlug(value)
            }

            if (typeof siblingData?.title === 'string') {
              return formatSlug(siblingData.title)
            }

            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short project summary for cards, lists, and SEO previews.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Primary image for project cards and list pages.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Large visual for featured homepage/project sections.',
      },
    },
    {
      name: 'stage',
      type: 'select',
      required: true,
      defaultValue: 'development',
      options: [
        {
          label: 'Idea',
          value: 'idea',
        },
        {
          label: 'Planning',
          value: 'planning',
        },
        {
          label: 'Development',
          value: 'development',
        },
        {
          label: 'Testing',
          value: 'testing',
        },
        {
          label: 'Released',
          value: 'released',
        },
        {
          label: 'Maintenance',
          value: 'maintenance',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Project completion percentage from 0 to 100.',
      },
    },
    {
      name: 'currentVersion',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Current public or internal version, e.g. 1.0.0.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this project in featured sections.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'releasedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        description: 'Use categories with type "Project" or "Shared".',
      },
    },
    {
      name: 'techStack',
      type: 'relationship',
      relationTo: 'tech-stack',
      hasMany: true,
      admin: {
        description: 'Technologies used in this project.',
      },
    },
    {
      name: 'github',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Public GitHub repository URL.',
          },
        },
        {
          name: 'owner',
          type: 'text',
          admin: {
            description: 'GitHub owner or organization name.',
          },
        },
        {
          name: 'repo',
          type: 'text',
          admin: {
            description: 'GitHub repository name.',
          },
        },
        {
          name: 'showStats',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow frontend to fetch and show live GitHub stats.',
          },
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'If empty, frontend should show disabled CTA with "Невдовзі".',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'other',
          options: [
            {
              label: 'GitHub',
              value: 'github',
            },
            {
              label: 'Live',
              value: 'live',
            },
            {
              label: 'Documentation',
              value: 'documentation',
            },
            {
              label: 'Case Study',
              value: 'case-study',
            },
            {
              label: 'Figma',
              value: 'figma',
            },
            {
              label: 'Other',
              value: 'other',
            },
          ],
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'deviceFrame',
          type: 'select',
          required: true,
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Desktop',
              value: 'desktop',
            },
            {
              label: 'Laptop',
              value: 'laptop',
            },
            {
              label: 'Tablet',
              value: 'tablet',
            },
            {
              label: 'Mobile',
              value: 'mobile',
            },
          ],
        },
      ],
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
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon key for frontend icon mapping.',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
