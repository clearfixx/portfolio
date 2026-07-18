import type { CollectionConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'

export const ProjectVersions: CollectionConfig = {
  slug: 'project-versions',
  admin: {
    useAsTitle: 'version',
    defaultColumns: [
      'version',
      'project',
      'releaseDate',
      'isCurrent',
      'isStable',
      'breakingChanges',
    ],
    listSearchableFields: ['version', 'title', 'summary'],
    components: {
      beforeList: ['./components/admin/project-versions/ProjectVersionsListHeader'],
    },
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'releaseWorkspace',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/project-versions/ProjectVersionEditor#ReleaseWorkspace',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Release',
          fields: [
            {
              name: 'project',
              type: 'relationship',
              relationTo: 'projects',
              required: true,
              hasMany: false,
              admin: {
                components: {
                  Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionProjectCell',
                },
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'version',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '34%',
                    description: 'Version number or label, e.g. 1.0.0, Phase 2.2, MVP.',
                    components: {
                      Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionIdentityCell',
                    },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '66%',
                  },
                },
              ],
            },
            {
              name: 'releaseDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
                description: 'Public or internal release date for this version.',
                components: {
                  Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionDateCell',
                },
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Concise explanation used in version history and previews.',
              },
            },
          ],
        },
        {
          label: 'Highlights',
          fields: [
            {
              name: 'highlights',
              type: 'array',
              labels: {
                singular: 'Highlight',
                plural: 'Highlights',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'releaseHighlightsSummary',
              type: 'ui',
              admin: {
                components: {
                  Field:
                    './components/admin/project-versions/ProjectVersionEditor#ReleaseHighlightsSummary',
                },
              },
            },
          ],
        },
        {
          label: 'Breaking changes',
          fields: [
            {
              name: 'breakingChanges',
              type: 'array',
              labels: {
                singular: 'Breaking change',
                plural: 'Breaking changes',
              },
              admin: {
                components: {
                  Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionBreakingCell',
                },
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'releaseRiskSummary',
              type: 'ui',
              admin: {
                components: {
                  Field:
                    './components/admin/project-versions/ProjectVersionEditor#ReleaseRiskSummary',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'isStable',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Suitable for production use.',
        components: {
          Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionStableCell',
        },
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Current visible project version.',
        components: {
          Cell: './components/admin/project-versions/ProjectVersionCells#ProjectVersionCurrentCell',
        },
      },
    },
    {
      name: 'releaseReadiness',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/project-versions/ProjectVersionEditor#ReleaseReadiness',
        },
      },
    },
  ],
}
