import homepage from "./index.html";

const port = Number(Bun.env.PORT) || 3000;

Bun.serve({
  port,
  routes: {
    "/": homepage,
    "/api/health": {
      GET: () =>
        Response.json({
          status: "ok",
          timestamp: new Date().toISOString(),
        }),
    },
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at http://localhost:${port}`);
