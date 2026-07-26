# Portfolio code and style audit — 2026-07-26

## Repository snapshot

- Repository: `clearfixx/portfolio`
- Audited branch: `main`
- Audited main commit: `af845f4ed08162bacf7a0bd7c7753b000ccb0e22`
- Merged PR: `#3 Agent/admin ux 2 editor system`
- PR head: `822b681fc484ec59e8edfb627f6f476ee2ddb8c7`
- Git tree comparison: no changed files between the PR head tree and merged `main`.
- The remote feature branch has been deleted. Git history differs because `main`
  contains the merge topology, but repository content at the merge is identical.

## Executive assessment

The application has a strong feature baseline, strict TypeScript, extensive
manual verification scripts, integration tests, Playwright coverage, and a
coherent CMS/data layer. The largest maintainability risk is now stylesheet and
UI ownership rather than missing product functionality.

The codebase is ready for a controlled refactor, but not for a mechanical
“rename every SCSS file to module.scss” pass. Existing global cascade,
Payload-native selectors, page modules, and shared shells need different
migration strategies.

## Findings

### High — non-reproducible clean checkout

`package.json` references all three DSS feed packages through sibling filesystem
paths:

- `file:../dss-feeds/packages/github-feed`
- `file:../dss-feeds/packages/x-feed`
- `file:../dss-feeds/packages/instagram-feed`

A standalone clone cannot install or run CI unless that sibling repository is
also present in the expected location. Before production CI, choose one:

1. publish versioned packages;
2. convert both repositories into one workspace;
3. make CI check out `dss-feeds` beside `portfolio`.

### High — stylesheet ownership is mixed

Frontend global Sass currently combines tokens, base styles, navigation,
homepage sections, public pages, projects, tooltips, responsive overrides, and
late polish layers in one order-dependent entrypoint.

Admin styles are more concentrated:

- `custom.scss` is roughly 8.6k lines;
- `editor-system.scss` is roughly 1.1k lines.

`custom.scss` mixes four different concerns: theme tokens, Payload compatibility,
repository-owned component styles, and accumulated overrides. It must be
classified before component modules are extracted.

### Medium — CSS Modules exist but are page monoliths

The migration has already started, but current modules are too large to be stable
ownership units:

- `about.module.scss`: roughly 3.7k lines;
- `blog.module.scss`: roughly 2.4k lines;
- `contacts.module.scss`: roughly 1.25k lines.

They should be split by rendered component family. One module per route is
better than global leakage, but it still makes review, deletion, reuse, and
regression isolation difficult.

### Medium — shared and page UI use different styling models

`PublicPageShell` and related public-page primitives emit global BEM class names,
while About, Blog, and Contacts add route CSS Modules around them. Projects still
uses global class strings throughout `ProjectDirectory` and the index page.

That creates two sources of truth for spacing, hero geometry, responsive
behavior, and component state.

### Medium — large rendering components

The Blog index combines taxonomy aggregation, filtering/sorting, pagination,
icon definitions, image rendering, and the complete page tree in one server
component.

`ProjectDirectory` combines query/filter/sort/pagination state with the full
project row rendering in one client component.

Split data/view-model logic from rendered component families before or alongside
their stylesheet extraction. Otherwise CSS Modules will simply mirror the same
monoliths.

### Medium — hardcoded page palettes bypass shared tokens

The About and Blog modules define extensive route-specific color values. Contacts
mostly consumes shared RGB tokens and is closer to the desired system.

Normalize route aliases to global runtime tokens before duplicating new palettes
inside extracted modules.

### Medium — verification is local only

The repository has good scripts (`lint`, `typecheck`, Vitest, Playwright, build,
environment checks, and aggregate verify commands), but the audited commit has no
GitHub status checks or workflow runs.

CI should be added after the sibling `dss-feeds` dependency issue is resolved.

### Low — misleading Sass abstractions

`abstracts/_functions.scss` is empty. `styles.scss` also `@use`s functions and
mixins even though Sass module members are not implicitly shared with imported
partials.

A dedicated compile-time module API is clearer and prevents accidental import of
the runtime-token stylesheet into every CSS Module.

## Changes introduced by the foundation patch

1. Keep `styles.scss` as a two-line ownership entrypoint.
2. Move stable global infrastructure imports to `_global-foundation.scss`.
3. Move the exact legacy cascade, in the same order, to `_legacy-bundle.scss`.
4. Add `abstracts/_module-api.scss` for safe compile-time Sass helpers.
5. Add `pnpm check:styles` to block new component-level global Sass imports.
6. Add a documented migration contract.

This patch does not rename selectors or change the generated CSS order.

## Recommended migration sequence

1. **Projects index**
   - smallest remaining complete public route still using global class strings;
   - split hero, directory controls, row, preview, and CTA modules.
2. **Public page primitives**
   - migrate shell, breadcrumbs, hero frame, and loading primitives;
   - keep only document-level route variables global.
3. **Navigation**
   - move repository-owned Navbar/SiteHeader styles into modules;
   - preserve document scroll/hash behavior in the global foundation.
4. **Existing page modules**
   - split Contacts first, then Blog, then About by component ownership.
5. **Homepage sections**
   - move section-by-section and remove each corresponding legacy `@use`.
6. **Admin**
   - first extract tokens and Payload compatibility layers without visual change;
   - then migrate only repository-owned React component families to modules.
7. **CI**
   - make DSS feed dependencies reproducible;
   - run `check:styles`, lint, typecheck, integration tests, and build on PRs.

## Validation commands

```bash
pnpm check:styles
pnpm lint
pnpm typecheck
pnpm test:int
pnpm build
git diff --check
```
