'use client'

import Link from 'next/link'
import { useFormFields } from '@payloadcms/ui'
import {
  AdminReadiness,
  defineReadiness,
  evaluateReadiness,
  hasRows,
  hasText,
  hasValue,
  richTextWordCount,
} from '../editor-system'

type FieldState = { rows?: unknown[]; value?: unknown }
type ArticleDocument = Record<string, unknown>

export const articleReadiness = defineReadiness<ArticleDocument>({
  id: 'article',
  label: 'Article readiness',
  checks: [
    {
      id: 'identity',
      label: 'Identity',
      description: 'Title, slug, and excerpt',
      evaluate: (d) => hasText(d.title) && hasText(d.slug) && hasText(d.excerpt),
    },
    {
      id: 'body',
      label: 'Article body',
      description: 'At least 120 words',
      weight: 2,
      evaluate: (d) => richTextWordCount(d.content) >= 120,
    },
    {
      id: 'media',
      label: 'Media',
      description: 'Primary cover image',
      evaluate: (d) => hasValue(d.coverImage),
    },
    {
      id: 'taxonomy',
      label: 'Taxonomy',
      description: 'Category and at least one tag',
      evaluate: (d) => hasValue(d.category) && hasRows(d.tags),
    },
    {
      id: 'attribution',
      label: 'Attribution',
      description: 'Assigned article author',
      evaluate: (d) => hasValue(d.author),
    },
    {
      id: 'publication',
      label: 'Publication',
      description: 'Publication date configured',
      evaluate: (d) => hasValue(d.publishedAt),
    },
    {
      id: 'seo',
      label: 'SEO',
      description: 'Search title and description',
      evaluate: (d) => hasText(d.metaTitle) && hasText(d.metaDescription),
    },
  ],
})

export default function ArticleReadinessPanel() {
  const fields = useFormFields(([value]) => value)
  const field = (path: string) => fields[path] as FieldState | undefined
  const value = (path: string) => field(path)?.value
  const document = {
    title: value('title'),
    slug: value('slug'),
    excerpt: value('excerpt'),
    content: value('content'),
    coverImage: value('coverImage'),
    category: value('category'),
    tags: field('tags')?.rows,
    author: value('author'),
    publishedAt: value('publishedAt'),
    metaTitle: value('seo.metaTitle'),
    metaDescription: value('seo.metaDescription'),
  }
  const slug = hasText(document.slug) ? String(document.slug).trim() : ''
  const words = richTextWordCount(document.content)

  return (
    <AdminReadiness
      footer={
        slug ? (
          <Link href={`/articles/${encodeURIComponent(slug)}`} target="_blank">
            Preview article ↗
          </Link>
        ) : (
          <span>Add a slug to enable preview</span>
        )
      }
      label={articleReadiness.label}
      result={evaluateReadiness(articleReadiness, document)}
      summary={`${words} words · ${words ? Math.max(1, Math.ceil(words / 220)) : 0} min read`}
    />
  )
}
