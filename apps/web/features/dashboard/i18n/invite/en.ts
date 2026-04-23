import type { InviteDict } from "../types";

export const en: InviteDict = {
  // Page
  back: "Back",
  logOut: "Log out",
  goToDashboard: "Go to dashboard",
  // Error states
  invitationNotFound: "Invitation not found",
  invitationNotFoundDesc: "This invitation may have expired, been revoked, or doesn't belong to your account.",
  // Accepted state
  joinedWorkspace: "You joined {workspace}!",
  redirecting: "Redirecting to workspace...",
  // Declined state
  invitationDeclined: "Invitation declined",
  declinedDesc: "You won't be added to this workspace.",
  // Invite content
  joinWorkspace: "Join",
  invitedYou: "invited you to join as",
  asAdmin: "an admin",
  asMember: "a member",
  // Already handled
  alreadyHandled: "This invitation has already been",
  expired: "This invitation has expired.",
  // Actions
  decline: "Decline",
  declining: "Declining...",
  accept: "Accept & Join",
  acceptAndJoin: "Accept & Join",
  joining: "Joining...",
  // Errors
  failedToAccept: "Failed to accept invitation",
  failedToDecline: "Failed to decline invitation",
  // Welcome
  welcomeToMultica: "Welcome to Multica",
  createWorkspaceToGetStarted: "Create your workspace to get started.",
};