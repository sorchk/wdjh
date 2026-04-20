export type Locale = "en" | "zh";

export const locales: Locale[] = ["en", "zh"];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export type DashboardDict = {
  common: CommonDict;
  issues: IssuesDict;
  projects: ProjectsDict;
  agents: AgentsDict;
  settings: SettingsDict;
  inbox: InboxDict;
  runtimes: RuntimesDict;
  autopilots: AutopilotsDict;
  skills: SkillsDict;
  invite: InviteDict;
  workspace: WorkspaceDict;
  auth: AuthDict;
};

export type CommonDict = {
  sidebar: Record<string, string>;
  status: Record<string, string>;
  priority: Record<string, string>;
  projectStatus: Record<string, string>;
  projectPriority: Record<string, string>;
  toast: Record<string, string>;
  date: Record<string, string>;
  actions: Record<string, string>;
  empty: Record<string, string>;
};

export type IssuesDict = {
  // Breadcrumbs & page titles
  issues: string;
  workspace: string;
  myIssues: string;
  // Empty states
  noIssuesYet: string;
  noIssuesAssignedToYou: string;
  noIssuesAssignedToYouDesc: string;
  createAnIssueToGetStarted: string;
  // Activity timeline
  createdThisIssue: string;
  changedStatusFromTo: string;
  changedPriorityFromTo: string;
  selfAssigned: string;
  assignedTo: string;
  removedAssignee: string;
  changedAssignee: string;
  removedDueDate: string;
  setDueDateTo: string;
  renamedFromTo: string;
  updatedDescription: string;
  completedTask: string;
  taskFailed: string;
  // Search
  searchIssues: string;
  searching: string;
  noIssuesFound: string;
  typeToSearchIssues: string;
  // Issue picker
  setParentIssue: string;
  setParentIssueDescription: string;
  addSubIssue: string;
  addSubIssueDescription: string;
  setAsParent: string;
  addedAsSubIssue: string;
  failedToAddSubIssue: string;
  // Sidebar properties
  properties: string;
  parentIssue: string;
  details: string;
  createdBy: string;
  created: string;
  updated: string;
  tokenUsage: string;
  input: string;
  output: string;
  cache: string;
  runs: string;
  // Action menu
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  unassigned: string;
  createSubIssue: string;
  setParentIssueAction: string;
  addSubIssueAction: string;
  pinToSidebar: string;
  unpinFromSidebar: string;
  copyLink: string;
  deleteIssue: string;
  toggleSidebar: string;
  // Subscribe
  subscribe: string;
  unsubscribe: string;
  changeSubscribers: string;
  // Activity section
  activity: string;
  members: string;
  agents: string;
  noResultsFound: string;
  // Not found
  issueDoesNotExist: string;
  backToIssues: string;
  // Placeholders
  issueTitle: string;
  addDescription: string;
  // Filter scopes
  all: string;
  scopeAllDescription: string;
  members_scope: string;
  scopeMembersDescription: string;
  agents_scope: string;
  scopeAgentsDescription: string;
  // Filter labels
  filter: string;
  filterPlaceholder: string;
  noAssignee: string;
  noProject: string;
  creator: string;
  project: string;
  // Sort/display
  manual: string;
  displaySettings: string;
  ordering: string;
  cardProperties: string;
  board: string;
  list: string;
  view: string;
  boardView: string;
  listView: string;
  ascending: string;
  descending: string;
  resetAllFilters: string;
  // Count labels
  issue_s: string;
  issue_singular: string;
  issue_plural: string;
  // Sub-issues
  subIssues: string;
  subIssueOf: string;
  addSubIssues: string;
  // Dialog
  deleteIssueTitle: string;
  deleteIssueDescription: string;
  cancel: string;
  delete: string;
  deleting: string;
  // Batch
  selected: string;
  updatedNIssues: string;
  failedToUpdateIssues: string;
  deletedNIssues: string;
  failedToDeleteIssues: string;
  deleteNIssuesTitle: string;
  deleteNIssuesDescription: string;
  // Toast
  failedToMoveIssue: string;
  issueDeleted: string;
  failedToDeleteIssue: string;
  linkCopied: string;
  failedToUpdateIssue: string;
  // Date options (used in due date picker)
  today: string;
  tomorrow: string;
  nextWeek: string;
  clearDate: string;

  // Create issue modal
  newIssue: string;
  newSubIssue: string;
  collapse: string;
  expand: string;
  close: string;
  issueTitlePlaceholder: string;
  addDescriptionPlaceholder: string;
  creating: string;
  createIssue: string;
  issueCreated: string;
  viewIssue: string;
  failedToCreateIssue: string;

  // Create workspace modal
  createNewWorkspace: string;
  workspaceDescription: string;
  back: string;

  // Create workspace form
  workspaceName: string;
  workspaceUrl: string;
  workspaceUrlPrefix: string;
  workspaceNamePlaceholder: string;
  workspaceUrlPlaceholder: string;
  creatingWorkspace: string;
  createWorkspace: string;
  workspaceSlugFormatError: string;
  workspaceSlugConflictError: string;
  failedToCreateWorkspace: string;
  chooseDifferentWorkspaceUrl: string;

  // Create project modal
  newProject: string;
  collapseProject: string;
  expandProject: string;
  closeProject: string;
  chooseIcon: string;
  projectTitlePlaceholder: string;
  addDescriptionProject: string;
  noLead: string;
  assignLead: string;
  membersLabel: string;
  agentsLabel: string;
  noResultsProject: string;
  creatingProject: string;
  createProject: string;
  projectCreated: string;
  failedToCreateProject: string;
};

export type AgentsDict = {
  agents: string;
  searchAgentPlaceholder: string;
  noAgentsYet: string;
  noActiveAgents: string;
  noArchivedAgents: string;
  createAgent: string;
  selectAgentToViewDetails: string;
  agentUpdated: string;
  failedToUpdateAgent: string;
  agentArchived: string;
  failedToArchiveAgent: string;
  agentRestored: string;
  failedToRestoreAgent: string;
  showActiveAgents: string;
  showArchivedAgents: string;
  createAgentDialog: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    cancel: string;
    creating: string;
    create: string;
  };
};

export type SkillsDict = {
  skills: string;
  noWorkspaceSkillsYet: string;
  workspaceSkillsDescription: string;
  createSkill: string;
  selectSkillToViewDetails: string;
  addWorkspaceSkill: string;
  addWorkspaceSkillDescription: string;
  createTab: string;
  importTab: string;
  nameLabel: string;
  namePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  cancel: string;
  creating: string;
  create: string;
  skillUrlLabel: string;
  skillUrlPlaceholder: string;
  supportedSources: string;
  importing: string;
  importingFromClawHub: string;
  importingFromSkillsSh: string;
  import: string;
  skillCreated: string;
  failedToCreateSkill: string;
  skillImported: string;
  failedToImportSkill: string;
  importFailed: string;
  addFile: string;
  addFileDescription: string;
  filePathLabel: string;
  filePathPlaceholder: string;
  fileAlreadyExists: string;
  add: string;
  deleteSkill: string;
  deleteSkillConfirmation: string;
  files: string;
  save: string;
  saving: string;
  skillSaved: string;
  failedToSaveSkill: string;
  failedToLoadSkillFiles: string;
  deleteFile: string;
  skillDeleted: string;
  failedToDeleteSkill: string;
  workspaceSkillsSupplement: string;
};

export type AutopilotsDict = {
  autopilot: string;
  noAutopilotsYet: string;
  scheduleDescription: string;
  newAutopilot: string;
  startFromScratch: string;
  nameLabel: string;
  namePlaceholder: string;
  promptLabel: string;
  promptPlaceholder: string;
  agentLabel: string;
  selectAgentPlaceholder: string;
  scheduleLabel: string;
  cancel: string;
  creating: string;
  create: string;
  autopilotCreated: string;
  failedToCreateAutopilot: string;
  autopilotCreatedButTriggerFailed: string;
  mode: string;
  status: string;
  lastRun: string;
  agent: string;
  name: string;
  templates: {
    dailyNewsDigest: string;
    dailyNewsDigestSummary: string;
    prReviewReminder: string;
    prReviewReminderSummary: string;
    bugTriage: string;
    bugTriageSummary: string;
    weeklyProgressReport: string;
    weeklyProgressReportSummary: string;
    dependencyAudit: string;
    dependencyAuditSummary: string;
    documentationCheck: string;
    documentationCheckSummary: string;
  };
};

export type SettingsDict = {
  password: {
    changePassword: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    passwordMismatch: string;
    passwordTooShort: string;
    passwordRequirements: string;
    processing: string;
    changeSuccess: string;
    changeFailed: string;
  };
};

export type ProjectsDict = Record<string, unknown>;
export type InboxDict = Record<string, unknown>;
export type RuntimesDict = Record<string, unknown>;
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
export type WorkspaceDict = Record<string, unknown>;

export type AuthDict = {
  login: {
    signIn: string;
    enterCredentials: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signingIn: string;
    authorize: string;
    authorizing: string;
    useDifferentAccount: string;
    invalidCredentials: string;
    loginFailed: string;
    failedToAuthorizeCli: string;
    allowAccess: (email: string) => string;
  };
  init: {
    initializeAdmin: string;
    createAdminAccount: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    creating: string;
    createAdminAccountButton: string;
    emailAndPasswordRequired: string;
    passwordMinLength: string;
    passwordsDoNotMatch: string;
    failedToInitializeAdmin: string;
  };
  invite: {
    acceptInvitation: string;
    loading: string;
  };
  workspaces: {
    newWorkspace: string;
    loading: string;
  };
};
