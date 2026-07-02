# Build context is the REPO ROOT (needs packages/shared + workspace lockfile):
#   docker build -f apps/api/Dockerfile -t eyb-api .
FROM node:22-slim AS build
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install with the full workspace lockfile for reproducible deps.
# tsconfig.base.json is extended by packages/shared/tsconfig.json.
COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
RUN npm ci

COPY packages/shared packages/shared
COPY apps/api apps/api
RUN npm run build -w @eyb/shared \
 && npx prisma generate --schema apps/api/prisma/schema.prisma \
 && npm run build -w @eyb/api

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api
EXPOSE 3001
# Apply migrations then boot. (Seed once manually: `npm run seed`.)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
