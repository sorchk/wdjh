---
name: upstream-merge
description: 从上游仓库合并更新代码。当用户说"从上游合并"、"合并上游更新"、"pull upstream"、"merge from upstream"或需要同步上游最新代码时使用此技能。处理 git rebase 或 merge，自动处理冲突，保留必要功能，检查错误，并调用 daily-changelog 技能记录变更。
---

# Upstream Merge Skill

从上游仓库拉取并合并更新代码。

## 工作流程

### 1. 准备阶段

1. 执行 `git remote -v` 确认上游仓库地址
2. 执行 `git fetch upstream` 拉取上游最新 refs
3. 执行 `git log --oneline HEAD..upstream/main` 查看上游新增提交数量
4. 执行 `git status` 检查本地是否有未提交更改

### 2. 合并策略

**如果本地有待提交更改：**
使用 `git rebase` 而非 merge，保持历史整洁。

**如果本地无更改：**
直接 `git merge upstream/main` 或 `git rebase upstream/main`。

### 3. 冲突处理

冲突时，按以下优先级处理：

1. **仅上游新增的代码** → 保留上游版本
2. **仅本地新增的代码** → 保留本地版本
3. **上下游都修改的相同行** → 标记为需要用户决策，用 `<<<<<<< HEAD` / `=======` / `>>>>>>> upstream/main` 注释标记

对于真正的代码冲突（非空白或格式问题），列出冲突文件列表，用 question 工具询问用户偏好：
- 选项 A：保留本地修改
- 选项 B：保留上游修改
- 选项 C：手动处理

### 4. 合并后检查

1. 执行 `git status` 确认合并状态
2. 执行 `git diff --stat` 查看变更统计
3. 检查项目是否有 lint/typecheck 命令并执行：
   - 检查 package.json 或 Makefile 中的 lint 命令
   - 如有 `npm run lint`、`npm run typecheck`、等，执行并修复错误
4. 如有编译错误，列出错误清单

### 5. 生成变更记录

调用 daily-changelog 技能记录本次合并的变更内容。

## 冲突标记说明

```markdown
<<<<<<< HEAD (本地)
本地修改的代码
=======
上游修改的代码
>>>>>>> upstream/main
```

选择 A/B/C 后，编辑工具处理冲突标记。

## 输出格式

合并完成后，报告：
- 新增提交数量
- 冲突文件数量（及文件名）
- lint/typecheck 结果
- 变更记录位置