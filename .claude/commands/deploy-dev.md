---
allowed-tools: ["Bash", "Read", "Glob"]
description: "Deploy to Railway development environment"
---

Deploy to Railway's development/staging environment.

**Steps:**

1. **QA Check**: Run `bun run qa` (lint + typecheck + test).
   If anything fails, STOP and report the issues. Do NOT deploy broken code.

2. **Git Check**: Run `git status`. If there are uncommitted changes, warn the user but allow proceeding.

3. **Deploy**: Run `railway up --environment development --detach`

4. **Verify**: Run `railway logs --environment development` to check for startup errors in the first few seconds.

5. **Report**: Show the deployment URL and status.

If $ARGUMENTS contains `--skip-qa`, skip step 1 but warn that QA was skipped.
