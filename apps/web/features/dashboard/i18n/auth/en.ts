import type { AuthDict } from "../types";

export const en: AuthDict = {
  login: {
    signIn: "Sign in",
    enterCredentials: "Enter your credentials to access your account",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    signingIn: "Signing in...",
    authorize: "Authorize",
    authorizing: "Authorizing...",
    useDifferentAccount: "Use a different account",
    invalidCredentials: "Invalid credentials",
    loginFailed: "Login failed",
    failedToAuthorizeCli: "Failed to authorize CLI. Please log in again.",
    allowAccess: (email: string) => `Allow the CLI to access Multica as ${email}?`,
  },
  init: {
    initializeAdmin: "Initialize Admin",
    createAdminAccount: "Create your administrator account to get started",
    email: "Email",
    emailPlaceholder: "admin@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    confirmPassword: "Confirm Password",
    creating: "Creating...",
    createAdminAccountButton: "Create Admin Account",
    emailAndPasswordRequired: "Email and password are required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordsDoNotMatch: "Passwords do not match",
    failedToInitializeAdmin: "Failed to initialize admin",
  },
  invite: {
    acceptInvitation: "Accept Invitation",
    loading: "Loading...",
  },
  workspaces: {
    newWorkspace: "Create New Workspace",
    loading: "Loading...",
  },
};
