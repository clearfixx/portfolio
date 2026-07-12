import type {
  Analytics,
  Contact,
  Homepage,
  Profile,
  Seo,
  SiteSetting,
  Social,
} from '@/payload-types'

import { getPayloadClient } from '../../client'

/**
 * Global CMS queries.
 *
 * Keep global reads here so layouts/pages do not talk to Payload directly.
 * The frontend asks for meaning, not for database mechanics.
 */
export async function getHomepage(): Promise<Homepage> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })
}

export async function getProfile(): Promise<Profile> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'profile',
    depth: 1,
  })
}

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 2,
  })
}

export async function getSeo(): Promise<Seo> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })
}

export async function getSocial(): Promise<Social> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'social',
    depth: 1,
  })
}

export async function getContact(): Promise<Contact> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'contact',
    depth: 1,
  })
}

export async function getAnalytics(): Promise<Analytics> {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'analytics',
    depth: 0,
  })
}
