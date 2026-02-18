---
allowed-tools: ["Bash", "Read", "Glob", "Grep"]
description: "Code review of recent changes"
---

Review code changes for quality, bugs, and best practices.

**Step 1: Get the diff**
- If $ARGUMENTS is a file path, review only that file: `git diff $ARGUMENTS`
- If $ARGUMENTS is a branch name, compare: `git diff $ARGUMENTS...HEAD`
- Otherwise: check `git diff --cached` (staged), then `git diff` (unstaged), then `git diff HEAD~1` (last commit)

**Step 2: Review each changed file for:**
- **Correctness** — Logic errors, null handling, async/await issues, off-by-one
- **Bun conventions** — Are Bun native APIs used? (check CLAUDE.md for rules)
- **Security** — SQL injection, XSS, exposed secrets, missing input validation
- **Performance** — Unnecessary work, N+1 queries, missing caching
- **Tests** — Are new functions tested? Edge cases covered?
- **Types** — Proper TypeScript types? Any `any` that should be specific?

**Step 3: Output feedback as:**
- **Critical** (must fix) — Bugs, security issues, data loss risks
- **Important** (should fix) — Performance, missing tests, bad patterns
- **Suggestions** (nice to have) — Style, alternative approaches, readability
