#/bin/bash
set -eu
echo "============构建后端镜像============"
docker build -t wdjh .
echo "============构建前端镜像============"
docker build -f ./Dockerfile.web -t wdjhui .
echo "============构建完成================"