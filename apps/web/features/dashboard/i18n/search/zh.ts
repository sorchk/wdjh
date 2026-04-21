import type { SearchDict } from "../types";

export const zh: SearchDict = {
  // Dialog
  title: "搜索",
  description: "搜索页面、事项和项目",
  placeholder: "输入命令或搜索...",

  // Navigation labels
  inbox: "收件箱",
  myIssues: "我的事项",
  issues: "事项",
  projects: "项目",
  agents: "智能体",
  runtimes: "运行时",
  skills: "技能",
  settings: "设置",

  // Section headings
  pages: "页面",
  commands: "命令",
  switchWorkspace: "切换工作区",
  recent: "最近",
  recentIssues: "最近的事项",

  // Commands
  newIssue: "新建事项",
  newProject: "新建项目",
  copyIssueLink: "复制事项链接",
  copyIssueIdentifier: "复制标识符",
  switchToLightTheme: "切换到浅色主题",
  switchToDarkTheme: "切换到深色主题",
  useSystemTheme: "使用系统主题",

  // Toast messages
  linkCopied: "链接已复制",
  identifierCopied: "已复制 {identifier}",

  // Empty states
  noResultsFound: "未找到结果",
  typeToSearchIssuesAndProjects: "输入以搜索事项和项目",
};
