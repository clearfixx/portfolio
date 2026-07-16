// Portfolio Admin Experience - Project Progress Field v1
'use client'

import type { CSSProperties } from 'react'
import { useField } from '@payloadcms/ui'

type Props = { path: string }

function clamp(value: unknown): number {
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : 0
}

export default function ProjectProgressField({ path }: Props) {
  const { readOnly, setValue, value } = useField<number>({ path })
  const progress = clamp(value)
  const style = { '--project-progress': `${progress}%` } as CSSProperties
  const update = (next: unknown) => {
    if (!readOnly) setValue(clamp(next))
  }

  return (
    <div className="portfolio-admin-project-progress-field" style={style}>
      <div className="portfolio-admin-project-progress-field__head">
        <label htmlFor={`${path}-number`}>Progress</label>
        <output htmlFor={`${path}-range ${path}-number`}>{progress}%</output>
      </div>

      <div className="portfolio-admin-project-progress-field__controls">
        <input
          aria-label="Project progress"
          disabled={readOnly}
          id={`${path}-range`}
          max={100}
          min={0}
          onChange={(event) => update(event.currentTarget.value)}
          step={1}
          type="range"
          value={progress}
        />

        <label className="portfolio-admin-project-progress-field__number">
          <span className="sr-only">Exact progress percentage</span>
          <input
            disabled={readOnly}
            id={`${path}-number`}
            max={100}
            min={0}
            onChange={(event) => update(event.currentTarget.value)}
            step={1}
            type="number"
            value={progress}
          />
          <span aria-hidden="true">%</span>
        </label>
      </div>

      <p>Track delivery completion from 0 to 100.</p>
    </div>
  )
}
