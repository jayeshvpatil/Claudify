# Deployment

## Railway

Env vars are set in Railway dashboard, not in code.

- Build: `bun install && bun run build`
- Start: `bun start`
- Dev deploy: `railway up --environment development`
- Prod deploy: `railway up --environment production`
- Railway auto-deploys on push to main

## GCP Cloud Run

Uses Docker-based deployment via `gcloud`.

- Staging: `gcloud run deploy <service>-staging --source . --region us-central1`
- Production: `gcloud run deploy <service> --source . --region us-central1`
- Logs: `gcloud run services logs read <service> --region us-central1`

### GCP Environment Variables

Set via Cloud Run console or CLI:
```bash
gcloud run services update <service> \
  --set-env-vars "KEY=value" \
  --region us-central1
```

### Dockerfile

The project includes a multi-stage `Dockerfile` optimized for Bun:
- Build stage: installs deps and builds with Bun
- Run stage: minimal image, copies only dist output
- Exposes PORT (default 3000)

## Environment Strategy

| Environment | Railway | GCP Cloud Run |
|-------------|---------|---------------|
| Development | `--environment development` | `<service>-staging` |
| Production | `--environment production` | `<service>` |
| Env vars | Railway dashboard | Cloud Run console or `gcloud` CLI |
