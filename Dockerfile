# --- Build stage (Go backend) ---
FROM golang:1.26-alpine AS builder-backend

RUN apk add --no-cache git

WORKDIR /src

COPY server/go.mod server/go.sum ./server/
RUN cd server && go mod download

COPY server/ ./server/

ARG VERSION=dev
ARG COMMIT=unknown
RUN cd server && CGO_ENABLED=0 go build -ldflags "-s -w -X main.version=${VERSION} -X main.commit=${COMMIT}" -o bin/server ./cmd/server
RUN cd server && CGO_ENABLED=0 go build -ldflags "-s -w" -o bin/wdjh ./cmd/multica
RUN cd server && CGO_ENABLED=0 go build -ldflags "-s -w" -o bin/migrate ./cmd/migrate

# --- Dependencies (Node) ---
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json .npmrc ./
COPY apps/web/package.json apps/web/
COPY packages/core/package.json packages/core/
COPY packages/ui/package.json packages/ui/
COPY packages/views/package.json packages/views/
COPY packages/tsconfig/package.json packages/tsconfig/
COPY packages/eslint-config/package.json packages/eslint-config/

RUN pnpm install --frozen-lockfile

# --- Build (Node frontend) ---
FROM node:22-alpine AS builder-frontend

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app

COPY --from=deps /app ./

COPY package.json turbo.json pnpm-workspace.yaml ./
COPY apps/web/ apps/web/
COPY packages/ packages/

RUN pnpm install --frozen-lockfile --offline

ARG REMOTE_API_URL=http://localhost:8080
ARG NEXT_PUBLIC_WS_URL
ENV REMOTE_API_URL=$REMOTE_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
ENV STANDALONE=true

RUN pnpm --filter @multica/web build

# --- Runtime stage ---
FROM alpine:3.21

RUN apk add --no-cache ca-certificates tzdata nodejs nodejs18

WORKDIR /app

# Copy backend
COPY --from=builder-backend /src/server/bin/server ./
COPY --from=builder-backend /src/server/bin/wdjh ./
COPY --from=builder-backend /src/server/bin/migrate ./
COPY server/migrations/ ./migrations/

# Copy frontend (standalone output) - for Go to serve static files
COPY --from=builder-frontend /app/apps/web/.next/standalone ./
COPY --from=builder-frontend /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder-frontend /app/apps/web/public ./apps/web/public

# Entrypoint: start Next.js SSR in background, then Go as main
RUN sed -i 's/\r$//' docker/entrypoint.sh || true && chmod +x docker/entrypoint.sh 2>/dev/null || true

EXPOSE 8080

CMD ["sh", "-c", "node apps/web/server.js &> /tmp/ssr.log & ./server"]
