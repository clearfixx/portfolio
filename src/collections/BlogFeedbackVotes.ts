import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '@/access'

export const BlogFeedbackVotes: CollectionConfig = {
  slug: 'blog-feedback-votes',
  admin: {
    hidden: true,
    useAsTitle: 'fingerprint',
  },
  access: {
    read: authenticatedAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blog-posts',
      required: true,
      index: true,
    },
    {
      name: 'vote',
      type: 'select',
      required: true,
      index: true,
      options: [
        {
          label: 'Helpful',
          value: 'helpful',
        },
        {
          label: 'Not helpful',
          value: 'not-helpful',
        },
      ],
    },
    {
      name: 'fingerprint',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}
