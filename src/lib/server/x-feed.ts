import {
  createXFeedCacheCollection,
  createXFeedSettingsGlobal,
  createXFeedStatusEndpoint,
  createXFeedSyncEndpoint,
  createXFeedSyncTask,
} from '@dss-feeds/x-feed/payload'

export const xFeedCacheCollection = createXFeedCacheCollection()

export const xFeedSettingsGlobal = createXFeedSettingsGlobal({
  monitor: {
    title: 'X Feed Monitor',
  },
})

export const xFeedSyncTask = createXFeedSyncTask()

export const xFeedSyncEndpoint = createXFeedSyncEndpoint()

export const xFeedStatusEndpoint = createXFeedStatusEndpoint()
