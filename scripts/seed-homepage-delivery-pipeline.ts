import process from 'node:process'

import type { Homepage } from '../src/payload-types'

type DeliveryPipelineSection = NonNullable<Homepage['deliveryPipelineSection']>

const DEFAULT_SECTION: DeliveryPipelineSection = {
  description:
    'A clear build process for turning vague requirements into stable, maintainable products.',
  enabled: true,
  eyebrow: 'DELIVERY PIPELINE',
  footerLabel: 'Structured process',
  footerText: 'Clear scope. Clean build. Reliable launch.',
  metrics: [
    {
      key: 'predictable',
      title: 'Predictable delivery',
      description: 'Measured progress at every step.',
    },
    {
      key: 'milestones',
      title: 'Clear milestones',
      description: 'Defined outcomes and checkpoints.',
    },
    {
      key: 'maintainable',
      title: 'Maintainable result',
      description: 'Quality code, docs and long-term support.',
    },
  ],
  phases: [
    {
      key: 'discovery',
      title: 'Discovery',
      status: 'complete',
      items: [
        { label: 'Goals & alignment' },
        { label: 'Scope definition' },
        { label: 'Constraints & risks' },
      ],
    },
    {
      key: 'architecture',
      title: 'Architecture',
      status: 'complete',
      items: [{ label: 'System design' }, { label: 'Data model' }, { label: 'Tech stack' }],
    },
    {
      key: 'interface',
      title: 'Interface',
      status: 'progress',
      items: [{ label: 'UX flow' }, { label: 'Components' }, { label: 'Responsive UI' }],
    },
    {
      key: 'development',
      title: 'Development',
      status: 'progress',
      items: [
        { label: 'Frontend build' },
        { label: 'Backend services' },
        { label: 'Integrations' },
      ],
    },
    {
      key: 'launch',
      title: 'Launch',
      status: 'pending',
      items: [{ label: 'QA & testing' }, { label: 'Deployment' }, { label: 'Support & monitor' }],
    },
  ],
  title: 'From rough idea to production-ready system.',
  titleAccent: 'production-ready',
}

async function main() {
  process.loadEnvFile('.env')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing after loading .env')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })

  const homepage = (await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
  })) as Homepage
  const current = homepage.deliveryPipelineSection

  const deliveryPipelineSection: DeliveryPipelineSection = {
    ...DEFAULT_SECTION,
    ...current,
    metrics: current?.metrics?.length === 3 ? current.metrics : DEFAULT_SECTION.metrics,
    phases: current?.phases?.length === 5 ? current.phases : DEFAULT_SECTION.phases,
  }

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      deliveryPipelineSection,
    },
  })

  console.log(
    `Delivery Pipeline ready: ${deliveryPipelineSection.metrics?.length ?? 0} metrics and ${deliveryPipelineSection.phases?.length ?? 0} phases.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
