#/bin/bash
make build
cd apps/web
RUN pnpm --filter @multica/web build
docker build -t wdjh .
docker build -f ./Dockerfile.web -t wdjhui .