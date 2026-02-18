---
allowed-tools: ["Bash", "Read", "Glob"]
description: "Deploy to Railway production (with safety checks)"
---

Deploy to Railway production. This has strict safety checks.

**Steps:**

1. **QA Check**: Run `bun run qa`. ALL checks must pass. No exceptions, no skipping.

2. **Branch Check**: Verify we are on the `main` branch (`git branch --show-current`).
   If not on main, warn the user and ask for confirmation before proceeding.

3. **Clean State**: Check `git status` for uncommitted changes.
   If dirty, REFUSE to deploy. Ask the user to commit or stash first.

4. **Remote Sync**: Check `git status -sb` to see if branch is behind remote.
   If behind, REFUSE and ask user to pull first.

5. **Deployment Summary**: Show the user:
   - Current branch and commit hash
   - Last 3 commit messages (`git log --oneline -3`)
   - Warn about any pending env var changes

6. **Confirm**: Ask the user to explicitly confirm they want to deploy to production.

7. **Deploy**: Run `railway up --environment production --detach`

8. **Monitor**: Run `railway logs --environment production` and watch for 30 seconds for startup errors.

9. **Report**: Show production URL and deployment status.
