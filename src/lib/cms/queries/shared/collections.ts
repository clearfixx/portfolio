import type { CollectionSlug, Payload, SelectType, Sort, Where } from 'payload'

import { getPayloadClient } from '../../client'

type FindCollectionOptions<TCollection extends CollectionSlug> = {
  collection: TCollection
  depth?: number
  limit?: number
  page?: number
  select?: SelectType
  sort?: Sort
  where?: Where
}

type FindOneCollectionOptions<TCollection extends CollectionSlug> = Omit<
  FindCollectionOptions<TCollection>,
  'limit' | 'page'
>

type CountCollectionOptions<TCollection extends CollectionSlug> = {
  collection: TCollection
  where?: Where
}

/**
 * Shared collection query helpers.
 *
 * findCollection returns the full Payload pagination result.
 * findCollectionDocs returns only documents for simple lists.
 * One helper for control, one helper for convenience. 🛰️
 */
export async function getCMSClient(): Promise<Payload> {
  return getPayloadClient()
}

export async function findCollection<TCollection extends CollectionSlug>({
  collection,
  depth = 1,
  limit = 10,
  page,
  select,
  sort,
  where,
}: FindCollectionOptions<TCollection>) {
  const payload = await getCMSClient()

  return payload.find({
    collection,
    depth,
    limit,
    page,
    select,
    sort,
    where,
  })
}

export async function findCollectionDocs<TCollection extends CollectionSlug>(
  options: FindCollectionOptions<TCollection>,
) {
  const result = await findCollection(options)

  return result.docs
}

export async function findOneCollection<TCollection extends CollectionSlug>({
  collection,
  depth = 1,
  select,
  sort,
  where,
}: FindOneCollectionOptions<TCollection>) {
  const docs = await findCollectionDocs({
    collection,
    depth,
    limit: 1,
    select,
    sort,
    where,
  })

  return docs[0] ?? null
}

export async function countCollection<TCollection extends CollectionSlug>({
  collection,
  where,
}: CountCollectionOptions<TCollection>): Promise<number> {
  const payload = await getCMSClient()

  const result = await payload.count({
    collection,
    where,
  })

  return result.totalDocs
}
