export type InviteDict = {
  invitationNotFound: string;
  invitationNotFoundDesc: string;
  goToDashboard: string;
  youJoined: (name: string) => string;
  redirecting: string;
  invitationDeclined: string;
  wontBeAdded: string;
  joinWorkspace: (name: string) => string;
  invitedAsAdmin: string;
  invitedAsMember: string;
  invitedAs: (role: string) => string;
  alreadyHandled: (status: string) => string;
  expired: string;
  declining: string;
  decline: string;
  joining: string;
  acceptAndJoin: string;
  back: string;
  failedToAccept: string;
  failedToDecline: string;
  logOut: string;
};

export type WorkspaceDict = {
  welcome: string;
  createWorkspace: string;
  back: string;
  logOut: string;
};

export type ProjectsDict = {
  projects: string;
  newProject: string;
  noProjectsYet: string;
  createYourFirstProject: string;
  noLead: string;
  members: string;
  agents: string;
  noResults: string;
  name: string;
  priority: string;
  status: string;
  progress: string;
  lead: string;
  created: string;
  today: string;
  daysAgo: (n: number) => string;
  monthsAgo: (n: number) => string;
};