# 服务端安装
## 构建本地镜像
```bash
./build-docker.sh
```
## 配置环境变量
```bash
cp .env.example .env
```
## 修改环境变量
### 必须配置数据库地址
> DATABASE_URL=你的postgres数据库地址
### 修改jwt秘钥
> JWT_SECRET=
### 使用下面的命令生成秘钥
```bash
openssl rand -hex 32
```

## 启动服务
```bash
docker-compose up -d
```

# 运行时安装

## 配置服务器地址
```bash
multica config set server_url http://localhost:8080
multica config set app_url http://localhost:3000
```
## 打开浏览器认证（默认90天）
```bash
multica login
```

## 使用PAT登录
```bash
multica login --token
# 根据提示 输入PAT
```

## 启动运行时守护进程
```bash
multica daemon start
```

# 源码使用注意
本软件基于Multica (https://multica.io) 修改开发。请遵守Multica项目的开源协议。  
This software is developed based on Multica (https://multica.io). Please comply with the open-source license of the Multica project.