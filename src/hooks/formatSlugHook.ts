import type { FieldHook } from 'payload'

import { formatSlug } from '@/utils/formatSlug'

type FormatSlugHookOptions = {
  sourceField: string
}

export const formatSlugHook =
  ({ sourceField }: FormatSlugHookOptions): FieldHook =>
  ({ value, siblingData }) => {
    if (typeof value === 'string' && value.length > 0) {
      return formatSlug(value)
    }

    const sourceValue = siblingData?.[sourceField]

    if (typeof sourceValue === 'string') {
      return formatSlug(sourceValue)
    }

    return value
  }
