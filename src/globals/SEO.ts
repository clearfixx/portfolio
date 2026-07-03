import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'defaultMetaTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'robots',
      type: 'select',
      required: true,
      defaultValue: 'index-follow',
      options: [
        {
          label: 'Index, Follow',
          value: 'index-follow',
        },
        {
          label: 'No Index, Follow',
          value: 'noindex-follow',
        },
        {
          label: 'No Index, No Follow',
          value: 'noindex-nofollow',
        },
      ],
      admin: {
        description: 'Default robots behavior for public pages.',
      },
    },
    {
      name: 'sitemapEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
