import { describe, expect, it } from 'vitest'

import type { Homepage, TechStack } from '@/payload-types'
import { buildSkillsSectionViewModel } from '@/lib/cms/homepage'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asTechnology(value: Partial<TechStack>): TechStack {
  return value as TechStack
}

describe('homepage skills content', () => {
  it('maps card content, derives presentation, and filters invalid technologies', () => {
    const next = asTechnology({
      id: 1,
      name: 'Next.js',
      slug: 'nextjs',
      visible: true,
    })
    const hidden = asTechnology({
      id: 2,
      name: 'Hidden',
      slug: 'hidden',
      visible: false,
    })

    const result = buildSkillsSectionViewModel(
      asHomepage({
        skillsSection: {
          eyebrow: 'STACK',
          title: 'Engineering Toolkit',
          description: 'Selected skills.',
          footerLabel: 'Tools matter.',
          footerText: 'Judgement matters more.',
          cards: [
            {
              key: 'frontend',
              title: 'Frontend',
              badge: 'Primary',
              description: 'Accessible interfaces.',
              technologies: [next, hidden, 99, next],
              pillsTitle: 'UI systems',
              pills: [{ label: 'Accessibility' }, { label: '' }],
              details: [
                {
                  label: 'Experience',
                  value: '6+',
                  caption: 'years',
                },
                {
                  label: 'Focus',
                  items: [{ label: 'Performance' }, { label: '' }],
                },
              ],
            },
          ],
        },
      }),
      [next, hidden],
    )

    expect(result).toEqual({
      cards: [
        {
          area: 'frontend',
          badge: 'Primary',
          description: 'Accessible interfaces.',
          details: [
            {
              caption: 'years',
              items: undefined,
              label: 'Experience',
              value: '6+',
            },
            {
              caption: undefined,
              items: ['Performance'],
              label: 'Focus',
              value: undefined,
            },
          ],
          focusItems: undefined,
          focusLine: undefined,
          icon: 'browser',
          id: 'frontend',
          number: '01',
          pills: ['Accessibility'],
          pillsTitle: 'UI systems',
          principles: undefined,
          technologies: [{ id: 'nextjs', name: 'Next.js' }],
          title: 'Frontend',
          tone: 'cyan',
          workflow: undefined,
          workflowTitle: undefined,
        },
      ],
      description: 'Selected skills.',
      eyebrow: 'STACK',
      footer: {
        label: 'Tools matter.',
        text: 'Judgement matters more.',
      },
      title: 'Engineering Toolkit',
    })
  })

  it('uses visible TechStack records as the default group when card relationships are empty', () => {
    const next = asTechnology({
      id: 1,
      name: 'Next.js',
      slug: 'nextjs',
      visible: true,
    })
    const react = asTechnology({
      id: 2,
      name: 'React',
      slug: 'react',
      visible: true,
    })
    const unrelated = asTechnology({
      id: 3,
      name: 'Redis',
      slug: 'redis',
      visible: true,
    })

    const result = buildSkillsSectionViewModel(
      asHomepage({
        skillsSection: {
          cards: [
            {
              key: 'frontend',
              title: 'Frontend',
              description: 'Interfaces.',
              technologies: [],
            },
          ],
        },
      }),
      [unrelated, react, next],
    )

    expect(result.cards[0]?.technologies).toEqual([
      { id: 'nextjs', name: 'Next.js' },
      { id: 'react', name: 'React' },
    ])
  })

  it('removes duplicate and malformed cards while preserving a truthful empty section', () => {
    const result = buildSkillsSectionViewModel(
      asHomepage({
        skillsSection: {
          cards: [
            {
              key: 'backend',
              title: '',
              description: 'Missing title.',
            },
            {
              key: 'backend',
              title: 'Backend',
              description: 'Duplicate key.',
            },
            {
              key: 'invalid' as 'backend',
              title: 'Invalid',
              description: 'Invalid key.',
            },
          ],
        },
      }),
      [],
    )

    expect(result.cards).toEqual([])
    expect(result.title).toBe('My Engineering Toolkit')
  })
})
