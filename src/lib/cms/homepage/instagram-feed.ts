import type { InstagramFeedReadResult } from '@dss-feeds/instagram-feed/payload'
import { readInstagramFeed } from '@dss-feeds/instagram-feed/payload'

import { getPayloadClient } from '../client'

const DEFAULT_DISPLAY_LIMIT = 6
const MAX_DISPLAY_LIMIT = 24

type InstagramSettings = {
  displayPostLimit?: number | null
  enabled?: boolean | null
  username?: null | string
}

export type SiteFooterInstagramPostViewModel = {
  id: string
  image: {
    alt: string
    src: string
  }
  href: string
  likes: null | number
  comments: null | number
}

export type SiteFooterInstagramFeedViewModel = {
  href: string
  posts: SiteFooterInstagramPostViewModel[]
  state: 'fresh' | 'stale'
  username: string
}

export async function getSiteFooterInstagramFeed(
  now = new Date(),
): Promise<SiteFooterInstagramFeedViewModel | null> {
  try {
    const payload = await getPayloadClient()
    const settings = (await payload.findGlobal({
      overrideAccess: true,
      slug: 'dss-instagram-feed-settings' as never,
    })) as InstagramSettings

    if (settings.enabled !== true) {
      return null
    }

    const username = normalizeUsername(settings.username ?? '')

    if (!username) {
      return null
    }

    const displayLimit = normalizeDisplayLimit(settings.displayPostLimit)
    const result = await readInstagramFeed({
      now,
      payload,
      postLimit: displayLimit,
    })

    return buildSiteFooterInstagramFeedViewModel(result, username, displayLimit)
  } catch {
    return null
  }
}

export function buildSiteFooterInstagramFeedViewModel(
  result: InstagramFeedReadResult,
  username: string,
  displayLimit: number,
): SiteFooterInstagramFeedViewModel | null {
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

  const posts = result.posts.slice(0, normalizeDisplayLimit(displayLimit)).map((post) => ({
    comments: post.commentCount,
    href: post.permalink,
    id: post.id,
    image: {
      alt: post.caption?.trim() || `Instagram post by @${normalizedUsername}`,
      src: post.thumbnailUrl ?? post.imageUrl,
    },
    likes: post.likeCount,
  }))

  if (posts.length === 0) {
    return null
  }

  return {
    href: `https://www.instagram.com/${normalizedUsername}/`,
    posts,
    state: result.state,
    username: normalizedUsername,
  }
}

function normalizeDisplayLimit(value: null | number | undefined): number {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return DEFAULT_DISPLAY_LIMIT
  }

  return Math.min(MAX_DISPLAY_LIMIT, Math.max(1, value))
}

function normalizeUsername(value: string): string {
  const normalized = value.trim().replace(/^@+/, '')

  return /^[A-Za-z0-9._]{1,30}$/.test(normalized) ? normalized : ''
}
