import type { IssuesDict } from "../types";

export const zh: IssuesDict = {
  // Breadcrumbs & page titles
  issues: "Issue",
  workspace: "工作区",
  myIssues: "我的 Issue",

  // Empty states
  noIssuesYet: "暂无 Issue",
  noIssuesAssignedToYou: "没有分配给您的 Issue",
  noIssuesAssignedToYouDesc: "您创建或被分配的 Issue 将显示在这里。",
  createAnIssueToGetStarted: "创建一个 Issue 以开始使用。",

  // Activity timeline (formatActivity)
  createdThisIssue: "创建了这个 Issue",
  changedStatusFromTo: "将状态从 {from} 改为 {to}",
  changedPriorityFromTo: "将优先级从 {from} 改为 {to}",
  selfAssigned: "认领了这个 Issue",
  assignedTo: "分配给了 {name}",
  removedAssignee: "移除了处理人",
  changedAssignee: "更改了处理人",
  removedDueDate: "移除了截止日期",
  setDueDateTo: "将截止日期设为 {date}",
  renamedFromTo: "将标题从「{from}」改为「{to}」",
  updatedDescription: "更新了描述",
  completedTask: "完成了任务",
  taskFailed: "任务失败",

  // Search
  searchIssues: "搜索 Issue...",
  searching: "搜索中...",
  noIssuesFound: "未找到 Issue。",
  typeToSearchIssues: "输入以搜索 Issue",

  // Issue picker
  setParentIssue: "设置父 Issue",
  setParentIssueDescription: "搜索一个 Issue 作为此 Issue 的父 Issue",
  addSubIssue: "添加子 Issue",
  addSubIssueDescription: "搜索一个 Issue 作为子 Issue",
  setAsParent: "将 {identifier} 设为父 Issue",
  addedAsSubIssue: "已将 {identifier} 添加为子 Issue",
  failedToAddSubIssue: "添加子 Issue 失败",

  // Sidebar properties
  properties: "属性",
  parentIssue: "父 Issue",
  details: "详情",
  createdBy: "创建人",
  created: "创建于",
  updated: "更新于",
  tokenUsage: "Token 用量",
  input: "输入",
  output: "输出",
  cache: "缓存",
  runs: "运行次数",

  // Action menu
  status: "状态",
  priority: "优先级",
  assignee: "处理人",
  dueDate: "截止日期",
  unassigned: "未分配",
  createSubIssue: "创建子 Issue",
  setParentIssueAction: "设置父 Issue...",
  addSubIssueAction: "添加子 Issue...",
  pinToSidebar: "固定到侧边栏",
  unpinFromSidebar: "从侧边栏取消固定",
  copyLink: "复制链接",
  deleteIssue: "删除 Issue",
  toggleSidebar: "切换侧边栏",

  // Subscribe
  subscribe: "订阅",
  unsubscribe: "取消订阅",
  changeSubscribers: "更改订阅者...",

  // Activity section
  activity: "活动",
  members: "成员",
  agents: "Agent",
  noResultsFound: "未找到结果",

  // Not found
  issueDoesNotExist: "此 Issue 不存在或已被删除。",
  backToIssues: "返回 Issue 列表",

  // Placeholders
  issueTitle: "Issue 标题",
  addDescription: "添加描述...",

  // Filter scopes
  all: "全部",
  scopeAllDescription: "此工作区中的所有 Issue",
  members_scope: "成员",
  scopeMembersDescription: "分配给成员的 Issue",
  agents_scope: "Agent",
  scopeAgentsDescription: "分配给 AI Agent 的 Issue",

  // Filter labels
  filter: "筛选",
  filterPlaceholder: "筛选...",
  noAssignee: "未分配",
  noProject: "无项目",
  creator: "创建人",
  project: "项目",

  // Sort/display
  manual: "手动",
  displaySettings: "显示设置",
  ordering: "排序",
  cardProperties: "卡片属性",
  board: "看板",
  list: "列表",
  view: "视图",
  boardView: "看板视图",
  listView: "列表视图",
  ascending: "升序",
  descending: "降序",
  resetAllFilters: "清除所有筛选",

  // Count labels
  issue_s: "{count} 个 Issue",
  issue_singular: "Issue",
  issue_plural: "Issue",

  // Sub-issues
  subIssues: "子 Issue",
  subIssueOf: "子 Issue 于",
  addSubIssues: "添加子 Issue",
  addSubIssue: "添加子 Issue",

  // Dialog
  deleteIssueTitle: "删除 Issue",
  deleteIssueDescription:
    "此操作将永久删除此 Issue 及其所有评论，无法撤销。",
  cancel: "取消",
  delete: "删除",
  deleting: "删除中...",

  // Batch
  selected: "已选择 {count} 项",
  updatedNIssues: "已更新 {count} 个 Issue",
  failedToUpdateIssues: "更新 Issue 失败",
  deletedNIssues: "已删除 {count} 个 Issue",
  failedToDeleteIssues: "删除 Issue 失败",
  deleteNIssuesTitle: "删除 {count} 个 Issue？",
  deleteNIssuesDescription:
    "此操作无法撤销，将永久删除所选的 {count} 个 Issue 及所有相关数据。",

  // Toast
  failedToMoveIssue: "移动 Issue 失败",
  issueDeleted: "Issue 已删除",
  failedToDeleteIssue: "删除 Issue 失败",
  linkCopied: "链接已复制",
  failedToUpdateIssue: "更新 Issue 失败",

  // Date options
  today: "今天",
  tomorrow: "明天",
  nextWeek: "下周",
  clearDate: "清除日期",
};
