import type { InstagramFeedReadResult } from '@dss-feeds/instagram-feed/payload'
import { describe, expect, it } from 'vitest'

import { buildSiteFooterInstagramFeedViewModel } from '@/lib/cms/homepage/instagram-feed'

const baseResult: InstagramFeedReadResult = {
  adapterVersion: '0.1.0',
  cachedPostCount: 1,
  checksum: 'checksum',
  freshUntil: '2026-07-15T13:00:00.000Z',
  generatedAt: '2026-07-15T12:00:00.000Z',
  nextSyncAt: '2026-07-15T18:00:00.000Z',
  posts: [
    {
      caption: 'A cached Instagram image',
      commentCount: 3,
      height: 1080,
      id: 'post-1',
      imageUrl: '/api/media/file/post-1.jpg',
      kind: 'post',
      likeCount: 17,
      mediaProductType: 'FEED',
      mediaType: 'image',
      permalink: 'https://www.instagram.com/p/ABC/',
      providerImageUrl: 'https://scontent.cdninstagram.com/post-1.jpg',
      providerThumbnailUrl: null,
      publishedAt: '2026-07-15T10:00:00.000Z',
      shortcode: 'ABC',
      source: 'instagram',
      thumbnailUrl: null,
      username: 'clearfixx',
      width: 1080,
    },
  ],
  renderable: true,
  sourceUsed: 'official',
  staleUntil: '2026-07-22T13:00:00.000Z',
  state: 'fresh',
  warnings: [],
}

describe('Instagram footer view model', () => {
  it('maps a local cache snapshot to the footer grid', () => {
    const result = buildSiteFooterInstagramFeedViewModel(baseResult, '@clearfixx', 6)

    expect(result).toMatchObject({
      href: 'https://www.instagram.com/clearfixx/',
      state: 'fresh',
      username: 'clearfixx',
    })
    expect(result?.posts[0]).toMatchObject({
      comments: 3,
      href: 'https://www.instagram.com/p/ABC/',
      likes: 17,
    })
  })

  it('rejects an expired snapshot so static CMS content remains the fallback', () => {
    const result = buildSiteFooterInstagramFeedViewModel(
      {
        ...baseResult,
        renderable: false,
        state: 'expired',
      },
      'clearfixx',
      6,
    )

    expect(result).toBeNull()
  })
})
