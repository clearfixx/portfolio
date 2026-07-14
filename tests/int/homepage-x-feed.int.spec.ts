import type { XFeedPublicResult } from '@dss-feeds/x-feed'
import { describe, expect, it } from 'vitest'

import { buildSiteFooterXFeedViewModel } from '@/lib/cms/homepage/x-feed'

function createResult(overrides: Partial<XFeedPublicResult> = {}): XFeedPublicResult {
  return {
    cachedPostCount: 8,
    freshUntil: '2026-07-14T20:00:00.000Z',
    generatedAt: '2026-07-14T18:00:00.000Z',
    posts: [
      {
        author: {
          name: 'Andrii Kulahin',
          profileImageUrl: null,
          username: 'andrii_kulahin',
          verified: null,
        },
        createdAt: '2026-07-14T14:12:35.000Z',
        id: '2077033520724082855',
        isQuote: false,
        isReply: false,
        isRepost: false,
        language: 'en',
        media: [],
        metrics: {
          bookmarks: null,
          impressions: null,
          likes: 12,
          quotes: 0,
          replies: 2,
          reposts: 4,
        },
        text: 'DSS Universe. One platform. Every tool.',
        url: 'https://x.com/andrii_kulahin/status/2077033520724082855',
      },
      {
        author: {
          name: 'Andrii Kulahin',
          profileImageUrl: null,
          username: 'andrii_kulahin',
          verified: null,
        },
        createdAt: '2026-07-13T10:00:00.000Z',
        id: '2077000000000000000',
        isQuote: false,
        isReply: false,
        isRepost: false,
        language: 'en',
        media: [],
        metrics: {
          bookmarks: null,
          impressions: null,
          likes: 8,
          quotes: 0,
          replies: 1,
          reposts: 3,
        },
        text: 'Building cache-first social feeds.',
        url: 'https://x.com/andrii_kulahin/status/2077000000000000000',
      },
    ],
    renderable: true,
    stale: false,
    staleUntil: '2026-07-15T20:00:00.000Z',
    state: 'fresh',
    ...overrides,
  }
}

describe('homepage X footer feed', () => {
  it('maps cached posts into the existing footer model', () => {
    const result = buildSiteFooterXFeedViewModel(createResult(), '@andrii_kulahin', 1)

    expect(result).toMatchObject({
      handle: '@andrii_kulahin',
      href: 'https://x.com/andrii_kulahin',
      linkLabel: 'View more on X',
      state: 'fresh',
      title: 'X Signals',
    })
    expect(result?.posts).toHaveLength(1)
    expect(result?.posts[0]).toMatchObject({
      content: 'DSS Universe. One platform. Every tool.',
      likes: 12,
      replies: 2,
      reposts: 4,
    })
  })

  it('renders stale cache and rejects unusable states', () => {
    expect(
      buildSiteFooterXFeedViewModel(
        createResult({
          stale: true,
          state: 'stale',
        }),
        'andrii_kulahin',
        3,
      )?.state,
    ).toBe('stale')

    expect(
      buildSiteFooterXFeedViewModel(
        createResult({
          posts: [],
          renderable: false,
          state: 'expired',
        }),
        'andrii_kulahin',
        3,
      ),
    ).toBeNull()
  })
})
