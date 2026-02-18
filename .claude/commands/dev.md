---
allowed-tools: ["Bash", "Read", "Glob", "Grep"]
description: "Start the development server with hot reload"
---

Start the Bun development server with hot module reload.

1. Check if port 3000 (or the PORT in .env) is already in use with `lsof -i :3000`. If busy, inform the user which process holds it and ask if they want to kill it.
2. Run `bun run dev` to start the server.
3. Confirm the server is running and show the URL.

If $ARGUMENTS contains a port number, set PORT env and use that instead of the default.
