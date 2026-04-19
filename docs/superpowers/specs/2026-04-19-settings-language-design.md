# Settings Page - Language Setting

## Summary

在设置页面的 Appearance Tab 中添加语言设置功能，支持切换中文/英文。

## Context

项目已有完整的 i18n 基础设施（`locales`, `localeLabels`, `useLocale`），语言切换通过 cookie `multica-locale` 控制。

## Design

**位置：** `packages/views/settings/components/appearance-tab.tsx`

**UI 布局：**
```
┌─────────────────────────────┐
│ Theme                       │
│ [Light] [Dark] [System]     │
│                             │
│ Language                    │
│ [EN] [中文]                 │
└─────────────────────────────┘
```

**实现：**
- 在 `AppearanceTab` 中导入 `useLocale`, `locales`, `localeLabels` from `@/features/dashboard/i18n`
- 在 Theme section 下方添加 Language section（同样的 section 结构）
- 使用 `<button role="radio">` 实现语言选项，与 Theme 样式一致

**数据流：**
用户选择语言 → `setLocale(locale)` → 更新 cookie `multica-locale` → 页面重新渲染

## Files

- `packages/views/settings/components/appearance-tab.tsx` - 添加 Language section
