---
allowed-tools: ["Bash", "Read", "Glob", "Grep"]
description: "Run full QA pipeline: lint, typecheck, test"
---

Run the complete quality assurance pipeline. Execute each step in order:

**1. Lint**
Run `bunx biome check ./src`
- If issues found, list them and suggest running `bunx biome check --write ./src` to auto-fix

**2. Type Check**
Run `bunx tsc --noEmit`
- If errors found, list them with file:line locations

**3. Tests**
Run `bun test`
- Show pass/fail summary
- If failures, show details

**4. Summary**
Report:
- Issues per category (lint / types / tests)
- Overall verdict: **PASS** (all clear) or **FAIL** (issues found)
- If FAIL, list fixes in priority order
