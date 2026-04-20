import type { AuthDict } from "../types";

export const zh: AuthDict = {
  login: {
    signIn: "登录",
    enterCredentials: "输入凭据以访问您的账户",
    email: "邮箱",
    emailPlaceholder: "you@example.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    signingIn: "正在登录...",
    authorize: "授权 CLI",
    authorizing: "正在授权...",
    useDifferentAccount: "使用其他账户",
    invalidCredentials: "凭据无效",
    loginFailed: "登录失败",
    failedToAuthorizeCli: "CLI 授权失败，请重新登录。",
    allowAccess: (email: string) => `允许 CLI 以 ${email} 身份访问 Multica？`,
  },
  init: {
    initializeAdmin: "初始化管理员",
    createAdminAccount: "创建您的管理员账户以开始使用",
    email: "邮箱",
    emailPlaceholder: "admin@example.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    confirmPassword: "确认密码",
    creating: "正在创建...",
    createAdminAccountButton: "创建管理员账户",
    emailAndPasswordRequired: "邮箱和密码为必填项",
    passwordMinLength: "密码长度至少为 6 个字符",
    passwordsDoNotMatch: "两次密码输入不一致",
    failedToInitializeAdmin: "初始化管理员失败",
  },
  invite: {
    acceptInvitation: "接受邀请",
    loading: "加载中...",
  },
  workspaces: {
    newWorkspace: "创建新工作区",
    loading: "加载中...",
  },
};
