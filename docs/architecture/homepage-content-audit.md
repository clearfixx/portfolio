# Homepage Content Architecture Audit

**Phase:** 6.1.0  
**Baseline:** `main`, inspected 2026-07-12  
**Scope:** public landing page content only  
**Status:** architecture decision record and migration plan; no runtime changes

---

## 1. Purpose

The landing page currently mixes four different kinds of data inside React components:

1. editorial content that should be managed in Payload;
2. reusable domain entities that already belong to Payload collections;
3. operational data that should be derived or fetched from integrations;
4. structural and visual UI data that should remain in code.

The goal of Phase 6.1 is not to move every string into Payload. The goal is to establish one authoritative source for editable content while keeping UI mechanics, accessibility labels, animation state, and demo fixtures in the frontend.

The migration must preserve the current visual design and motion system.

---

## 2. Current landing data flow

The public page currently loads only two Payload globals:

```ts
const [homepage, contact] = await Promise.all([getHomepage(), getContact()])
```

Observed usage:

| Payload value                  | Current consumer | Actual use                                                                       |
| ------------------------------ | ---------------- | -------------------------------------------------------------------------------- |
| `Homepage.hero`                | `Hero`           | CTA labels and URLs are consumed; most hero fields are bypassed by hardcoded JSX |
| `Homepage.featuredProjects`    | none             | unused                                                                           |
| `Homepage.selectedTechStack`   | none             | unused                                                                           |
| `Homepage.testimonialsSection` | none             | unused                                                                           |
| `Homepage.socialFeedsSection`  | none             | unused                                                                           |
| `Homepage.contactSection`      | `ContactCTA`     | passed as `unknown`, then intentionally ignored                                  |
| `Contact` global               | `ContactCTA`     | passed as `unknown`, then intentionally ignored                                  |

Every other landing section constructs its own content internally.

### Architectural consequence

Payload is not yet the source of truth for the landing page. It is an optional side channel beside a larger hardcoded content system.

---

## 3. Content ownership rules

Every landing value must be classified before migration.

### 3.1 Payload global

Use a global when the data represents one site-wide identity or one page composition.

Examples:

- personal profile and biography;
- contact details;
- social profile URLs;
- homepage section headings;
- homepage selection and ordering of related records;
- footer editorial copy.

### 3.2 Payload collection

Use a collection when the record has independent meaning and may appear on more than one page.

Existing collections that must remain authoritative:

- `projects`;
- `blog-posts`;
- `testimonials`;
- `tech-stack`;
- `categories`;
- `media`.

Do not duplicate collection fields inside `Homepage`.

### 3.3 Derived or integration data

Do not manually store values that can be calculated or fetched reliably.

Examples:

- published project count;
- years of experience from a start date;
- current year;
- blog reading time;
- GitHub commits, stars, releases, and latest activity;
- real social feed counters.

Temporary manual metrics may live in `Profile`, but they must be explicitly marked as manual and later replaceable by integrations.

### 3.4 Frontend fixture

Keep data in code when it exists to demonstrate a UI concept rather than represent real site content.

Examples:

- terminal boot sequence;
- code editor sample;
- DSS Mission Control dashboard mock;
- syntax-highlighted fallback preview;
- animation timelines and active-state sequences.

Fixtures must be named clearly and must not pretend to be live production data.

### 3.5 Frontend structure

Keep structural UI constants in code.

Examples:

- section IDs and navigation anchors;
- navbar labels;
- form field labels and machine values;
- validation and status messages;
- icon maps;
- CSS tones;
- motion states;
- accessibility labels;
- section numbering.

---

## 4. Existing Payload model assessment

### 4.1 Collections already suitable

#### `Projects`

Already contains the main card and detail-page domain data:

- `title`;
- `slug`;
- `excerpt`;
- `description`;
- `coverImage`;
- `featuredImage`;
- `stage`;
- `progress`;
- `currentVersion`;
- `isFeatured`;
- dates;
- `category`;
- `techStack`;
- related blog posts;
- GitHub configuration;
- links;
- gallery;
- highlights;
- SEO.

The landing must consume this collection instead of recreating project records in `FeaturedProjects/data.ts`.

Potential small addition:

```ts
cardTagline?: string
```

This is needed only if the short marketing line shown in a project preview cannot be represented by `excerpt`.

#### `TechStack`

Already contains:

- `name`;
- slug/icon key;
- `description`;
- brand color;
- category;
- official and documentation URLs;
- `featured`;
- `visible`;
- `sortOrder`.

Technology names must not be duplicated in hero and skill-card data.

#### `BlogPosts`

Already contains:

- `title`;
- `slug`;
- `excerpt`;
- rich content;
- cover image;
- publication status and date;
- author;
- category;
- related project;
- tags;
- SEO.

The missing part is the landing query and homepage selection configuration, not a second article model.

#### `Testimonials`

Already contains:

- author name;
- role;
- company;
- message;
- avatar;
- moderation status;
- rating;
- source;
- approval date.

The hardcoded feedback array must be removed after the collection is connected.

### 4.2 Existing globals

#### `Homepage`

Currently contains:

- `hero`;
- `featuredProjects`;
- `selectedTechStack`;
- basic testimonials section settings;
- basic social feeds section settings;
- basic contact section settings.

The relationships are correct in principle, but the global does not yet describe the complete landing composition.

#### `Contact`

Currently contains:

- email;
- phone;
- location;
- contact form enabled flag.

Required extension:

- availability text.

#### `Social`

Currently contains:

- GitHub;
- LinkedIn;
- X;
- Instagram;
- Dribbble;
- YouTube.

Required extension:

- Telegram URL.

#### `SiteSettings`

Correct owner for general site identity and global behavior, but not for the full personal biography.

### 4.3 Missing global: `Profile`

Personal identity is duplicated across Hero, Engineer Profile, Contact, Logo, and Footer. A dedicated profile global is required.

Proposed shape:

```text
Profile
├── name
├── role
├── location
├── profileId
├── status
├── portrait -> media
├── shortBio
├── fullBio
├── availability
├── careerStartedAt
├── cvFile -> media
├── metrics[]
│   ├── key
│   ├── label
│   ├── value
│   └── source: manual | derived | github
├── journey[]
│   ├── year
│   ├── title
│   ├── description
│   └── accentKey
└── principles[]
    ├── title
    ├── description
    └── iconKey
```

The profile global is not a public-user profile system. It is one editable site-owner identity.

---

## 5. Section-by-section hardcoded inventory

## 5.1 Brand and Navbar

### Current hardcoded sources

- `src/components/brand/Logo.tsx`
- navbar navigation configuration and CTA copy

### Hardcoded editorial values

- owner name;
- professional role.

### Keep in code

- navigation anchors;
- navigation labels;
- active-section mapping;
- mobile menu behavior;
- theme control;
- “Let’s Talk” UI label unless product requirements make it editorial.

### Target

- name and role -> `Profile`;
- logo asset or site name -> `SiteSettings`.

### Risk

Payload must never control section IDs. Editable anchors could break scrolling, active-link tracking, sticky transitions, and accessibility.

---

## 5.2 Hero

### Current hardcoded sources

- `src/components/home/Hero/Hero.tsx`
- `src/components/home/Hero/Mission.tsx`
- Hero workspace, system, terminal, and editor components

### Hardcoded editorial values

- greeting;
- owner name;
- headline;
- technology list;
- telemetry values;
- GitHub-like activity copy.

### Existing Payload fields currently bypassed

- `hero.eyebrow`;
- `hero.title`;
- `hero.subtitle`;
- `hero.image`.

CTA labels and URLs are the only meaningful current connection.

### Target mapping

| UI value                          | Target source                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| name and role                     | `Profile`                                                                            |
| greeting, headline, subtitle, CTA | `Homepage.hero`                                                                      |
| portrait / visual                 | `Profile.portrait` or `Homepage.hero.image` depending on final design responsibility |
| hero technologies                 | `Homepage.selectedTechStack` relationships                                           |
| projects count                    | derived collection count                                                             |
| years of experience               | derived from `Profile.careerStartedAt`                                               |
| manual metrics                    | `Profile.metrics`                                                                    |
| GitHub metrics                    | future GitHub integration                                                            |

### Keep as frontend fixture

- terminal boot sequence;
- code editor script;
- workspace mock states;
- animation delays;
- status-widget labels.

### Migration rule

The existing visual hierarchy must not change when the data source changes.

---

## 5.3 Current Mission

### Current hardcoded sources

- `src/components/home/CurrentMission/data.ts`
- `MissionIntro`
- `MissionPreview`

### Hardcoded data

- DSS technology list;
- product navigation;
- module names;
- metrics;
- recent activity;
- health values;
- active missions;
- timestamps and changes.

### Problem

Several values look live but are fictional:

- article totals;
- deployment totals;
- health percentages;
- “2m ago” timestamps;
- weekly changes.

### Target Homepage group

```text
currentMissionSection
├── enabled
├── eyebrow
├── title
├── description
├── project -> projects
├── ctaLabel
└── ctaUrlOverride
```

### Data from selected Project

- title;
- excerpt;
- stage;
- progress;
- current version;
- technology relationships;
- featured image;
- enabled links.

### Keep as frontend fixture

Move the dashboard mock into an explicitly named file such as:

```text
src/components/home/CurrentMission/mission-preview.fixture.ts
```

The UI must visibly communicate that it is a concept/product preview, not current telemetry.

---

## 5.4 Featured Projects

### Current hardcoded source

- `src/components/home/FeaturedProjects/data.ts`

### Duplicated domain records

- JDMGram;
- Gentlemen’s Barbershop;
- KinoPlay;
- stage;
- progress;
- status;
- excerpt;
- technology stack;
- slug;
- preview tagline.

### Existing unused source

- `Homepage.featuredProjects`;
- project query helpers.

### Target selection algorithm

1. Use populated `Homepage.featuredProjects` in editor-defined order.
2. When empty, query published `Projects` where `isFeatured = true`.
3. Limit the fallback to the presentation capacity.
4. Hide the section when no valid records exist.

### Project-to-card mapping

| Card field | Project field                                 |
| ---------- | --------------------------------------------- |
| `id`       | project ID                                    |
| `title`    | `title`                                       |
| `slug`     | `slug`                                        |
| `excerpt`  | `excerpt`                                     |
| `stage`    | `stage` through a frontend label map          |
| `progress` | `progress`                                    |
| `stack`    | populated `techStack[].name`                  |
| image      | `featuredImage ?? coverImage`                 |
| CTA        | first appropriate enabled item from `links[]` |
| tagline    | proposed `cardTagline`, otherwise omit        |

### Route guardrail

Project card links must not point to `/projects/[slug]` until project pages exist. Use an enabled external/project link or render a non-link card.

### Removal after migration

- `src/components/home/FeaturedProjects/data.ts`

---

## 5.5 Insights and Client Feedback

### Current hardcoded source

- `src/components/home/InsightsTrust/data.ts`

### Hardcoded data

- featured article;
- article list;
- dates;
- categories;
- reading times;
- article links;
- two testimonials;
- trust metrics;
- fallback code sample.

### Target Homepage group

```text
insightsSection
├── enabled
├── eyebrow
├── title
├── description
├── featuredPost -> blog-posts
├── selectedPosts -> blog-posts[]
├── selectedTestimonials -> testimonials[]
├── articlesCtaLabel
└── articlesCtaUrl
```

### Query fallback

- featured post -> newest published post;
- compact articles -> next published posts;
- feedback -> approved testimonials ordered by approval date.

### Derived values

- reading time -> derived from Lexical content;
- category label -> populated relationship;
- publication date -> formatted in mapper/presenter;
- trust project count -> collection query;
- experience -> `Profile`;
- GitHub metrics -> integration or explicit manual metric.

### Keep as frontend fixture

- syntax-highlighted code preview used only when a post has no cover image.

### Route guardrail

Do not link to `/articles/...`, `/blog`, or `/blog/[slug]` before those routes exist.

### Removal after migration

- article and testimonial arrays from `InsightsTrust/data.ts`;
- retain only code-preview token fixture if still needed.

---

## 5.6 Engineer Profile

### Current hardcoded sources

- `src/components/home/EngineerProfile/data.ts`
- `src/components/home/EngineerProfile/ProfilePanel.tsx`
- journey and philosophy panel data
- profile photo path

### Confirmed content drift

The inactive profile object describes the role as `Frontend Engineer`, while the active profile panel shows `Software Engineer`.

Other duplicated values include:

- name;
- location;
- bio;
- status;
- years;
- projects;
- commits;
- journey;
- principles.

### Target

- identity, biography, journey, principles, metrics -> `Profile`;
- section heading and footer copy -> `Homepage.engineerProfileSection`.

Proposed section group:

```text
engineerProfileSection
├── enabled
├── eyebrow
├── title
├── description
├── footerLabel
└── footerText
```

### Cleanup

After the active component is connected:

- remove the duplicate `engineerProfile` object;
- remove obsolete profile components not used by the final renderer;
- keep icon mappings and visual diagnostics in code unless they become real profile content.

---

## 5.7 Skills and Technologies

### Current hardcoded source

- `src/components/home/SkillsTechnologies/data.ts`

### Hardcoded data

Six complete skill cards:

- Frontend;
- Tools & Workflow;
- Backend;
- DevOps & Cloud;
- Architectural Approach;
- Current Focus.

Each contains editable descriptions, technology names, metrics, tags, workflow copy, principles, or focus items.

### Existing unused Payload source

- `Homepage.selectedTechStack`;
- `TechStack` collection;
- `TechStackSection`, which is not the active design.

### Target Homepage group

```text
skillsSection
├── enabled
├── eyebrow
├── title
├── description
└── cards[]
    ├── key
    ├── title
    ├── badge
    ├── description
    ├── technologies -> tech-stack[]
    ├── metrics[]
    ├── tags[]
    ├── details[]
    └── contentItems[]
```

### Payload responsibilities

- editable titles and descriptions;
- relationships to technologies;
- metric values;
- tags;
- skill-specific content.

### Frontend responsibilities

- card order numbers generated from array position;
- tone and layout map keyed by card `key`;
- icons;
- Engineering DNA graphic;
- workflow connector;
- animations.

### Important rule

Do not add a second technology dictionary inside Homepage. Skill cards must relate to `tech-stack`.

### Removal after migration

- editorial arrays from `SkillsTechnologies/data.ts`;
- keep TypeScript UI types and icon-key unions in a presentation module.

---

## 5.8 Delivery Pipeline

### Current hardcoded sources

- `src/components/home/DeliveryPipeline/data.ts`
- `DeliveryPipeline.tsx`

### Hardcoded data

- three value cards;
- five delivery phases;
- phase items;
- phase completion states;
- status labels;
- section heading and footer;
- “Project velocity 92%”;
- “Last updated: 2 min ago”.

### Target Homepage group

```text
deliveryPipelineSection
├── enabled
├── eyebrow
├── title
├── description
├── metrics[]
│   ├── key
│   ├── title
│   └── description
├── phases[]
│   ├── key
│   ├── title
│   └── items[]
├── footerLabel
└── footerText
```

### Keep in code

- icon maps by `key`;
- animation activation status;
- phase numbering from array position;
- motion labels if they exist only for animated state.

### Required correction

The pipeline describes a general working method, not one currently running project. Remove fictional live velocity and timestamp values. Phase states should be animation states, not editorial claims.

---

## 5.9 Contact CTA

### Current hardcoded source

- `src/components/home/ContactCTA.tsx`

### Critical architecture defect

The component accepts:

```ts
contact?: unknown
contactSection?: unknown
```

Then immediately discards both values:

```ts
void contact
void contactSection
```

The following data remains hardcoded:

- email;
- Telegram;
- location;
- availability;
- GitHub;
- LinkedIn;
- X;
- section copy;
- form intro.

### Target mapping

| UI value                             | Target                                                      |
| ------------------------------------ | ----------------------------------------------------------- |
| email, phone, location, form enabled | `Contact`                                                   |
| availability                         | new `Contact.availability` or shared `Profile.availability` |
| social URLs                          | `Social`                                                    |
| Telegram                             | new `Social.telegramUrl`                                    |
| section copy                         | expanded `Homepage.contactSection`                          |
| form labels, field names, validation | frontend contract                                           |

Proposed Homepage group extension:

```text
contactSection
├── enabled
├── eyebrow
├── title
├── description
├── formTitle
├── formDescription
├── footerLabel
└── footerText
```

### Type requirement

Replace `unknown` with generated Payload types or a dedicated view model.

### Behavior requirement

When `contactFormEnabled` is false:

- hide the form;
- keep valid direct contact channels visible;
- preserve section layout gracefully.

---

## 5.10 Site Footer

### Current hardcoded source

- `src/components/home/SiteFooter/data.ts`

### Hardcoded data

- owner identity;
- portrait;
- biography;
- availability;
- social URLs;
- fake X posts and engagement;
- visual Instagram snapshots;
- newsletter copy;
- navigation links;
- copyright year.

### Target mapping

| Footer data                      | Target                                                    |
| -------------------------------- | --------------------------------------------------------- |
| name, role, portrait, bio        | `Profile`                                                 |
| email and availability           | `Contact` / `Profile`                                     |
| social URLs                      | `Social`                                                  |
| feed section enablement and copy | `Homepage.socialFeedsSection` or a dedicated footer group |
| year                             | derived with `new Date().getFullYear()`                   |
| navigation anchors               | frontend                                                  |

### Social feed decision for v1.0

One of these options must be chosen before migration:

1. disable the feed area when `socialFeedsSection.enabled` is false;
2. model the entries as curated editorial snapshots and label them as curated;
3. connect a real external integration in a later phase.

Fake engagement numbers must not be presented as live social data.

### Removal after migration

- duplicated profile and social arrays in `SiteFooter/data.ts`;
- retain only explicit visual snapshot fixtures if the curated/demo approach is approved.

---

## 6. Legacy and orphaned landing code

The repository contains Payload-aware components that are exported but not used by the active landing design:

- `src/components/home/TechStackSection.tsx`;
- `src/components/home/TestimonialsSection.tsx`.

These components demonstrate an earlier data connection but do not match the current UI.

During final cleanup they must be either:

- removed; or
- deliberately repurposed.

They must not remain as a second dormant rendering path.

---

## 7. Proposed Homepage composition

The Homepage global should orchestrate the page without duplicating domain entities.

```text
Homepage
├── hero
├── currentMissionSection
│   └── project -> projects
├── featuredProjectsSection
│   └── projects -> projects[]
├── insightsSection
│   ├── featuredPost -> blog-posts
│   ├── posts -> blog-posts[]
│   └── testimonials -> testimonials[]
├── engineerProfileSection
├── skillsSection
│   └── cards[].technologies -> tech-stack[]
├── deliveryPipelineSection
├── contactSection
└── socialFeedsSection
```

The existing top-level `featuredProjects` and `selectedTechStack` fields may be preserved initially for a low-risk migration, then grouped later only if the admin UX clearly benefits.

Avoid a large one-shot schema rewrite.

---

## 8. Frontend data boundary

Payload documents must not spread through the component tree.

Add a homepage content assembler:

```text
src/lib/cms/homepage/
├── getHomepageContent.ts
├── types.ts
├── relations.ts
└── mappers/
    ├── hero.ts
    ├── current-mission.ts
    ├── featured-projects.ts
    ├── insights.ts
    ├── profile.ts
    ├── skills.ts
    ├── delivery-pipeline.ts
    ├── contact.ts
    └── footer.ts
```

### Responsibilities

`getHomepageContent.ts`:

- performs the minimum number of Payload queries;
- resolves selected relationships;
- applies collection fallbacks;
- builds complete section view models;
- returns one stable landing contract.

Mappers:

- normalize `number | Entity` relationships;
- remove invalid and unpublished records;
- format dates and labels;
- derive values;
- provide safe optional defaults;
- do not contain React.

Components:

- receive view models;
- render markup;
- own visual and interaction behavior;
- do not query Payload;
- do not interpret unresolved relationships.

Example:

```ts
type FeaturedProjectViewModel = {
  id: string
  title: string
  excerpt: string
  stageLabel: string
  progress: number
  technologies: string[]
  image?: {
    src: string
    alt: string
  }
  href?: string
}
```

---

## 9. Relationship and fallback policy

Use one consistent policy in every section.

### Selected content

1. Prefer explicitly selected Homepage relationships.
2. Preserve the order chosen in Payload.
3. Ignore unresolved IDs, invalid objects, and non-public records.

### Collection fallback

When selection is empty:

- projects -> published featured projects;
- posts -> newest published posts;
- testimonials -> approved testimonials;
- technology -> visible featured technologies.

### Empty state

When both selection and fallback are empty:

- hide the section or subsection;
- do not restore hardcoded fake records;
- do not render broken CTAs.

### Required content

Use Payload validation for fields that are necessary to render a configured section. Do not make every field required globally when the section may be disabled.

---

## 10. Routing dependency

The repository does not yet contain the complete public project and blog page system.

During Phase 6.1:

- do not assume `/projects/[slug]` exists;
- do not assume `/blog` exists;
- do not assume `/blog/[slug]` exists;
- do not keep current `/articles/...` mock links.

Link generation must check route availability and usable external links.

Dedicated project and blog routes should be built in later vertical phases.

---

## 11. Seed and migration strategy

Hardcoded content must be transferred once, not retained forever as a runtime fallback.

Use an idempotent seed or migration that:

- finds existing records by stable slug/key;
- creates only missing records;
- updates the Homepage relationships;
- creates/updates the Profile global;
- does not duplicate projects, technologies, posts, or testimonials;
- can be executed safely more than once in development.

After a section is confirmed against Payload data, delete its old editorial arrays in the same vertical slice.

---

## 12. Vertical migration plan

## 6.1.0 — Architecture audit

Changes:

- add this document only.

Validation:

```bash
pnpm lint
pnpm build
pnpm test
```

Commit:

```bash
git commit -m "docs(content): audit homepage content architecture"
```

---

## 6.1.1 — Profile foundation and live Hero

Scope:

- add `Profile` global;
- register it in Payload;
- generate types;
- add profile query;
- add hero view model;
- consume `Homepage.hero`;
- consume `Homepage.selectedTechStack`;
- derive safe metrics;
- keep terminal/editor fixtures unchanged;
- seed current profile and hero content.

Validation:

- relationship normalization tests;
- hero fallback tests;
- empty technology selection test;
- lint, typecheck, build, integration tests, E2E.

Commit:

```bash
git commit -m "feat(content): connect hero to Payload"
```

---

## 6.1.2 — Featured Projects

Scope:

- connect selected relationships;
- add published-featured fallback;
- add project-card mapper;
- optionally add `cardTagline`;
- seed project records;
- remove `FeaturedProjects/data.ts`;
- prevent links to missing internal routes.

Validation:

- selected ordering;
- unresolved relationship;
- unpublished project filtering;
- empty state;
- image fallback;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): render featured projects from Payload"
```

---

## 6.1.3 — Contact CTA

Scope:

- extend Contact and Social;
- expand contact section copy;
- fetch Social;
- replace `unknown` props;
- render live contact and social values;
- honor `contactFormEnabled`;
- remove hardcoded channels.

Validation:

- existing contact form E2E;
- disabled form state;
- missing optional channel;
- safe external link attributes;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): connect contact section to Payload"
```

---

## 6.1.4 — Current Mission

Scope:

- add current mission Homepage group;
- connect a selected Project;
- map project stage, progress, stack, and links;
- rename dashboard data as a fixture;
- remove or relabel fake live telemetry.

Validation:

- selected project;
- unresolved project;
- no project;
- missing CTA;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): connect current mission to project data"
```

---

## 6.1.5 — Engineer Profile

Scope:

- extend Profile with journey, principles, and metrics;
- add section configuration;
- connect all active profile panels;
- seed current content;
- delete duplicated profile objects and obsolete components.

Validation:

- missing portrait;
- empty journey/principles;
- metric source behavior;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): render engineer profile from Payload"
```

---

## 6.1.6 — Skills and Technologies

Scope:

- add skills section groups;
- relate technologies to `tech-stack`;
- introduce skill-card view models;
- keep icon/layout maps in code;
- remove editorial skill arrays.

Validation:

- relationship order;
- invisible technology filtering;
- card without technologies;
- unknown presentation key fallback;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): connect skills section to Payload"
```

---

## 6.1.7 — Blog Posts and Testimonials

Scope:

- add published blog queries;
- add insights Homepage group;
- map selected/fallback posts;
- map selected/fallback approved testimonials;
- derive reading time;
- preserve code-preview fallback;
- remove hardcoded article and feedback records;
- prevent broken internal links.

Validation:

- publication filtering;
- approval filtering;
- selected ordering;
- reading-time calculation;
- empty article and feedback states;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): render insights and feedback from Payload"
```

---

## 6.1.8 — Delivery Pipeline

Scope:

- add delivery pipeline Homepage group;
- map metrics and phases;
- keep icons and motion state in code;
- remove fictional velocity and timestamp;
- remove editorial pipeline arrays.

Validation:

- zero phases;
- unknown key fallback;
- array ordering;
- sticky/motion E2E regression;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): manage delivery pipeline in Payload"
```

---

## 6.1.9 — Footer and social content

Scope:

- connect Profile, Contact, Social, and social-feed configuration;
- derive the year;
- remove duplicate identity and social links;
- implement the approved curated/disabled feed behavior;
- connect Logo identity if required.

Validation:

- disabled social feed;
- missing social URL;
- current year;
- footer navigation regression;
- newsletter regression;
- lint, typecheck, build, tests.

Commit:

```bash
git commit -m "feat(content): connect footer and brand identity to Payload"
```

---

## 6.1.10 — Cleanup and guardrails

Scope:

- remove legacy unused landing renderers;
- remove orphaned data files and imports;
- scan active landing code for editorial literals;
- scan for placeholder `#` links;
- verify section IDs and numbering;
- document the final content contract;
- add assembler-level integration tests.

Validation:

```bash
pnpm generate:types
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm format:check
```

Commit:

```bash
git commit -m "refactor(content): remove legacy homepage data sources"
```

---

## 13. Testing strategy

### Unit tests

Test pure mappers and helpers:

- relationship resolution;
- filtering;
- stage labels;
- media normalization;
- date formatting;
- reading time;
- experience derivation;
- URL selection;
- empty-state behavior.

### Integration tests

Test Payload queries against the configured test database:

- public filters;
- selected relationship depth;
- ordering;
- fallback limits;
- disabled sections.

### E2E tests

Protect existing landing behavior:

- page renders with seeded content;
- sticky sections remain functional;
- anchor navigation still lands correctly;
- contact form behavior remains unchanged;
- no broken internal links;
- social and external links are safe;
- mobile navigation and layout remain stable.

### Visual checks

Because the migration changes data shape, not design:

- compare desktop dark and light themes;
- compare tablet;
- compare 375px mobile;
- verify long titles and descriptions;
- verify empty and partial CMS states.

---

## 14. Definition of done for Phase 6.1

Phase 6.1 is complete when:

- all editable landing content has an explicit owner;
- Projects, BlogPosts, Testimonials, and TechStack are not duplicated in React data arrays;
- identity and contact information have one authoritative source;
- `HomePage` consumes one assembled landing contract;
- active landing sections do not query Payload independently;
- unresolved relationships cannot crash rendering;
- empty CMS states do not restore fake records;
- demo fixtures are clearly isolated and named;
- fake live metrics are removed or explicitly labeled;
- missing project/blog routes do not create broken links;
- lint, typecheck, build, integration tests, and E2E tests pass;
- the current design and motion behavior remain unchanged.

---

## 15. Explicit non-goals

This phase does not include:

- project list or project detail pages;
- blog list or article pages;
- GitHub API integration;
- X or Instagram API integration;
- custom Payload admin redesign;
- complete multilingual architecture;
- a generic page builder;
- moving animation configuration into Payload;
- public user profiles.

Those concerns must remain separate vertical phases.
