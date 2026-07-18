'use client'

import {
  SaveButton,
  useForm,
  useFormInitializing,
  useFormModified,
  useFormProcessing,
} from '@payloadcms/ui'
import type { Data } from 'payload'
import { useState } from 'react'

type AdminSaveControlsProps = {
  initialData?: Data
}

export function AdminSaveControls({ initialData }: AdminSaveControlsProps) {
  const { reset } = useForm()
  const initializing = useFormInitializing()
  const modified = useFormModified()
  const processing = useFormProcessing()
  const [resetting, setResetting] = useState(false)

  const handleClear = async () => {
    const confirmed = window.confirm(
      initialData
        ? 'Discard all unsaved changes and restore the saved document?'
        : 'Clear all values entered in this form?',
    )

    if (!confirmed) return

    setResetting(true)

    try {
      await reset(initialData ?? {})
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className="admin-document-actions">
      <button
        className="admin-document-actions__clear"
        disabled={!modified || initializing || processing || resetting}
        onClick={() => void handleClear()}
        type="button"
      >
        {resetting ? 'Clearing…' : 'Clear form'}
      </button>
      <SaveButton />
    </div>
  )
}
