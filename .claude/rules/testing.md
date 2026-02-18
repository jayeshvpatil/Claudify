---
paths: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"]
---

# Testing Conventions

Use `bun:test` exclusively. Do NOT use jest, vitest, or mocha.

```ts
import { describe, expect, test, beforeAll, afterAll, mock } from "bun:test";
```

## Rules

- Co-locate tests next to source files: `user.ts` → `user.test.ts`
- Name pattern: `<module>.test.ts`
- Group related tests with `describe()`
- Test both happy paths and error cases
- Test input validation separately
- Use `mock()` for external dependencies

## Running

- All tests: `bun test`
- Single file: `bun test src/routes/auth.test.ts`
- Pattern match: `bun test --grep "auth"`
- Watch mode: `bun test --watch`
- Coverage: `bun test --coverage`
