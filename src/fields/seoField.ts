import type { GroupField } from 'payload'

export const seoField = (): GroupField => ({
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
})
