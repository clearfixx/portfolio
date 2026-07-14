import { describe, expect, it } from 'vitest'

import {
  xFeedCacheCollection,
  xFeedSettingsGlobal,
  xFeedStatusEndpoint,
  xFeedSyncEndpoint,
  xFeedSyncTask,
} from '../../src/lib/server/x-feed'

describe('Portfolio X feed integration', () => {
  it('registers isolated Payload storage and settings', () => {
    expect(xFeedCacheCollection.slug).toBe('dss-x-feed-cache')
    expect(xFeedSettingsGlobal.slug).toBe('dss-x-feed-settings')

    const monitorField = xFeedSettingsGlobal.fields.find(
      (field) => 'name' in field && field.name === 'monitor',
    )

    expect(monitorField).toMatchObject({
      name: 'monitor',
      type: 'ui',
    })
  })

  it('registers scheduled synchronization and admin endpoints', () => {
    expect(xFeedSyncTask.slug).toBe('dss-x-feed-sync')
    expect(xFeedSyncTask.schedule).toEqual([
      {
        cron: '0 * * * *',
        queue: 'dss-x-feed',
      },
    ])

    expect(xFeedSyncEndpoint).toMatchObject({
      method: 'post',
      path: '/dss-x-feed/sync',
    })
    expect(xFeedStatusEndpoint).toMatchObject({
      method: 'get',
      path: '/dss-x-feed/status',
    })
  })
})
