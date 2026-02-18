---
allowed-tools: ["Bash", "Read", "Glob"]
description: "Deploy to GCP Cloud Run production (with safety checks)"
---

Deploy to GCP Cloud Run production. This command has strict safety checks.

Steps:

1. **Run QA checks**: `bun run qa` — all checks must pass. No exceptions.

2. **Verify branch**: Confirm we are on the `main` branch. If not, warn and ask for confirmation.

3. **Check remote sync**: Verify the current branch is up-to-date with remote (no unpushed commits).

4. **Check uncommitted changes**: If any exist, refuse to deploy.

5. **Check GCP project**: Run `gcloud config get-value project`. Show the active project and ask the user to confirm it's correct.

6. **Show deployment summary**:
   - Current branch and commit hash
   - Last 3 commit messages
   - Active GCP project
   - Target region

7. **Ask for confirmation** before proceeding.

8. **Deploy to production**: Run:
   ```
   gcloud run deploy <service-name> \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --port 3000
   ```
   If $ARGUMENTS contains a service name, use that. Otherwise use the project name from package.json.

9. **Verify deployment**: Hit the `/api/health` endpoint to confirm the new deployment is running.

10. **Monitor**: Check `gcloud run services logs read <service> --region us-central1 --limit 20` for any startup errors.

11. **Report**: Show the production URL and deployment status.
