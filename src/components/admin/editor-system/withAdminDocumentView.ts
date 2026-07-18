import type { CollectionConfig, GlobalConfig } from 'payload'

const documentView = {
  default: {
    Component: './components/admin/editor-system/AdminDocumentView',
  },
} as const

export function withAdminCollectionDocumentView(config: CollectionConfig): CollectionConfig {
  return {
    ...config,
    admin: {
      ...config.admin,
      components: {
        ...config.admin?.components,
        views: {
          ...config.admin?.components?.views,
          edit: documentView,
        },
      },
    },
  }
}

export function withAdminGlobalDocumentView(config: GlobalConfig): GlobalConfig {
  return {
    ...config,
    admin: {
      ...config.admin,
      components: {
        ...config.admin?.components,
        views: {
          ...config.admin?.components?.views,
          edit: documentView,
        },
      },
    },
  }
}
