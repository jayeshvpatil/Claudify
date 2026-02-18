# Claude Code Best Practices

A guide for teams using Claude Code effectively.

---

## 1. Writing a Good CLAUDE.md

Your `CLAUDE.md` is the single most important file for Claude Code. It reads this at the start of every conversation.

### What to Include

- **Project description** — One line. What does this project do?
- **Stack** — Runtime, framework, database, deployment target
- **Commands** — dev, test, build, deploy. Claude will run these.
- **"Use X, not Y" directives** — The most effective format. Claude follows these reliably.
- **Project structure** — Where things live in the repo.
- **Code style** — Naming conventions, error format, import patterns.
- **Git workflow** — Commit message format, branch naming.

### What NOT to Include

- Full API documentation — use context7 MCP for live docs instead
- Tutorials or explanations of *why* — Claude doesn't need justification, just directives
- Information that changes frequently — put that in code comments
- Secrets or env-specific values — use `.env` files
- Code snippets that might go stale — use `@file` references instead ("prefer pointers over copies")

### Keep It Lean

Under 150 lines. Claude reads this every time — bloated files dilute the important directives. Move detailed context into `.claude/rules/` files (see section 9 below).

### The Most Effective Format

```markdown
Use `Bun.serve()` for HTTP servers. Do NOT use express.
```

This directive format ("Use X. Do NOT use Y.") is what Claude follows most reliably.

### @Import Syntax

CLAUDE.md can reference other files that get loaded into context:

```markdown
For Bun API details, see @.claude/rules/bun-conventions.md
For agent guide, see @agents.md
```

Imports support:
- Relative paths: `@agents.md`, `@.claude/rules/testing.md`
- Home directory: `@~/.claude/my-global-rules.md`
- Recursive imports up to 5 hops deep
- Ignored inside code spans: `` `@anthropic/package` `` won't import

---

## 2. Structuring Prompts

### Small, Focused Requests

Break large tasks into steps. Instead of "build the entire auth system", try:

1. "Create the user model in src/lib/models/user.ts with email and password fields"
2. "Add login and register endpoints in src/routes/auth.ts"
3. "Write tests for the auth endpoints"
4. "Add JWT token generation in src/lib/auth.ts"

Each step gives Claude clear scope and lets you verify before moving on.

### Reference Existing Code

Always point Claude to existing patterns:

```
"Add a /api/posts route following the same pattern as
 the health endpoint in src/index.ts"
```

This is far more effective than describing the pattern from scratch.

### The CREF Pattern for Complex Prompts

- **C**ontext — What problem are you solving? What part of the codebase?
- **R**eference — Which existing file or pattern should be followed?
- **E**xpectation — What should the output look like?
- **F**iles — Which files to create or modify?

### State Constraints Explicitly

If you want Bun native APIs only, say so. Claude defaults to popular npm packages unless told otherwise.

---

## 3. Plan Mode vs Direct Execution

### When to Plan First

- New features touching 3+ files
- Database schema changes
- Architecture decisions
- "I'm not sure how to approach this"
- Refactoring across modules

In Plan Mode, Claude explores the codebase, considers alternatives, and presents an approach for your approval before writing code.

### When to Execute Directly

- Bug fixes with known cause
- Adding a test
- Small single-file changes
- Running commands (test, deploy)
- Following an established pattern

---

## 4. Hook Patterns

### Pre-Commit QA Gate (this project uses this)

Every commit runs lint + typecheck + test. If it fails, the commit is blocked.

**When the hook blocks you:**
1. Read the error output
2. Fix the issue
3. Stage the fix
4. Commit again

Do NOT try to skip the hook. The issue is real.

### PostToolUse Auto-Format (this project uses this)

After every file Write or Edit, Biome auto-formats the changed file. This keeps code consistent without any manual formatting steps. The hook:

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "bash -c 'FILE=$(echo \"$CLAUDE_TOOL_INPUT\" | jq -r \".file_path\"); bunx biome check --write \"$FILE\" 2>/dev/null; exit 0'",
          "timeout": 10
        }
      ]
    }
  ]
}
```

### Environment-Aware Hooks

For teams that need different behavior per environment:

```json
{
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "bash -c 'if [ \"$RAILWAY_ENVIRONMENT\" = \"production\" ]; then echo \"BLOCKED: No direct commands in production\" >&2; exit 1; fi'"
        }
      ]
    }
  ]
}
```

### Custom Validation Hooks

Block commits that include `console.log`:

```json
{
  "PreCommit": [
    {
      "hooks": [
        {
          "type": "command",
          "command": "bash -c '! git diff --cached --diff-filter=ACM | grep -q \"console.log\" || (echo \"Remove console.log before committing\" >&2; exit 1)'"
        }
      ]
    }
  ]
}
```

### Hook Types

Claude Code supports three hook handler types:
- **command** — Run a shell script. Receives JSON on stdin, communicates via exit codes.
- **prompt** — Send a prompt to a Claude model for yes/no evaluation.
- **agent** — Spawn a subagent with Read, Grep, Glob tools for multi-turn verification.

---

## 5. Using MCP Servers

### context7 — Live Documentation

The most useful MCP for Bun projects. Bun's API evolves fast and Claude's training data may be outdated.

**How to trigger it:**
Include "use context7" in your prompt:
```
"What's the current API for Bun.serve() WebSocket handling? Use context7."
```

**When to use it:**
- Bun API questions
- Any library where you need current docs
- Verifying if an API still exists or has changed

### sequential-thinking — Complex Reasoning

For problems that need step-by-step thinking:
- Database schema design
- Debugging with multiple possible causes
- Migration planning
- Architecture trade-offs

---

## 6. Custom Slash Commands

### Design Principles

1. **One purpose per command** — `/qa` does quality checks, `/deploy-dev` does deployment
2. **Include safety checks** — Deploy commands should verify code quality first
3. **Use `$ARGUMENTS`** — Make commands flexible: `/test auth` runs auth tests
4. **List `allowed-tools`** — Restrict what tools the command can use
5. **Handle failures** — Tell Claude what to do when a step fails

### Creating New Commands

Add a `.md` file to `.claude/commands/`:

```markdown
---
allowed-tools: ["Bash", "Read"]
description: "What this command does"
---

Instructions for Claude. Use $ARGUMENTS for user input.
```

The filename becomes the command: `my-command.md` → `/my-command`

---

## 7. Security

### Secrets
- Never put secrets in CLAUDE.md, settings.json, or committed files
- Use `.env` (gitignored) for local secrets
- Use Railway dashboard or GCP Cloud Run console for deployed env vars
- The `.env.example` file shows required vars without values

### Permissions
- `.claude/settings.json` has an allow/deny list
- Production deploys are denied by default — forces use of `/deploy-prod` or `/deploy-gcp-prod` with safety checks
- The PreToolUse hook blocks dangerous shell patterns

### Code Review
- Use `/review` before merging
- The security-guidance plugin flags common vulnerabilities
- Watch for: SQL injection, XSS, exposed secrets, missing validation

---

## 8. Team Collaboration

### Shared vs Personal Config

| File | Committed? | Scope |
|------|-----------|-------|
| `CLAUDE.md` | Yes | Team conventions |
| `.claude/settings.json` | Yes | Team plugins, permissions, hooks |
| `.claude/rules/*.md` | Yes | Team context rules (auto-loaded) |
| `.claude/settings.local.json` | No | Personal overrides |
| `.claude/commands/*.md` | Yes | Team slash commands |
| `.mcp.json` | Yes | Team MCP servers |
| `agents.md` | Yes | Team agent guide (imported by CLAUDE.md) |
| `.env` | No | Personal env vars |
| `.env.example` | Yes | Env var template |

### Onboarding New Team Members

1. Clone the repo
2. `cp .env.example .env` — fill in values
3. `cp .claude/settings.local.json.example .claude/settings.local.json`
4. `bun install`
5. Read `CLAUDE.md` and `agents.md`
6. Run `/dev` to start the server
7. Run `/qa` to see the quality pipeline
8. Try `/new-feature test-feature` to see scaffolding

### Evolving CLAUDE.md

Treat CLAUDE.md like code:
- When you establish a new pattern, add it to CLAUDE.md or a rules/ file
- When a pattern changes, update the relevant file
- Review CLAUDE.md and rules/ changes in PRs like any other code
- Use the `claude-md-management` plugin to help maintain it

---

## 9. Using `.claude/rules/` for Modular Context

Instead of cramming everything into CLAUDE.md, use `.claude/rules/` files. These are **auto-loaded by Claude Code** without needing `@import`.

### Why Rules Files?

- **Auto-loaded** — Claude reads all `.claude/rules/*.md` at session start
- **Path-scoped** — Rules can activate only for specific file patterns
- **Organized** — Separate concerns: Bun conventions, testing, deployment, security
- **Focused** — Claude gets the right context at the right time

### Path Scoping with YAML Frontmatter

Rules can be conditionally loaded based on which files Claude is working on:

```yaml
---
paths: ["**/*.test.ts", "**/*.test.tsx"]
---

# Testing Rules
Use bun:test exclusively...
```

This testing rule only loads when Claude is working on test files.

### This Project's Rules

| File | Scope | Contents |
|------|-------|----------|
| `bun-conventions.md` | All files | Bun native APIs, HTML imports pattern |
| `testing.md` | `*.test.ts` files | bun:test conventions, co-location |
| `deployment.md` | All files | Railway + GCP Cloud Run |
| `security.md` | All files | Secrets, permissions, hooks |

### Adding New Rules

Create a `.md` file in `.claude/rules/`:
```markdown
---
paths: ["src/routes/**"]
---

# API Route Conventions
- All routes return Response.json()
- Error format: { error: string, details?: string }
- Validate input with Zod schemas
```
