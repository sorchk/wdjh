---
name: daily-changelog
description: Add project changes to CHANGELOG.md. Use when user wants to record new features, changes, or bug fixes - especially before commits, releases, or when they ask to update changelog. Analyzes git commits or uncommitted code to generate changelog entries in the format "序号. 变更类型：变更内容描述" organized by date and version.
---

# Daily Changelog Skill

记录项目变更到 CHANGELOG.md 文档。

## 工作流程

### 第一次编写（已有 git 提交记录）

1. 分析项目根目录的 `CHANGELOG.md` 是否存在
2. 执行 `git log --pretty=format:"%h %s" -20` 获取最近 20 条提交
3. 按提交内容分类，识别：feat（新增）、fix（修复）、docs（文档）、refactor（重构）、perf（性能）、ci（CI）、chore（杂务）
4. 按日期分组，同一天提交合并为一个日期章节

### 之后编写（分析未提交代码）

1. 执行 `git status` 检查是否有未提交更改
2. 使用 `git diff --stat` 查看变更文件统计
3. 逐个分析变更内容，分类记录

### 写入格式

```markdown
## 2025-04-19 v1.0.0

1. 新增：用户认证功能，支持 JWT token 登录
2. 修复：修复了登录页面白屏问题
3. 变更：更新了依赖包版本
```

变更类型映射：
- `feat` → 新增
- `fix` → 修复
- `docs` → 文档
- `refactor` → 重构
- `perf` → 性能
- `ci` → CI/CD
- `chore` → 杂务
- `test` → 测试

### 执行步骤

1. **读取现有 CHANGELOG**
   - 路径：`{workspace}/CHANGELOG.md`
   - 如存在，解析现有日期章节结构，避免重复添加

2. **分析变更**
   - 优先使用 `git log` 分析已提交内容
   - 如有待提交更改，使用 `git diff` 分析

3. **生成变更记录**
   - 按 `序号. 变更类型：变更内容` 格式
   - 同类型多个变更用分号分隔或分行

4. **写入 CHANGELOG.md**
   - 在文件顶部插入新章节
   - 保留所有历史记录
   - 如无版本号，使用日期作为标识

## 输出要求

- 始终追加，不删除历史记录
- 变更描述简洁明了
- 类型标识统一使用中文