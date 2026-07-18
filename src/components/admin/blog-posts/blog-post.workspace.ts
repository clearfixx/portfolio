import { defineAdminWorkspace } from '../editor-system'
import { articleReadiness } from './ArticleReadinessPanel'

export const blogPostWorkspace = defineAdminWorkspace({
  id: 'blog-post',
  header: {
    eyebrow: 'Editorial',
    title: 'Article workspace',
    description: 'Manage article content, media, taxonomy, relationships, and publishing data.',
  },
  tabs: [
    { id: 'content', label: 'Content' },
    { id: 'media', label: 'Media' },
    { id: 'taxonomy', label: 'Taxonomy' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'seo', label: 'SEO' },
  ],
  readiness: articleReadiness,
})
