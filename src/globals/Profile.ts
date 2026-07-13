import type { GlobalConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile',
  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Andrii Kulahin',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      defaultValue: 'Software Engineer',
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Ukraine',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Focused',
          value: 'focused',
        },
        {
          label: 'Unavailable',
          value: 'unavailable',
        },
      ],
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortBio',
      type: 'textarea',
    },
    {
      name: 'availability',
      type: 'text',
    },
    {
      name: 'careerStartedAt',
      type: 'date',
      defaultValue: '2014-01-01T00:00:00.000Z',
      admin: {
        description: 'Used to derive the public years-of-experience metric.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'completedProjectsOutsidePortfolio',
      label: 'Completed Projects Outside Portfolio',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description:
          'Completed projects not represented by published Projects records. The public Projects metric adds this value to the published portfolio count.',
      },
    },
    {
      name: 'cvFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional fallback for the Hero secondary CTA.',
      },
    },
    {
      name: 'metrics',
      type: 'array',
      maxRows: 4,
      admin: {
        description:
          'Optional manual public metrics. Derived collection and experience metrics stay in code.',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'suffix',
          type: 'text',
        },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'profileId',
      type: 'text',
      defaultValue: 'AK_10061988',
      admin: {
        description: 'Public HUD-style identifier shown on the Engineer Profile card.',
      },
    },
    {
      name: 'fullBio',
      type: 'textarea',
      defaultValue:
        'I build scalable web applications and distributed systems. Architecture first. Quality always.',
    },
    {
      name: 'journey',
      type: 'array',
      maxRows: 8,
      defaultValue: [
        {
          year: '2013',
          title: 'First steps in Web Development',
          description:
            'HTML, CSS, JavaScript. Built static websites and learned how the web works.',
          accent: false,
        },
        {
          year: '2016',
          title: 'Backend Development',
          description: 'PHP & MySQL. Building dynamic applications and understanding databases.',
          accent: false,
        },
        {
          year: '2018',
          title: 'Frontend Specialization',
          description:
            'React & JavaScript. Component architecture and modern frontend development.',
          accent: false,
        },
        {
          year: '2022',
          title: 'Fullstack & Architecture',
          description: 'Next.js, TypeScript, Node.js. Focus on clean architecture and performance.',
          accent: false,
        },
        {
          year: '2024',
          title: 'Systems Thinking',
          description: 'Developer experience, automation, CI/CD and long-term maintainability.',
          accent: false,
        },
        {
          year: '2026',
          title: 'Building Portfolio',
          description: 'Creating a modern portfolio with a unique engineering identity.',
          accent: true,
        },
      ],
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
        },
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
          name: 'accent',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'principles',
      type: 'array',
      maxRows: 6,
      defaultValue: [
        {
          icon: 'architecture',
          title: 'Architecture First',
          description: 'Every interface should have a clear structure before visual polish begins.',
        },
        {
          icon: 'documentation',
          title: 'Meaningful UI',
          description: 'Design is not decoration. It should guide, explain and reduce friction.',
        },
        {
          icon: 'code',
          title: 'Quality Always',
          description: 'Clean code, predictable behavior and maintainability matter after launch.',
        },
        {
          icon: 'rocket',
          title: 'Ship Iteratively',
          description: 'Small stable steps beat chaotic rewrites and keep the product moving.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'architecture',
          options: [
            {
              label: 'Architecture',
              value: 'architecture',
            },
            {
              label: 'Documentation',
              value: 'documentation',
            },
            {
              label: 'Code',
              value: 'code',
            },
            {
              label: 'Rocket',
              value: 'rocket',
            },
          ],
        },
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
      ],
    },
    {
      name: 'heroActivity',
      type: 'group',
      admin: {
        description:
          'Optional truthful activity note. Leave disabled until a manual note or live integration exists.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'detail',
          type: 'text',
        },
      ],
    },
  ],
}
