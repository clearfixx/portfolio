import { common, createLowlight } from 'lowlight'

import previewShellStyles from './ProjectCodePreviewShell.module.scss'

import codeStyles from './ProjectCodePreviewCode.module.scss'
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

const highlightClassMap: Record<string, string> = {
  function_: codeStyles.functionTitle,
  'hljs-attr': codeStyles.attr,
  'hljs-built_in': codeStyles.builtIn,
  'hljs-bullet': codeStyles.bullet,
  'hljs-comment': codeStyles.comment,
  'hljs-function': codeStyles.functionGroup,
  'hljs-keyword': codeStyles.keyword,
  'hljs-link': codeStyles.link,
  'hljs-literal': codeStyles.literal,
  'hljs-meta': codeStyles.meta,
  'hljs-number': codeStyles.number,
  'hljs-operator': codeStyles.operator,
  'hljs-params': codeStyles.params,
  'hljs-property': codeStyles.property,
  'hljs-punctuation': codeStyles.punctuation,
  'hljs-quote': codeStyles.quote,
  'hljs-section': codeStyles.section,
  'hljs-selector-tag': codeStyles.selectorTag,
  'hljs-string': codeStyles.string,
  'hljs-symbol': codeStyles.symbol,
  'hljs-template-variable': codeStyles.templateVariable,
  'hljs-title': codeStyles.title,
  'hljs-type': codeStyles.type,
  'hljs-variable': codeStyles.variable,
}

function getHighlightClassName(classNames: string[]) {
  const localClassNames = classNames
    .map((className) => highlightClassMap[className])
    .filter((className): className is string => Boolean(className))

  return localClassNames.length > 0 ? localClassNames.join(' ') : undefined
}

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
    <div className={previewShellStyles.card}>
      <div className={previewShellStyles.header}>
        <span>{filePath}</span>
        <strong>{language}</strong>
      </div>

      <ol className={codeStyles.code}>
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>
            <code>
              {line.length > 0
                ? line.map((fragment, fragmentIndex) => (
                    <span
                      className={getHighlightClassName(fragment.classNames)}
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
