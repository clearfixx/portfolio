import type { CollectionConfig } from 'payload'

import { authenticatedAccess, publicAccess } from '@/access'
import { slugField } from '@/fields'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'parent', 'sortOrder'],
    listSearchableFields: ['title', 'slug', 'description', 'type'],
    components: {
      beforeList: ['./components/admin/taxonomy/CategoriesListHeader'],
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
      name: 'categoryWorkspace',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/taxonomy/CategoryEditor#CategoryWorkspace',
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
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                components: {
                  Cell: './components/admin/taxonomy/CategoryCells#CategoryTitleCell',
                },
              },
            },
            slugField({ sourceField: 'title' }),
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Explain what belongs in this category and where it is used.',
              },
            },
          ],
        },
        {
          label: 'Classification',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'shared',
                  options: [
                    { label: 'Project', value: 'project' },
                    { label: 'Blog', value: 'blog' },
                    { label: 'Tech Stack', value: 'tech-stack' },
                    { label: 'Shared', value: 'shared' },
                  ],
                  admin: {
                    width: '50%',
                    components: {
                      Cell: './components/admin/taxonomy/CategoryCells#CategoryTypeCell',
                    },
                  },
                },
                {
                  name: 'parent',
                  type: 'relationship',
                  relationTo: 'categories',
                  hasMany: false,
                  admin: {
                    width: '50%',
                    description: 'Optional parent category. Leave empty for a root node.',
                    components: {
                      Cell: './components/admin/taxonomy/CategoryCells#CategoryParentCell',
                    },
                  },
                },
              ],
            },
            {
              name: 'categoryHierarchy',
              type: 'ui',
              admin: {
                components: {
                  Field: './components/admin/taxonomy/CategoryEditor#CategoryHierarchy',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower values appear earlier in manually ordered category lists.',
        components: {
          Cell: './components/admin/taxonomy/CategoryCells#CategorySortCell',
        },
      },
    },
    {
      name: 'categoryReadiness',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/taxonomy/CategoryEditor#CategoryReadiness',
        },
      },
    },
  ],
}
