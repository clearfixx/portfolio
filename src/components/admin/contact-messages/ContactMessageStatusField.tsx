// Portfolio Admin Experience - Contact Message Status Field v2
'use client'

import { useField } from '@payloadcms/ui'

type Status = 'archived' | 'new' | 'read'
type Props = { path: string }

const options: Array<{ label: string; value: Status }> = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Archived', value: 'archived' },
]

function normalize(value: unknown): Status {
  return value === 'read' || value === 'archived' ? value : 'new'
}

export default function ContactMessageStatusField({ path }: Props) {
  const { readOnly, setValue, value } = useField<Status>({ path })
  const status = normalize(value)
  const id = `${path}-native-status`

  return (
    <div className={`portfolio-admin-custom-status-field is-message is-${status}`}>
      <label htmlFor={id}>
        Status <span aria-hidden="true">*</span>
      </label>

      <div className="portfolio-admin-custom-status-field__control">
        <i aria-hidden="true" />

        <select
          disabled={readOnly}
          id={id}
          onChange={(event) => setValue(normalize(event.currentTarget.value))}
          value={status}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  )
}
