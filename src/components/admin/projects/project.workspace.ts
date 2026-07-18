import { defineAdminWorkspace } from '../editor-system'
import { projectReadiness } from './ProjectHealthPanel'

export const projectWorkspace = defineAdminWorkspace({
  id: 'project',
  header: {
    eyebrow: 'Portfolio project',
    title: 'Project workspace',
    description: 'Manage presentation, case study, delivery, and publishing data.',
  },
  tabs: [
    { id: 'overview', label: 'Overview' },
    { id: 'case-study', label: 'Case Study' },
    { id: 'media', label: 'Media' },
    { id: 'links', label: 'Links & Repository' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'seo', label: 'SEO' },
  ],
  readiness: projectReadiness,
})
