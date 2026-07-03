import type { TextField } from 'payload'

import { formatSlugHook } from '@/hooks'

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
    beforeValidate: [formatSlugHook({ sourceField })],
  },
})
