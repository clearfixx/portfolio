export const previewNavSections = [
  {
    title: 'Mission Control',
    items: [
      { title: 'Mission Control', icon: '⌘', accent: 'teal', active: true },
      { title: 'Research Lab', icon: '⌁', accent: 'violet' },
      { title: 'AI Core', icon: '✦', accent: 'cyan' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { title: 'Community Hub', icon: '◌', accent: 'mint' },
      { title: 'Academy', icon: '▵', accent: 'blue' },
      { title: 'CMS Builder', icon: '▣', accent: 'neutral' },
      { title: 'Knowledge Base', icon: '◇', accent: 'violet' },
    ],
  },
  {
    title: 'Engineering',
    items: [
      { title: 'Design System', icon: '◈', accent: 'yellow' },
      { title: 'Integrations', icon: '↔', accent: 'cyan' },
      { title: 'Analytics', icon: '▰', accent: 'teal' },
    ],
  },
  {
    title: 'Account',
    items: [{ title: 'Settings', icon: '⚙', accent: 'neutral' }],
  },
] as const

export const conceptMetrics = [
  { label: 'Architecture', value: 'Mapped', detail: 'System boundaries' },
  { label: 'Modules', value: 'Defined', detail: 'Product structure' },
  { label: 'Delivery', value: 'Planned', detail: 'Release workflow' },
  { label: 'Interfaces', value: 'Ready', detail: 'Concept preview' },
] as const

export const productAreas = [
  {
    title: 'Architecture workspace',
    module: 'Mission Control',
    meta: 'Core flow',
    type: 'architecture',
    icon: '◇',
  },
  {
    title: 'Research knowledge layer',
    module: 'Research Lab',
    meta: 'Product area',
    type: 'research',
    icon: '⌁',
  },
  {
    title: 'Release workflow',
    module: 'Engineering',
    meta: 'Delivery',
    type: 'deployment',
    icon: '↗',
  },
  {
    title: 'AI orchestration',
    module: 'AI Core',
    meta: 'Integration',
    type: 'ai',
    icon: '✦',
  },
  {
    title: 'Community experience',
    module: 'Community Hub',
    meta: 'Product area',
    type: 'community',
    icon: '◌',
  },
  {
    title: 'Shared design language',
    module: 'Design System',
    meta: 'Foundation',
    type: 'design',
    icon: '◈',
  },
  {
    title: 'Content operations',
    module: 'CMS Builder',
    meta: 'Platform',
    type: 'cms',
    icon: '▣',
  },
] as const

export const architectureLayers = [
  { label: 'API', value: 'Defined' },
  { label: 'Database', value: 'Mapped' },
  { label: 'AI Core', value: 'Planned' },
  { label: 'Storage', value: 'Defined' },
] as const
