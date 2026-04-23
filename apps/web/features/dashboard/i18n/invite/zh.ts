import type { InviteDict } from "../types";

export const zh: InviteDict = {
  // Page
  back: "返回",
  logOut: "退出登录",
  goToDashboard: "前往工作台",
  // Error states
  invitationNotFound: "邀请不存在",
  invitationNotFoundDesc: "此邀请可能已过期、被撤销或不属于您的账户。",
  // Accepted state
  joinedWorkspace: "您已加入 {workspace}！",
  redirecting: "正在跳转到工作区...",
  // Declined state
  invitationDeclined: "已拒绝邀请",
  declinedDesc: "您将不会被添加到此工作区。",
  // Invite content
  joinWorkspace: "加入",
  invitedYou: "邀请您加入",
  asAdmin: "管理员",
  asMember: "成员",
  // Already handled
  alreadyHandled: "此邀请已被",
  expired: "此邀请已过期。",
  // Actions
  decline: "拒绝",
  declining: "正在拒绝...",
  accept: "接受并加入",
  acceptAndJoin: "接受并加入",
  joining: "正在加入...",
  // Errors
  failedToAccept: "接受邀请失败",
  failedToDecline: "拒绝邀请失败",
  // Welcome
  welcomeToMultica: "欢迎使用 Multica",
  createWorkspaceToGetStarted: "创建您的工作区以开始使用。",
};