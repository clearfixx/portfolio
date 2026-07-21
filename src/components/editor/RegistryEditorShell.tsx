import type { ReactNode } from 'react'

import { CodeIcon, FileTextIcon, GitBranchIcon, SearchIcon } from '@/components/icons/project'

export type RegistryEditorLine = {
  content: ReactNode
  key: string
}

type RegistryEditorShellProps = {
  ariaLabel: string
  codeLines: RegistryEditorLine[]
  fileName: string
  language?: string
  projectLabel?: string
}

export function RegistryEditorShell({
  ariaLabel,
  codeLines,
  fileName,
  language = 'TypeScript',
  projectLabel = 'Portfolio',
}: RegistryEditorShellProps) {
  return (
    <section aria-label={ariaLabel} className="projects-registry-editor">
      <header className="projects-registry-editor__titlebar">
        <div aria-hidden="true" className="projects-registry-editor__traffic-lights">
          <span className="is-close" />
          <span className="is-minimize" />
          <span className="is-maximize" />
        </div>

        <div className="projects-registry-editor__window-title">
          <FileTextIcon aria-hidden="true" size={13} />
          <span>{fileName}</span>
          <small>{projectLabel}</small>
        </div>

        <span className="projects-registry-editor__language-badge">{language}</span>
      </header>

      <div className="projects-registry-editor__tabs">
        <div className="projects-registry-editor__tab is-active">
          <span aria-hidden="true" className="projects-registry-editor__ts-icon">
            TS
          </span>
          <span>{fileName}</span>
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
          <span>Ln {codeLines.length}, Col 2</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>
            {'{}'} {language}
          </span>
          <span className="is-prettier">✓ Prettier</span>
        </div>
      </footer>
    </section>
  )
}
