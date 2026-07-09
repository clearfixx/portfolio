export type DeliveryPhaseStatus = 'complete' | 'progress' | 'pending'

export type DeliveryPhase = {
  id: string
  number: string
  title: string
  icon: 'search' | 'architecture' | 'interface' | 'code' | 'rocket'
  items: string[]
  status: DeliveryPhaseStatus
}

export type PipelineMetric = {
  id: string
  title: string
  description: string
  icon: 'progress' | 'flag' | 'shield'
}

export const pipelineMetrics: PipelineMetric[] = [
  {
    id: 'predictable-delivery',
    title: 'Predictable delivery',
    description: 'Measured progress at every step.',
    icon: 'progress',
  },
  {
    id: 'clear-milestones',
    title: 'Clear milestones',
    description: 'Defined outcomes and checkpoints.',
    icon: 'flag',
  },
  {
    id: 'maintainable-result',
    title: 'Maintainable result',
    description: 'Quality code, docs and long-term support.',
    icon: 'shield',
  },
]

export const deliveryPhases: DeliveryPhase[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    icon: 'search',
    items: ['Goals & alignment', 'Scope definition', 'Constraints & risks'],
    status: 'complete',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Architecture',
    icon: 'architecture',
    items: ['System design', 'Data model', 'Tech stack'],
    status: 'complete',
  },
  {
    id: 'interface',
    number: '03',
    title: 'Interface',
    icon: 'interface',
    items: ['UX flow', 'Components', 'Responsive UI'],
    status: 'progress',
  },
  {
    id: 'development',
    number: '04',
    title: 'Development',
    icon: 'code',
    items: ['Frontend build', 'Backend services', 'Integrations'],
    status: 'progress',
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    icon: 'rocket',
    items: ['QA & testing', 'Deployment', 'Support & monitor'],
    status: 'pending',
  },
]
