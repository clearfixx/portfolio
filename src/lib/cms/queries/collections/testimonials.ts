import type { Testimonial } from '@/payload-types'

import { andWhere, findCollectionDocs } from '../shared'

const DEFAULT_TESTIMONIAL_LIMIT = 6

/**
 * Testimonial queries for public frontend sections.
 */
export async function getApprovedTestimonials(
  limit = DEFAULT_TESTIMONIAL_LIMIT,
): Promise<Testimonial[]> {
  return findCollectionDocs({
    collection: 'testimonials',
    depth: 1,
    limit,
    sort: '-approvedAt',
    where: andWhere(
      {
        status: {
          equals: 'approved',
        },
      },
      {
        approvedAt: {
          exists: true,
        },
      },
    ),
  })
}
