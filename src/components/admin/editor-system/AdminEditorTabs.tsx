'use client'

import type { AdminEditorTab } from './types'

type Props = { activeId: string; onChange: (id: string) => void; tabs: AdminEditorTab[] }

export function AdminEditorTabs({ activeId, onChange, tabs }: Props) {
  return (
    <div aria-label="Editor sections" className="admin-editor-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          aria-selected={tab.id === activeId}
          className="admin-editor-tabs__tab"
          disabled={tab.disabled}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          type="button"
        >
          <span>{tab.label}</span>
          {tab.badge !== undefined ? <small>{tab.badge}</small> : null}
        </button>
      ))}
    </div>
  )
}
