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
      name: 'skillsSection',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Skills & Technologies',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'My Engineering Toolkit',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'The technologies, tools and practices I use to design, build and ship scalable digital products.',
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Technology is just a tool.',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'Problem solving is the craft.',
        },
        {
          name: 'cards',
          type: 'array',
          admin: {
            description:
              'Card order controls the public layout. Presentation tone and icon are derived from the card key.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'key',
              type: 'select',
              required: true,
              options: [
                { label: 'Frontend', value: 'frontend' },
                { label: 'Tools & Workflow', value: 'workflow' },
                { label: 'Backend', value: 'backend' },
                { label: 'DevOps & Cloud', value: 'devops' },
                { label: 'Architectural Approach', value: 'architecture' },
                { label: 'Current Focus', value: 'focus' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'badge',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'technologies',
              type: 'relationship',
              relationTo: 'tech-stack',
              hasMany: true,
              admin: {
                description:
                  'Visible technologies shown in this card. When empty, the frontend uses the default slug group for this card key.',
              },
            },
            {
              name: 'pillsTitle',
              type: 'text',
            },
            {
              name: 'pills',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'details',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                },
                {
                  name: 'caption',
                  type: 'text',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'workflowTitle',
              type: 'text',
            },
            {
              name: 'workflow',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Plan', value: 'plan' },
                    { label: 'Code', value: 'code' },
                    { label: 'Commit', value: 'commit' },
                    { label: 'Review', value: 'review' },
                    { label: 'Deploy', value: 'deploy' },
                  ],
                },
              ],
            },
            {
              name: 'focusLine',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'principles',
              type: 'array',
              fields: [
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
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Layers', value: 'layers' },
                    { label: 'Cube', value: 'cube' },
                    { label: 'Scale', value: 'scale' },
                    { label: 'Wrench', value: 'wrench' },
                    { label: 'Flask', value: 'flask' },
                  ],
                },
              ],
            },
            {
              name: 'focusItems',
              type: 'array',
              fields: [
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
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'AI', value: 'ai' },
                    { label: 'System', value: 'system' },
                    { label: 'Automation', value: 'automation' },
                    { label: 'Performance', value: 'performance' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'deliveryPipelineSection',
      label: 'Delivery Pipeline',
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
          defaultValue: 'DELIVERY PIPELINE',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'From rough idea to production-ready system.',
        },
        {
          name: 'titleAccent',
          type: 'text',
          defaultValue: 'production-ready',
          admin: {
            description: 'Exact phrase inside the title that receives the cyan accent.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'A clear build process for turning vague requirements into stable, maintainable products.',
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Structured process',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'Clear scope. Clean build. Reliable launch.',
        },
        {
          name: 'metrics',
          type: 'array',
          maxRows: 3,
          admin: {
            description:
              'Up to three delivery values. The icon is derived from the stable metric key.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'key',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Predictable delivery',
                  value: 'predictable',
                },
                {
                  label: 'Clear milestones',
                  value: 'milestones',
                },
                {
                  label: 'Maintainable result',
                  value: 'maintainable',
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
          name: 'phases',
          type: 'array',
          minRows: 5,
          maxRows: 5,
          admin: {
            description:
              'Exactly five unique phases are required because the desktop motion runtime uses five fixed activation steps.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'key',
              type: 'select',
              required: true,
              options: [
                {
                  label: 'Discovery',
                  value: 'discovery',
                },
                {
                  label: 'Architecture',
                  value: 'architecture',
                },
                {
                  label: 'Interface',
                  value: 'interface',
                },
                {
                  label: 'Development',
                  value: 'development',
                },
                {
                  label: 'Launch',
                  value: 'launch',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'pending',
              options: [
                {
                  label: 'Complete',
                  value: 'complete',
                },
                {
                  label: 'In progress',
                  value: 'progress',
                },
                {
                  label: 'Pending',
                  value: 'pending',
                },
              ],
            },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'selectedTechStack',
      type: 'relationship',
      relationTo: 'tech-stack',
      hasMany: true,
      admin: {
        description: 'Selected technologies used in the Hero telemetry strip.',
      },
    },
    {
      name: 'engineerProfileSection',
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
          defaultValue: 'About me',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Engineer Profile',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'A builder of scalable systems and meaningful digital experiences.',
        },
        {
          name: 'journeyTitle',
          type: 'text',
          defaultValue: 'Engineering Journey',
        },
        {
          name: 'journeyMeta',
          type: 'text',
          defaultValue: '// my path',
        },
        {
          name: 'journeyFooter',
          type: 'text',
          defaultValue: 'MISSION: CONTINUOUS IMPROVEMENT',
        },
        {
          name: 'principlesTitle',
          type: 'text',
          defaultValue: 'Engineering Philosophy',
        },
        {
          name: 'principlesMeta',
          type: 'text',
          defaultValue: '// principles',
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Engineer mindset',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'turning complex ideas into clean, maintainable systems.',
        },
      ],
    },
    {
      name: 'insightsTrustSection',
      label: 'Insights & Trust',
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
          defaultValue: 'INSIGHTS & TRUST',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Latest Articles & Client Feedback',
        },
        {
          name: 'titleAccent',
          type: 'text',
          defaultValue: 'Articles',
          admin: {
            description: 'Exact phrase inside the title that receives the cyan accent.',
          },
        },
        {
          name: 'titleMuted',
          type: 'text',
          defaultValue: 'Feedback',
          admin: {
            description: 'Exact phrase inside the title that receives the purple accent.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Build notes, engineering thoughts and client feedback collected from real project work.',
        },
        {
          name: 'articlesTitle',
          type: 'text',
          defaultValue: 'Latest Articles',
        },
        {
          name: 'featuredLabel',
          type: 'text',
          defaultValue: 'Featured',
        },
        {
          name: 'articleLinksEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Enable only after real article index and detail pages replace the current placeholder redirects.',
          },
        },
        {
          name: 'articlesCtaEnabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'articlesCtaLabel',
          type: 'text',
          defaultValue: 'View all articles',
        },
        {
          name: 'articlesCtaUrl',
          type: 'text',
          defaultValue: '/articles',
        },
        {
          name: 'featuredArticle',
          type: 'relationship',
          relationTo: 'blog-posts',
          admin: {
            description:
              'Preferred featured article. Draft, archived, future, or unresolved records are ignored.',
          },
        },
        {
          name: 'selectedArticles',
          type: 'relationship',
          relationTo: 'blog-posts',
          hasMany: true,
          admin: {
            description:
              'Preferred compact articles. Latest published articles fill any remaining slots.',
          },
        },
        {
          name: 'feedbackTitle',
          type: 'text',
          defaultValue: 'Client Feedback',
        },
        {
          name: 'selectedTestimonials',
          type: 'relationship',
          relationTo: 'testimonials',
          hasMany: true,
          admin: {
            description:
              'Preferred testimonials. Only approved records with approvedAt are rendered.',
          },
        },
        {
          name: 'trustTitle',
          type: 'text',
          defaultValue: 'Trust Signals',
        },
        {
          name: 'footerLabel',
          type: 'text',
          defaultValue: 'Real projects. Real feedback. Real impact.',
        },
        {
          name: 'footerText',
          type: 'text',
          defaultValue: 'Built with passion. Delivered with precision.',
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
