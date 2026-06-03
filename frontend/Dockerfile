# ---------- Dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

# ---------- Development ----------
FROM node:20-alpine AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# ---------- Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER app

EXPOSE 3000

CMD ["node", "server.js"]


# # ---------- Dev ----------
# FROM node:20-alpine AS dev

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "dev"]

# # ---------- Builder ----------
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY . .

# RUN npm run build

# # ---------- Runner ----------
# FROM node:20-alpine

# WORKDIR /app

# # ENV NODE_ENV=production

# # Create non-root user
# RUN addgroup -S app && adduser -S app -G app

# COPY --from=builder /app/package*.json ./

# RUN npm install --legacy-peer-deps --omit=dev

# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# # Give ownership
# RUN chown -R app:app /app

# # Switch to non-root
# USER app

# EXPOSE 3000

# CMD ["npm", "run", "start"]


# FROM node:20-alpine

# # Create a non-root user for safer runtime (-S system user, -G group)
# RUN addgroup app && adduser -S -G app app

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

# # Dev server port
# EXPOSE 3000

# # Start Next.js dev server
# CMD npm run dev



# # syntax=docker/dockerfile:1

# # Comments are provided throughout this file to help you get started.
# # If you need more help, visit the Dockerfile reference guide at
# # https://docs.docker.com/go/dockerfile-reference/

# # Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# ARG NODE_VERSION=22.22.0

# FROM node:${NODE_VERSION}-alpine

# # Use production node environment by default.
# ENV NODE_ENV production


# WORKDIR /usr/src/app

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.npm to speed up subsequent builds.
# # Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# # into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# # Run the application as a non-root user.
# USER node

# # Copy the rest of the source files into the image.
# COPY . .

# # Expose the port that the application listens on.
# EXPOSE 3000

# # Run the application.
# CMD npm run dev
