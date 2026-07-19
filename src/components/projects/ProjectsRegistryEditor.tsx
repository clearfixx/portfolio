import type { ReactNode } from 'react'

import { CodeIcon, FileTextIcon, GitBranchIcon, SearchIcon } from '@/components/icons/project'

type ProjectsRegistryEditorProps = {
  activeCount: number
  featuredTitle: string
  progress: number
  projectCount: number
}

type CodeLine = {
  content: ReactNode
  key: string
}

export function ProjectsRegistryEditor({
  activeCount,
  featuredTitle,
  progress,
  projectCount,
}: ProjectsRegistryEditorProps) {
  const codeLines: CodeLine[] = [
    {
      key: 'type-open',
      content: (
        <>
          <span className="token-keyword">type</span>{' '}
          <span className="token-type">RegistrySnapshot</span>{' '}
          <span className="token-operator">=</span> {'{'}
        </>
      ),
    },
    {
      key: 'projects-type',
      content: (
        <>
          {'  '}projects
          <span className="token-punctuation">:</span> <span className="token-type">number</span>
        </>
      ),
    },
    {
      key: 'active-type',
      content: (
        <>
          {'  '}active
          <span className="token-punctuation">:</span> <span className="token-type">number</span>
        </>
      ),
    },
    {
      key: 'progress-type',
      content: (
        <>
          {'  '}progress
          <span className="token-punctuation">:</span> <span className="token-type">number</span>
        </>
      ),
    },
    {
      key: 'featured-type',
      content: (
        <>
          {'  '}featured
          <span className="token-punctuation">:</span> <span className="token-type">string</span>
        </>
      ),
    },
    {
      key: 'type-close',
      content: '}' as ReactNode,
    },
    {
      key: 'empty',
      content: '\u00A0' as ReactNode,
    },
    {
      key: 'registry-open',
      content: (
        <>
          <span className="token-keyword">export const</span>{' '}
          <span className="token-variable">registry</span>
          <span className="token-punctuation">:</span>{' '}
          <span className="token-type">RegistrySnapshot</span>{' '}
          <span className="token-operator">=</span> {'{'}
        </>
      ),
    },
    {
      key: 'counts',
      content: (
        <>
          {'  '}projects
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{projectCount}</span>
          <span className="token-punctuation">,</span> active
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{activeCount}</span>
          <span className="token-punctuation">,</span>
        </>
      ),
    },
    {
      key: 'progress',
      content: (
        <>
          {'  '}progress
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{progress}</span>
          <span className="token-punctuation">,</span>
        </>
      ),
    },
    {
      key: 'featured',
      content: (
        <>
          {'  '}featured
          <span className="token-punctuation">:</span>{' '}
          <span className="token-string">&apos;{featuredTitle}&apos;</span>
          <span className="token-punctuation">,</span>
        </>
      ),
    },
    {
      key: 'registry-close',
      content: '}' as ReactNode,
    },
  ]

  return (
    <section aria-label="TypeScript project registry preview" className="projects-registry-editor">
      <header className="projects-registry-editor__titlebar">
        <div aria-hidden="true" className="projects-registry-editor__traffic-lights">
          <span className="is-close" />
          <span className="is-minimize" />
          <span className="is-maximize" />
        </div>

        <div className="projects-registry-editor__window-title">
          <FileTextIcon aria-hidden="true" size={13} />
          <span>project.registry.ts</span>
          <small>Portfolio</small>
        </div>

        <span className="projects-registry-editor__language-badge">TypeScript</span>
      </header>

      <div className="projects-registry-editor__tabs">
        <div className="projects-registry-editor__tab is-active">
          <span aria-hidden="true" className="projects-registry-editor__ts-icon">
            TS
          </span>
          <span>project.registry.ts</span>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="projects-registry-editor__workspace">
        <aside aria-hidden="true" className="projects-registry-editor__activitybar">
          <FileTextIcon size={17} />
          <SearchIcon size={17} />
          <GitBranchIcon size={17} />
          <CodeIcon size={17} />
        </aside>

        <ol className="projects-registry-editor__code">
          {codeLines.map((line, index) => (
            <li key={line.key}>
              <span aria-hidden="true" className="projects-registry-editor__line-number">
                {index + 1}
              </span>
              <code>{line.content}</code>
            </li>
          ))}
        </ol>

        <div aria-hidden="true" className="projects-registry-editor__minimap">
          <span style={{ width: '72%' }} />
          <span style={{ width: '84%' }} />
          <span style={{ width: '66%' }} />
          <span style={{ width: '78%' }} />
          <span style={{ width: '58%' }} />
          <span style={{ width: '24%' }} />
          <span className="is-empty" />
          <span style={{ width: '92%' }} />
          <span style={{ width: '82%' }} />
          <span style={{ width: '61%' }} />
          <span style={{ width: '88%' }} />
          <span style={{ width: '24%' }} />
        </div>
      </div>

      <footer className="projects-registry-editor__statusbar">
        <div>
          <span>
            <GitBranchIcon aria-hidden="true" size={12} />
            main*
          </span>
          <span>↻ 0</span>
          <span>× 0 △ 0</span>
        </div>

        <div>
          <span>Ln 12, Col 2</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>{'{}'} TypeScript</span>
          <span className="is-prettier">✓ Prettier</span>
        </div>
      </footer>
    </section>
  )
}
