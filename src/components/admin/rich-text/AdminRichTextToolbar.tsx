'use client'

import type { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Braces,
  Code2,
  Columns3,
  Eraser,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Rows3,
  Strikethrough,
  Table2,
  Trash2,
  Underline,
  Undo2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const languages = [
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'html',
  'css',
  'scss',
  'json',
  'bash',
  'sql',
  'yaml',
  'markdown',
  'python',
  'php',
  'go',
  'rust',
] as const

type AdminRichTextToolbarProps = {
  editor: Editor
  language: string
  onLanguageChange: (language: string) => void
}

type ToolButtonProps = {
  active?: boolean
  disabled?: boolean
  icon: LucideIcon
  label: string
  onClick: () => void
}

function ToolButton({
  active = false,
  disabled = false,
  icon: Icon,
  label,
  onClick,
}: ToolButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={active ? 'is-active' : ''}
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
    </button>
  )
}

export function AdminRichTextToolbar({
  editor,
  language,
  onLanguageChange,
}: AdminRichTextToolbarProps) {
  const setLink = () => {
    const current = editor.getAttributes('link').href
    const href = window.prompt('Link URL', typeof current === 'string' ? current : 'https://')

    if (href === null) return
    if (!href.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: href.trim() }).run()
  }

  return (
    <div aria-label="Formatting toolbar" className="admin-rich-text__toolbar" role="toolbar">
      <div aria-label="Text structure" className="admin-rich-text__group" role="group">
        <select
          aria-label="Block type"
          onChange={(event) => {
            const value = event.currentTarget.value
            if (value === 'paragraph') editor.chain().focus().setParagraph().run()
            else
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(value) as 2 | 3 | 4 })
                .run()
          }}
          value={
            editor.isActive('heading', { level: 2 })
              ? '2'
              : editor.isActive('heading', { level: 3 })
                ? '3'
                : editor.isActive('heading', { level: 4 })
                  ? '4'
                  : 'paragraph'
          }
        >
          <option value="paragraph">Paragraph</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>
        <select
          aria-label="Text size"
          defaultValue=""
          onChange={(event) => {
            const size = event.currentTarget.value
            if (size) editor.chain().focus().setFontSize(size).run()
            else editor.chain().focus().unsetFontSize().run()
          }}
        >
          <option value="">Size</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="22px">22</option>
          <option value="28px">28</option>
        </select>
      </div>

      <div aria-label="Inline formatting" className="admin-rich-text__group" role="group">
        <ToolButton
          active={editor.isActive('bold')}
          icon={Bold}
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolButton
          active={editor.isActive('italic')}
          icon={Italic}
          label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolButton
          active={editor.isActive('underline')}
          icon={Underline}
          label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolButton
          active={editor.isActive('strike')}
          icon={Strikethrough}
          label="Strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolButton
          active={editor.isActive('code')}
          icon={Code2}
          label="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
        />
        <ToolButton active={editor.isActive('link')} icon={Link2} label="Link" onClick={setLink} />
      </div>

      <div aria-label="Lists and blocks" className="admin-rich-text__group" role="group">
        <ToolButton
          active={editor.isActive('bulletList')}
          icon={List}
          label="Bulleted list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolButton
          active={editor.isActive('orderedList')}
          icon={ListOrdered}
          label="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolButton
          active={editor.isActive('blockquote')}
          icon={Quote}
          label="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolButton
          icon={Minus}
          label="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>

      <div aria-label="Text alignment" className="admin-rich-text__group" role="group">
        <ToolButton
          active={editor.isActive({ textAlign: 'left' })}
          icon={AlignLeft}
          label="Align left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolButton
          active={editor.isActive({ textAlign: 'center' })}
          icon={AlignCenter}
          label="Align center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolButton
          active={editor.isActive({ textAlign: 'right' })}
          icon={AlignRight}
          label="Align right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
        <ToolButton
          active={editor.isActive({ textAlign: 'justify' })}
          icon={AlignJustify}
          label="Justify"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        />
      </div>

      <div aria-label="Code block" className="admin-rich-text__group" role="group">
        <ToolButton
          active={editor.isActive('codeBlock')}
          icon={Braces}
          label="Code block (PRE)"
          onClick={() => editor.chain().focus().toggleCodeBlock({ language }).run()}
        />
        <select
          aria-label="Code language"
          onChange={(event) => {
            const nextLanguage = event.currentTarget.value
            onLanguageChange(nextLanguage)
            if (editor.isActive('codeBlock'))
              editor.chain().focus().updateAttributes('codeBlock', { language: nextLanguage }).run()
          }}
          value={language}
        >
          {languages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div aria-label="Table tools" className="admin-rich-text__group" role="group">
        <ToolButton
          icon={Table2}
          label="Insert table"
          onClick={() =>
            editor.chain().focus().insertTable({ cols: 3, rows: 3, withHeaderRow: true }).run()
          }
        />
        <ToolButton
          disabled={!editor.isActive('table')}
          icon={Rows3}
          label="Add row"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        />
        <ToolButton
          disabled={!editor.isActive('table')}
          icon={Columns3}
          label="Add column"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        />
        <ToolButton
          disabled={!editor.isActive('table')}
          icon={Trash2}
          label="Delete table"
          onClick={() => editor.chain().focus().deleteTable().run()}
        />
      </div>

      <div aria-label="History and cleanup" className="admin-rich-text__group" role="group">
        <ToolButton
          disabled={!editor.can().undo()}
          icon={Undo2}
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolButton
          disabled={!editor.can().redo()}
          icon={Redo2}
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        />
        <ToolButton
          icon={Eraser}
          label="Clear formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        />
      </div>
    </div>
  )
}
