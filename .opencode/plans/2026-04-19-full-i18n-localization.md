# Full i18n Localization Implementation Plan

**Goal:** 为整个应用（Dashboard、Auth、Invite、Settings 等所有区域）添加完整的 i18n 支持，默认语言为中文，并与上游合并时冲突最小化。

**Architecture:**
- 扩展现有 `LocaleProvider` + dictionary 模式（已在 landing i18n 中验证）
- i18n 文件按 domain 组织：`common/`（共享）、`auth/`、`issues/`、`projects/`、`agents/`、`settings/` 等
- 共享字符串集中在 `common/` 中
- Cookie 持久化复用现有 `multica-locale` cookie
- Dashboard layout 提供 `LocaleProvider` 隔离影响范围

**Tech Stack:** React Context API、Next.js App Router

---

## File Structure

```
apps/web/features/dashboard/i18n/
  index.ts           # exports
  context.tsx        # LocaleProvider + useLocale
  types.ts           # Locale, DashboardDict types
  common/en.ts, zh.ts
  auth/en.ts, zh.ts
  issues/en.ts, zh.ts
  projects/en.ts, zh.ts
  agents/en.ts, zh.ts
  settings/en.ts, zh.ts
  inbox/en.ts, zh.ts
  runtimes/en.ts, zh.ts
  autopilots/en.ts, zh.ts
  skills/en.ts, zh.ts
  invite/en.ts, zh.ts
  workspace/en.ts, zh.ts

apps/web/app/[workspaceSlug]/layout.tsx  # 包裹 LocaleProvider
```

---

## 冲突最小化策略

1. **i18n 文件独立在 `features/dashboard/i18n/`** ——上游不会修改此目录
2. **组件改造成纯注入式** ——只添加 `useLocale()` 调用和 `t.xxx` 替换，不改变组件结构、Props、状态管理
3. **小块提交** ——每个组件的 i18n 改造独立 commit，冲突时可选择性保留/回退
4. **不改上游已存在的文件结构** ——仅在组件内部替换硬编码字符串

---

## Task 1: 创建 dashboard i18n 基础设施

**Files:**
- Create: `apps/web/features/dashboard/i18n/types.ts`
- Create: `apps/web/features/dashboard/i18n/context.tsx`
- Create: `apps/web/features/dashboard/i18n/index.ts`

**types.ts:**
```ts
export type Locale = "en" | "zh";
export const locales: Locale[] = ["en", "zh"];
export const localeLabels: Record<Locale, string> = { en: "EN", zh: "中文" };
export type DashboardDict = {
  common: CommonDict;
  auth: AuthDict;
  issues: IssuesDict;
  projects: ProjectsDict;
  agents: AgentsDict;
  settings: SettingsDict;
  inbox: InboxDict;
  runtimes: RuntimesDict;
  autopilots: AutopilotsDict;
  skills: SkillsDict;
  invite: InviteDict;
  workspace: WorkspaceDict;
};
export type CommonDict = {
  sidebar: Record<string, string>;
  status: Record<string, string>;
  priority: Record<string, string>;
  projectStatus: Record<string, string>;
  projectPriority: Record<string, string>;
  toast: Record<string, string>;
  date: Record<string, string>;
  actions: Record<string, string>;
  empty: Record<string, string>;
};
// AuthDict, IssuesDict, etc. — full definitions in execution
```

**context.tsx**（默认 `"zh"`）:
```tsx
"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { en, zh } from "./index";
import type { DashboardDict, Locale } from "./types";

const dictionaries: Record<Locale, DashboardDict> = { en, zh };
const COOKIE_NAME = "multica-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleContextValue = { locale: Locale; t: DashboardDict; setLocale: (l: Locale) => void; };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale = "zh" }: { children: React.ReactNode; initialLocale?: Locale; }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);
  return <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
```

---

## Task 2: 实现 common 字典（~80 共享字符串）

**Files:**
- Create: `apps/web/features/dashboard/i18n/common/en.ts`
- Create: `apps/web/features/dashboard/i18n/common/zh.ts`

**包含内容：**
- `sidebar` — 侧边栏所有导航标签（来自 `packages/views/layout/app-sidebar.tsx:96-110, 180, 343, 365, 373, 388, 399, 410, 432, 476, 504, 528, 567, 570, 597`）
- `status` — Backlog/Todo/In Progress/In Review/Done/Blocked/Cancelled
- `priority` — Urgent/High/Medium/Low/No priority
- `projectStatus` / `projectPriority` — 项目状态和优先级标签
- `toast` — 跨组件复用 toast 消息（failedToMoveIssue, linkCopied, issueDeleted 等）
- `date` — Today/Tomorrow/Next week/Clear date
- `actions` — Cancel/Delete/Confirm/Save/Create/Back 等
- `empty` — No results/No issues yet/No projects yet 等

---

## Task 3: 改造 Dashboard Root Layout

**Files:**
- Modify: `apps/web/app/[workspaceSlug]/layout.tsx`

添加 `LocaleProvider` 包裹 children，从 cookie 读取初始语言，默认 `"zh"`。

---

## Task 4: 改造 app-sidebar（高复用组件）

**Files:**
- Modify: `packages/views/layout/app-sidebar.tsx`

添加 `import { useLocale } from "@/features/dashboard/i18n"`，用 `t.common.sidebar.xxx` 替换所有硬编码侧边栏字符串。

---

## Task 5: 改造 Issues 模块（~80 字符串）

**Files:**
- Modify: `packages/views/issues/components/issues-page.tsx`
- Modify: `packages/views/issues/components/issues-header.tsx`
- Modify: `packages/views/issues/components/issue-detail.tsx`
- Modify: `packages/views/issues/components/batch-action-toolbar.tsx`
- Modify: `packages/views/issues/components/comment-card.tsx`
- Modify: `packages/views/my-issues/my-issues-page.tsx`
- Create: `apps/web/features/dashboard/i18n/issues/en.ts`
- Create: `apps/web/features/dashboard/i18n/issues/zh.ts`

**Issues 字典内容：** filters（All/Members/Agents/Filter.../No assignee/No project 等）、empty states、activity format strings（created this issue/changed status from X to Y 等）、detail panel labels、dialogs。

每个组件单独修改、独立 commit。

---

## Task 6: Auth 模块（~50 字符串）

**Files:**
- Modify: `apps/web/app/(auth)/login/page.tsx`
- Modify: `apps/web/app/(auth)/init/page.tsx`
- Modify: `packages/views/auth/login-page.tsx`
- Create: `apps/web/features/dashboard/i18n/auth/en.ts`
- Create: `apps/web/features/dashboard/i18n/auth/zh.ts`

**内容：** login form labels、error messages、button states、card titles、placeholders。

---

## Task 7: Projects 模块

**Files:**
- Modify: `packages/views/projects/projects-page.tsx`
- Modify: `packages/views/projects/project-detail.tsx`
- Modify: `packages/views/modals/create-project.tsx`
- Create: `apps/web/features/dashboard/i18n/projects/en.ts` + `zh.ts`

---

## Task 8: Agents 模块

**Files:**
- Modify: `packages/views/agents/agents-page.tsx`
- Modify: `packages/views/agents/agent-detail.tsx`
- Modify: `packages/views/agents/create-agent-dialog.tsx`
- Modify: `packages/views/agents/tabs/*.tsx`
- Create: `apps/web/features/dashboard/i18n/agents/en.ts` + `zh.ts`

---

## Task 9: Inbox 模块

**Files:**
- Modify: `packages/views/inbox/inbox-page.tsx`
- Modify: `packages/views/inbox/inbox-detail-label.tsx`
- Create: `apps/web/features/dashboard/i18n/inbox/en.ts` + `zh.ts`

**Inbox 字典内容：** typeLabels（Assigned/Unassigned/Status changed/New comment/Mentioned/Task completed/Task failed/Agent blocked/Agent completed/Reacted 等）。

---

## Task 10: Settings 模块

**Files:**
- Modify: `packages/views/settings/members-tab.tsx`
- Modify: `packages/views/settings/workspace-tab.tsx`
- Modify: `packages/views/settings/account-tab.tsx`
- Modify: `packages/views/settings/tokens-tab.tsx`
- Create: `apps/web/features/dashboard/i18n/settings/en.ts` + `zh.ts`

---

## Task 11: Runtimes / Autopilots / Skills 模块

- Create: `apps/web/features/dashboard/i18n/runtimes/en.ts` + `zh.ts`
- Create: `apps/web/features/dashboard/i18n/autopilots/en.ts` + `zh.ts`
- Create: `apps/web/features/dashboard/i18n/skills/en.ts` + `zh.ts`
- Apply `useLocale()` to respective page components

---

## Task 12: Invite / Workspace 页面

**Files:**
- Modify: `packages/views/invite/invite-page.tsx`
- Modify: `packages/views/workspace/new-workspace-page.tsx`
- Modify: `packages/views/workspace/create-workspace-form.tsx`
- Create: `apps/web/features/dashboard/i18n/invite/en.ts` + `zh.ts`
- Create: `apps/web/features/dashboard/i18n/workspace/en.ts` + `zh.ts`

---

## Task 13: 核心配置改造（STATUS_CONFIG, PRIORITY_CONFIG）

**Files:**
- Modify: `packages/core/issues/config/status.ts`
- Modify: `packages/core/issues/config/priority.ts`
- Modify: `packages/core/projects/config.ts`

**策略：** `label` 字段改为 `labelKey`，渲染时通过 `t.common.status[labelKey]` 获取翻译。

```ts
// 改前: STATUS_CONFIG = { backlog: { label: "Backlog", ... } }
// 改后: STATUS_CONFIG = { backlog: { labelKey: "backlog", ... } }
// 渲染: <span>{t.common.status[status.labelKey]}</span>
```

---

## Task 14: Toast 消息集中管理

在 `common/zh.ts` / `common/en.ts` 的 `toast` 段落集中所有 toast 消息，通过 `t.common.toast.xxx` 引用。

主要 toast（约 30+）：
- failedToMoveIssue / failedToUpdateIssue / issueDeleted / failedToDeleteIssue
- linkCopied / failedToCopyLink
- invitationSent / failedToSendInvitation / invitationRevoked / failedToRevokeInvitation
- roleUpdated / failedToUpdateMember / memberRemoved / failedToRemoveMember
- workspaceSettingsSaved / failedToSaveWorkspaceSettings / failedToLeaveWorkspace / failedToDeleteWorkspace
- avatarUpdated / failedToUploadAvatar / profileUpdated / failedToUpdateProfile
- agentUpdated / agentArchived / agentRestored / failedToCreateAgent
- skillCreated / skillImported / skillSaved / skillDeleted / failedToSaveSkill / failedToLoadSkillFiles
- autopilotCreated / autopilotUpdated / autopilotTriggered / autopilotDeleted
- runtimeDeleted / failedToDeleteRuntime
- projectCreated / failedToCreateProject
- issueCreated / failedToCreateIssue / failedToUpdateStatus
- triggerDeleted / triggerAdded / failedToAddTrigger
- etc.

---

## Task 15: LocaleSync 覆盖 Dashboard

**Files:**
- Modify: `apps/web/components/locale-sync.tsx`

确保 `<html lang>` 随 dashboard locale 同步更新。

---

## 实施顺序

1. **Task 1 → 2 → 3**：基础设施 + common 字典 + Dashboard layout
2. **Task 4**：侧边栏（最高复用）
3. **Task 5 → 6 → ... → 12**：逐个 domain 改造
4. **Task 13 → 14 → 15**：配置 + toast 集中 + LocaleSync

每个组件改动**小块独立 commit**，便于上游 merge 时 cherry-pick/revert。

---

## 验证

- [ ] `npm run typecheck` 通过
- [ ] `npm run lint` 通过
- [ ] 手动测试：中/英文切换，所有页面文本正确显示
- [ ] Cookie `multica-locale` 正确设置和读取
