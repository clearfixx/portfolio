import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Shared Payload server client.
 *
 * Frontend code should use this helper instead of creating Payload instances
 * directly inside pages or components. One door to the CMS, no maze. 🛰️
 */
export async function getPayloadClient() {
  return getPayload({ config })
}
