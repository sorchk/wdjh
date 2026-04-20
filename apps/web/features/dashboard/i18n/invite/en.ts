import type { InviteDict } from "../types";

export const en: InviteDict = {
  invitationNotFound: "Invitation not found",
  invitationNotFoundDesc:
    "This invitation may have expired, been revoked, or doesn't belong to your account.",
  goToDashboard: "Go to dashboard",
  youJoined: (name: string) => `You joined ${name}!`,
  redirecting: "Redirecting to workspace...",
  invitationDeclined: "Invitation declined",
  wontBeAdded: "You won't be added to this workspace.",
  joinWorkspace: (name: string) => `Join ${name || "workspace"}`,
  invitedAsAdmin: "an admin",
  invitedAsMember: "a member",
  invitedAs: (role: string) => `invited you to join as ${role}.`,
  alreadyHandled: (status: string) => `This invitation has already been ${status}.`,
  expired: "This invitation has expired.",
  declining: "Declining...",
  decline: "Decline",
  joining: "Joining...",
  acceptAndJoin: "Accept & Join",
  back: "Back",
  failedToAccept: "Failed to accept invitation",
  failedToDecline: "Failed to decline invitation",
  logOut: "Log out",
};