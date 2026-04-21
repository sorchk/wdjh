import type { InboxDict } from "../types";

export const zh: InboxDict = {
  // Page title
  inbox: "收件箱",
  // List header
  unreadCount: "{count} 条未读",
  // Menu items
  markAllAsRead: "全部标为已读",
  archiveAll: "归档全部",
  archiveAllRead: "归档已读",
  archiveCompleted: "归档已完成",
  // Empty state
  noNotifications: "暂无通知",
  yourInboxIsEmpty: "您的收件箱为空",
  selectNotificationToViewDetails: "选择一个通知以查看详情",
  // Type labels
  issueAssigned: "已分配",
  unassigned: "未分配",
  assigneeChanged: "分配人已更改",
  statusChanged: "状态已更改",
  priorityChanged: "优先级已更改",
  dueDateChanged: "截止日期已更改",
  newComment: "新评论",
  mentioned: "被提及",
  reviewRequested: "请求审查",
  taskCompleted: "任务已完成",
  taskFailed: "任务失败",
  agentBlocked: "代理被阻塞",
  agentCompleted: "代理已完成",
  reacted: "已回应",
  // Detail labels
  setStatusTo: "设置状态为",
  setPriorityTo: "设置优先级为",
  assignedTo: "分配给 {name}",
  removedAssignee: "已移除分配人",
  setDueDateTo: "设置截止日期为 {date}",
  removedDueDate: "已移除截止日期",
  reactedToYourComment: "用 {emoji} 回应了您的评论",
  // Actions
  archive: "归档",
  // Time
  justNow: "刚刚",
  // Toast messages
  failedToMarkAsRead: "标为已读失败",
  failedToArchive: "归档失败",
};
