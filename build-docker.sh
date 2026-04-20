#/bin/bash
set -eu
echo "============构建后端==============="
make build
echo "============构建前端==============="
cd apps/web
pnpm --filter @multica/web build
echo "============构建后端镜像============"
cd ../..
docker build -t wdjh .
echo "============构建前端镜像============"
docker build -f ./Dockerfile.web -t wdjhui .
echo "============构建完成================"