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
type ProjectReadinessDocument = Record<string, unknown>

export const projectReadiness = defineReadiness<ProjectReadinessDocument>({
  id: 'project',
  label: 'Project readiness',
  checks: [
    {
      id: 'identity',
      label: 'Identity',
      description: 'Title, slug, and summary',
      evaluate: (d) => hasText(d.title) && hasText(d.slug) && hasText(d.excerpt),
    },
    {
      id: 'case-study',
      label: 'Case study',
      description: 'Long-form story and highlights',
      weight: 2,
      evaluate: (d) => richTextWordCount(d.description) > 10 && hasRows(d.highlights),
    },
    {
      id: 'media',
      label: 'Media',
      description: 'Primary project cover',
      evaluate: (d) => hasValue(d.coverImage),
    },
    {
      id: 'classification',
      label: 'Classification',
      description: 'Category and technology stack',
      evaluate: (d) => hasValue(d.category) && hasValue(d.techStack),
    },
    {
      id: 'destinations',
      label: 'Destinations',
      description: 'Repository or project links',
      evaluate: (d) => hasText(d.githubURL) || hasRows(d.links),
    },
    {
      id: 'seo',
      label: 'SEO',
      description: 'Search title and description',
      evaluate: (d) => hasText(d.metaTitle) && hasText(d.metaDescription),
    },
  ],
})

export default function ProjectHealthPanel() {
  const fields = useFormFields(([value]) => value)
  const field = (path: string) => fields[path] as FieldState | undefined
  const value = (path: string) => field(path)?.value
  const document = {
    title: value('title'),
    slug: value('slug'),
    excerpt: value('excerpt'),
    description: value('description'),
    coverImage: value('coverImage'),
    category: value('category'),
    techStack: value('techStack'),
    highlights: field('highlights')?.rows,
    links: field('links')?.rows,
    githubURL: value('github.url'),
    metaTitle: value('seo.metaTitle'),
    metaDescription: value('seo.metaDescription'),
  }
  const slug = hasText(document.slug) ? String(document.slug).trim() : ''

  return (
    <AdminReadiness
      footer={
        slug ? (
          <Link href={`/projects/${encodeURIComponent(slug)}`} target="_blank">
            Preview project ↗
          </Link>
        ) : (
          <span>Add a slug to enable preview</span>
        )
      }
      label={projectReadiness.label}
      result={evaluateReadiness(projectReadiness, document)}
    />
  )
}
