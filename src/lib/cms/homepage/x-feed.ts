import type { XFeedPublicResult } from '@dss-feeds/x-feed'
import {
  readPayloadXFeed,
  readPayloadXFeedRuntimeSettings,
  readXFeedDisplaySettings,
} from '@dss-feeds/x-feed/payload'

import { getPayloadClient } from '../client'
import type { SiteFooterPostViewModel, SiteFooterViewModel } from './types'

const PORTFOLIO_TIME_ZONE = 'Europe/Kyiv'

export type SiteFooterXFeedViewModel = SiteFooterViewModel['xFeed'] & {
  state: 'fresh' | 'stale'
}

export async function getSiteFooterXFeed(
  now = new Date(),
): Promise<SiteFooterXFeedViewModel | null> {
  try {
    const payload = await getPayloadClient()
    const [runtimeSettings, displaySettings] = await Promise.all([
      readPayloadXFeedRuntimeSettings({ payload }),
      readXFeedDisplaySettings({ payload }),
    ])

    if (!runtimeSettings.enabled || runtimeSettings.config.username.length === 0) {
      return null
    }

    const result = await readPayloadXFeed({
      payload,
      username: runtimeSettings.config.username,
      postCount: displaySettings.postLimit,
      order: 'desc',
      now,
    })

    return buildSiteFooterXFeedViewModel(
      result,
      runtimeSettings.config.username,
      displaySettings.postLimit,
    )
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[portfolio/x-feed] Failed to read cached X feed.', error)
    }

    return null
  }
}

export function buildSiteFooterXFeedViewModel(
  result: XFeedPublicResult,
  username: string,
  displayPostLimit: number,
): SiteFooterXFeedViewModel | null {
  if (
    !result.renderable ||
    (result.state !== 'fresh' && result.state !== 'stale') ||
    result.posts.length === 0
  ) {
    return null
  }

  const normalizedUsername = normalizeUsername(username)

  if (!normalizedUsername) {
    return null
  }

  const posts = result.posts.slice(0, displayPostLimit).map(toSiteFooterPost)

  if (posts.length === 0) {
    return null
  }

  return {
    handle: `@${normalizedUsername}`,
    href: `https://x.com/${normalizedUsername}`,
    linkLabel: 'View more on X',
    posts,
    state: result.state,
    title: 'X Signals',
  }
}

function toSiteFooterPost(post: XFeedPublicResult['posts'][number]): SiteFooterPostViewModel {
  const date = new Date(post.createdAt)
  const validDate = !Number.isNaN(date.getTime())

  return {
    content: post.text,
    date: validDate
      ? new Intl.DateTimeFormat('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: PORTFOLIO_TIME_ZONE,
        }).format(date)
      : 'Recent',
    href: post.url,
    id: post.id,
    likes: post.metrics.likes,
    replies: post.metrics.replies,
    reposts: post.metrics.reposts,
    time: validDate
      ? new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: PORTFOLIO_TIME_ZONE,
        }).format(date)
      : 'Now',
  }
}

function normalizeUsername(value: string): string {
  return value.trim().replace(/^@+/, '')
}
