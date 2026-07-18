'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import type { JSONContent } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useField } from '@payloadcms/ui'
import { common, createLowlight } from 'lowlight'
import { useEffect, useMemo, useState } from 'react'

import { AdminRichTextToolbar } from './AdminRichTextToolbar'
import { normalizeRichTextContent } from './contentAdapter'

const lowlight = createLowlight(common)
const MIN_HEIGHT = 240
const MAX_HEIGHT = 960
const HEIGHT_STEP = 120
const DEFAULT_HEIGHT = 420

type AdminRichTextFieldProps = {
  field: {
    label?: string | Record<string, string>
    required?: boolean
  }
  path: string
}

function fieldLabel(label: AdminRichTextFieldProps['field']['label']): string {
  return typeof label === 'string' ? label : 'Content'
}

function countBlocks(content: JSONContent | undefined, type: string): number {
  if (!content) return 0
  return (
    (content.type === type ? 1 : 0) +
    (content.content ?? []).reduce((sum, child) => sum + countBlocks(child, type), 0)
  )
}

export default function AdminRichTextField({ field, path }: AdminRichTextFieldProps) {
  const { errorMessage, readOnly, setValue, showError, value } = useField<JSONContent>({ path })
  const initialContent = useMemo(() => normalizeRichTextContent(value), [value])
  const storageKey = `portfolio-admin-rich-text-height:${path}`
  const [height, setHeight] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_HEIGHT

    const stored = Number(window.localStorage.getItem(storageKey))
    return Number.isFinite(stored) && stored >= MIN_HEIGHT && stored <= MAX_HEIGHT
      ? stored
      : DEFAULT_HEIGHT
  })
  const [language, setLanguage] = useState('typescript')
  const [revision, setRevision] = useState(0)
  const editor = useEditor({
    content: initialContent,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({ codeBlock: false, link: false, underline: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextStyle,
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    immediatelyRender: false,
    onSelectionUpdate: () => setRevision((current) => current + 1),
    onUpdate: ({ editor: currentEditor }) => {
      setValue(currentEditor.getJSON())
      setRevision((current) => current + 1)
    },
  })

  useEffect(() => {
    editor?.setEditable(!readOnly)
  }, [editor, readOnly])

  const updateHeight = (next: number) => {
    const resolved = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, next))
    setHeight(resolved)
    window.localStorage.setItem(storageKey, String(resolved))
  }

  const plainText = editor?.getText({ blockSeparator: '\n' }) ?? ''
  const characters = plainText.length
  const words = plainText.trim() ? plainText.trim().split(/\s+/u).length : 0
  const lines = plainText ? plainText.split('\n').length : 0
  const paragraphs = countBlocks(editor?.getJSON(), 'paragraph')
  const readingMinutes = words ? Math.max(1, Math.ceil(words / 220)) : 0
  const label = fieldLabel(field.label)
  const descriptionID = `${path}-rich-text-description`
  const errorID = `${path}-rich-text-error`

  if (!editor) return null

  void revision

  return (
    <div className={`admin-rich-text-field${showError ? ' has-error' : ''}`}>
      <div className="admin-rich-text-field__label">
        <span>
          {label}
          {field.required ? <span aria-hidden="true"> *</span> : null}
        </span>
        <small id={descriptionID}>
          Technical content editor with semantic code blocks and syntax highlighting.
        </small>
      </div>

      <div
        className="admin-rich-text"
        style={{ '--admin-rich-text-height': `${height}px` } as React.CSSProperties}
      >
        <AdminRichTextToolbar editor={editor} language={language} onLanguageChange={setLanguage} />
        <EditorContent
          aria-describedby={`${descriptionID}${showError ? ` ${errorID}` : ''}`}
          className="admin-rich-text__canvas"
          editor={editor}
        />
        <footer className="admin-rich-text__footer">
          <div>
            <span>{characters.toLocaleString('en')} chars</span>
            <span>{words.toLocaleString('en')} words</span>
            <span>{lines.toLocaleString('en')} lines</span>
            <span>{paragraphs.toLocaleString('en')} paragraphs</span>
            <span>{readingMinutes} min read</span>
            <span>
              {editor.isActive('codeBlock')
                ? `PRE · ${language}`
                : editor.isActive('code')
                  ? 'CODE'
                  : 'Rich text'}
            </span>
          </div>
          <div className="admin-rich-text__height-controls">
            <button
              aria-label="Increase editor height"
              disabled={height >= MAX_HEIGHT}
              onClick={() => updateHeight(height + HEIGHT_STEP)}
              type="button"
            >
              +
            </button>
            <button
              aria-label="Decrease editor height"
              disabled={height <= MIN_HEIGHT}
              onClick={() => updateHeight(height - HEIGHT_STEP)}
              type="button"
            >
              −
            </button>
          </div>
        </footer>
      </div>

      {showError && errorMessage ? (
        <span className="admin-rich-text-field__error" id={errorID}>
          {String(errorMessage)}
        </span>
      ) : null}
    </div>
  )
}
