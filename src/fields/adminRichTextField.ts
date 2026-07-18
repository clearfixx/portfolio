import type { JSONField } from 'payload'

type AdminRichTextFieldOptions = {
  label?: string
  name: string
  required?: boolean
}

function hasRichTextContent(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false

  const document = value as Record<string, unknown>
  const root =
    document.type === 'doc'
      ? document
      : document.root && typeof document.root === 'object'
        ? (document.root as Record<string, unknown>)
        : undefined

  const nodes = root?.content ?? root?.children

  return Array.isArray(nodes) && nodes.some((node) => nodeHasContent(node))
}

function nodeHasContent(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false

  const node = value as Record<string, unknown>
  if (typeof node.text === 'string' && node.text.trim().length > 0) return true
  if (node.type === 'horizontalRule' || node.type === 'horizontalrule') return true

  const nested = node.content ?? node.children
  return Array.isArray(nested) && nested.some((child) => nodeHasContent(child))
}

export function adminRichTextField({
  label,
  name,
  required = false,
}: AdminRichTextFieldOptions): JSONField {
  return {
    name,
    type: 'json',
    admin: {
      components: {
        Field: './components/admin/rich-text/AdminRichTextField',
      },
    },
    label,
    required,
    validate: (value) => {
      if (!required && (value === null || value === undefined)) return true
      return hasRichTextContent(value) || 'Add content to this technical editor.'
    },
  }
}
