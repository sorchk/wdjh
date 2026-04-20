# 全面本地化（中文）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 对登录页、首页、仪表盘等所有面向用户的页面进行全面中文本地化

**Architecture:** 在 `features/dashboard/i18n/` 和 `apps/web/app/(auth)/` 下扩展 i18n 系统，为所有无翻译的页面/组件添加中文字典

**Tech Stack:** Next.js 14, React, TypeScript, i18n context (useLocale)

---

### Task 1: 登录页 (Login Page) 本地化

**Files:**
- Modify: `apps/web/app/(auth)/login/page.tsx:1-237`
- i18n: `apps/web/features/dashboard/i18n/auth/en.ts` (create)
- i18n: `apps/web/features/dashboard/i18n/auth/zh.ts` (create)
- i18n types: `apps/web/features/dashboard/i18n/types.ts`

- [ ] **Step 1: 创建 `apps/web/features/dashboard/i18n/auth/` 目录和英文字典文件**

```typescript
// apps/web/features/dashboard/i18n/auth/en.ts
import type { AuthDict } from "./types";
export const en: AuthDict = {
  login: {
    signIn: "Sign in",
    enterCredentials: "Enter your credentials to access your account",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    signingIn: "Signing in...",
    invalidCredentials: "Invalid credentials",
  },
  cliConfirm: {
    authorizeCli: "Authorize CLI",
    allowAccess: (email: string) => `Allow the CLI to access Multica as ${email}?`,
    authorizing: "Authorizing...",
    useDifferentAccount: "Use a different account",
  },
  init: {
    initializeAdmin: "Initialize Admin",
    createAdminAccount: "Create your administrator account to get started",
    email: "Email",
    emailPlaceholder: "admin@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    confirmPassword: "Confirm Password",
    creating: "Creating...",
    createAdminAccountButton: "Create Admin Account",
    emailAndPasswordRequired: "Email and password are required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordsDoNotMatch: "Passwords do not match",
    failedToInitializeAdmin: "Failed to initialize admin",
  },
  invite: {
    acceptInvitation: "Accept Invitation",
    loading: "Loading...",
  },
  workspaces: {
    newWorkspace: "Create New Workspace",
    loading: "Loading...",
  },
};
```

- [ ] **Step 2: 创建中文字典文件**

```typescript
// apps/web/features/dashboard/i18n/auth/zh.ts
import type { AuthDict } from "./types";
export const zh: AuthDict = {
  login: {
    signIn: "登录",
    enterCredentials: "输入凭据以访问您的账户",
    email: "邮箱",
    emailPlaceholder: "you@example.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    signingIn: "正在登录...",
    invalidCredentials: "凭据无效",
  },
  cliConfirm: {
    authorizeCli: "授权 CLI",
    allowAccess: (email: string) => `允许 CLI 以 ${email} 身份访问 Multica？`,
    authorizing: "正在授权...",
    useDifferentAccount: "使用其他账户",
  },
  init: {
    initializeAdmin: "初始化管理员",
    createAdminAccount: "创建您的管理员账户以开始使用",
    email: "邮箱",
    emailPlaceholder: "admin@example.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    confirmPassword: "确认密码",
    creating: "正在创建...",
    createAdminAccountButton: "创建管理员账户",
    emailAndPasswordRequired: "邮箱和密码为必填项",
    passwordMinLength: "密码长度至少为 6 个字符",
    passwordsDoNotMatch: "两次密码输入不一致",
    failedToInitializeAdmin: "初始化管理员失败",
  },
  invite: {
    acceptInvitation: "接受邀请",
    loading: "加载中...",
  },
  workspaces: {
    newWorkspace: "创建新工作区",
    loading: "加载中...",
  },
};
```

- [ ] **Step 3: 更新 types.ts 添加 AuthDict 类型**

修改 `DashboardDict` 添加 `auth: AuthDict`，新增 `AuthDict` 类型

- [ ] **Step 4: 更新 dashboard i18n/index.ts 导出新的 auth 模块**

- [ ] **Step 5: 在 login/page.tsx 中导入并使用 useLocale**

```tsx
import { useLocale } from "@/features/dashboard/i18n";

// 在组件内使用
const { t } = useLocale();

// CardTitle: {t.auth.login.signIn}
// CardDescription: {t.auth.login.enterCredentials}
// Label htmlFor="email": {t.auth.login.email}
// Input placeholder: {t.auth.login.emailPlaceholder}
// Button: {loading ? t.auth.login.signingIn : t.auth.login.signIn}
```

---

### Task 2: 初始化页 (Init Page) 本地化

**Files:**
- Modify: `apps/web/app/(auth)/init/page.tsx:1-131`
- i18n: 已在 Task 1 中创建 auth/en.ts, auth/zh.ts

- [ ] **Step 1: 在 init/page.tsx 中导入 useLocale 并替换所有硬编码文本**

硬编码文本需要替换：
- `CardTitle`: "Initialize Admin" → `t.auth.init.initializeAdmin`
- `CardDescription`: "Create your administrator account..." → `t.auth.init.createAdminAccount`
- `Label htmlFor="email"`: "Email" → `t.auth.init.email`
- `Input placeholder="admin@example.com"`: → `t.auth.init.emailPlaceholder`
- `Label htmlFor="password"`: "Password" → `t.auth.init.password`
- `Label htmlFor="confirm-password"`: "Confirm Password" → `t.auth.init.confirmPassword`
- `Button`: "Creating..." / "Create Admin Account" → `t.auth.init.creating` / `t.auth.init.createAdminAccountButton`
- Error messages: 使用 `t.auth.init.*` 对应消息

---

### Task 3: 邀请页 (Invite Page) 本地化

**Files:**
- Modify: `apps/web/app/(auth)/invite/[id]/page.tsx` (仅需确认是否需要文本)
- i18n: `apps/web/features/dashboard/i18n/invite/en.ts` (create)
- i18n: `apps/web/features/dashboard/i18n/invite/zh.ts` (create)

- [ ] **Step 1: 检查 InvitePage 组件是否已有 i18n 支持**

查看 `packages/views/invite/invite-page.tsx` 是否有 useLocale 使用

- [ ] **Step 2: 如需要，创建 invite i18n 文件**

---

### Task 4: 新工作区页 (New Workspace Page) 本地化

**Files:**
- Modify: `apps/web/app/(auth)/workspaces/new/page.tsx`
- i18n: `apps/web/features/dashboard/i18n/workspace/en.ts` (create)
- i18n: `apps/web/features/dashboard/i18n/workspace/zh.ts` (create)

- [ ] **Step 1: 检查 NewWorkspacePage 组件是否已有 i18n 支持**

查看 `packages/views/workspace/new-workspace-page.tsx`

- [ ] **Step 2: 如需要，创建 workspace i18n 文件**

---

### Task 5: 仪表盘页面 i18n 扩展

**Files:**
- i18n: `apps/web/features/dashboard/i18n/issues/en.ts` (check existing)
- i18n: `apps/web/features/dashboard/i18n/issues/zh.ts` (check existing)
- i18n: `apps/web/features/dashboard/i18n/projects/en.ts` (create if missing)
- i18n: `apps/web/features/dashboard/i18n/projects/zh.ts` (create if missing)
- i18n: `apps/web/features/dashboard/i18n/agents/en.ts` (check existing)
- i18n: `apps/web/features/dashboard/i18n/agents/zh.ts` (check existing)
- i18n: `apps/web/features/dashboard/i18n/runtimes/en.ts` (create if missing)
- i18n: `apps/web/features/dashboard/i18n/runtimes/zh.ts` (create if missing)
- i18n: `apps/web/features/dashboard/i18n/inbox/en.ts` (create if missing)
- i18n: `apps/web/features/dashboard/i18n/inbox/zh.ts` (create if missing)

- [ ] **Step 1: 检查各页面使用的 views 组件是否支持 useLocale**

关键页面：
- `/[workspaceSlug]/(dashboard)/issues/[id]/page.tsx` → IssueDetail
- `/[workspaceSlug]/(dashboard)/projects/page.tsx` → ProjectsPage
- `/[workspaceSlug]/(dashboard)/projects/[id]/page.tsx` → ProjectDetail
- `/[workspaceSlug]/(dashboard)/agents/page.tsx` → AgentsPage
- `/[workspaceSlug]/(dashboard)/autopilots/page.tsx` → AutopilotsPage
- `/[workspaceSlug]/(dashboard)/autopilots/[id]/page.tsx` → AutopilotDetailPage
- `/[workspaceSlug]/(dashboard)/skills/page.tsx` → SkillsPage
- `/[workspaceSlug]/(dashboard)/runtimes/page.tsx` → RuntimesPage
- `/[workspaceSlug]/(dashboard)/inbox/page.tsx` → InboxPage
- `/[workspaceSlug]/(dashboard)/my-issues/page.tsx` → MyIssuesPage
- `/[workspaceSlug]/(dashboard)/settings/page.tsx` → SettingsPage

- [ ] **Step 2: 对于缺失 i18n 的视图组件，在 views 包中添加 useLocale 支持**

---

### Task 6: 验证和测试

- [ ] **Step 1: 运行 `pnpm dev` 启动开发服务器**

- [ ] **Step 2: 手动测试各页面中英文切换**

- [ ] **Step 3: 运行 lint 检查**

```bash
cd wdjh && pnpm lint
```

- [ ] **Step 4: 运行类型检查**

```bash
cd wdjh && pnpm typecheck
```