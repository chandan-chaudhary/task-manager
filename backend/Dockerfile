
# ---------- Dependencies ----------
FROM node:20-bullseye-slim AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# ---------- Development ----------
FROM node:20-bullseye-slim AS dev

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 8080
CMD ["npm", "run", "dev"]

# ---------- Builder ----------
FROM node:20-bullseye-slim AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
# RUN npm prune --production
 # npm prune --production Remove dev dependencies for smaller final image

# ---------- Runner ----------
FROM node:20-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system app && adduser --system --ingroup app app

# # Copy package files
# COPY package*.json ./

# # Install ONLY production dependencies
# RUN npm ci --omit=dev --legacy-peer-deps

# # Copy Prisma schema
# COPY --from=builder /app/prisma ./prisma

# # Copy built application
# COPY --from=builder /app/dist ./dist

COPY --from=builder --chown=app:app /app/prisma ./prisma
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./package.json

USER app
EXPOSE 8080
CMD ["npm", "start"]




# FROM node:20-bullseye-slim

# # Create a non-root system user for safer runtime
# RUN addgroup --system app && adduser --system --ingroup app app

# # Run as non-root by default
# USER app

# # App root inside the container
# WORKDIR /app

# # Copy dependency manifests first to leverage Docker layer caching
# # --chown keeps ownership so non-root can read/write
# COPY --chown=app:app package*.json ./

# # Install deps as root if needed
# USER root

# RUN npm install --legacy-peer-deps

# # Ensure app user owns all files (incl. .next cache)
# RUN chown -R app:app /app

# # Switch back to non-root for runtime
# USER app

# # Copy source with correct ownership
# COPY --chown=app:app . .

# # Generate Prisma Client (types + runtime) for current schema
# RUN npx prisma generate

# # Dev server port
# EXPOSE 8080

# # Start the backend server
# CMD npm run dev

