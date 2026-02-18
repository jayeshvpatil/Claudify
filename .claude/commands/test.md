---
allowed-tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
description: "Run tests with optional filtering"
---

Run the test suite using bun test.

Based on $ARGUMENTS:
- **No args**: Run `bun test` (all tests)
- **File path**: Run `bun test $ARGUMENTS`
- **"watch"**: Run `bun test --watch`
- **"coverage"**: Run `bun test --coverage`
- **Other text**: Run `bun test --grep "$ARGUMENTS"` to filter by test name

After tests complete:
- Show pass/fail count
- If failures exist, show failure details and suggest fixes
- If all pass, confirm with a short summary
