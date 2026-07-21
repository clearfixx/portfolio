import { RichText } from '@payloadcms/richtext-lexical/react'
import { common, createLowlight } from 'lowlight'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

import type { BlogPost } from '@/payload-types'

type RichTextData = ComponentProps<typeof RichText>['data']
type UnknownRecord = Record<string, unknown>

type BlogPostRichTextProps = {
  data: BlogPost['content']
}

const lowlight = createLowlight(common)

const CODE_LANGUAGE_ALIASES: Record<string, string> = {
  bash: 'bash',
  css: 'css',
  html: 'xml',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'javascript',
  json: 'json',
  shell: 'bash',
  sh: 'bash',
  ts: 'typescript',
  tsx: 'typescript',
  typescript: 'typescript',
  xml: 'xml',
}

function record(value: unknown): UnknownRecord | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null
}

function isLexicalRichTextData(value: unknown): value is RichTextData {
  return Boolean(record(value)?.root)
}

function isTiptapDocument(value: unknown): value is UnknownRecord {
  return record(value)?.type === 'doc'
}

function childNodes(node: UnknownRecord): unknown[] {
  return Array.isArray(node.content) ? node.content : []
}

function stringAttribute(node: UnknownRecord | null, key: string): string | undefined {
  const value = node?.[key]
  return typeof value === 'string' && value.trim() ? value : undefined
}

function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined

  const href = value.trim()
  if (!href) return undefined

  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href
  }

  return undefined
}

function textAlignStyle(attrs: UnknownRecord | null): CSSProperties | undefined {
  const value = stringAttribute(attrs, 'textAlign')

  if (value === 'left' || value === 'center' || value === 'right' || value === 'justify') {
    return { textAlign: value }
  }

  return undefined
}

function fontSizeStyle(attrs: UnknownRecord | null): CSSProperties | undefined {
  const value = stringAttribute(attrs, 'fontSize')

  if (!value || !/^(?:\d+(?:\.\d+)?)(?:px|rem|em|%)$/u.test(value)) {
    return undefined
  }

  return { fontSize: value }
}

function renderMarkedText(node: UnknownRecord, key: string): ReactNode {
  const rawText = typeof node.text === 'string' ? node.text : ''
  const marks = Array.isArray(node.marks) ? node.marks : []
  let content: ReactNode = rawText

  marks.forEach((rawMark, index) => {
    const mark = record(rawMark)
    const type = stringAttribute(mark, 'type')
    const attrs = record(mark?.attrs)
    const markKey = `${key}-mark-${index}`

    switch (type) {
      case 'bold':
        content = <strong key={markKey}>{content}</strong>
        break
      case 'italic':
        content = <em key={markKey}>{content}</em>
        break
      case 'strike':
        content = <s key={markKey}>{content}</s>
        break
      case 'underline':
        content = <u key={markKey}>{content}</u>
        break
      case 'code':
        content = <code key={markKey}>{content}</code>
        break
      case 'link': {
        const href = safeHref(attrs?.href)

        if (href) {
          const target = attrs?.target === '_blank' ? '_blank' : undefined
          content = (
            <a
              href={href}
              key={markKey}
              rel={target ? 'noreferrer noopener' : undefined}
              target={target}
            >
              {content}
            </a>
          )
        }

        break
      }
      case 'textStyle': {
        const style = fontSizeStyle(attrs)
        if (style)
          content = (
            <span key={markKey} style={style}>
              {content}
            </span>
          )
        break
      }
      default:
        break
    }
  })

  return content
}

function plainText(node: UnknownRecord): string {
  if (typeof node.text === 'string') return node.text

  return childNodes(node)
    .map((child) => {
      const childRecord = record(child)
      return childRecord ? plainText(childRecord) : ''
    })
    .join('')
}

function normalizedCodeLanguage(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return undefined

  return CODE_LANGUAGE_ALIASES[normalized] ?? normalized
}

function highlightClassName(properties: UnknownRecord | null): string | undefined {
  const value = properties?.className

  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    const classNames = value.filter((item): item is string => typeof item === 'string')
    return classNames.length ? classNames.join(' ') : undefined
  }

  return undefined
}

function renderHighlightedNode(value: unknown, key: string): ReactNode {
  const node = record(value)
  if (!node) return null

  if (node.type === 'text') {
    return typeof node.value === 'string' ? node.value : ''
  }

  const children = Array.isArray(node.children)
    ? node.children.map((child, index) => renderHighlightedNode(child, `${key}-${index}`))
    : []

  if (node.type === 'element') {
    return (
      <span className={highlightClassName(record(node.properties))} key={key}>
        {children}
      </span>
    )
  }

  return <span key={key}>{children}</span>
}

function renderHighlightedCode(code: string, language: string | undefined): ReactNode {
  const normalizedLanguage = normalizedCodeLanguage(language)

  try {
    const tree =
      normalizedLanguage && lowlight.registered(normalizedLanguage)
        ? lowlight.highlight(normalizedLanguage, code)
        : lowlight.highlightAuto(code)

    return tree.children.map((child, index) => renderHighlightedNode(child, `highlight-${index}`))
  } catch {
    return code
  }
}

function renderChildren(node: UnknownRecord, key: string): ReactNode[] {
  return childNodes(node).map((child, index) => renderTiptapNode(child, `${key}-${index}`))
}

function renderTiptapNode(value: unknown, key: string): ReactNode {
  const node = record(value)
  if (!node) return null

  const type = stringAttribute(node, 'type')
  const attrs = record(node.attrs)
  const children = renderChildren(node, key)

  switch (type) {
    case 'doc':
      return <>{children}</>
    case 'text':
      return renderMarkedText(node, key)
    case 'paragraph':
      return (
        <p key={key} style={textAlignStyle(attrs)}>
          {children}
        </p>
      )
    case 'heading': {
      const rawLevel = typeof attrs?.level === 'number' ? attrs.level : 2
      const level = Math.min(6, Math.max(2, rawLevel))
      const Heading = `h${level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

      return (
        <Heading key={key} style={textAlignStyle(attrs)}>
          {children}
        </Heading>
      )
    }
    case 'bulletList':
      return <ul key={key}>{children}</ul>
    case 'orderedList': {
      const start = typeof attrs?.start === 'number' ? attrs.start : undefined
      return (
        <ol key={key} start={start}>
          {children}
        </ol>
      )
    }
    case 'listItem':
      return <li key={key}>{children}</li>
    case 'blockquote':
      return <blockquote key={key}>{children}</blockquote>
    case 'codeBlock': {
      const language = stringAttribute(attrs, 'language')
      const code = plainText(node)
      const normalizedLanguage = normalizedCodeLanguage(language)

      return (
        <pre data-language={normalizedLanguage} key={key}>
          <code className={`hljs${normalizedLanguage ? ` language-${normalizedLanguage}` : ''}`}>
            {renderHighlightedCode(code, normalizedLanguage)}
          </code>
        </pre>
      )
    }
    case 'hardBreak':
      return <br key={key} />
    case 'horizontalRule':
      return <hr key={key} />
    case 'table':
      return (
        <div className="blog-rich-text-table" key={key}>
          <table>
            <tbody>{children}</tbody>
          </table>
        </div>
      )
    case 'tableRow':
      return <tr key={key}>{children}</tr>
    case 'tableHeader':
      return <th key={key}>{children}</th>
    case 'tableCell':
      return <td key={key}>{children}</td>
    default:
      return <span key={key}>{children}</span>
  }
}

export function BlogPostRichText({ data }: BlogPostRichTextProps) {
  if (typeof data === 'string') {
    return <p>{data}</p>
  }

  if (isLexicalRichTextData(data)) {
    return <RichText data={data} />
  }

  if (isTiptapDocument(data)) {
    return renderTiptapNode(data, 'blog-content')
  }

  return null
}
