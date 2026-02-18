# Claudify

A pre-configured starter repo for building applications with Claude Code, Bun, and Railway.

Clone it, customize it, start building.

## What's Included

**Claude Code Configuration**
- `CLAUDE.md` — Project context with Bun-first conventions
- `.claude/settings.json` — 7 plugins, permissions, pre-commit hooks, safety guards
- `.mcp.json` — context7 (live docs) + sequential-thinking (complex reasoning)
- 8 slash commands for dev, test, QA, review, deploy, migrate, scaffold

**Opinionated Stack**
- Bun runtime (not Node)
- Bun.serve() with HTML imports (not Express, not Vite)
- React 19
- Biome linting (not ESLint)
- Railway deployment
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

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/dev` | Start dev server with HMR, check port conflicts |
| `/test [filter]` | Run tests — supports path, grep, watch, coverage |
| `/qa` | Full pipeline: lint + typecheck + test |
| `/review [file\|branch]` | Code review with Critical/Important/Suggestions |
| `/deploy-dev` | QA check + deploy to Railway staging |
| `/deploy-prod` | Strict safety checks + deploy to Railway production |
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
- **Production deploy protection** — `/deploy-prod` requires main branch, clean state, and explicit confirmation
- **Permission deny list** — Dangerous commands are blocked by default

## Project Structure

```
Claudify/
├── .claude/
│   ├── commands/       # 8 slash commands
│   ├── settings.json   # Plugins, permissions, hooks (shared)
│   └── settings.local.json.example  # Personal override template
├── src/
│   ├── index.ts        # Bun.serve() entry point
│   ├── index.html      # HTML entry (Bun imports)
│   ├── app.tsx          # React root
│   ├── styles.css       # Global styles
│   ├── lib/             # Shared utilities
│   ├── routes/          # API route handlers
│   └── components/      # React components
├── scripts/
│   ├── migrate.ts       # Migration runner
│   └── migrations/      # Migration files
├── docs/
│   └── best-practices.md  # Team guide
├── .mcp.json            # MCP servers (context7, sequential-thinking)
├── CLAUDE.md            # Claude Code project context
├── agents.md            # Agent usage guide
└── package.json         # Bun project config
```

## Documentation

- **[CLAUDE.md](CLAUDE.md)** — Project conventions Claude follows
- **[agents.md](agents.md)** — How to use Claude Code effectively
- **[docs/best-practices.md](docs/best-practices.md)** — Team best practices, prompting patterns, hook examples, onboarding
