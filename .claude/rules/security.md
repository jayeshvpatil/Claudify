# Security Rules

## Secrets

- NEVER put secrets in CLAUDE.md, settings.json, or any committed file
- Use `.env` (gitignored) for local secrets
- Use Railway dashboard or GCP Cloud Run console for deployed env vars
- The `.env.example` file shows required vars without values

## Permission Model

`.claude/settings.json` has an allow/deny list:
- **Allowed**: bun, bunx, git, gcloud (read-only), railway (read-only), file tools
- **Denied**: `rm -rf /`, `sudo`, production deploys (forces use of `/deploy-prod` or `/deploy-gcp-prod` with safety checks)

## Hooks

### Pre-Commit QA Gate
Every commit runs `bun run qa` (lint + typecheck + test). If any check fails, the commit is blocked. Fix the issue, don't bypass the hook.

### Pre-Tool-Use Safety Guard
Blocks dangerous shell patterns before execution:
- `rm -rf /` or `rm -rf ~` — filesystem nukes
- `sudo` — privilege escalation
- `curl | sh` or `wget | sh` — remote code execution

### Post-Tool-Use Auto-Format
After every file Write or Edit, Biome auto-formats the changed file. This keeps code consistent without manual formatting.

## Code Review

- Use `/review` before merging any PR
- The `security-guidance` plugin flags common vulnerabilities
- Watch for: SQL injection, XSS, exposed secrets, missing input validation
- Always validate user input at API boundaries
