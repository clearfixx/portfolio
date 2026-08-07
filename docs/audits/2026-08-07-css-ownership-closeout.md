# Portfolio CSS ownership closeout audit — 2026-08-07

## Snapshot

- Repository: `clearfixx/portfolio`
- Branch: `agent/projects-index-css-modules`
- Audited head before closeout patch: `d49f781a0dd3eefde97b129988086d0e99e84609`
- Pre-closeout style inventory: 123 CSS Modules, 41 global Sass files.
- Local verification reported by the development workflow: style boundaries, lint,
  TypeScript, 48 integration tests, and the production build are green.

## Executive result

The public-facing CSS Module ownership migration is complete enough to close the
refactor branch. The previous page-sized About, Blog, Contacts, Projects, and
public-page ownership problems have been replaced by component- and
responsibility-level modules.

The closeout audit found no reason to continue mechanically splitting cohesive
component modules such as `PublicIndexCard.module.scss`.

## Closeout fixes

### 1. Remove orphaned public/project legacy CSS

The remaining `_public-pages.scss` and `_projects.scss` partials still contained
selectors from the pre-module implementations:

- old public article/project hero hooks;
- old public article/project summary blocks;
- old project-detail fallback window selectors;
- old global project code-preview token selectors.

The current Blog and Project routes no longer render those class names. Only the
route-to-footer spacing hooks remain valid, so they move to the narrow
`_public-route-boundaries.scss` global compatibility partial.

### 2. Localize the last Contact select keyframe

`_contact.scss` had been reduced to one `contact-select-enter` keyframe while the
animation consumer already lived in `ProjectTypeSelect.module.scss`.

The keyframe now lives with its component owner and the legacy Contact partial is
removed from the global cascade.

### 3. Remove misleading Sass helper imports

`abstracts/_functions.scss` is empty. `_global-foundation.scss` also imported
functions and mixins even though it did not consume them and Sass module members
do not leak into other `@use`d partials.

The empty functions module is removed. Compile-time mixins remain exposed only
through `abstracts/_module-api.scss`, which is the documented CSS Module API.

### 4. Enforce CSS Module ownership in `check:styles`

The style checker now validates the CSS Module import graph in addition to global
Sass boundaries:

- every CSS Module must have a React/TypeScript importer;
- a CSS Module cannot silently become multi-owner;
- intentionally shared modules must be explicitly allowlisted;
- missing module imports remain hard failures.

Intentional shared modules at closeout:

- `src/components/blog/BlogIcon.module.scss`;
- `src/components/home/ContactCTA/ContactFormFoundation.module.scss`;
- `src/components/home/ContactCTA/ContactFormMotionScope.module.scss`.

`ContactFormMotionScope.module.scss` is intentionally shared because the same
`ContactForm` reveal choreography is hosted by both the homepage `ContactCTA`
and the dedicated `/contacts` page.

### 5. Remove stale extraction metadata

The duplicated legacy comment in `BlogArticleSectionEyebrow.module.scss` is
removed.

## Intentional remaining global Sass

Global Sass is still valid where ownership is genuinely document/runtime-wide:

- runtime tokens, reset, accessibility and document shell;
- homepage section cascade that has not yet been migrated;
- cross-section motion choreography;
- cookie-consent compatibility/polish;
- the narrow public route → global footer boundary;
- Payload admin/native DOM compatibility styles.

These areas should not be converted merely to reduce the global Sass count.

## Remaining repository risks outside this refactor

### Sibling `dss-feeds` dependencies

`package.json` still references the three DSS feed packages through sibling
filesystem paths:

- `file:../dss-feeds/packages/github-feed`;
- `file:../dss-feeds/packages/x-feed`;
- `file:../dss-feeds/packages/instagram-feed`.

A standalone checkout is therefore not self-contained. This should be solved
before independent CI/production checkout by publishing the packages, adopting a
workspace topology, or explicitly checking out both repositories together.

### CI/status checks

The audited head has no commit status contexts, and this refactor branch does not
introduce a GitHub workflow. Local verification is strong, but merge protection
is still dependent on the developer running the verification suite.

This is a repository-delivery concern, not a reason to keep CSS ownership work
open.

## Closeout validation

Run:

```bash
pnpm check:styles
pnpm lint
pnpm typecheck
pnpm test:int
pnpm build
git diff --check
```

Expected post-closeout style inventory: 123 CSS Modules and 38 global Sass files.
