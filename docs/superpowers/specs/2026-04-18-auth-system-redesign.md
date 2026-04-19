# 认证系统重构设计

## 日期: 2026-04-18

## 背景

当前系统使用邮箱验证码 + Google OAuth 认证，首页为宣传页面。需要改造为账号密码认证，并根据账号状态引导用户到相应页面。

## 需求

1. **移除宣传推广页面**，首页 `/` 根据登录状态跳转
2. **替换认证方式**：邮箱验证码 + Google OAuth → 账号密码登录
3. **管理员初始化流程**：系统无账号时跳转到初始化页面创建管理员

## 路由行为

访问 `/` 时的路由逻辑：

| 条件 | 跳转目标 |
|------|---------|
| 系统无账号 | `/init` (管理员初始化) |
| 有账号但未登录 | `/login` |
| 已登录 | 第一个 workspace 或 `/workspaces/new` |

## 数据库变更

### 新增字段

```sql
ALTER TABLE "user" ADD COLUMN password_hash TEXT;
```

## 后端 API

### 新增接口

#### POST /api/auth/login
账号密码登录

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@example.com",
    "avatar_url": null,
    "created_at": "2026-04-18T00:00:00Z",
    "updated_at": "2026-04-18T00:00:00Z"
  }
}
```

**Errors:**
- 400: email and password required
- 401: invalid credentials

### 新增接口

#### POST /api/auth/init
管理员初始化（仅当系统无账号时可用）

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

**Behavior:**
- 创建管理员账号
- 创建第一个 workspace，管理员自动成为 owner
- 设置 HttpOnly cookie

**Errors:**
- 400: invalid input
- 409: admin already exists (redirect to login)

### 修改现有接口

#### GET /api/auth/check
新增用于前端检查系统是否有账号

**Response (200):**
```json
{
  "has_user": true,
  "is_logged_in": false
}
```

## 前端页面

### 1. 首页 `/`
- 移除 Landing 组件
- 客户端检查：
  1. 调用 `GET /api/auth/check`
  2. 根据返回结果跳转

### 2. 管理员初始化页 `/init`
- 路由保护：只有系统无账号时可见
- 表单：邮箱、密码、确认密码
- 提交到 `POST /api/auth/init`
- 成功后跳转到第一个 workspace 或 `/workspaces/new`

### 3. 登录页 `/login`
- 移除邮箱验证码流程
- 移除 Google 登录按钮
- 新表单：邮箱、密码
- 提交到 `POST /api/auth/login`
- 成功后的跳转逻辑保持不变

## 前端组件

### 移除组件
- `MulticaLanding`
- `RedirectIfAuthenticated`

### 修改 LoginPage 组件
- 移除 `step` 状态 (email/code/cli_confirm)
- 移除 `sendCode`, `verifyCode` 相关逻辑
- 新增 `password` 状态和登录逻辑
- 保留 `cliCallback` 支持（CLI 场景）

## 文件变更

### 后端 (Go)
```
server/internal/handler/auth.go      # 新增 login, init 接口
server/internal/auth/jwt.go         # 可复用
server/pkg/db/generated/user.sql.go # 读取但不改（已有 password_hash 字段）
```

### 前端 (Next.js)
```
apps/web/app/page.tsx                    # 改为简单路由判断
apps/web/app/(auth)/init/page.tsx        # 新建管理员初始化页
apps/web/app/(auth)/login/page.tsx       # 修改为密码登录
packages/views/auth/login-page.tsx        # 修改登录组件
packages/core/auth/store.ts               # 可能需要调整
```

### 数据库
```
migrations/                              # 新增 password_hash 字段迁移
```

## 安全考虑

1. **密码哈希**：使用 bcrypt 或 argon2
2. **JWT 有效期**：保持 30 天
3. **Cookie**：HttpOnly + Secure
4. **登录失败限制**：可考虑 rate limit（当前代码已有验证码限流）

## 实施顺序

1. 数据库迁移添加 `password_hash` 字段
2. 后端实现 `POST /api/auth/login` 接口
3. 后端实现 `POST /api/auth/init` 接口
4. 前端实现管理员初始化页面
5. 修改前端登录页面
6. 修改首页路由逻辑
7. 测试完整流程
