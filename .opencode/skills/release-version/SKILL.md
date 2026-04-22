---
name: release-version
description: 发布新版本。当用户说"发布版本"、"创建发布"、"release"、"发布新版本"时触发。执行完整的发布流程：更新版本号、更新变更记录、更新文档、创建标签并提交。
---

# release-version

发布新版本的完整工作流。

## 工作流程

### 第一步：确定新版本号

1. 读取项目根目录的 `package.json`，获取当前版本号
2. 根据代码变更确定版本号类型：
   - `feat:` 提交 → 升级次版本号 (0.x.0)
   - `fix:` 提交 → 升级补丁版本号 (0.0.x)
   - 仅 `docs:` 或 `chore:` → 补丁版本号
   - 有 breaking change → 主版本号
3. 向用户确认新版本号

### 第二步：更新变更记录

查找项目中是否存在变更记录文件：
- CHANGELOG.md
- changelog.md
- docs/changelog.md
- CHANGELOG.md in any location

如果存在，读取变更记录内容，分析自上次发布以来的所有提交，提取 feat、fix、docs、refactor、perf、test 等类型的提交，生成新的变更条目并插入到文件顶部。

如果不存在，创建新的 CHANGELOG.md，包含：
- 新版本号和发布日期
- 从提交中提取的变更列表

### 第三步：更新相关文档

分析代码变更涉及的业务领域，检查并更新以下相关文档：
- `docs/plans/` 目录下已完成的计划文档
- `docs/superpowers/` 目录下的功能说明文档
- `docs/design.md` 设计文档
- README.md 或其他使用指南
- 开发文档（如 `docs/developer.md`、`docs/dev-guide.md` 等）

根据本次发布的业务变更，更新相应的说明文档。

### 第四步：提交并创建标签

1. **检查提交者信息**：
   - 运行 `git log --format="%an <%ae>" -20 | sort | uniq` 查看近期提交者
   - 确认要作为共同贡献者列出的成员确实有代码贡献
   - 排除没有实际代码贡献的成员（如仅格式化、合并远程分支等）

2. **执行 Git 操作**：
   - `git add .`
   - `git commit -m "release: v{版本号}"`
   - `git tag -a "v{版本号}" -m "Release version v{版本号}"`
   - `git push && git push --tags`

3. **提交前确认**：
   - 显示将要创建的提交内容供用户确认
   - 显示将要创建的标签信息
   - 如果用户不同意，取消操作

## 版本号规则

遵循语义化版本 (SemVer)：
- 主版本号 (x.0.0)：破坏性变更
- 次版本号 (x.y.0)：新功能（向后兼容）
- 补丁版本号 (x.y.z)：bug 修复

## 示例

**输入**: "发布新版本"

**流程**:
1. 读取 package.json → 当前版本 0.2.6
2. 分析近期提交 → 3个 feat，2个 fix
3. 建议版本号 0.3.0，用户确认
4. 更新 CHANGELOG.md
5. 更新相关 docs/plans/ 文档
6. 创建提交 "release: v0.3.0"
7. 创建标签 "v0.3.0"
8. 推送到远程