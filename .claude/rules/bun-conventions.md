# Bun Native APIs

Always use Bun native APIs. Never reach for npm alternatives.

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

Use Bun's HTML imports. HTML files directly import .tsx/.jsx/.js — Bun transpiles and bundles automatically.

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

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
```

Run with: `bun --hot ./src/index.ts`
