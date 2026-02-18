---
allowed-tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
description: "Scaffold a new feature with routes, tests, and types"
---

Scaffold a new feature. $ARGUMENTS should describe the feature (e.g., "user authentication", "blog posts API", "product catalog").

**Step 1 — Plan**
Before writing any code, outline:
- What files will be created
- What routes will be added
- What types are needed
- What tests will cover

Show the plan and wait for user confirmation.

**Step 2 — Route Handler**
Create `src/routes/<feature>.ts`:
- Export handler functions following the Bun.serve() route pattern
- Include TypeScript types for request/response
- Add input validation
- Add error handling: `{ error: string, details?: string }`

**Step 3 — Register Route**
Update `src/index.ts`:
- Import the new route handler
- Add to the `routes` object in Bun.serve()

**Step 4 — Types** (if needed)
Create `src/lib/types/<feature>.ts`:
- Request/response interfaces
- Database model types

**Step 5 — Tests**
Create `src/routes/<feature>.test.ts`:
- Happy path tests
- Error case tests
- Input validation tests
- Follow existing test patterns in the project

**Step 6 — Migration** (if data storage needed)
Generate a migration: `bun ./scripts/migrate.ts generate <feature>`
Fill in the schema.

**Step 7 — Summary**
List all created files and suggest next steps.
