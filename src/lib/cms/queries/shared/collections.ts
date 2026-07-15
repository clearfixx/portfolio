import type {
  CollectionSlug,
  DataFromCollectionSlug,
  PaginatedDocs,
  Payload,
  SelectType,
  Sort,
  Where,
} from 'payload'

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

type FindCollectionResult<TCollection extends CollectionSlug> = PaginatedDocs<
  DataFromCollectionSlug<TCollection>
>

/**
 * A deliberately simplified boundary around Payload.find().
 *
 * Payload's generated collection and select unions can become too large for
 * TypeScript when a generic wrapper forwards them directly. The cast is kept
 * in one place while callers retain collection-specific document types.
 */
type PayloadFindBoundary = (options: {
  collection: CollectionSlug
  depth?: number
  limit?: number
  page?: number
  select?: SelectType
  sort?: Sort
  where?: Where
}) => Promise<PaginatedDocs<unknown>>

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
}: FindCollectionOptions<TCollection>): Promise<FindCollectionResult<TCollection>> {
  const payload = await getCMSClient()
  const find = payload.find as unknown as PayloadFindBoundary

  const result = await find({
    collection,
    depth,
    limit,
    page,
    select,
    sort,
    where,
  })

  return result as FindCollectionResult<TCollection>
}

export async function findCollectionDocs<TCollection extends CollectionSlug>(
  options: FindCollectionOptions<TCollection>,
): Promise<Array<DataFromCollectionSlug<TCollection>>> {
  const result = await findCollection(options)

  return result.docs
}

export async function findOneCollection<TCollection extends CollectionSlug>({
  collection,
  depth = 1,
  select,
  sort,
  where,
}: FindOneCollectionOptions<TCollection>): Promise<DataFromCollectionSlug<TCollection> | null> {
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
