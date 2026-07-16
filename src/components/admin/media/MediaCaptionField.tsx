// Portfolio Admin Experience - Media Caption Field v1
'use client'

import { useField } from '@payloadcms/ui'
import { useMemo, useState } from 'react'

type Props = {
  path: string
}

function normalize(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

export default function MediaCaptionField({ path }: Props) {
  const { errorMessage, readOnly, setValue, showError, value } = useField<string>({ path })

  const [expanded, setExpanded] = useState(false)
  const caption = normalize(value)

  const wordCount = useMemo(() => {
    const normalized = caption.trim()

    return normalized ? normalized.split(/\s+/u).length : 0
  }, [caption])

  const descriptionID = `${path}-caption-description`
  const errorID = `${path}-caption-error`
  const inputID = `${path}-caption`

  return (
    <div
      className={[
        'portfolio-admin-media-caption',
        expanded ? 'is-expanded' : '',
        showError ? 'has-error' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="portfolio-admin-media-caption__header">
        <div>
          <label htmlFor={inputID}>Caption</label>
          <span id={descriptionID}>Optional human-readable image caption.</span>
        </div>

        <button
          aria-expanded={expanded}
          className="portfolio-admin-media-caption__expand"
          onClick={() => setExpanded((current) => !current)}
          type="button"
        >
          {expanded ? 'Collapse editor' : 'Expand editor'}

          <svg aria-hidden="true" fill="none" viewBox="0 0 18 18">
            <path
              d={expanded ? 'M5.5 7.5h5v5m0-5L5 13' : 'M12.5 10.5h-5v-5m0 5L13 5'}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </button>
      </div>

      <textarea
        aria-describedby={`${descriptionID}${showError && errorMessage ? ` ${errorID}` : ''}`}
        disabled={readOnly}
        id={inputID}
        onChange={(event) => setValue(event.currentTarget.value)}
        rows={expanded ? 22 : 10}
        value={caption}
      />

      <footer className="portfolio-admin-media-caption__footer">
        <span>
          <strong>{caption.length.toLocaleString('en')}</strong>
          {' characters'}
        </span>

        <span>
          <strong>{wordCount.toLocaleString('en')}</strong>
          {' words'}
        </span>
      </footer>

      {showError && errorMessage ? (
        <span className="portfolio-admin-media-caption__error" id={errorID}>
          {String(errorMessage)}
        </span>
      ) : null}
    </div>
  )
}
