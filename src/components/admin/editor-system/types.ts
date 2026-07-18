import type { ReactNode } from 'react'

export type AdminStatusTone = 'archived' | 'draft' | 'published' | 'warning' | 'neutral'

export type AdminDocumentHeaderConfig = {
  actions?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  metadata?: Array<{ label: string; value: ReactNode }>
  status?: { label: string; tone?: AdminStatusTone }
  title: ReactNode
}

export type AdminEditorTab = {
  badge?: number | string
  description?: string
  disabled?: boolean
  id: string
  label: string
}

export type AdminSidebarSection = {
  content: ReactNode
  description?: ReactNode
  id: string
  priority?: number
  title?: ReactNode
}

export type AdminWorkspaceDefinition<TDocument = Record<string, unknown>> = {
  header: AdminDocumentHeaderConfig | ((document: TDocument) => AdminDocumentHeaderConfig)
  id: string
  readiness?: AdminReadinessDefinition<TDocument>
  tabs?: AdminEditorTab[]
}

export type AdminReadinessCheck<TDocument> = {
  description?: string
  evaluate: (document: TDocument) => boolean
  id: string
  label: string
  weight?: number
}

export type AdminReadinessDefinition<TDocument> = {
  checks: AdminReadinessCheck<TDocument>[]
  id: string
  label: string
}

export type AdminReadinessCheckResult = {
  description?: string
  id: string
  label: string
  ready: boolean
  weight: number
}

export type AdminReadinessResult = {
  checks: AdminReadinessCheckResult[]
  completed: number
  score: number
  state: 'empty' | 'in-progress' | 'ready'
  total: number
}
