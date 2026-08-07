# CSS Modules migration contract

## Boundary

Only two route-level global Sass entrypoints are allowed:

- `src/app/(frontend)/layout.tsx` → `./styles.scss`
- `src/app/(payload)/layout.tsx` → `./custom.scss`

Every React-owned visual component should ultimately import a colocated
`*.module.scss` file. Global selectors remain valid only for document primitives,
shared runtime tokens, third-party DOM, and unavoidable Payload compatibility
overrides.

## Frontend bundles

`styles.scss` is deliberately only an entrypoint:

- `_global-foundation.scss` contains runtime tokens, reset, base layout,
  accessibility/motion infrastructure, and the cross-route shell.
- `_legacy-bundle.scss` is the explicit migration queue. Removing an `@use`
  from that file means its selectors have moved into component-owned modules.

Do not reorder `_legacy-bundle.scss` during migration. Existing styles have
accumulated cascade dependencies, so each slice must be moved and visually
verified independently.

## Runtime tokens and Sass helpers

`abstracts/_variables.scss` emits `:root` and light-theme CSS. CSS Modules should
consume those custom properties directly and must not `@use` that file.

Compile-time mixins/functions are exposed through:

```scss
@use '../abstracts/module-api' as module;
```

Adjust the relative path for the module location.

## Module sizing

A page-sized module is only a transition state. Target roughly 300–600 lines per
ownership slice and split by rendered component, not by arbitrary selector type.

Public-route ownership baseline completed in the CSS ownership refactor:

- About is split by hero, profile-console slices, career, operating-system slices,
  focus, experience, personal signals, CTA, and page shell.
- Blog index/detail are split by rendered ownership slice, including hero,
  newsletter, pagination, rails, article content, actions, related content, and
  discussion primitives.
- Contacts, Projects, navigation, public-page primitives, and technical previews
  use colocated CSS Modules.
- Homepage section Sass and Payload compatibility Sass remain explicit global
  migration queues; do not split them mechanically.

Intentional shared CSS Modules:

- `src/components/blog/BlogIcon.module.scss` — shared icon primitive.
- `src/components/home/ContactCTA/ContactFormFoundation.module.scss` — shared
  field structure consumed by `ContactForm` and `ProjectTypeSelect`.
- `src/components/home/ContactCTA/ContactFormMotionScope.module.scss` — shared
  reveal choreography consumed by the homepage `ContactCTA` and `/contacts`
  page around the same `ContactForm`.

## Automated ownership audit

`pnpm check:styles` validates both Sass boundaries and the CSS Module import graph:

- every CSS Module must have at least one React/TypeScript owner;
- multi-owner modules must be explicitly allowlisted as intentional shared
  primitives;
- global Sass cannot import CSS Modules;
- components cannot introduce new non-module Sass imports outside the approved
  layout entrypoints.

Keep the shared-module allowlist small. If an exception stops being shared, remove
it instead of leaving a permanent bypass.

## Admin UI

Payload's generated/native DOM selectors are a global compatibility boundary and
must stay in global Sass. Styles for React components owned by this repository
(`portfolio-admin-*`, `admin-document-*`) should migrate to CSS Modules one
component family at a time.

Do not convert `custom.scss` wholesale. First separate:

1. admin tokens and Payload theme variables;
2. Payload compatibility selectors;
3. repository-owned component selectors;
4. editor-specific compatibility overrides.

## Rules

- No new non-module `.scss` imports from components.
- No `*.module.scss` imports from global Sass bundles.
- Use `:global(...)` only for a documented third-party or runtime attribute
  boundary.
- Prefer shared CSS custom properties over new hardcoded page palettes.
- Run `pnpm check:styles` before lint/typecheck/build.
