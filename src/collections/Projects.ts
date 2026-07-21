import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

import { seoField, slugField } from '@/fields'
import { adminRichTextField } from '@/fields/adminRichTextField'

export const Projects: CollectionConfig = {
  slug: 'projects',
  // portfolio-admin-projects-list-components-v2
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stage', 'progress', 'isFeatured', 'publishedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    components: {
      beforeList: ['./components/admin/projects/ProjectsListHeader'],
      edit: {
        beforeDocumentControls: ['./components/admin/projects/ProjectDocumentControls'],
      },
    },
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  // portfolio-admin-project-editor-operational-polish-v1
  fields: [
    // portfolio-admin-project-editor-tabs-v1
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          description: 'Core identity, positioning, classification, and technology.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                components: {
                  Cell: './components/admin/projects/ProjectCells#ProjectTitleCell',
                },
              },
            },
            slugField({ sourceField: 'title' }),
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Short project summary for cards, lists, and SEO previews.',
              },
            },
            {
              name: 'cardTagline',
              type: 'textarea',
              admin: {
                description:
                  'Short marketing line used in featured project previews. Keep it concise and outcome-focused.',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: false,
              admin: {
                description: 'Use categories with type "Project" or "Shared".',
              },
            },
            {
              name: 'techStack',
              type: 'relationship',
              relationTo: 'tech-stack',
              hasMany: true,
              admin: {
                description: 'Technologies used in this project.',
              },
            },
          ],
        },
        {
          label: 'Case Study',
          description: 'Long-form project story and measurable highlights.',
          fields: [
            adminRichTextField({
              label: 'Description',
              name: 'description',
              required: true,
            }),
            {
              name: 'caseStudyCode',
              type: 'group',
              label: 'Code preview',
              admin: {
                description:
                  'Code editor content shown in the public case study. Leave code empty to use the frontend fallback.',
              },
              fields: [
                {
                  name: 'filePath',
                  type: 'text',
                  admin: {
                    description: 'Displayed file path, for example apps/api/src/main.ts.',
                  },
                },
                {
                  name: 'language',
                  type: 'select',
                  defaultValue: 'typescript',
                  options: [
                    { label: 'TypeScript', value: 'typescript' },
                    { label: 'JavaScript', value: 'javascript' },
                    { label: 'TSX', value: 'tsx' },
                    { label: 'JSX', value: 'jsx' },
                    { label: 'JSON', value: 'json' },
                    { label: 'SCSS', value: 'scss' },
                    { label: 'Shell', value: 'shell' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'code',
                  type: 'textarea',
                  admin: {
                    rows: 16,
                    description: 'Plain code text. Line breaks are preserved on the public page.',
                  },
                },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'modules',
                  options: [
                    { label: 'Community', value: 'community' },
                    { label: 'Research', value: 'research' },
                    { label: 'AI', value: 'ai' },
                    { label: 'Media', value: 'media' },
                    { label: 'Security', value: 'security' },
                    { label: 'Modules', value: 'modules' },
                  ],
                  admin: {
                    description: 'Semantic icon used by the public case study.',
                  },
                },
              ],
            },
            {
              name: 'caseStudyMetrics',
              type: 'array',
              labels: {
                singular: 'Case study metric',
                plural: 'Case study metrics',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'detail',
                  type: 'text',
                },
              ],
            },
            {
              name: 'architecture',
              type: 'array',
              labels: {
                singular: 'Architecture group',
                plural: 'Architecture',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'services',
                  options: [
                    { label: 'Frontend', value: 'frontend' },
                    { label: 'API Gateway', value: 'api' },
                    { label: 'Services', value: 'services' },
                    { label: 'Database', value: 'database' },
                  ],
                  admin: {
                    description: 'Architecture node icon used on the public case study.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'items',
                  type: 'array',
                  required: true,
                  minRows: 1,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'roadmap',
              type: 'array',
              labels: {
                singular: 'Roadmap milestone',
                plural: 'Roadmap',
              },
              fields: [
                {
                  name: 'version',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  defaultValue: 'planned',
                  options: [
                    {
                      label: 'Completed',
                      value: 'completed',
                    },
                    {
                      label: 'Current',
                      value: 'current',
                    },
                    {
                      label: 'Planned',
                      value: 'planned',
                    },
                  ],
                },
                {
                  name: 'timeframe',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          description: 'Primary visuals and the project gallery.',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Primary image for project cards and list pages.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Large visual for featured homepage/project sections.',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
                {
                  name: 'alt',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'sortOrder',
                  type: 'number',
                  defaultValue: 0,
                },
                {
                  name: 'isFeatured',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'deviceFrame',
                  type: 'select',
                  required: true,
                  defaultValue: 'none',
                  options: [
                    {
                      label: 'None',
                      value: 'none',
                    },
                    {
                      label: 'Desktop',
                      value: 'desktop',
                    },
                    {
                      label: 'Laptop',
                      value: 'laptop',
                    },
                    {
                      label: 'Tablet',
                      value: 'tablet',
                    },
                    {
                      label: 'Mobile',
                      value: 'mobile',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Links & Repository',
          description: 'Repository metadata and public project destinations.',
          fields: [
            {
              name: 'github',
              type: 'group',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    description: 'Public GitHub repository URL.',
                  },
                },
                {
                  name: 'owner',
                  type: 'text',
                  admin: {
                    description: 'GitHub owner or organization name.',
                  },
                },
                {
                  name: 'repo',
                  type: 'text',
                  admin: {
                    description: 'GitHub repository name.',
                  },
                },
                {
                  name: 'showStats',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Allow frontend to fetch and show live GitHub stats.',
                  },
                },
              ],
            },
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    description: 'If empty, frontend should show disabled CTA with "Невдовзі".',
                  },
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'other',
                  options: [
                    {
                      label: 'GitHub',
                      value: 'github',
                    },
                    {
                      label: 'Live',
                      value: 'live',
                    },
                    {
                      label: 'Documentation',
                      value: 'documentation',
                    },
                    {
                      label: 'Case Study',
                      value: 'case-study',
                    },
                    {
                      label: 'Figma',
                      value: 'figma',
                    },
                    {
                      label: 'Other',
                      value: 'other',
                    },
                  ],
                },
                {
                  name: 'isEnabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          description: 'Editorial content associated with this project.',
          fields: [
            {
              name: 'relatedBlogPosts',
              type: 'relationship',
              relationTo: 'blog-posts',
              hasMany: true,
              admin: {
                description: 'Articles related to this project.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Search and social-sharing metadata.',
          fields: [seoField()],
        },
      ],
    },
    {
      name: 'projectHealth',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/projects/ProjectHealthPanel',
        },
      },
    },
    {
      name: 'stage',
      type: 'select',
      required: true,
      defaultValue: 'development',
      options: [
        {
          label: 'Idea',
          value: 'idea',
        },
        {
          label: 'Planning',
          value: 'planning',
        },
        {
          label: 'Development',
          value: 'development',
        },
        {
          label: 'Testing',
          value: 'testing',
        },
        {
          label: 'Released',
          value: 'released',
        },
        {
          label: 'Maintenance',
          value: 'maintenance',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Cell: './components/admin/projects/ProjectCells#ProjectStageCell',
        },
      },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Project completion percentage from 0 to 100.',
        components: {
          Cell: './components/admin/projects/ProjectCells#ProjectProgressCell',
          Field: './components/admin/projects/ProjectProgressField',
        },
      },
    },
    {
      name: 'currentVersion',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Current public or internal version, e.g. 1.0.0.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this project in featured sections.',
        components: {
          Cell: './components/admin/projects/ProjectCells#ProjectFeaturedCell',
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Cell: './components/admin/projects/ProjectCells#ProjectPublishedCell',
        },
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'releasedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
