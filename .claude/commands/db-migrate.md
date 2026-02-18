---
allowed-tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
description: "Generate or run database migrations"
---

Help with database migrations. The migration runner is at `scripts/migrate.ts` and migrations live in `scripts/migrations/`.

Based on $ARGUMENTS:

**"generate <name>"** — Create a new migration:
1. Run `bun ./scripts/migrate.ts generate <name>`
2. Open the created file and help the user fill in the `up()` and `down()` functions
3. Use `bun:sqlite` by default, or `Bun.sql` if the project uses Postgres

**"run"** — Apply pending migrations:
1. Run `bun ./scripts/migrate.ts run`
2. Report which migrations were applied

**"status"** — Show migration status:
1. Run `bun ./scripts/migrate.ts status`

**"rollback"** — Roll back the last migration:
1. Run `bun ./scripts/migrate.ts rollback`
2. Confirm which migration was rolled back

**No arguments** — Show available commands and current migration status.
