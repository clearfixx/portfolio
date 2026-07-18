import type { ReactNode } from 'react'

export function AdminDocumentShell({ children, id }: { children: ReactNode; id: string }) {
  return (
    <div className="admin-document-shell" data-admin-workspace={id}>
      {children}
    </div>
  )
}

export function AdminEditorWorkspace({ main, sidebar }: { main: ReactNode; sidebar?: ReactNode }) {
  return (
    <div className="admin-editor-workspace">
      <main className="admin-editor-main">{main}</main>
      {sidebar ? <AdminDocumentSidebar>{sidebar}</AdminDocumentSidebar> : null}
    </div>
  )
}

export function AdminDocumentSidebar({ children }: { children: ReactNode }) {
  return <aside className="admin-editor-sidebar">{children}</aside>
}
