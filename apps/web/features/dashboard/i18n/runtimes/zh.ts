import type { RuntimesDict } from "../types";

export const zh: RuntimesDict = {
  // Page title
  pageTitle: "运行时",
  // Header
  onlineCount: "{online}/{total} 在线",
  // Filter tabs
  mine: "我的",
  all: "全部",
  // Owner filter
  owner: "所有者",
  allOwners: "全部所有者",
  // Empty states
  noRuntimesOwned: "暂无属于你的运行时",
  noRuntimesForOwner: "该所有者下无运行时",
  noRuntimesRegistered: "暂无注册的运行时",
  registerRuntimeHint: '运行 "multica daemon start" 以注册本地运行时。',
  // Detail panel
  selectRuntimeHint: "选择一个运行时以查看详情",
  runtimeMode: "运行时模式",
  provider: "供应商",
  status: "状态",
  lastSeen: "最后在线",
  ownerLabel: "所有者",
  device: "设备",
  daemonId: "守护进程 ID",
  created: "创建时间",
  updated: "更新时间",
  // Sections
  cliVersion: "CLI 版本",
  connectionTest: "连接测试",
  tokenUsage: "Token 使用量",
  metadata: "元数据",
  // Status
  online: "在线",
  offline: "离线",
  // Runtime modes
  local: "本地",
  cloud: "云端",
  // Ping section
  testConnection: "测试连接",
  testing: "测试中...",
  waitingForDaemon: "等待守护进程...",
  runningTest: "正在测试...",
  connected: "已连接",
  pingFailed: "失败",
  pingTimeout: "超时",
  seconds: "({duration}秒)",
  // Update section
  cliVersionLabel: "CLI 版本:",
  unknown: "未知",
  latest: "已是最新",
  available: "可用",
  update: "更新",
  waitingForDaemonUpdate: "等待守护进程...",
  updating: "正在更新...",
  updateComplete: "更新完成。守护进程正在重启...",
  updateFailed: "更新失败",
  updateTimeout: "超时",
  retry: "重试",
  managedByDesktop: "由桌面版管理",
  // Usage section
  days: "{days}天",
  input: "输入",
  output: "输出",
  cacheRead: "缓存读取",
  cacheWrite: "缓存写入",
  estimatedCost: "预估费用 ({days}天):",
  noUsageData: "暂无使用数据",
  date: "日期",
  model: "模型",
  // Chart titles
  activity: "活跃度",
  hourlyDistribution: "小时分布",
  dailyTokenUsage: "每日 Token 使用量",
  tokenUsageByModel: "各模型 Token 使用量",
  // Chart labels
  total: "总计",
  // Heatmap labels
  less: "少",
  more: "多",
  noActivity: "无活动",
  // Delete dialog
  deleteRuntime: "删除运行时",
  deleteRuntimeConfirmation: '确定要删除 "{name}" 吗？此操作无法撤销。',
  cancel: "取消",
  delete: "删除",
  deleting: "删除中...",
  // Toast messages
  runtimeDeleted: "运行时已删除",
  failedToDeleteRuntime: "删除运行时失败",
  // Last seen
  justNow: "刚刚",
  minutesAgo: "{minutes}分钟前",
  hoursAgo: "{hours}小时前",
  daysAgo: "{days}天前",
  never: "从未",
};