import type { GlobalConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Social: GlobalConfig = {
  slug: 'social',
  label: 'Social',

  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },

  fields: [
    {
      name: 'githubUrl',
      type: 'text',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'xUrl',
      type: 'text',
      admin: {
        description: 'X / Twitter profile URL.',
      },
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'dribbbleUrl',
      type: 'text',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
    },
  ],
}
