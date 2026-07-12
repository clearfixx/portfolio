import type { GlobalConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: "Hi, I'm",
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: "I don't just build websites.",
        },
        {
          name: 'titleAccent',
          type: 'text',
          defaultValue: 'websites.',
          admin: {
            description: 'Exact phrase inside the title that receives strong emphasis.',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
          defaultValue: 'I build systems\nthat solve real problems.',
        },
        {
          name: 'subtitleAccent',
          type: 'text',
          defaultValue: 'systems',
          admin: {
            description: 'Exact phrase inside the subtitle that receives accent emphasis.',
          },
        },
        {
          name: 'primaryCtaLabel',
          type: 'text',
          defaultValue: 'Explore My Work',
        },
        {
          name: 'primaryCtaUrl',
          type: 'text',
          defaultValue: '#projects',
        },
        {
          name: 'secondaryCtaLabel',
          type: 'text',
          defaultValue: 'Download CV',
        },
        {
          name: 'secondaryCtaUrl',
          type: 'text',
          defaultValue: '#contact',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description:
          'Selected projects for the homepage. If empty, frontend can fallback to featured projects.',
      },
    },
    {
      name: 'selectedTechStack',
      type: 'relationship',
      relationTo: 'tech-stack',
      hasMany: true,
      admin: {
        description: 'Selected technologies for the homepage skills section.',
      },
    },
    {
      name: 'testimonialsSection',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'socialFeedsSection',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
