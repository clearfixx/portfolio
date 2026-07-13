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
      name: 'currentMissionSection',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Current Mission',
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Optional custom title. Leave empty to use “Building {project title}”.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'A live preview of the flagship product currently shaping my engineering roadmap.',
        },
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          admin: {
            description:
              'Explicit project shown as the current mission. No automatic project fallback is used.',
          },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'View Mission Control',
        },
        {
          name: 'ctaUrlOverride',
          type: 'text',
          admin: {
            description:
              'Optional safe internal or HTTPS URL. When empty, the preferred enabled project link is used.',
          },
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Mission Status',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'Building the future, one release at a time.',
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
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'CONTACT',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: "Not enough? Let's talk.",
        },
        {
          name: 'titleAccent',
          type: 'text',
          defaultValue: "Let's talk.",
          admin: {
            description: 'Exact phrase inside the title that receives accent emphasis.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'If you need a scalable product, clean architecture and reliable delivery — I’m ready to discuss your project.',
        },
        {
          name: 'formTitle',
          type: 'text',
          defaultValue: 'Start the conversation',
        },
        {
          name: 'formDescription',
          type: 'textarea',
          defaultValue: 'Tell me what you’re building, what you need, and where you need help.',
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Mission link',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'Open for freelance, product work and collaboration.',
        },
      ],
    },
  ],
}
