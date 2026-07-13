import { describe, expect, it } from 'vitest'

import type { Homepage } from '@/payload-types'
import { buildDeliveryPipelineViewModel } from '@/lib/cms/homepage'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

describe('homepage delivery pipeline content', () => {
  it('normalizes phase order and derives presentation from stable keys', () => {
    const result = buildDeliveryPipelineViewModel(
      asHomepage({
        deliveryPipelineSection: {
          enabled: true,
          eyebrow: 'PROCESS',
          title: 'Idea to stable product.',
          titleAccent: 'stable',
          description: 'A reliable workflow.',
          footerLabel: 'Structured',
          footerText: 'Scope. Build. Launch.',
          metrics: [
            {
              key: 'maintainable',
              title: 'Maintainable result',
              description: 'Easy to evolve.',
            },
            {
              key: 'predictable',
              title: 'Predictable delivery',
              description: 'Measured progress.',
            },
            {
              key: 'predictable',
              title: 'Duplicate',
              description: 'Ignored.',
            },
          ],
          phases: [
            {
              key: 'launch',
              title: 'Launch',
              status: 'pending',
              items: [{ label: 'Deployment' }],
            },
            {
              key: 'interface',
              title: 'Interface',
              status: 'progress',
              items: [{ label: 'Components' }],
            },
            {
              key: 'discovery',
              title: 'Discovery',
              status: 'complete',
              items: [{ label: 'Scope' }, { label: 'Scope' }],
            },
            {
              key: 'development',
              title: 'Development',
              status: 'progress',
              items: [{ label: 'Build' }],
            },
            {
              key: 'architecture',
              title: 'Architecture',
              status: 'complete',
              items: [{ label: 'System design' }],
            },
          ],
        },
      }),
    )

    expect(result).toEqual({
      description: 'A reliable workflow.',
      eyebrow: 'PROCESS',
      footer: {
        label: 'Structured',
        text: 'Scope. Build. Launch.',
      },
      metrics: [
        {
          description: 'Easy to evolve.',
          icon: 'shield',
          id: 'maintainable',
          title: 'Maintainable result',
        },
        {
          description: 'Measured progress.',
          icon: 'progress',
          id: 'predictable',
          title: 'Predictable delivery',
        },
      ],
      phases: [
        {
          icon: 'search',
          id: 'discovery',
          items: ['Scope'],
          number: '01',
          status: 'complete',
          title: 'Discovery',
        },
        {
          icon: 'architecture',
          id: 'architecture',
          items: ['System design'],
          number: '02',
          status: 'complete',
          title: 'Architecture',
        },
        {
          icon: 'interface',
          id: 'interface',
          items: ['Components'],
          number: '03',
          status: 'progress',
          title: 'Interface',
        },
        {
          icon: 'code',
          id: 'development',
          items: ['Build'],
          number: '04',
          status: 'progress',
          title: 'Development',
        },
        {
          icon: 'rocket',
          id: 'launch',
          items: ['Deployment'],
          number: '05',
          status: 'pending',
          title: 'Launch',
        },
      ],
      title: {
        accent: 'stable',
        leading: 'Idea to ',
        trailing: ' product.',
      },
    })
  })

  it('returns null when the five-phase motion contract is incomplete', () => {
    const result = buildDeliveryPipelineViewModel(
      asHomepage({
        deliveryPipelineSection: {
          phases: [
            {
              key: 'discovery',
              title: 'Discovery',
              status: 'complete',
              items: [{ label: 'Scope' }],
            },
          ],
        },
      }),
    )

    expect(result).toBeNull()
  })

  it('returns null when the section is disabled', () => {
    const result = buildDeliveryPipelineViewModel(
      asHomepage({
        deliveryPipelineSection: {
          enabled: false,
        },
      }),
    )

    expect(result).toBeNull()
  })
})
