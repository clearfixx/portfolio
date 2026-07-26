import type { GlobalConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',

  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'contactFormEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable the public contact form.',
      },
    },
    {
      name: 'page',
      type: 'group',
      label: 'Contacts Page',
      admin: {
        description:
          'Editorial content for the standalone /contacts page. Contact details, availability, and social URLs continue to use the shared Contact, Profile, and Social globals.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'breadcrumbLabel',
          type: 'text',
          required: true,
          defaultValue: 'Contacts',
        },
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Open communication channel',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Let’s build something that deserves to exist.',
        },
        {
          name: 'titleAccent',
          type: 'text',
          required: true,
          defaultValue: 'deserves to exist.',
          admin: {
            description: 'Exact phrase inside the title that receives accent emphasis.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Share the problem, product idea, or engineering challenge. I’ll review the context and reply with a clear next step.',
        },
        {
          name: 'responseTimeLabel',
          type: 'text',
          required: true,
          defaultValue: 'Response time',
        },
        {
          name: 'responseTimeValue',
          type: 'text',
          required: true,
          defaultValue: 'Within 1–2 business days',
        },
        {
          name: 'workingModeLabel',
          type: 'text',
          required: true,
          defaultValue: 'Working mode',
        },
        {
          name: 'workingModeValue',
          type: 'text',
          required: true,
          defaultValue: 'Remote-first · async-friendly',
        },
        {
          name: 'channelsEyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Direct channels',
        },
        {
          name: 'channelsTitle',
          type: 'text',
          required: true,
          defaultValue: 'Choose the channel that fits the conversation.',
        },
        {
          name: 'channelsDescription',
          type: 'textarea',
          required: true,
          defaultValue:
            'Email works best for project context. Telegram is useful for a quick first contact. Location and availability are kept in the shared profile settings.',
        },
        {
          name: 'formEyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Project intake',
        },
        {
          name: 'formTitle',
          type: 'text',
          required: true,
          defaultValue: 'Start the conversation',
        },
        {
          name: 'formDescription',
          type: 'textarea',
          required: true,
          defaultValue:
            'Tell me what you are building, where the project stands, and what kind of help you need.',
        },
        {
          name: 'processEyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Communication protocol',
        },
        {
          name: 'processTitle',
          type: 'text',
          required: true,
          defaultValue: 'What happens after you send the message.',
        },
        {
          name: 'processDescription',
          type: 'textarea',
          required: true,
          defaultValue:
            'No vague sales funnel. The goal is to understand the work, identify fit, and define the smallest useful next step.',
        },
        {
          name: 'processSteps',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          defaultValue: [
            {
              code: '01',
              title: 'Context review',
              description:
                'I read the message, inspect the scope, and identify the important technical or product constraints.',
            },
            {
              code: '02',
              title: 'Fit check',
              description:
                'I confirm whether the challenge matches my current focus, availability, and working model.',
            },
            {
              code: '03',
              title: 'Clear response',
              description:
                'You receive a direct answer with questions, recommendations, or a proposed next action.',
            },
            {
              code: '04',
              title: 'Working session',
              description:
                'When the fit is right, we define scope, ownership, communication, and the first delivery milestone.',
            },
          ],
          fields: [
            {
              name: 'code',
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
          ],
        },
        {
          name: 'socialEyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Public network',
        },
        {
          name: 'socialTitle',
          type: 'text',
          required: true,
          defaultValue: 'Follow the work between releases.',
        },
        {
          name: 'socialDescription',
          type: 'textarea',
          required: true,
          defaultValue:
            'Code, product progress, engineering notes, and selected experiments are published through the connected social channels.',
        },
        {
          name: 'seo',
          type: 'group',
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              defaultValue: 'Contacts',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Contact Andrii Kulahin about product engineering, architecture, full-stack development, technical direction, and selected collaborations.',
            },
            {
              name: 'canonical',
              type: 'text',
              required: true,
              defaultValue: '/contacts',
            },
          ],
        },
      ],
    },
  ],
}

// contacts-page-foundation-v1
