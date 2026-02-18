# --- Build stage ---
FROM oven/bun:1 AS build

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY src/ ./src/
COPY scripts/ ./scripts/
COPY tsconfig.json ./
RUN bun run build

# --- Run stage ---
FROM oven/bun:1-slim

WORKDIR /app

# Copy only what's needed to run
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Cloud Run sets PORT env var
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "start"]
