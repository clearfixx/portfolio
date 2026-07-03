# Portfolio

Personal developer portfolio built with Next.js, Payload CMS, and PostgreSQL.

This project follows a simple rule:

> Release first. Polish later.

---

## Stack

- Next.js
- React
- TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Framer Motion

---

## Architecture

This is a pragmatic single-application portfolio.

It is not DSS Universe, not a social network, and not a custom CMS experiment.

Payload CMS is responsible for:

- admin panel
- admin/authors authentication
- collections
- globals
- CRUD
- media management
- API layer
- access control

NestJS is intentionally not used in v1.0.

---

## Local Development

Start PostgreSQL with Docker:

```bash
docker start portfolio_postgres

Install dependencies:

pnpm install

Run development server:

pnpm dev

Open:

http://localhost:3000
http://localhost:3000/admin
Environment

Copy the example file:

cp .env.example .env

Required variables:

DATABASE_URL=postgres://portfolio:portfolio@127.0.0.1:5434/portfolio
PAYLOAD_SECRET=replace-with-a-secure-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
Useful Commands
pnpm dev
pnpm build
pnpm lint
pnpm generate:types
pnpm generate:importmap
Documentation

Project documentation lives in:

docs/STACK.md
docs/ARCHITECTURE.md
v1.0 Scope

Included:

landing page
projects
blog
contact messages
testimonials
media
admin/authors
site settings

Not included:

public registration
user profiles
comments
likes
subscriptions
chat
marketplace
custom CMS from scratch
NestJS backend
Main Rule

Keep the project simple enough to ship.

Release first. Polish later.
```
