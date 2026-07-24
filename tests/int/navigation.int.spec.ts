import { describe, expect, it } from 'vitest'

import type { Homepage, Navigation as NavigationGlobal } from '@/payload-types'
import { buildNavigationViewModel } from '@/lib/cms/navigation'

function asHomepage(value: Partial<Homepage>): Homepage {
  return value as Homepage
}

function asNavigation(value: Partial<NavigationGlobal>): NavigationGlobal {
  return value as NavigationGlobal
}

describe('navigation view model', () => {
  it('keeps configured order and removes links to disabled or duplicate sections', () => {
    const result = buildNavigationViewModel({
      homepage: asHomepage({
        currentMissionSection: {
          enabled: false,
        },
        deliveryPipelineSection: {
          enabled: true,
        },
        engineerProfileSection: {
          enabled: true,
        },
        insightsTrustSection: {
          enabled: false,
        },
        contactSection: {
          enabled: true,
        },
      }),
      navigation: asNavigation({
        landingLinks: [
          {
            enabled: true,
            id: 'mission',
            label: 'Mission',
            section: 'currentMission',
          },
          {
            enabled: true,
            id: 'work',
            label: 'Work',
            section: 'projects',
          },
          {
            enabled: true,
            id: 'work-duplicate',
            label: 'Selected work',
            section: 'projects',
          },
          {
            enabled: true,
            id: 'process',
            label: 'Process',
            section: 'delivery',
          },
          {
            enabled: true,
            id: 'insights',
            label: 'Insights',
            section: 'insights',
          },
        ],
        pagesMenu: {
          enabled: true,
          label: 'Explore',
          items: [
            {
              destination: 'projects',
              id: 'projects',
              label: 'All Projects',
              openInNewTab: false,
            },
            {
              destination: 'articles',
              id: 'articles',
              label: 'Articles',
              openInNewTab: false,
            },
          ],
        },
        cta: {
          destination: 'contact',
          enabled: true,
          label: 'Start a conversation',
        },
      }),
    })

    expect(result.landingItems).toEqual([
      {
        href: '/#projects',
        id: 'work',
        label: 'Work',
        sectionId: 'projects',
      },
      {
        href: '/#delivery',
        id: 'process',
        label: 'Process',
        sectionId: 'delivery',
      },
    ])
    expect(result.pagesMenu).toEqual({
      items: [
        {
          external: false,
          href: '/projects',
          id: 'projects',
          label: 'All Projects',
          match: 'prefix',
          newTab: false,
        },
        {
          external: false,
          href: '/articles',
          id: 'articles',
          label: 'Articles',
          match: 'prefix',
          newTab: false,
        },
      ],
      label: 'Explore',
    })
    expect(result.cta).toEqual({
      external: false,
      href: '/#contact',
      label: 'Start a conversation',
      newTab: false,
      sectionId: 'contact',
    })
  })

  it('drops unsafe custom links and hides the contact CTA with its section', () => {
    const result = buildNavigationViewModel({
      homepage: asHomepage({
        contactSection: {
          enabled: false,
        },
      }),
      navigation: asNavigation({
        landingLinks: [],
        pagesMenu: {
          enabled: true,
          label: 'Pages',
          items: [
            {
              destination: 'custom',
              href: 'javascript:alert(1)',
              id: 'unsafe',
              label: 'Unsafe',
              match: 'exact',
              openInNewTab: false,
            },
            {
              destination: 'custom',
              href: '/about',
              id: 'about',
              label: 'About page',
              match: 'prefix',
              openInNewTab: false,
            },
          ],
        },
        cta: {
          destination: 'contact',
          enabled: true,
          label: "Let's Talk",
        },
      }),
    })

    expect(result.landingItems).toEqual([])
    expect(result.pagesMenu?.items).toEqual([
      {
        external: false,
        href: '/about',
        id: 'about',
        label: 'About page',
        match: 'prefix',
        newTab: false,
      },
    ])
    expect(result.cta).toBeUndefined()
  })

  it('uses the production navigation defaults when the global has not been saved yet', () => {
    const result = buildNavigationViewModel({
      homepage: asHomepage({
        contactSection: {
          enabled: true,
        },
        deliveryPipelineSection: {
          enabled: true,
        },
        engineerProfileSection: {
          enabled: true,
        },
      }),
      navigation: asNavigation({}),
    })

    expect(result.landingItems.map((item) => item.label)).toEqual([
      'Work',
      'About',
      'Stack',
      'Process',
    ])
    expect(result.pagesMenu?.items.map((item) => item.href)).toEqual(['/projects', '/articles'])
    expect(result.cta?.href).toBe('/#contact')
  })
})
