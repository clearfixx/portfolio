import type { TextField } from 'payload'

import { formatSlug } from '@/utils/formatSlug'

type SlugFieldOptions = {
  sourceField: string
  description?: string
  unique?: boolean
}

export const slugField = ({
  sourceField,
  description = `URL-friendly identifier. Auto-generated from ${sourceField} when empty.`,
  unique = true,
}: SlugFieldOptions): TextField => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique,
  admin: {
    description,
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const sourceValue = siblingData?.[sourceField]

        if (typeof sourceValue === 'string') {
          return formatSlug(sourceValue)
        }

        return value
      },
    ],
  },
})
