/**
 * Database migration runner.
 *
 * Usage:
 *   bun ./scripts/migrate.ts run       — apply pending migrations
 *   bun ./scripts/migrate.ts rollback  — roll back last migration
 *   bun ./scripts/migrate.ts status    — show migration status
 *   bun ./scripts/migrate.ts generate <name> — create a new migration file
 *
 * Migrations live in scripts/migrations/ as timestamped .ts files.
 * Each migration exports up() and down() functions.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = join(import.meta.dir, "migrations");

const command = Bun.argv[2] || "status";

switch (command) {
  case "status": {
    const files = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".ts"));
    if (files.length === 0) {
      console.log("No migration files found. Create one with: bun ./scripts/migrate.ts generate <name>");
    } else {
      console.log(`Found ${files.length} migration(s):`);
      for (const file of files) {
        console.log(`  - ${file}`);
      }
    }
    break;
  }

  case "generate": {
    const name = Bun.argv[3];
    if (!name) {
      console.error("Usage: bun ./scripts/migrate.ts generate <name>");
      process.exit(1);
    }
    const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const filename = `${timestamp}_${name}.ts`;
    const filepath = join(MIGRATIONS_DIR, filename);
    await Bun.write(
      filepath,
      `// Migration: ${name}
// Created: ${new Date().toISOString()}

// Using bun:sqlite — swap with Bun.sql for Postgres
import { Database } from "bun:sqlite";

export function up(db: Database) {
  // db.run(\`CREATE TABLE IF NOT EXISTS ...\`);
}

export function down(db: Database) {
  // db.run(\`DROP TABLE IF EXISTS ...\`);
}
`,
    );
    console.log(`Created migration: ${filepath}`);
    break;
  }

  case "run":
    console.log("TODO: Implement migration runner for your database choice.");
    console.log("See CLAUDE.md for supported databases: bun:sqlite, Bun.sql (Postgres), Bun.redis");
    break;

  case "rollback":
    console.log("TODO: Implement rollback for your database choice.");
    break;

  default:
    console.error(`Unknown command: ${command}`);
    console.error("Available: status, generate, run, rollback");
    process.exit(1);
}
