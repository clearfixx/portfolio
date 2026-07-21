import type { ReactNode } from 'react'

import {
  RegistryEditorShell,
  type RegistryEditorLine,
} from '@/components/editor/RegistryEditorShell'

type ProjectsRegistryEditorProps = {
  activeCount: number
  featuredTitle: string
  progress: number
  projectCount: number
}

export function ProjectsRegistryEditor({
  activeCount,
  featuredTitle,
  progress,
  projectCount,
}: ProjectsRegistryEditorProps) {
  const codeLines: RegistryEditorLine[] = [
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
    { key: 'type-close', content: '}' as ReactNode },
    { key: 'empty', content: '\u00A0' as ReactNode },
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
    { key: 'registry-close', content: '}' as ReactNode },
  ]

  return (
    <RegistryEditorShell
      ariaLabel="TypeScript project registry preview"
      codeLines={codeLines}
      fileName="project.registry.ts"
    />
  )
}
