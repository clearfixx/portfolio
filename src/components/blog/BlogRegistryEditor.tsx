import type { ReactNode } from 'react'

import {
  RegistryEditorShell,
  type RegistryEditorLine,
} from '@/components/editor/RegistryEditorShell'

type BlogRegistryEditorProps = {
  articleCount: number
  featuredTitle: string
  seriesCount: number
  topicCount: number
}

export function BlogRegistryEditor({
  articleCount,
  featuredTitle,
  seriesCount,
  topicCount,
}: BlogRegistryEditorProps) {
  const codeLines: RegistryEditorLine[] = [
    {
      key: 'type-open',
      content: (
        <>
          <span className="token-keyword">type</span>{' '}
          <span className="token-type">JournalSnapshot</span>{' '}
          <span className="token-operator">=</span> {'{'}
        </>
      ),
    },
    {
      key: 'articles-type',
      content: (
        <>
          {'  '}articles
          <span className="token-punctuation">:</span> <span className="token-type">number</span>
        </>
      ),
    },
    {
      key: 'topics-type',
      content: (
        <>
          {'  '}topics
          <span className="token-punctuation">:</span> <span className="token-type">number</span>
        </>
      ),
    },
    {
      key: 'series-type',
      content: (
        <>
          {'  '}series
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
      key: 'journal-open',
      content: (
        <>
          <span className="token-keyword">export const</span>{' '}
          <span className="token-variable">journal</span>
          <span className="token-punctuation">:</span>{' '}
          <span className="token-type">JournalSnapshot</span>{' '}
          <span className="token-operator">=</span> {'{'}
        </>
      ),
    },
    {
      key: 'counts',
      content: (
        <>
          {'  '}articles
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{articleCount}</span>
          <span className="token-punctuation">,</span> topics
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{topicCount}</span>
          <span className="token-punctuation">,</span>
        </>
      ),
    },
    {
      key: 'series',
      content: (
        <>
          {'  '}series
          <span className="token-punctuation">:</span>{' '}
          <span className="token-number">{seriesCount}</span>
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
    { key: 'journal-close', content: '}' as ReactNode },
  ]

  return (
    <RegistryEditorShell
      ariaLabel="TypeScript engineering journal registry preview"
      codeLines={codeLines}
      fileName="journal.registry.ts"
    />
  )
}
