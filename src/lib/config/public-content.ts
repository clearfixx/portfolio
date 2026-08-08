/**
 * Public frontend runtime configuration.
 *
 * Keep technical/query/presentation limits here. Editorial content and values
 * that authors should control belong in Payload globals/collections instead.
 */
export const PUBLIC_CONTENT = {
  blog: {
    indexQueryLimit: 250,
    relatedPostsLimit: 3,
  },
  homepage: {
    articleLimit: 6,
    featuredProjectLimit: 3,
    featuredTechStackLimit: 8,
    testimonialLimit: 6,
  },
  projects: {
    indexQueryLimit: 48,
  },
} as const

export const FALLBACK_SITE_URL = 'http://localhost:3000'

export type SiteLanguage = 'en' | 'uk'

export function normalizeSiteLanguage(value: string | null | undefined): SiteLanguage {
  return value === 'uk' ? 'uk' : 'en'
}

export function siteLanguageToIntlLocale(value: string | null | undefined): 'en-US' | 'uk-UA' {
  return normalizeSiteLanguage(value) === 'uk' ? 'uk-UA' : 'en-US'
}
