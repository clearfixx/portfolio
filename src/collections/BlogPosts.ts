import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

import { seoField, slugField } from '@/fields'
import { adminRichTextField } from '@/fields/adminRichTextField'
import { formatSlug } from '@/utils/formatSlug'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  // portfolio-admin-blog-posts-list-v1
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'publishedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    components: {
      beforeList: ['./components/admin/blog-posts/BlogPostsListHeader'],
      edit: {
        beforeDocumentControls: ['./components/admin/blog-posts/ArticleDocumentControls'],
      },
    },
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    // portfolio-admin-blog-post-editor-v1
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: 'Article identity, summary, and long-form editorial body.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                components: {
                  Cell: './components/admin/blog-posts/BlogPostCells#BlogPostTitleCell',
                },
              },
            },
            slugField({ sourceField: 'title' }),
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Short summary for blog cards, previews, and SEO snippets.',
              },
            },
            adminRichTextField({ label: 'Content', name: 'content', required: true }),
          ],
        },
        {
          label: 'Media',
          description: 'Primary editorial imagery.',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Taxonomy',
          description: 'Category and article tags.',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: false,
              admin: {
                description: 'Use categories with type "Blog" or "Shared".',
                components: {
                  Cell: './components/admin/blog-posts/BlogPostCells#BlogPostCategoryCell',
                },
              },
            },
            {
              name: 'series',
              type: 'text',
              admin: {
                description:
                  'Optional editorial series name used by the public journal index and related-content navigation.',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              defaultValue: 'intermediate',
              options: [
                {
                  label: 'Foundation',
                  value: 'foundation',
                },
                {
                  label: 'Intermediate',
                  value: 'intermediate',
                },
                {
                  label: 'Advanced',
                  value: 'advanced',
                },
              ],
              admin: {
                description: 'Editorial depth indicator for readers.',
              },
            },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'URL-friendly tag identifier. Auto-generated from label when empty.',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, siblingData }) => {
                        if (typeof value === 'string' && value.length > 0) {
                          return formatSlug(value)
                        }

                        if (typeof siblingData?.label === 'string') {
                          return formatSlug(siblingData.label)
                        }

                        return value
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          description: 'Project context connected to this article.',
          fields: [
            {
              name: 'relatedProject',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: false,
              admin: {
                description: 'Optional project connected to this article or dev note.',
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
      name: 'articleReadiness',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/blog-posts/ArticleReadinessPanel',
        },
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Promote this article in the Engineering Journal featured slot.',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      min: 1,
      defaultValue: 5,
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes.',
      },
    },
    {
      name: 'views',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Public article view counter.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Cell: './components/admin/blog-posts/BlogPostCells#BlogPostStatusCell',
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
          Cell: './components/admin/blog-posts/BlogPostCells#BlogPostPublishedCell',
        },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
