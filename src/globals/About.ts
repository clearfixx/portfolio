import type { Field, GlobalConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

// about-cms-foundation-v1

export const ABOUT_DEFAULT_CONTENT = {
  hero: {
    enabled: true,
    eyebrow: 'Engineering Profile',
    title: 'Engineering systems, interfaces, and ideas',
    titleAccent: 'that are built to last.',
    description:
      'I design and build complex digital products with a focus on architecture, performance, maintainability, and interfaces that communicate clearly.',
    actions: [
      {
        label: 'View experience',
        href: '#career',
        icon: 'arrow' as const,
        tone: 'primary' as const,
      },
      {
        label: 'Explore projects',
        href: '/projects',
        icon: 'code' as const,
        tone: 'secondary' as const,
      },
      {
        label: 'Start a conversation',
        href: '/#contact',
        icon: 'signal' as const,
        tone: 'secondary' as const,
      },
    ],
    signals: [
      {
        source: 'experience-years' as const,
        label: 'Years building',
      },
      {
        source: 'manual' as const,
        value: 'Full-stack',
        label: 'Product systems',
      },
      {
        source: 'manual' as const,
        value: 'Architecture',
        label: 'Primary focus',
      },
    ],
  },
  career: {
    enabled: true,
    eyebrow: '01 / Career timeline',
    title: 'A path shaped by larger systems',
    description:
      'The role changed over time. The direction stayed consistent: understand more of the product and take responsibility for the whole result.',
    items: [
      {
        period: '2012 — 2014',
        role: 'Frontend Developer',
        description:
          'Started with interfaces, browser behaviour, responsive systems, and the discipline of turning visual ideas into reliable products.',
        stack: [{ label: 'HTML' }, { label: 'CSS' }, { label: 'JavaScript' }],
      },
      {
        period: '2014 — 2017',
        role: 'Full-stack Developer',
        description:
          'Moved into complete product flows: data, server logic, integrations, deployment, and long-term maintenance.',
        stack: [{ label: 'PHP' }, { label: 'Laravel' }, { label: 'JavaScript' }],
      },
      {
        period: '2017 — 2020',
        role: 'Lead Developer',
        description:
          'Designed larger systems, guided implementation decisions, and translated business requirements into engineering plans.',
        stack: [{ label: 'Node.js' }, { label: 'React' }, { label: 'PostgreSQL' }],
      },
      {
        period: '2020 — 2023',
        role: 'Engineering Lead',
        description:
          'Focused on scalable architecture, delivery processes, technical direction, and systems that remain understandable as they grow.',
        stack: [{ label: 'TypeScript' }, { label: 'NestJS' }, { label: 'Docker' }],
      },
      {
        period: '2023 — Now',
        role: 'Independent Engineer',
        description:
          'Building ambitious digital products, refining developer experience, and combining architecture with expressive interface design.',
        stack: [{ label: 'Next.js' }, { label: 'Payload CMS' }, { label: 'AI' }],
      },
    ],
  },
  principles: {
    enabled: true,
    eyebrow: '02 / How I think',
    title: 'Engineering principles',
    description: 'The practical rules behind architecture and product decisions.',
    items: [
      {
        icon: 'architecture' as const,
        title: 'Architecture before complexity',
        description: 'Structure should remove uncertainty, not merely move it between files.',
      },
      {
        icon: 'product' as const,
        title: 'Product thinking',
        description: 'Features matter only when they solve a real problem and remain usable.',
      },
      {
        icon: 'layers' as const,
        title: 'Interfaces must communicate',
        description:
          'A good interface explains state, hierarchy, consequence, and the next action.',
      },
      {
        icon: 'performance' as const,
        title: 'Performance is a feature',
        description: 'Speed, stability, and accessibility are part of the product experience.',
      },
      {
        icon: 'system' as const,
        title: 'Maintainability over shortcuts',
        description: 'The codebase should help the next decision instead of punishing it.',
      },
      {
        icon: 'automation' as const,
        title: 'Automation where it matters',
        description: 'Repetitive work belongs to tools, pipelines, and predictable workflows.',
      },
    ],
  },
  operatingSystem: {
    enabled: true,
    eyebrow: '03 / Operating system',
    title: 'How I build',
    description: 'A repeatable path from an unclear problem to a product that can evolve.',
    steps: [
      { code: '01', label: 'Discovery', output: 'Problem map' },
      { code: '02', label: 'System design', output: 'Architecture' },
      { code: '03', label: 'Prototype', output: 'Interaction model' },
      { code: '04', label: 'Implementation', output: 'Working system' },
      { code: '05', label: 'Validation', output: 'Verified behaviour' },
      { code: '06', label: 'Delivery', output: 'Production release' },
      { code: '07', label: 'Evolution', output: 'Measured iteration' },
    ],
    currentStage: {
      label: 'Current stage',
      title: 'System design',
      description:
        'Define boundaries, data ownership, failure modes, interfaces, and the smallest architecture that supports the next meaningful version.',
      items: [
        { label: 'Architecture map' },
        { label: 'Data and API contracts' },
        { label: 'Delivery sequence' },
        { label: 'Verification strategy' },
      ],
    },
    guardrails: {
      eyebrow: 'System controls',
      title: 'Engineering guardrails',
      status: 'Active',
      items: [
        { label: 'Scalability', value: 'By design' },
        { label: 'Failure handling', value: 'Defined early' },
        { label: 'Accessibility', value: 'Built in' },
        { label: 'Observability', value: 'Measurable' },
      ],
    },
    outputs: {
      eyebrow: 'Delivery package',
      title: 'Concrete outputs',
      status: '4 artifacts',
      items: [
        {
          title: 'Architecture map',
          description: 'Boundaries and ownership',
        },
        {
          title: 'Technical contracts',
          description: 'Data and API behaviour',
        },
        {
          title: 'Implementation plan',
          description: 'Ordered delivery slices',
        },
        {
          title: 'Verification checklist',
          description: 'Quality and release gates',
        },
      ],
    },
    telemetry: [
      {
        label: 'System state',
        value: 'Structured',
        tone: 'cyan' as const,
      },
      {
        label: 'Decision trace',
        value: 'Documented',
        tone: 'purple' as const,
      },
      {
        label: 'Delivery mode',
        value: 'Incremental',
        tone: 'cyan' as const,
      },
    ],
  },
  experience: {
    enabled: true,
    eyebrow: '04 / Experience matrix',
    title: 'Responsibility, not percentages',
    description:
      'A compact view of where I lead, where I work deeply, and where I support the system.',
    items: [
      {
        area: 'Product architecture',
        level: 'lead' as const,
        score: 6,
        example: 'DSS Universe',
      },
      {
        area: 'Frontend systems',
        level: 'advanced' as const,
        score: 5,
        example: 'Portfolio Platform',
      },
      {
        area: 'Backend APIs',
        level: 'advanced' as const,
        score: 5,
        example: 'NestJS Modules',
      },
      {
        area: 'UI / UX engineering',
        level: 'advanced' as const,
        score: 5,
        example: 'Admin Experience',
      },
      {
        area: 'Infrastructure',
        level: 'working' as const,
        score: 4,
        example: 'Docker / Redis',
      },
      {
        area: 'Technical direction',
        level: 'lead' as const,
        score: 6,
        example: 'Architecture Planning',
      },
    ],
    summary: [
      {
        label: 'Primary responsibility',
        title: 'System architecture',
        description: 'Define boundaries, ownership, contracts, and the technical path forward.',
      },
      {
        label: 'Preferred project stage',
        title: 'Product foundation',
        description: 'Turn an ambitious idea into a structure the team can build and evolve.',
      },
      {
        label: 'Working mode',
        title: 'End-to-end ownership',
        description: 'Connect product thinking, implementation, verification, and delivery.',
      },
    ],
  },
  currentFocus: {
    enabled: true,
    eyebrow: '05 / Current focus',
    title: 'What is active now',
    description: 'Products, research, and technical directions currently receiving attention.',
    primaryLabel: 'Now building',
    primaryLinkLabel: 'View project',
    cards: [
      {
        eyebrow: 'Current research',
        status: 'Active',
        tone: 'cyan' as const,
        icon: 'automation' as const,
        title: 'AI-assisted development',
        description:
          'Using AI to extend engineering judgement, accelerate repetitive work, and preserve ownership of the final technical decision.',
        tags: [{ label: 'AI workflows' }, { label: 'Tooling' }, { label: 'Verification' }],
        footerLabel: 'Research direction',
        footerValue: 'Augmented engineering',
      },
      {
        eyebrow: 'Next exploration',
        status: 'Queued',
        tone: 'purple' as const,
        icon: 'code' as const,
        title: 'Language and browser systems',
        description:
          'Typed language design, simulation engines, and ambitious browser experiences that move beyond traditional interface patterns.',
        tags: [{ label: 'Language design' }, { label: 'Simulation' }, { label: 'Web runtime' }],
        footerLabel: 'Exploration mode',
        footerValue: 'Prototype driven',
      },
    ],
  },
  personalSignals: {
    enabled: true,
    eyebrow: '06 / Beyond the code',
    title: 'Personal signals',
    description: 'The things that shape the work without appearing in the repository.',
    items: [
      {
        title: 'Tech enthusiast',
        description: 'Always exploring new technologies, tools, and product ideas.',
      },
      {
        title: 'Problem solver',
        description: 'I enjoy turning unclear constraints into understandable systems.',
      },
      {
        title: 'Lifelong learner',
        description: 'Reading, experiments, documentation, and constant practice.',
      },
      {
        title: 'Nature lover',
        description: 'Distance, movement, and quiet places help reset perspective.',
      },
      {
        title: 'Minimalist',
        description: 'Clarity in interfaces, architecture, tools, and daily decisions.',
      },
      {
        title: 'Coffee & focus',
        description: 'Deep work usually starts with a good cup of coffee.',
      },
    ],
  },
  cta: {
    enabled: true,
    eyebrow: 'Open channel / New project',
    title: 'Have a complex idea?',
    titleAccent: "Let's turn it into a working system.",
    description:
      'I am open to selected products, architecture work, technical direction, and meaningful collaborations.',
    label: 'Start a conversation',
    href: '/#contact',
  },
  seo: {
    metaTitle: 'Engineering Profile',
    metaDescription:
      'A deeper view into my engineering journey, product mindset, architecture principles, technical focus, and the systems I build.',
    canonical: '/about',
  },
}

const PROFILE_ICON_OPTIONS = [
  { label: 'Arrow', value: 'arrow' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Automation', value: 'automation' },
  { label: 'Code', value: 'code' },
  { label: 'Compass', value: 'compass' },
  { label: 'Layers', value: 'layers' },
  { label: 'Performance', value: 'performance' },
  { label: 'Product', value: 'product' },
  { label: 'Signal', value: 'signal' },
  { label: 'System', value: 'system' },
]

function sectionHeadingFields(defaults: {
  description: string
  eyebrow: string
  title: string
}): Field[] {
  return [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: defaults.eyebrow,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: defaults.title,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: defaults.description,
    },
  ]
}

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: {
    read: publicAccess,
    update: authenticatedAccess,
  },
  admin: {
    group: 'Content',
    description: 'Editorial content and composition for the public Engineering Profile page.',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.enabled,
        },
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.title,
        },
        {
          name: 'titleAccent',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.titleAccent,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.description,
        },
        {
          name: 'actions',
          type: 'array',
          maxRows: 3,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.actions,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: PROFILE_ICON_OPTIONS,
            },
            {
              name: 'tone',
              type: 'select',
              required: true,
              defaultValue: 'secondary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
              ],
            },
          ],
        },
        {
          name: 'signals',
          type: 'array',
          maxRows: 3,
          defaultValue: ABOUT_DEFAULT_CONTENT.hero.signals,
          fields: [
            {
              name: 'source',
              type: 'select',
              required: true,
              defaultValue: 'manual',
              options: [
                { label: 'Manual value', value: 'manual' },
                { label: 'Derived experience years', value: 'experience-years' },
                { label: 'Published projects', value: 'published-projects' },
              ],
            },
            {
              name: 'value',
              type: 'text',
              admin: {
                description: 'Used for Manual value. Derived sources ignore this field.',
              },
            },
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
      name: 'career',
      type: 'group',
      label: 'Career Timeline',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.career),
        {
          name: 'items',
          type: 'array',
          maxRows: 8,
          defaultValue: ABOUT_DEFAULT_CONTENT.career.items,
          fields: [
            {
              name: 'period',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'stack',
              type: 'array',
              maxRows: 6,
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
      name: 'principles',
      type: 'group',
      label: 'Engineering Principles',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.principles),
        {
          name: 'items',
          type: 'array',
          maxRows: 6,
          defaultValue: ABOUT_DEFAULT_CONTENT.principles.items,
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: PROFILE_ICON_OPTIONS,
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
      ],
    },
    {
      name: 'operatingSystem',
      type: 'group',
      label: 'Engineering Operating System',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.operatingSystem),
        {
          name: 'steps',
          type: 'array',
          maxRows: 9,
          defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.steps,
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'output',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'currentStage',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage.label,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage.title,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage.description,
            },
            {
              name: 'items',
              type: 'array',
              maxRows: 6,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage.items,
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
          name: 'guardrails',
          type: 'group',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails.eyebrow,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails.title,
            },
            {
              name: 'status',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails.status,
            },
            {
              name: 'items',
              type: 'array',
              maxRows: 6,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails.items,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'outputs',
          type: 'group',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.outputs.eyebrow,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.outputs.title,
            },
            {
              name: 'status',
              type: 'text',
              required: true,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.outputs.status,
            },
            {
              name: 'items',
              type: 'array',
              maxRows: 6,
              defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.outputs.items,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'telemetry',
          type: 'array',
          maxRows: 4,
          defaultValue: ABOUT_DEFAULT_CONTENT.operatingSystem.telemetry,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'tone',
              type: 'select',
              required: true,
              defaultValue: 'cyan',
              options: [
                { label: 'Cyan', value: 'cyan' },
                { label: 'Purple', value: 'purple' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'experience',
      type: 'group',
      label: 'Experience Matrix',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.experience),
        {
          name: 'items',
          type: 'array',
          maxRows: 10,
          defaultValue: ABOUT_DEFAULT_CONTENT.experience.items,
          fields: [
            {
              name: 'area',
              type: 'text',
              required: true,
            },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Lead', value: 'lead' },
                { label: 'Advanced', value: 'advanced' },
                { label: 'Working experience', value: 'working' },
              ],
            },
            {
              name: 'score',
              type: 'number',
              required: true,
              min: 1,
              max: 6,
            },
            {
              name: 'example',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'summary',
          type: 'array',
          maxRows: 3,
          defaultValue: ABOUT_DEFAULT_CONTENT.experience.summary,
          fields: [
            {
              name: 'label',
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
      ],
    },
    {
      name: 'currentFocus',
      type: 'group',
      label: 'Current Focus',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.currentFocus),
        {
          name: 'primaryLabel',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.currentFocus.primaryLabel,
        },
        {
          name: 'primaryProject',
          type: 'relationship',
          relationTo: 'projects',
          admin: {
            description:
              'Primary project shown in the Current Focus panel. The public page uses its title, excerpt, and slug.',
          },
        },
        {
          name: 'primaryLinkLabel',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.currentFocus.primaryLinkLabel,
        },
        {
          name: 'cards',
          type: 'array',
          maxRows: 2,
          defaultValue: ABOUT_DEFAULT_CONTENT.currentFocus.cards,
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              required: true,
            },
            {
              name: 'status',
              type: 'text',
              required: true,
            },
            {
              name: 'tone',
              type: 'select',
              required: true,
              defaultValue: 'cyan',
              options: [
                { label: 'Cyan', value: 'cyan' },
                { label: 'Purple', value: 'purple' },
              ],
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: PROFILE_ICON_OPTIONS,
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
              name: 'tags',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'footerLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'footerValue',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'personalSignals',
      type: 'group',
      label: 'Personal Signals',
      fields: [
        ...sectionHeadingFields(ABOUT_DEFAULT_CONTENT.personalSignals),
        {
          name: 'items',
          type: 'array',
          maxRows: 8,
          defaultValue: ABOUT_DEFAULT_CONTENT.personalSignals.items,
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
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Final CTA',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.enabled,
        },
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.eyebrow,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.title,
        },
        {
          name: 'titleAccent',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.titleAccent,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.description,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.label,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.cta.href,
        },
      ],
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
          defaultValue: ABOUT_DEFAULT_CONTENT.seo.metaTitle,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.seo.metaDescription,
        },
        {
          name: 'canonical',
          type: 'text',
          required: true,
          defaultValue: ABOUT_DEFAULT_CONTENT.seo.canonical,
        },
      ],
    },
  ],
}

// about-cms-foundation-repair-v1-1
