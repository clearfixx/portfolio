import type { Where } from 'payload'

/**
 * Shared Payload where helpers.
 *
 * Keep common filters consistent across CMS queries.
 * Tiny helper, fewer copy-paste gremlins. 🛰️
 */
export function publishedOnly(): Where {
  return {
    publishedAt: {
      exists: true,
    },
  }
}

export function andWhere(...conditions: Where[]): Where {
  return {
    and: conditions,
  }
}
