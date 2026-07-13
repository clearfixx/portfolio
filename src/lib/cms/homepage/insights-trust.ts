import type {
  BlogPost,
  Category,
  Homepage,
  Media,
  Profile,
  Project,
  Testimonial,
} from '@/payload-types'

import { calculateExperienceYears } from './hero'
import type {
  InsightsArticleIcon,
  InsightsArticleViewModel,
  InsightsFeedbackViewModel,
  InsightsTitleSegmentViewModel,
  InsightsTitleTone,
  InsightsTrustMetricIcon,
  InsightsTrustMetricViewModel,
  InsightsTrustViewModel,
} from './types'

const ARTICLE_LIMIT = 3
const TESTIMONIAL_LIMIT = 2
const WORDS_PER_MINUTE = 220

const DEFAULT_SECTION = {
  articlesCtaLabel: 'View all articles',
  articlesCtaUrl: '/articles',
  articlesTitle: 'Latest Articles',
  description:
    'Build notes, engineering thoughts and client feedback collected from real project work.',
  eyebrow: 'INSIGHTS & TRUST',
  featuredLabel: 'Featured',
  feedbackTitle: 'Client Feedback',
  footerLabel: 'Real projects. Real feedback. Real impact.',
  footerText: 'Built with passion. Delivered with precision.',
  title: 'Latest Articles & Client Feedback',
  titleAccent: 'Articles',
  titleMuted: 'Feedback',
  trustTitle: 'Trust Signals',
} as const

type RelationshipId = number | string

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function isPopulatedArticle(
  value: BlogPost | RelationshipId | null | undefined,
): value is BlogPost {
  return typeof value === 'object' && value !== null
}

function isPopulatedTestimonial(
  value: RelationshipId | Testimonial | null | undefined,
): value is Testimonial {
  return typeof value === 'object' && value !== null
}

function isPopulatedMedia(value: Media | RelationshipId | null | undefined): value is Media {
  return typeof value === 'object' && value !== null
}

function isPopulatedCategory(
  value: Category | RelationshipId | null | undefined,
): value is Category {
  return typeof value === 'object' && value !== null
}

function isPopulatedProject(value: Project | RelationshipId | null | undefined): value is Project {
  return typeof value === 'object' && value !== null
}

function parsePastOrPresentDate(value: string | null | undefined, now: Date): Date | undefined {
  const normalized = normalizeText(value)

  if (!normalized) {
    return undefined
  }

  const date = new Date(normalized)

  if (Number.isNaN(date.getTime()) || date > now) {
    return undefined
  }

  return date
}

function isPublishedArticle(article: BlogPost, now: Date): boolean {
  return (
    article.status === 'published' &&
    Boolean(normalizeText(article.slug)) &&
    Boolean(normalizeText(article.title)) &&
    Boolean(normalizeText(article.excerpt)) &&
    Boolean(parsePastOrPresentDate(article.publishedAt, now))
  )
}

function isApprovedTestimonial(testimonial: Testimonial, now: Date): boolean {
  return (
    testimonial.status === 'approved' &&
    Boolean(normalizeText(testimonial.name)) &&
    Boolean(normalizeText(testimonial.message)) &&
    Boolean(parsePastOrPresentDate(testimonial.approvedAt, now))
  )
}

function uniqueById<T extends { id: RelationshipId }>(values: T[]): T[] {
  const seen = new Set<string>()

  return values.filter((value) => {
    const id = String(value.id)

    if (seen.has(id)) {
      return false
    }

    seen.add(id)
    return true
  })
}

function countLexicalWords(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((total, child) => total + countLexicalWords(child), 0)
  }

  if (!value || typeof value !== 'object') {
    return 0
  }

  const node = value as Record<string, unknown>
  let words = 0

  if (typeof node.text === 'string') {
    words += node.text.trim().split(/\s+/).filter(Boolean).length
  }

  for (const [key, child] of Object.entries(node)) {
    if (key !== 'text') {
      words += countLexicalWords(child)
    }
  }

  return words
}

function getReadTime(article: BlogPost): string {
  const words = countLexicalWords(article.content)
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return `${minutes} min read`
}

function getArticleCategory(article: BlogPost): string {
  if (isPopulatedCategory(article.category)) {
    return cleanText(article.category.title, 'Engineering')
  }

  return 'Engineering'
}

function getArticleIcon(article: BlogPost): InsightsArticleIcon {
  return isPopulatedProject(article.relatedProject) ? 'cube' : 'terminal'
}

function getArticleImage(article: BlogPost): InsightsArticleViewModel['image'] {
  if (!isPopulatedMedia(article.coverImage)) {
    return undefined
  }

  const src = normalizeText(article.coverImage.url)

  if (!src) {
    return undefined
  }

  return {
    alt: normalizeText(article.coverImage.alt) ?? `${cleanText(article.title, 'Article')} cover`,
    src,
  }
}

function mapArticle({
  article,
  linksEnabled,
  now,
}: {
  article: BlogPost
  linksEnabled: boolean
  now: Date
}): InsightsArticleViewModel {
  const publishedAt = parsePastOrPresentDate(article.publishedAt, now) ?? now
  const slug = cleanText(article.slug, String(article.id))

  return {
    category: getArticleCategory(article),
    date: new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(publishedAt),
    excerpt: cleanText(article.excerpt, 'Article preview.'),
    href: linksEnabled ? `/articles/${encodeURIComponent(slug)}` : undefined,
    icon: getArticleIcon(article),
    id: String(article.id),
    image: getArticleImage(article),
    readTime: getReadTime(article),
    title: cleanText(article.title, 'Untitled article'),
  }
}

function getInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'CL'
  )
}

function getTestimonialRole(testimonial: Testimonial): string {
  const role = normalizeText(testimonial.role)
  const company = normalizeText(testimonial.company)

  if (role && company) {
    return `${role} · ${company}`
  }

  return role ?? company ?? 'Client'
}

function mapTestimonial(testimonial: Testimonial): InsightsFeedbackViewModel {
  const author = cleanText(testimonial.name, 'Client')
  const avatar = isPopulatedMedia(testimonial.avatar) ? testimonial.avatar : undefined
  const avatarSrc = normalizeText(avatar?.url)

  return {
    author,
    avatar: avatarSrc
      ? {
          alt: normalizeText(avatar?.alt) ?? `${author} avatar`,
          src: avatarSrc,
        }
      : undefined,
    id: String(testimonial.id),
    initials: getInitials(author),
    quote: cleanText(testimonial.message, 'Verified client feedback.'),
    role: getTestimonialRole(testimonial),
    verified: true,
  }
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function formatMetricValue(value: number, suffix: string | null | undefined): string {
  return `${new Intl.NumberFormat('en-US').format(value)}${normalizeText(suffix) ?? ''}`
}

function getMetricIcon(key: string): InsightsTrustMetricIcon {
  if (key.includes('commit')) {
    return 'commit'
  }

  if (key.includes('client') || key.includes('customer') || key.includes('user')) {
    return 'users'
  }

  if (key.includes('year') || key.includes('experience')) {
    return 'calendar'
  }

  return 'code'
}

function getTrustMetrics({
  now,
  profile,
  projectsCount,
}: {
  now: Date
  profile: Profile
  projectsCount: number
}): InsightsTrustMetricViewModel[] {
  const metrics: InsightsTrustMetricViewModel[] = [
    {
      icon: 'code',
      id: 'projects',
      label: 'Projects completed',
      value: `${Math.max(0, Math.floor(projectsCount))}+`,
    },
  ]

  const careerStartedAt = normalizeText(profile.careerStartedAt)

  if (careerStartedAt) {
    const start = new Date(careerStartedAt)

    if (!Number.isNaN(start.getTime()) && start <= now) {
      metrics.push({
        icon: 'calendar',
        id: 'experience',
        label: 'Years of experience',
        value: `${calculateExperienceYears(careerStartedAt, now)}+`,
      })
    }
  }

  for (const metric of profile.metrics ?? []) {
    if (metric.enabled === false || !Number.isFinite(metric.value) || metric.value < 0) {
      continue
    }

    const key = slugify(cleanText(metric.key, metric.label))

    if (!key || key === 'projects' || key === 'experience') {
      continue
    }

    metrics.push({
      icon: getMetricIcon(key),
      id: key,
      label: cleanText(metric.label, 'Metric'),
      value: formatMetricValue(metric.value, metric.suffix),
    })

    if (metrics.length === 4) {
      break
    }
  }

  return metrics
}

function buildTitleSegments(
  title: string,
  accent: string | undefined,
  muted: string | undefined,
): InsightsTitleSegmentViewModel[] {
  const markers: Array<{
    end: number
    start: number
    tone: Exclude<InsightsTitleTone, 'plain'>
  }> = []

  for (const [phrase, tone] of [
    [accent, 'accent'],
    [muted, 'muted'],
  ] as const) {
    if (!phrase) {
      continue
    }

    const start = title.indexOf(phrase)

    if (start >= 0) {
      markers.push({
        end: start + phrase.length,
        start,
        tone,
      })
    }
  }

  markers.sort((left, right) => left.start - right.start)

  const segments: InsightsTitleSegmentViewModel[] = []
  let cursor = 0

  for (const marker of markers) {
    if (marker.start < cursor) {
      continue
    }

    if (marker.start > cursor) {
      segments.push({
        text: title.slice(cursor, marker.start),
        tone: 'plain',
      })
    }

    segments.push({
      text: title.slice(marker.start, marker.end),
      tone: marker.tone,
    })
    cursor = marker.end
  }

  if (cursor < title.length) {
    segments.push({
      text: title.slice(cursor),
      tone: 'plain',
    })
  }

  return segments.length > 0
    ? segments
    : [
        {
          text: title,
          tone: 'plain',
        },
      ]
}

export function buildInsightsTrustViewModel({
  articles,
  homepage,
  now = new Date(),
  profile,
  projectsCount,
  testimonials,
}: {
  articles: BlogPost[]
  homepage: Homepage
  now?: Date
  profile: Profile
  projectsCount: number
  testimonials: Testimonial[]
}): InsightsTrustViewModel | null {
  const section = homepage.insightsTrustSection

  if (section?.enabled === false) {
    return null
  }

  const selectedFeatured = isPopulatedArticle(section?.featuredArticle)
    ? section.featuredArticle
    : undefined
  const selectedArticles = (section?.selectedArticles ?? []).filter(isPopulatedArticle)

  const articleCandidates = uniqueById([
    ...(selectedFeatured ? [selectedFeatured] : []),
    ...selectedArticles,
    ...articles,
  ]).filter((article) => isPublishedArticle(article, now))

  const featured =
    selectedFeatured && isPublishedArticle(selectedFeatured, now)
      ? selectedFeatured
      : articleCandidates[0]
  const compactArticles = articleCandidates
    .filter((article) => article.id !== featured?.id)
    .slice(0, ARTICLE_LIMIT - 1)
  const linksEnabled = section?.articleLinksEnabled === true
  const mappedFeatured = featured
    ? {
        ...mapArticle({
          article: featured,
          linksEnabled,
          now,
        }),
        label: cleanText(section?.featuredLabel, DEFAULT_SECTION.featuredLabel),
      }
    : undefined

  const selectedTestimonials = (section?.selectedTestimonials ?? []).filter(isPopulatedTestimonial)
  const testimonialCandidates = uniqueById([...selectedTestimonials, ...testimonials])
    .filter((testimonial) => isApprovedTestimonial(testimonial, now))
    .slice(0, TESTIMONIAL_LIMIT)

  const title = cleanText(section?.title, DEFAULT_SECTION.title)

  return {
    articles: {
      cta:
        section?.articlesCtaEnabled === true
          ? {
              href: cleanText(section.articlesCtaUrl, DEFAULT_SECTION.articlesCtaUrl),
              label: cleanText(section.articlesCtaLabel, DEFAULT_SECTION.articlesCtaLabel),
            }
          : undefined,
      featured: mappedFeatured,
      items: compactArticles.map((article) =>
        mapArticle({
          article,
          linksEnabled,
          now,
        }),
      ),
      title: cleanText(section?.articlesTitle, DEFAULT_SECTION.articlesTitle),
    },
    description: cleanText(section?.description, DEFAULT_SECTION.description),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_SECTION.eyebrow),
    feedback: {
      items: testimonialCandidates.map(mapTestimonial),
      title: cleanText(section?.feedbackTitle, DEFAULT_SECTION.feedbackTitle),
    },
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_SECTION.footerLabel),
      text: cleanText(section?.footerText, DEFAULT_SECTION.footerText),
    },
    metrics: {
      items: getTrustMetrics({
        now,
        profile,
        projectsCount,
      }),
      title: cleanText(section?.trustTitle, DEFAULT_SECTION.trustTitle),
    },
    title: buildTitleSegments(
      title,
      normalizeText(section?.titleAccent) ?? DEFAULT_SECTION.titleAccent,
      normalizeText(section?.titleMuted) ?? DEFAULT_SECTION.titleMuted,
    ),
  }
}
