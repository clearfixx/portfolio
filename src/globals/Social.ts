import type { GlobalConfig } from 'payload'

export const Social: GlobalConfig = {
  slug: 'social',
  label: 'Social',

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
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
