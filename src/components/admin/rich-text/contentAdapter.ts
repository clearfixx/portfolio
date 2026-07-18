import type { JSONContent } from '@tiptap/core'

type UnknownRecord = Record<string, unknown>

function record(value: unknown): UnknownRecord | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as UnknownRecord)
    : undefined
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function children(node: UnknownRecord): unknown[] {
  return Array.isArray(node.children) ? node.children : []
}

function textMarks(format: unknown): JSONContent['marks'] {
  const mask = typeof format === 'number' ? format : 0
  const marks: NonNullable<JSONContent['marks']> = []

  if (mask & 1) marks.push({ type: 'bold' })
  if (mask & 2) marks.push({ type: 'italic' })
  if (mask & 4) marks.push({ type: 'strike' })
  if (mask & 8) marks.push({ type: 'underline' })
  if (mask & 16) marks.push({ type: 'code' })

  return marks.length ? marks : undefined
}

function convertChildren(node: UnknownRecord): JSONContent[] {
  return children(node).flatMap((child) => convertLexicalNode(child))
}

function convertLexicalNode(value: unknown): JSONContent[] {
  const node = record(value)
  if (!node) return []

  const type = text(node.type)

  if (type === 'text') {
    return [{ marks: textMarks(node.format), text: text(node.text), type: 'text' }]
  }

  if (type === 'linebreak') return [{ type: 'hardBreak' }]
  if (type === 'horizontalrule') return [{ type: 'horizontalRule' }]

  if (type === 'link' || type === 'autolink') {
    const href = text(node.url)

    return convertChildren(node).map((child) => ({
      ...child,
      marks: [...(child.marks ?? []), { attrs: { href, target: '_blank' }, type: 'link' }],
    }))
  }

  if (type === 'heading') {
    const level = Number(text(node.tag).replace(/\D/gu, ''))

    return [
      {
        attrs: { level: level >= 2 && level <= 4 ? level : 2 },
        content: convertChildren(node),
        type: 'heading',
      },
    ]
  }

  if (type === 'quote') {
    return [
      {
        content: [{ content: convertChildren(node), type: 'paragraph' }],
        type: 'blockquote',
      },
    ]
  }

  if (type === 'code') {
    return [
      {
        attrs: { language: text(node.language) || null },
        content: [{ text: lexicalPlainText(node), type: 'text' }],
        type: 'codeBlock',
      },
    ]
  }

  if (type === 'list') {
    const listType = text(node.listType)

    return [
      {
        content: convertChildren(node),
        type:
          listType === 'number' ? 'orderedList' : listType === 'check' ? 'taskList' : 'bulletList',
      },
    ]
  }

  if (type === 'listitem') {
    return [
      {
        content: [{ content: convertChildren(node), type: 'paragraph' }],
        type: 'listItem',
      },
    ]
  }

  if (type === 'table') return [{ content: convertChildren(node), type: 'table' }]
  if (type === 'tablerow') return [{ content: convertChildren(node), type: 'tableRow' }]
  if (type === 'tablecell') {
    return [
      {
        content: [{ content: convertChildren(node), type: 'paragraph' }],
        type: Number(node.headerState) > 0 ? 'tableHeader' : 'tableCell',
      },
    ]
  }

  const content = convertChildren(node)

  return type === 'root' ? content : [{ content, type: 'paragraph' }]
}

function lexicalPlainText(node: UnknownRecord): string {
  return children(node)
    .map((child) => {
      const childRecord = record(child)
      return childRecord ? text(childRecord.text) || lexicalPlainText(childRecord) : ''
    })
    .join('')
}

export function normalizeRichTextContent(value: unknown): JSONContent {
  const source = record(value)

  if (source?.type === 'doc') return source as JSONContent

  const lexicalRoot = record(source?.root)
  const content = lexicalRoot ? convertChildren(lexicalRoot) : []

  return {
    content: content.length ? content : [{ type: 'paragraph' }],
    type: 'doc',
  }
}
