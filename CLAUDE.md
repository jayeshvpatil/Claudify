# [Project Name]

[One-line description of what this project does.]

Built with Bun, React, and deployed on Railway / GCP Cloud Run.

## Stack

- **Runtime**: Bun
- **Frontend**: React 19 + Bun HTML imports
- **Backend**: Bun.serve() with route handlers
- **Linting**: Biome
- **Testing**: bun:test
- **Deployment**: Railway, GCP Cloud Run

## Commands

```bash
bun run dev             # Start dev server with HMR
bun run build           # Build for production
bun run start           # Run production build
bun test                # Run tests
bun run qa              # Lint + typecheck + test
bun run deploy:dev      # Deploy to Railway dev
bun run deploy:prod     # Deploy to Railway production
bun run deploy:gcp      # Deploy to GCP Cloud Run staging
bun run deploy:gcp:prod # Deploy to GCP Cloud Run production
bun run db:migrate      # Run database migrations
```

## Bun-First Development

Use Bun for everything. Do NOT use Node.js equivalents.

- `bun <file>` not `node <file>` or `ts-node <file>`
- `bun test` not `jest` or `vitest`
- `bun build` not `webpack` or `esbuild`
- `bun install` not `npm install`
- `bun run <script>` not `npm run <script>`
- `bunx <pkg>` not `npx <pkg>`
- Bun auto-loads `.env` — do NOT use dotenv

For Bun native API reference and frontend HTML import patterns, see @.claude/rules/bun-conventions.md

## Project Structure

```
src/
  index.ts          # Server entry (Bun.serve)
  index.html        # HTML entry (imported by server)
  app.tsx            # React root component
  styles.css         # Global styles
  lib/               # Shared utilities, business logic
  routes/            # API route handlers
  components/        # React components
scripts/
  migrate.ts         # DB migration runner
  migrations/        # Timestamped migration files
docs/                # Documentation
.claude/
  rules/             # Auto-loaded context rules (Bun, testing, deploy, security)
  commands/           # Slash commands (/dev, /test, /qa, /review, /deploy-*, /new-feature)
  settings.json      # Plugins, permissions, hooks
```

## Code Style

- TypeScript strict mode everywhere
- Biome for linting and formatting (auto-runs on every file save via PostToolUse hook)
- `const` over `let`, never `var`
- Explicit return types on exported functions
- `Response.json()` for JSON API responses
- Error format: `{ error: string, details?: string }`
- Path alias: `@/*` maps to `src/*`

## Testing

- Use `bun:test` — import { describe, expect, test, beforeAll, afterAll, mock }
- Co-locate tests next to source: `<module>.test.ts`
- Run all: `bun test` | Run one: `bun test <path>` | Watch: `bun test --watch`

## Git Workflow

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Pre-commit hook runs `bun run qa` automatically (lint + typecheck + test)
- Branch naming: `feat/description`, `fix/description`
- Keep commits small and focused

## Workflow

Before writing code for non-trivial tasks, describe your approach and wait for approval. Break large features into smaller steps.

## Agent Guide

For prompting patterns, slash commands, plugins, MCP tools, and team workflow, see @agents.md

## Debugging

- Use `bun --hot ./src/index.ts` for dev with HMR
- For Bun API questions, use context7 MCP for live docs
- Bun type docs: `node_modules/bun-types/docs/**/*.mdx`
