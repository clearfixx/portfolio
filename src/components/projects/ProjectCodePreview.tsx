import { common, createLowlight } from 'lowlight'

type HighlightNode = {
  type: 'element' | 'root' | 'text'
  value?: string
  properties?: {
    className?: string | string[]
  }
  children?: HighlightNode[]
}

type HighlightFragment = {
  classNames: string[]
  text: string
}

type ProjectCodePreviewProps = {
  code: string
  filePath: string
  language: string
}

const lowlight = createLowlight(common)

const languageAliases: Record<string, string> = {
  bash: 'bash',
  css: 'css',
  javascript: 'javascript',
  json: 'json',
  jsx: 'javascript',
  scss: 'scss',
  shell: 'bash',
  ts: 'typescript',
  tsx: 'typescript',
  typescript: 'typescript',
}

function normalizeClassNames(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value
  }

  return value ? [value] : []
}

function flattenTree(node: HighlightNode, inheritedClassNames: string[] = []): HighlightFragment[] {
  if (node.type === 'text') {
    return [
      {
        classNames: inheritedClassNames,
        text: node.value ?? '',
      },
    ]
  }

  const ownClassNames =
    node.type === 'element' ? normalizeClassNames(node.properties?.className) : []
  const classNames = [...inheritedClassNames, ...ownClassNames]

  return (node.children ?? []).flatMap((child) => flattenTree(child, classNames))
}

function splitIntoLines(fragments: HighlightFragment[]) {
  const lines: HighlightFragment[][] = [[]]

  for (const fragment of fragments) {
    const parts = fragment.text.split('\n')

    parts.forEach((part, index) => {
      if (part) {
        lines[lines.length - 1].push({
          classNames: fragment.classNames,
          text: part,
        })
      }

      if (index < parts.length - 1) {
        lines.push([])
      }
    })
  }

  return lines
}

function highlightCode(code: string, language: string) {
  const normalizedLanguage = languageAliases[language.toLowerCase()] ?? 'typescript'

  try {
    const tree = lowlight.highlight(normalizedLanguage, code) as unknown as HighlightNode

    return splitIntoLines(flattenTree(tree))
  } catch {
    return code.split('\n').map((line) => [
      {
        classNames: [],
        text: line,
      },
    ])
  }
}

export function ProjectCodePreview({ code, filePath, language }: ProjectCodePreviewProps) {
  const lines = highlightCode(code, language)

  return (
    <div className="project-case__code-card">
      <div className="project-case__code-header">
        <span>{filePath}</span>
        <strong>{language}</strong>
      </div>

      <ol className="project-code-highlight">
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>
            <code>
              {line.length > 0
                ? line.map((fragment, fragmentIndex) => (
                    <span
                      className={
                        fragment.classNames.length > 0 ? fragment.classNames.join(' ') : undefined
                      }
                      key={`${lineIndex}-${fragmentIndex}`}
                    >
                      {fragment.text}
                    </span>
                  ))
                : ' '}
            </code>
          </li>
        ))}
      </ol>
    </div>
  )
}
