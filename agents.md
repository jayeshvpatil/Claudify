# Working with Claude Code — Agent Guide

This guide helps your team use Claude Code effectively on this project.

## Slash Commands Available

| Command | Use when... |
|---------|-------------|
| `/dev` | Starting the development server |
| `/test` | Running tests (supports filters, watch, coverage) |
| `/qa` | Before committing — runs lint + typecheck + test |
| `/review` | After finishing a feature — code review of changes |
| `/deploy-dev` | Deploying to Railway staging (includes QA check) |
| `/deploy-prod` | Deploying to Railway production (strict safety checks) |
| `/deploy-gcp` | Deploying to GCP Cloud Run staging |
| `/deploy-gcp-prod` | Deploying to GCP Cloud Run production (strict safety checks) |
| `/db-migrate` | Creating or running database migrations |
| `/new-feature` | Scaffolding a new feature (routes, tests, types) |

## When to Use Plan Mode

**Use Plan Mode** (`/plan` or say "plan this first"):
- New features that touch 3+ files
- Architecture decisions with trade-offs
- Refactoring across multiple modules
- Tasks where the right approach is unclear
- Database schema changes

**Skip Plan Mode** (just ask directly):
- Bug fixes with a clear cause
- Adding a test for existing code
- Single-file changes
- Running commands (test, deploy, lint)
- Small refactors within one file

## How to Write Good Prompts

### Be Specific About Location
```
Good: "Add a GET /api/users route in src/routes/users.ts following
       the pattern in src/index.ts"

Bad:  "Add a users endpoint"
```

### Reference Existing Code
```
Good: "Create a new route handler like the health endpoint in
       src/index.ts, but for /api/posts"

Bad:  "Create a REST API"
```

### The CREF Pattern

Structure complex prompts with:

- **C**ontext — What part of the codebase, what problem
- **R**eference — Existing pattern or file to follow
- **E**xpectation — What the result should look like
- **F**iles — Which files to create or modify

Example:
```
Context: We need user authentication for the API.
Reference: Follow the route pattern in src/index.ts and
           the test pattern in src/index.test.ts.
Expectation: JWT-based auth with login/register endpoints
             that return tokens.
Files: src/routes/auth.ts, src/lib/auth.ts,
       src/routes/auth.test.ts
```

### State the Constraint
```
Good: "Implement this using only Bun native APIs, no npm packages"
Bad:  "Implement this" (Claude might reach for express, pg, etc.)
```

## MCP Tools Available

### context7 — Live Documentation
Fetches up-to-date docs for any library. Use when:
- Bun API syntax is unclear or may have changed
- Working with an unfamiliar npm package
- Need to verify current API signatures

Trigger it by including "use context7" in your prompt:
```
"How does Bun.serve() handle WebSocket upgrade? Use context7
 for the latest docs."
```

### sequential-thinking — Structured Reasoning
For complex multi-step problems. Use when:
- Designing database schemas
- Planning migration strategies
- Debugging issues with multiple possible causes
- Working through architectural trade-offs

## Plugins Enabled

| Plugin | What it does |
|--------|-------------|
| **frontend-design** | Generates polished, distinctive UIs (not generic AI aesthetic) |
| **context7** | Injects live library documentation into prompts |
| **superpowers** | Structured workflows: brainstorm, plan, execute in batches |
| **claude-md-management** | Keeps CLAUDE.md updated as the project evolves |
| **code-review** | Automated code review on changes |
| **security-guidance** | Flags security issues and suggests fixes |
| **commit-commands** | Git commit helpers with conventional commit format |

## Hooks in This Project

### Pre-Commit: QA Gate
Every commit automatically runs `bun run qa` (lint + typecheck + test). If any check fails, the commit is blocked. Fix the issue and commit again.

### Pre-Tool-Use: Safety Guard
Before running shell commands, a hook checks for dangerous patterns:
- `rm -rf /` or `rm -rf ~` — blocked
- `sudo` commands — blocked
- Piping curl/wget to sh — blocked

If a command is blocked, it's for safety. Rewrite the command to be more specific.

## Team Workflow

### Starting a New Feature
1. Create a branch: `feat/my-feature`
2. Use `/new-feature my-feature-description` to scaffold
3. Implement the feature
4. Use `/review` to self-review
5. Use `/qa` to verify quality
6. Commit (pre-commit hook runs QA automatically)
7. Use `/deploy-dev` to test on staging
8. Create PR and request review

### Debugging
1. Describe the bug with reproduction steps
2. Point Claude to the relevant file(s)
3. Ask Claude to "check the tests" first
4. Use context7 if the issue might be an API change

### Code Review
1. Use `/review` after completing changes
2. Fix all **Critical** items before committing
3. Address **Important** items unless you have a reason not to
4. **Suggestions** are optional but worth considering

## Tips

- **Read CLAUDE.md** — Claude follows it on every invocation. If Claude keeps making the wrong choice, update CLAUDE.md.
- **Small commits** — Smaller changes get better reviews and are easier to debug.
- **One thing at a time** — Don't ask Claude to "build the entire auth system." Break it into steps.
- **Trust the hooks** — If a commit is blocked, the code has an issue. Don't try to skip the hook.
- **Update CLAUDE.md** — When you add new patterns or conventions, add them to CLAUDE.md so Claude follows them next time.
