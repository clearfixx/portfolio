import type { AdminWorkspaceDefinition } from './types'

export function defineAdminWorkspace<TDocument>(
  definition: AdminWorkspaceDefinition<TDocument>,
): AdminWorkspaceDefinition<TDocument> {
  return definition
}
