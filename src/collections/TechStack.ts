import type { CollectionConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'
import { slugField } from '@/fields'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'visible', 'officialUrl', 'sortOrder'],
    listSearchableFields: ['name', 'slug', 'description'],
    components: {
      beforeList: ['./components/admin/taxonomy/TechStackListHeader'],
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
      name: 'technologyWorkspace',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/taxonomy/TechStackEditor#TechnologyWorkspace',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '70%',
                    components: {
                      Cell: './components/admin/taxonomy/TechStackCells#TechnologyNameCell',
                    },
                  },
                },
                {
                  name: 'color',
                  type: 'text',
                  admin: {
                    width: '30%',
                    description: 'Optional brand color in hexadecimal format, e.g. #3178C6.',
                  },
                },
              ],
            },
            slugField({
              sourceField: 'name',
              description: 'Used as the icon key for AppIcon, e.g. nextjs, react, typescript.',
            }),
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Short tooltip-friendly description.',
              },
            },
          ],
        },
        {
          label: 'Classification',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: false,
              admin: {
                description: 'Use categories with type "Tech Stack" or "Shared".',
                components: {
                  Cell: './components/admin/taxonomy/TechStackCells#TechnologyCategoryCell',
                },
              },
            },
            {
              name: 'technologyClassification',
              type: 'ui',
              admin: {
                components: {
                  Field: './components/admin/taxonomy/TechStackEditor#TechnologyClassification',
                },
              },
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            {
              name: 'officialUrl',
              type: 'text',
              admin: {
                description: 'Official website URL.',
                components: {
                  Cell: './components/admin/taxonomy/TechStackCells#TechnologyLinksCell',
                },
              },
            },
            {
              name: 'documentationUrl',
              type: 'text',
              admin: {
                description: 'Official documentation URL.',
              },
            },
            {
              name: 'technologyResources',
              type: 'ui',
              admin: {
                components: {
                  Field: './components/admin/taxonomy/TechStackEditor#TechnologyResources',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in highlighted homepage sections.',
        components: {
          Cell: './components/admin/taxonomy/TechStackCells#TechnologyFeaturedCell',
        },
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Allow this technology to appear on public pages.',
        components: {
          Cell: './components/admin/taxonomy/TechStackCells#TechnologyVisibleCell',
        },
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower values appear earlier in manually ordered technology lists.',
        components: {
          Cell: './components/admin/taxonomy/TechStackCells#TechnologySortCell',
        },
      },
    },
    {
      name: 'technologyReadiness',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/taxonomy/TechStackEditor#TechnologyReadiness',
        },
      },
    },
  ],
}
