import type { CollectionConfig } from 'payload'
import { authenticatedAccess, publicAccess } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  // portfolio-admin-media-library-list-v1
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['asset', 'alt', 'folder', 'isPublic', 'assetMeta'],
    listSearchableFields: ['filename', 'alt', 'caption', 'credit', 'folder'],
    components: {
      beforeList: ['./components/admin/media/MediaLibraryHeader'],
    },
  },
  access: {
    read: publicAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  // portfolio-admin-media-editor-v1
  fields: [
    {
      name: 'asset',
      type: 'ui',
      admin: {
        components: {
          Cell: './components/admin/media/MediaCells#MediaAssetCell',
          Field: './components/admin/media/MediaCells#MediaListOnlyField',
        },
      },
    },
    {
      name: 'assetMeta',
      type: 'ui',
      admin: {
        components: {
          Cell: './components/admin/media/MediaCells#MediaMetaCell',
          Field: './components/admin/media/MediaCells#MediaListOnlyField',
        },
      },
    },
    {
      name: 'mediaWorkspace',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/media/MediaEditor#MediaWorkspace',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Metadata',
          description: 'Accessible identity, editorial caption, and attribution.',
          fields: [
            {
              name: 'alt',
              type: 'text',
              required: true,
              admin: {
                description: 'Accessible alternative text. Required for public images.',
                components: {
                  Cell: './components/admin/media/MediaCells#MediaAltCell',
                },
              },
            },
            {
              name: 'caption',
              type: 'textarea',
              admin: {
                description: 'Optional human-readable image caption.',
                components: {
                  Field: './components/admin/media/MediaCaptionField',
                },
              },
            },
            {
              name: 'credit',
              type: 'text',
              admin: {
                description: 'Optional author, source, or attribution note.',
              },
            },
          ],
        },
        {
          label: 'Organization',
          description: 'Folder assignment and reusable taxonomy labels.',
          fields: [
            {
              name: 'folder',
              type: 'text',
              admin: {
                description: 'Simple folder/group key, e.g. projects, blog, seo, homepage.',
                components: {
                  Cell: './components/admin/media/MediaCells#MediaFolderCell',
                },
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
              ],
            },
          ],
        },
        {
          label: 'External Source',
          description: 'Read-only diagnostics for mirrored social media.',
          fields: [
            {
              name: 'mediaExternalSource',
              type: 'ui',
              admin: {
                components: {
                  Field: './components/admin/media/MediaEditor#MediaExternalSource',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Allow this media item to be used on public pages.',
        components: {
          Cell: './components/admin/media/MediaCells#MediaVisibilityCell',
        },
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'externalProvider',
      type: 'select',
      index: true,
      options: [
        {
          label: 'Instagram',
          value: 'instagram',
        },
      ],
      admin: {
        hidden: true,
      },
    },
    {
      name: 'externalId',
      type: 'text',
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'externalKey',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'externalSourceUrl',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'externalSyncedAt',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'mediaReadiness',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: './components/admin/media/MediaEditor#MediaReadiness',
        },
      },
    },
  ],
  upload: true,
}
