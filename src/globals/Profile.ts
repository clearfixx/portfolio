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
