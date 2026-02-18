---
allowed-tools: ["Bash", "Read", "Glob"]
description: "Deploy to GCP Cloud Run staging environment"
---

Deploy the current code to GCP Cloud Run staging.

Steps:

1. **Verify gcloud CLI**: Run `gcloud --version`. If not installed, tell the user to install it: `curl https://sdk.cloud.google.com | bash`

2. **Run QA checks**: Run `bun run qa` to verify code quality (lint + typecheck + test). If any step fails, stop and report the issues. Do NOT deploy broken code.

3. **Check git status**: Warn if there are uncommitted changes.

4. **Check GCP project**: Run `gcloud config get-value project` to confirm which GCP project is active. Show it to the user.

5. **Deploy to staging**: Run:
   ```
   gcloud run deploy <service-name>-staging \
     --source . \
     --region us-central1 \
     --allow-unauthenticated \
     --port 3000
   ```
   If $ARGUMENTS contains a service name, use that. Otherwise use the project name from package.json.

6. **Verify deployment**: After deploy completes, hit the `/api/health` endpoint of the deployed URL to confirm it's running.

7. **Report**: Show the staging URL and deployment status.

If $ARGUMENTS contains "--skip-qa", skip step 2 (but warn the user).
