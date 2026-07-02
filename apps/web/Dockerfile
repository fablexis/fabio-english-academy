# Build context is the REPO ROOT (needs packages/shared + workspace lockfile):
#   docker build -f apps/web/Dockerfile -t eyb-web .
FROM node:22-slim AS build
WORKDIR /app

# Install with the full workspace lockfile for reproducible deps.
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/web/package.json apps/web/
RUN npm ci

COPY packages/shared packages/shared
COPY apps/web apps/web

# PUBLIC_* env vars are inlined into the client/server bundles at build time,
# so the API base URL must be provided as a build arg (Railway passes service
# variables to Docker builds automatically when declared as ARG).
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
RUN npm run build -w @eyb/shared && npm run build -w @eyb/web

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY --from=build /app/apps/web/package.json ./apps/web/package.json

EXPOSE 4321
# Standalone Node server: serves prerendered assets + SSR routes.
CMD ["node", "apps/web/dist/server/entry.mjs"]
