# Database Migrations

Portfolio uses Payload CMS with PostgreSQL through `@payloadcms/db-postgres`.

## Policy

The local development database is a sandbox.

Payload's PostgreSQL adapter keeps development schema changes in sync through Drizzle `push`.
Do not run the initial baseline migration against the existing local `portfolio` database after
that database has already been synchronized by `pnpm dev`.

Migrations are the source of truth for creating and upgrading non-development database
environments.

## Commands

```bash
pnpm db:migrate:create <migration-name>
pnpm db:migrate:status
pnpm db:migrate
pnpm db:migrate:down
```

Production-oriented builds can use:

```bash
pnpm build:production
```

This runs pending Payload migrations before the regular Next.js production build.

## Schema Change Workflow

1. Make one coherent Payload schema change.
2. Run the app locally with `pnpm dev` and verify the change against the development database.
3. Regenerate Payload types when the config shape changes:

   ```bash
   pnpm generate:types
   ```

4. When the feature slice is complete, create one migration:

   ```bash
   pnpm db:migrate:create descriptive-migration-name
   ```

5. Review the generated migration before committing it.
6. Commit the Payload config, generated types, and migration together.
7. Run migrations in staging/production before starting the new application version.

Do not create one migration for every tiny edit while a schema feature is still being developed.

## Initial Baseline

The first migration represents the complete current Portfolio schema.

Because the existing local development database was created and evolved with Drizzle `push`,
the baseline must not be executed against that database. It is intended for clean environments.

Validate the baseline against a disposable PostgreSQL database.

With the existing local Docker PostgreSQL container:

```bash
docker exec portfolio_postgres psql -U portfolio -d postgres   -c 'DROP DATABASE IF EXISTS portfolio_migration_verify;'

docker exec portfolio_postgres psql -U portfolio -d postgres   -c 'CREATE DATABASE portfolio_migration_verify;'
```

Run the migrations with an overridden URL:

```bash
DATABASE_URL=postgres://portfolio:portfolio@127.0.0.1:5434/portfolio_migration_verify   pnpm db:migrate

DATABASE_URL=postgres://portfolio:portfolio@127.0.0.1:5434/portfolio_migration_verify   pnpm db:migrate:status
```

After verification:

```bash
docker exec portfolio_postgres psql -U portfolio -d postgres   -c 'DROP DATABASE portfolio_migration_verify;'
```

If the local PostgreSQL role, password, container name, host port, or database name changes,
adjust these verification commands instead of pointing them at the real development database.

## Existing Non-Development Databases

Do not blindly run the initial baseline against a database whose Payload tables already exist.

An already-populated staging or production database that predates this migration history requires
an explicit adoption plan: back it up, verify that its schema matches the baseline, and establish
the migration history before future migrations are executed.

Treat this as an environment migration task, not as part of normal application startup.

## Safety Rules

- Never use `migrate:fresh`, `migrate:reset`, or destructive database commands against a database
  that contains data you care about.
- Back up staging/production before structural migrations.
- Review generated SQL, especially drops, renames, enum changes, and `NOT NULL` changes.
- Keep migrations committed to Git and ordered.
- Do not edit an already-applied production migration. Create a new migration instead.
- Keep local Drizzle `push` and manual migration execution as separate workflows.
