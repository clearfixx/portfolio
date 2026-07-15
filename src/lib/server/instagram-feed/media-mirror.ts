import type { InstagramMediaMirror } from '@dss-feeds/instagram-feed/payload'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const MAX_MEDIA_BYTES = 12 * 1024 * 1024
const MIRROR_USER_AGENT = 'DSS Portfolio Instagram Feed/1.0'

type MediaDocument = {
  id: number | string
  url?: null | string
}

export const mirrorInstagramMediaToPayload: InstagramMediaMirror = async ({
  payload,
  post,
  fetch,
  signal,
}) => {
  const externalKey = `instagram:${post.id}`
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      externalKey: {
        equals: externalKey,
      },
    } as never,
  })
  const existingDocument = existing.docs[0] as MediaDocument | undefined
  const existingUrl = normalizeLocalMediaUrl(existingDocument?.url)

  if (existingUrl) {
    return {
      imageUrl: existingUrl,
      thumbnailUrl: null,
    }
  }

  const response = await fetch(post.providerImageUrl, {
    headers: {
      Accept: 'image/avif,image/webp,image/jpeg,image/png,image/*',
      'User-Agent': MIRROR_USER_AGENT,
    },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Instagram media download returned HTTP ${response.status}.`)
  }

  const contentType = normalizeContentType(response.headers.get('content-type'))
  const extension = extensionForContentType(contentType)
  const advertisedSize = Number(response.headers.get('content-length') ?? 0)

  if (!extension) {
    throw new Error(`Unsupported Instagram media content type: ${contentType || 'unknown'}.`)
  }

  if (Number.isFinite(advertisedSize) && advertisedSize > MAX_MEDIA_BYTES) {
    throw new Error('Instagram media exceeds the 12 MB mirror limit.')
  }

  const bytes = Buffer.from(await response.arrayBuffer())

  if (bytes.length === 0) {
    throw new Error('Instagram media download returned an empty body.')
  }

  if (bytes.length > MAX_MEDIA_BYTES) {
    throw new Error('Instagram media exceeds the 12 MB mirror limit.')
  }

  const directory = await mkdtemp(path.join(tmpdir(), 'dss-instagram-feed-'))
  const filename = `${sanitizeIdentifier(post.id)}${extension}`
  const filePath = path.join(directory, filename)

  try {
    await writeFile(filePath, bytes)

    const created = (await payload.create({
      collection: 'media',
      data: {
        alt: buildAltText(post),
        caption: post.caption,
        credit: 'Instagram',
        externalId: post.id,
        externalKey,
        externalProvider: 'instagram',
        externalSourceUrl: post.permalink,
        externalSyncedAt: new Date().toISOString(),
        folder: 'instagram-feed',
        isPublic: true,
        tags: [
          {
            label: 'instagram-feed',
          },
        ],
      } as never,
      filePath,
      overrideAccess: true,
    })) as MediaDocument
    const createdUrl = normalizeLocalMediaUrl(created.url)

    if (!createdUrl) {
      throw new Error('Payload Media did not return a public URL for mirrored Instagram media.')
    }

    return {
      imageUrl: createdUrl,
      thumbnailUrl: null,
    }
  } finally {
    await rm(directory, {
      force: true,
      recursive: true,
    })
  }
}

function buildAltText(post: Parameters<InstagramMediaMirror>[0]['post']): string {
  const caption = post.caption?.replace(/\s+/g, ' ').trim()

  if (caption) {
    return caption.slice(0, 180)
  }

  return `Instagram post by @${post.username}`
}

function normalizeContentType(value: null | string): string {
  return value?.split(';', 1)[0]?.trim().toLowerCase() ?? ''
}

function extensionForContentType(value: string): null | string {
  switch (value) {
    case 'image/avif':
      return '.avif'
    case 'image/jpeg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'image/webp':
      return '.webp'
    default:
      return null
  }
}

function normalizeLocalMediaUrl(value: null | string | undefined): null | string {
  if (!value) {
    return null
  }

  const normalized = value.trim()

  if (normalized.startsWith('/') && !normalized.startsWith('//')) {
    return normalized
  }

  try {
    const url = new URL(normalized)

    if (url.protocol !== 'https:') {
      return null
    }

    if (
      url.hostname === 'instagram.com' ||
      url.hostname.endsWith('.instagram.com') ||
      url.hostname === 'cdninstagram.com' ||
      url.hostname.endsWith('.cdninstagram.com') ||
      url.hostname.endsWith('.fbcdn.net')
    ) {
      return null
    }

    return url.toString()
  } catch {
    return null
  }
}

function sanitizeIdentifier(value: string): string {
  const normalized = value.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')

  return normalized || 'instagram-media'
}
