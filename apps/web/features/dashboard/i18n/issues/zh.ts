import type { IssuesDict } from "../types";

export const zh: IssuesDict = {
  // Breadcrumbs & page titles
  issues: "Issue",
  workspace: "工作区",
  myIssues: "我的问题",

  // Empty states
  noIssuesYet: "暂无问题",
  noIssuesAssignedToYou: "没有分配给您的问题",
  noIssuesAssignedToYouDesc: "您创建或被分配的问题将显示在这里。",
  createAnIssueToGetStarted: "创建一个问题以开始使用。",

  // Activity timeline (formatActivity)
  createdThisIssue: "创建了这个问题",
  changedStatusFromTo: "将状态从 {from} 改为 {to}",
  changedPriorityFromTo: "将优先级从 {from} 改为 {to}",
  selfAssigned: "认领了这个问题",
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
  typeToSearchIssues: "输入以搜索问题",

  //问题picker
  setParentIssue: "设置父问题",
  setParentIssueDescription: "搜索一个问题作为此问题的父问题",
  addSubIssue: "添加子问题",
  addSubIssueDescription: "搜索一个问题作为子问题",
  setAsParent: "将 {identifier} 设为父问题",
  addedAsSubIssue: "已将 {identifier} 添加为子问题",
  failedToAddSubIssue: "添加子问题失败",

  // Sidebar properties
  properties: "属性",
  parentIssue: "父问题",
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
  createSubIssue: "创建子问题",
  setParentIssueAction: "设置父问题...",
  addSubIssueAction: "添加子问题...",
  pinToSidebar: "固定到侧边栏",
  unpinFromSidebar: "从侧边栏取消固定",
  copyLink: "复制链接",
  deleteIssue: "删除问题",
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
  issueDoesNotExist: "此问题不存在或已被删除。",
  backToIssues: "返回问题列表",

  // Placeholders
  issueTitle: "Issue 标题",
  addDescription: "添加描述...",

  // Filter scopes
  all: "全部",
  assigned: "已分配",
  scopeAllDescription: "此工作区中的所有问题",
  members_scope: "成员",
  scopeMembersDescription: "分配给成员的问题",
  agents_scope: "Agent",
  scopeAgentsDescription: "分配给 AI Agent 的问题",

  // My issues scopes
  scopeAssigned: "已分配",
  scopeCreated: "已创建",
  scopeMyAgents: "我的 Agent",
  scopeAssignedDescription: "分配给我的问题",
  scopeCreatedDescription: "我创建的问题",
  scopeMyAgentsDescription: "分配给我的 Agent 的问题",

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
  issue_s: "{count} 个问题",
  issue_singular: "个问题",
  issue_plural: "个问题",

  // Sub-issues
  subIssues: "子问题",
  subIssueOf: "子问题于",
  addSubIssues: "添加子问题",

  // Dialog
  deleteIssueTitle: "删除问题",
  deleteIssueDescription:
    "此操作将永久删除此问题及其所有评论，无法撤销。",
  cancel: "取消",
  delete: "删除",
  deleting: "删除中...",

  // Batch
  selected: "已选择 {count} 项",
  updatedNIssues: "已更新 {count} 个问题",
  failedToUpdateIssues: "更新问题失败",
  deletedNIssues: "已删除 {count} 个问题",
  failedToDeleteIssues: "删除问题失败",
  deleteNIssuesTitle: "删除 {count} 个 Issue？",
  deleteNIssuesDescription:
    "此操作无法撤销，将永久删除所选的 {count} 个问题及所有相关数据。",

  // Toast
  failedToMoveIssue: "移动问题失败",
  issueDeleted: "Issue 已删除",
  failedToDeleteIssue: "删除问题失败",
  linkCopied: "链接已复制",
  failedToUpdateIssue: "更新问题失败",

  // Date options
  today: "今天",
  tomorrow: "明天",
  nextWeek: "下周",
  clearDate: "清除日期",

  // Picker labels (used in create issue modal pickers)
  noPriority: "无优先级",
  assignTo: "分配给...",
  priorityUrgent: "紧急",
  priorityHigh: "高",
  priorityMedium: "中",
  priorityLow: "低",
  statusBacklog: "待办",
  statusTodo: "待处理",
  statusInProgress: "进行中",
  statusInReview: "审核中",
  statusDone: "已完成",
  statusBlocked: "已阻塞",
  statusCancelled: "已取消",
  removeFromProject: "从项目中移除",
  noProjectsYet: "暂无项目",

  // Create issue modal
  newIssue: "新建问题",
  newSubIssue: "新建子问题",
  collapse: "折叠",
  expand: "展开",
  close: "关闭",
  issueTitlePlaceholder: "问题标题",
  addDescriptionPlaceholder: "添加描述...",
  creating: "创建中...",
  createIssue: "创建问题",
  issueCreated: "问题已创建",
  viewIssue: "查看问题",
  failedToCreateIssue: "创建问题失败",

  // Create workspace modal
  createNewWorkspace: "创建新工作区",
  workspaceDescription: "工作区是团队协作处理项目和问题的共享环境。",
  back: "返回",

  // Create workspace form
  workspaceName: "工作区名称",
  workspaceUrl: "工作区 URL",
  workspaceUrlPrefix: "multica.ai/",
  workspaceNamePlaceholder: "我的工作区",
  workspaceUrlPlaceholder: "my-workspace",
  creatingWorkspace: "创建中...",
  createWorkspace: "创建工作区",
  workspaceSlugFormatError: "仅允许小写字母、数字和连字符",
  workspaceSlugConflictError: "该工作区 URL 已被占用。",
  failedToCreateWorkspace: "创建工作区失败",
  chooseDifferentWorkspaceUrl: "请选择其他工作区 URL",

  // Create project modal
  newProject: "新建项目",
  collapseProject: "折叠",
  expandProject: "展开",
  closeProject: "关闭",
  chooseIcon: "选择图标",
  projectTitlePlaceholder: "项目标题",
  addDescriptionProject: "添加描述...",
  noLead: "无负责人",
  assignLead: "分配负责人...",
  membersLabel: "成员",
  agentsLabel: "智能体",
  noResultsProject: "无结果",
  creatingProject: "创建中...",
  createProject: "创建项目",
  projectCreated: "项目已创建",
  failedToCreateProject: "创建项目失败",

  // Board/Kanban view
  addIssue: "添加问题",
  hideColumn: "隐藏列",
  showColumn: "显示列",
  noIssuesInColumn: "暂无问题",
  hiddenColumns: "隐藏列",
  filterTooltip: "筛选",

  // List view
  addIssueToList: "添加问题",
  noIssuesInList: "暂无问题",

  // Sort options
  sortByManual: "手动",
  sortByPriority: "优先级",
  sortByDueDate: "截止日期",
  sortByCreatedDate: "创建日期",
  sortByTitle: "标题",

  // Card property options
  showPriority: "优先级",
  showDescription: "描述",
  showAssignee: "处理人",
  showDueDate: "截止日期",
  showProject: "项目",
  showSubIssueProgress: "子问题进度",

  // Filter priority labels (most already exist as picker labels)
  priorityNone: "无优先级",
};
