# Portfolio Stack v1.0

## Project Goal

Build and deploy a personal developer portfolio as fast as possible without overengineering.

This is not DSS Universe.
This is not a social network.
This is not a custom CMS experiment.

The goal is:

- release first
- polish later
- use existing tools
- avoid unnecessary backend complexity

---

## Core Stack

- Next.js
- React
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Framer Motion

---

## CMS

Payload CMS is used as the main CMS, admin panel, API layer, media manager, and content management system.

Payload should not be replaced with a custom CMS in v1.0.

---

## Database

PostgreSQL is the primary database.

---

## Backend Decision

NestJS is not used in v1.0.

Reason:

Payload already provides:

- admin panel
- auth for admin/authors
- collections
- globals
- CRUD
- media uploads
- API
- hooks
- access control

Adding NestJS would create unnecessary complexity for this project.

---

## Styling

Tailwind CSS is used for styling.

shadcn/ui is used for reusable UI components.

---

## Animations

Framer Motion is used for:

- preloader
- page transitions
- scroll reveal
- hover effects
- UI microinteractions

---

## Deployment

Preferred deployment:

- Vercel for the Next.js application
- PostgreSQL via Neon, Supabase, Railway, or another managed provider
- Media storage via local development first, later S3/R2 if needed

---

## Main Rule

Release first. Polish later.
