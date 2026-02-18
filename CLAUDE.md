# [Project Name]

[One-line description of what this project does.]

Built with Bun, React, and deployed on Railway.

## Stack

- **Runtime**: Bun
- **Frontend**: React 19 + Bun HTML imports
- **Backend**: Bun.serve() with route handlers
- **Linting**: Biome
- **Testing**: bun:test
- **Deployment**: Railway

## Commands

```bash
bun run dev          # Start dev server with HMR
bun run build        # Build for production
bun run start        # Run production build
bun test             # Run tests
bun run qa           # Lint + typecheck + test
bun run deploy:dev   # Deploy to Railway dev
bun run deploy:prod  # Deploy to Railway production
bun run db:migrate   # Run database migrations
```

## Bun-First Development

Use Bun for everything. Do NOT use Node.js equivalents.

- `bun <file>` not `node <file>` or `ts-node <file>`
- `bun test` not `jest` or `vitest`
- `bun build` not `webpack` or `esbuild`
- `bun install` not `npm install`
- `bun run <script>` not `npm run <script>`
- `bunx <pkg>` not `npx <pkg>`
- Bun auto-loads `.env` — do NOT use dotenv

## Bun Native APIs

Use these instead of npm packages:

| Use this | Not this |
|----------|----------|
| `Bun.serve()` | express, fastify, hono |
| `bun:sqlite` | better-sqlite3 |
| `Bun.sql` | pg, postgres.js |
| `Bun.redis` | ioredis |
| `WebSocket` (built-in) | ws |
| `Bun.file()` | node:fs readFile/writeFile |
| `Bun.$\`cmd\`` | execa |
| `Bun.password` | bcrypt |
| `Bun.serve()` static routes | vite |

## Frontend Pattern

Use Bun's HTML imports — HTML files can directly import .tsx/.jsx/.js and Bun transpiles + bundles automatically.

**Server entry** (`src/index.ts`):
```ts
import homepage from "./index.html";

Bun.serve({
  port: Number(Bun.env.PORT) || 3000,
  routes: {
    "/": homepage,
    "/api/health": {
      GET: () => Response.json({ status: "ok" }),
    },
  },
  development: { hmr: true, console: true },
});
```

**HTML entry** (`src/index.html`):
```html
<html>
<body>
  <div id="root"></div>
  <script type="module" src="./app.tsx"></script>
</body>
</html>
```

**React root** (`src/app.tsx`):
```tsx
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return <h1>Hello</h1>;
}

createRoot(document.getElementById("root")!).render(<App />);
```

Run with: `bun --hot ./src/index.ts`

## Project Structure

```
src/
  index.ts          # Server entry (Bun.serve)
  index.html        # HTML entry (imported by server)
  app.tsx            # React root component
  styles.css         # Global styles
  lib/               # Shared utilities, business logic
  routes/            # API route handlers
  components/        # React components
scripts/
  migrate.ts         # DB migration runner
  migrations/        # Timestamped migration files
docs/                # Documentation
```

## Code Style

- TypeScript strict mode everywhere
- Biome for linting and formatting (`bunx biome check`)
- `const` over `let`, never `var`
- Explicit return types on exported functions
- `Response.json()` for JSON API responses
- Error format: `{ error: string, details?: string }`
- Path alias: `@/*` maps to `src/*`

## Testing

- Use `bun:test` — import { test, expect, describe, beforeAll, afterAll, mock }
- Co-locate tests next to source: `<module>.test.ts`
- Run all: `bun test`
- Run one: `bun test <path>`
- Watch: `bun test --watch`

## Git Workflow

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Run `bun run qa` before committing (pre-commit hook does this automatically)
- Branch naming: `feat/description`, `fix/description`
- Keep commits small and focused

## Railway Deployment

- Env vars are set in Railway dashboard, not in code
- Build: `bun install && bun run build`
- Start: `bun start`
- Dev deploy: `railway up --environment development`
- Prod deploy: `railway up --environment production`
- Railway auto-deploys on push to main

## Debugging

- Use `bun --hot ./src/index.ts` for dev with HMR
- For Bun API questions, ask Claude to "use context7" for live docs
- Bun type docs: `node_modules/bun-types/docs/**/*.mdx`
