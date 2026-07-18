# Admin Editor Architecture 2.0

## Audit baseline

Baseline: `92122a4` (`main`). The admin stylesheet contained 7,022 lines before this phase.

| Area                                     | Existing implementation                             | Decision                                                                                  |
| ---------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Global shell                             | `AdminNav`, `AdminTopBar`, Payload config           | Keep; outside document editors                                                            |
| Projects                                 | Custom controls, health panel, tabs and sidebar CSS | Migrate to shared header/readiness; keep field-specific progress control                  |
| Blog posts                               | Custom controls, readiness, tabs and sidebar CSS    | Migrate to shared header/readiness                                                        |
| Media                                    | Custom workspace, readiness and editor geometry     | Migrate shared primitives; keep asset preview/source UI                                   |
| Testimonials                             | Moderation controls and panel                       | Keep domain operations; migrate layout in follow-up adapter                               |
| Contact messages                         | Viewer, operations and status                       | Keep domain operations; migrate layout in follow-up adapter                               |
| Categories, Project Versions, Tech Stack | Payload-native editors                              | Use shared compatibility layout; add workspace definitions when domain metadata is needed |
| Globals                                  | Payload-native fields and tabs                      | Keep; shared compatibility layout applies where safe                                      |

## Contracts

- `defineAdminWorkspace` is the only declaration entry point for document editor configuration.
- `defineReadiness` and `evaluateReadiness` are the only readiness calculation engine.
- `AdminDocumentHeader`, `AdminEditorTabs`, `AdminDocumentShell`, `AdminEditorWorkspace`,
  `AdminDocumentSidebar`, and `AdminReadiness` own presentation.
- Payload's tabs remain the state/validation owner. The editor-system stylesheet is the documented
  compatibility adapter; collection-specific tab geometry is not allowed.
- Collection adapters may read Payload form state, but must pass normalized data into shared UI.

## Adding an editor

1. Create `<collection>.workspace.ts` and declare it with `defineAdminWorkspace`.
2. Put readiness checks in the same editor folder and declare them with `defineReadiness`.
3. Render the shared components from thin Payload field/control adapters.
4. Do not add collection-specific shell, tab, sidebar width, padding, or readiness CSS.

## Compatibility boundary

`src/app/(payload)/editor-system.scss` is the only place allowed to target Payload document layout
classes (`.document-fields__main`, `.document-fields__sidebar`, `.tabs-field__*`). Selectors there
must apply to the editor system as a whole and must not name a collection.
