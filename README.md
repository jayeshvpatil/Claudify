# Claudify

A pre-configured starter repo for building applications with Claude Code, Bun, and Railway / GCP Cloud Run.

Clone it, customize it, start building.

## What's Included

**Claude Code Configuration**
- `CLAUDE.md` — Lean project context with `@import` references to modular rules
- `.claude/rules/` — Auto-loaded context rules (Bun conventions, testing, deployment, security)
- `.claude/settings.json` — 7 plugins, permissions, 3 hooks (pre-commit QA, bash safety, auto-format)
- `.mcp.json` — context7 (live docs) + sequential-thinking (complex reasoning)
- `agents.md` — Agent usage guide (imported via `@agents.md` in CLAUDE.md)
- 10 slash commands for dev, test, QA, review, deploy, migrate, scaffold

**Opinionated Stack**
- Bun runtime (not Node)
- Bun.serve() with HTML imports (not Express, not Vite)
- React 19
- Biome linting (not ESLint)
- Railway + GCP Cloud Run deployment
- bun:test

## Quick Start

```bash
# 1. Clone
git clone <your-repo-url> my-project
cd my-project

# 2. Environment
cp .env.example .env

# 3. Claude Code local settings
cp .claude/settings.local.json.example .claude/settings.local.json

# 4. Install
bun install

# 5. Run
bun run dev
```

Then open Claude Code and try `/dev`, `/test`, or `/qa`.

## Customization

After cloning, update these files for your project:

1. **`CLAUDE.md`** — Replace `[Project Name]` and `[One-line description]` at the top
2. **`package.json`** — Change `name`, `version`, `description`
3. **`.env`** — Set your environment variables
4. **`.claude/settings.json`** — Adjust permissions for your team's needs
5. **`.claude/rules/deployment.md`** — Update with your Railway/GCP project details

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/dev` | Start dev server with HMR, check port conflicts |
| `/test [filter]` | Run tests — supports path, grep, watch, coverage |
| `/qa` | Full pipeline: lint + typecheck + test |
| `/review [file\|branch]` | Code review with Critical/Important/Suggestions |
| `/deploy-dev` | QA check + deploy to Railway staging |
| `/deploy-prod` | Strict safety checks + deploy to Railway production |
| `/deploy-gcp` | QA check + deploy to GCP Cloud Run staging |
| `/deploy-gcp-prod` | Strict safety checks + deploy to GCP Cloud Run production |
| `/db-migrate [cmd]` | Generate, run, rollback, or check migration status |
| `/new-feature [desc]` | Scaffold routes, tests, types for a new feature |

## Plugins

| Plugin | Purpose |
|--------|---------|
| frontend-design | Polished, distinctive UI generation |
| context7 | Live library documentation in prompts |
| superpowers | Structured workflows (brainstorm, plan, execute) |
| claude-md-management | Keeps CLAUDE.md updated |
| code-review | Automated code review |
| security-guidance | Security issue detection |
| commit-commands | Conventional commit helpers |

## Safety Features

- **Pre-commit hook** — Runs lint + typecheck + test before every commit
- **Bash safety guard** — Blocks `rm -rf /`, `sudo`, pipe-to-sh patterns
- **Post-write auto-format** — Biome formats every file after Write/Edit
- **Production deploy protection** — `/deploy-prod` and `/deploy-gcp-prod` require main branch, clean state, and explicit confirmation
- **Permission deny list** — Dangerous commands are blocked by default

## Architecture

### How Claude Code Reads This Repo

```
CLAUDE.md (auto-loaded at start of every conversation)
  ├── @agents.md (imported — prompting patterns, slash commands, plugins)
  └── @.claude/rules/bun-conventions.md (referenced — Bun API table, frontend patterns)

.claude/rules/ (ALL auto-loaded by Claude Code)
  ├── bun-conventions.md — Bun native APIs, HTML imports pattern
  ├── testing.md — bun:test conventions (scoped to *.test.ts files)
  ├── deployment.md — Railway + GCP Cloud Run
  └── security.md — Secrets, permissions, hooks

.claude/settings.json (auto-loaded)
  ├── enabledPlugins — 7 plugins
  ├── permissions — allow/deny lists
  └── hooks — PreToolUse, PostToolUse, PreCommit

.mcp.json (auto-discovered)
  ├── context7 — Live library documentation
  └── sequential-thinking — Structured reasoning
```

## Project Structure

```
Claudify/
├── .claude/
│   ├── commands/          # 10 slash commands
│   │   ├── dev.md
│   │   ├── test.md
│   │   ├── qa.md
│   │   ├── review.md
│   │   ├── deploy-dev.md
│   │   ├── deploy-prod.md
│   │   ├── deploy-gcp.md
│   │   ├── deploy-gcp-prod.md
│   │   ├── db-migrate.md
│   │   └── new-feature.md
│   ├── rules/             # Auto-loaded context rules
│   │   ├── bun-conventions.md
│   │   ├── testing.md
│   │   ├── deployment.md
│   │   └── security.md
│   ├── settings.json      # Plugins, permissions, hooks (shared)
│   └── settings.local.json.example
├── src/
│   ├── index.ts           # Bun.serve() entry point
│   ├── index.html         # HTML entry (Bun imports)
│   ├── app.tsx            # React root
│   ├── styles.css         # Global styles
│   ├── lib/               # Shared utilities
│   ├── routes/            # API route handlers
│   └── components/        # React components
├── scripts/
│   ├── migrate.ts         # Migration runner
│   └── migrations/        # Migration files
├── docs/
│   └── best-practices.md  # Team guide
├── .mcp.json              # MCP servers (context7, sequential-thinking)
├── CLAUDE.md              # Lean project context (~90 lines) with @imports
├── agents.md              # Agent usage guide (imported by CLAUDE.md)
├── Dockerfile             # Multi-stage Bun build for GCP Cloud Run
└── package.json           # Bun project config
```

## Documentation

- **[CLAUDE.md](CLAUDE.md)** — Project conventions Claude follows (lean, with @imports)
- **[agents.md](agents.md)** — How to use Claude Code effectively (imported by CLAUDE.md)
- **[docs/best-practices.md](docs/best-practices.md)** — Team best practices, prompting patterns, rules/ examples, onboarding
