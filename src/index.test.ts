import { describe, expect, test } from "bun:test";

describe("health endpoint", () => {
  test("returns ok status", async () => {
    const res = await fetch("http://localhost:3000/api/health");
    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
  });
});
