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
  search: SearchDict;
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
  // Additional labels
  backToIssues: string;
  // Subscribe
  subscribe: string;
  unsubscribe: string;
  changeSubscribers: string;
  // Activity
  activity: string;
  members: string;
  agents: string;
  noResultsFound: string;
  // Issue not found
  issueDoesNotExist: string; 
  // Placeholders
  issueTitle: string;
  addDescription: string;
  // Filter scopes
  all: string;
  assigned: string;
  scopeAllDescription: string;
  members_scope: string;
  scopeMembersDescription: string;
  agents_scope: string;
  scopeAgentsDescription: string;
  // My issues scopes
  scopeAssigned: string;
  scopeCreated: string;
  scopeMyAgents: string;
  scopeAssignedDescription: string;
  scopeCreatedDescription: string;
  scopeMyAgentsDescription: string;
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

  // Picker labels (used in create issue modal pickers)
  noPriority: string;
  assignTo: string;
  priorityUrgent: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  statusBacklog: string;
  statusTodo: string;
  statusInProgress: string;
  statusInReview: string;
  statusDone: string;
  statusBlocked: string;
  statusCancelled: string;
  removeFromProject: string;
  noProjectsYet: string;

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

  // Board/Kanban view
  addIssue: string;
  hideColumn: string;
  showColumn: string;
  noIssuesInColumn: string;
  hiddenColumns: string;
  filterTooltip: string;

  // List view
  addIssueToList: string;
  noIssuesInList: string;

  // Sort options
  sortByManual: string;
  sortByPriority: string;
  sortByDueDate: string;
  sortByCreatedDate: string;
  sortByTitle: string;

  // Card property options
  showPriority: string;
  showDescription: string;
  showAssignee: string;
  showDueDate: string;
  showProject: string;
  showSubIssueProgress: string;

  // Filter priority labels (status labels already exist as picker labels)
  priorityNone: string;
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
  archived: string;
  cloud: string;
  local: string;
  restore: string;
  archiveAgent: string;
  createAgentDialog: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    visibility: string;
    workspace: string;
    workspaceMembersCanAssign: string;
    private: string;
    onlyYouCanAssign: string;
    runtime: string;
    mine: string;
    all: string;
    loadingRuntimes: string;
    noRuntimeAvailable: string;
    registerRuntimeBeforeCreating: string;
    cancel: string;
    creating: string;
    create: string;
  };
  tabs: {
    instructions: string;
    skills: string;
    tasks: string;
    env: string;
    customArgs: string;
    settings: string;
  };
  instructionsTab: {
    title: string;
    description: string;
    placeholder: string;
    noInstructionsSet: string;
    characters: string;
    save: string;
    saving: string;
  };
  skillsTab: {
    title: string;
    description: string;
    addSkill: string;
    addWorkspaceSkill: string;
    localSkillsInfo: string;
    noSkillsAssigned: string;
    noSkillsAssignedDesc: string;
    allWorkspaceSkillsAssigned: string;
    selectSkillToAssign: string;
    failedToAddSkill: string;
    failedToRemoveSkill: string;
    cancel: string;
  };
  tasksTab: {
    title: string;
    description: string;
    noTasksInQueue: string;
    noTasksInQueueDesc: string;
    queued: string;
    dispatched: string;
    running: string;
    completed: string;
    failed: string;
    cancelled: string;
    started: string;
    dispatchedLabel: string;
    completedLabel: string;
    failedLabel: string;
    queuedLabel: string;
  };
  settingsTab: {
    avatar: string;
    clickToUploadAvatar: string;
    name: string;
    description: string;
    descriptionPlaceholder: string;
    visibility: string;
    workspace: string;
    workspaceMembersCanAssign: string;
    private: string;
    onlyYouCanAssign: string;
    maxConcurrentTasks: string;
    runtime: string;
    mine: string;
    all: string;
    avatarUpdated: string;
    failedToUploadAvatar: string;
    nameRequired: string;
    settingsSaved: string;
    failedToSaveSettings: string;
    saveChanges: string;
    saving: string;
  };
  envTab: {
    title: string;
    description: string;
    readOnlyDescription: string;
    add: string;
    keyPlaceholder: string;
    valuePlaceholder: string;
    duplicateKeyError: string;
    environmentVariablesSaved: string;
    failedToSaveEnvironmentVariables: string;
    save: string;
    saving: string;
    noEnvironmentVariablesConfigured: string;
  };
  customArgsTab: {
    title: string;
    description: string;
    launchMode: string;
    add: string;
    flagPlaceholder: string;
    customArgumentsSaved: string;
    failedToSaveCustomArguments: string;
    save: string;
    saving: string;
  };
  config: {
    idle: string;
    working: string;
    blocked: string;
    error: string;
    offline: string;
  };
  modelDropdown: {
    model: string;
    selectModel: string;
    noModelsAvailable: string;
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
  skillUrlBatchHint: string;
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
  // Agent live card activity area
  agentLiveCard: {
    isWorking: string;
    stop: string;
    liveLogNotAvailable: string;
    latest: string;
    expandTranscript: string;
  };
  taskRunHistory: {
    executionHistory: string;
    loading: string;
    noExecutionData: string;
    completed: string;
    failed: string;
  };
  timeline: {
    result: string;
    loadingTranscript: string;
    noResultsFound: string;
  };
  // Autopilot message template
  autopilotTriggered: string;
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
  settings: string;
  myAccount: string;
  workspaceLabel: string;
  profile: string;
  appearanceLabel: string;
  tokensTab: string;
  general: string;
  repositoriesLabel: string;
  membersLabel: string;
  theme: string;
  language: string;
  light: string;
  dark: string;
  system: string;
  account: {
    profile: string;
    clickToUploadAvatar: string;
    name: string;
    updateProfile: string;
    updating: string;
    avatarUpdated: string;
    profileUpdated: string;
    failedToUpdateProfile: string;
    failedToUploadAvatar: string;
  };
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
  tokens: {
    apiTokens: string;
    personalAccessTokensDescription: string;
    tokenName: string;
    tokenNamePlaceholder: string;
    expiry: string;
    days30: string;
    days90: string;
    year1: string;
    noExpiry: string;
    create: string;
    creating: string;
    created: string;
    neverUsed: string;
    lastUsed: string;
    expires: string;
    createdOn: string;
    revoke: string;
    revokeToken: string;
    tokenRevoked: string;
    tokenCreated: string;
    copyTokenNow: string;
    copyToken: string;
    copied: string;
    done: string;
    failedToLoadTokens: string;
    failedToCreateToken: string;
    failedToRevokeToken: string;
  };
  appearance: {
    theme: string;
    language: string;
    selectLightTheme: string;
    selectDarkTheme: string;
    selectSystemTheme: string;
    selectLanguage: string;
  };
  workspace: {
    general: string;
    name: string;
    description: string;
    descriptionPlaceholder: string;
    context: string;
    contextPlaceholder: string;
    slug: string;
    save: string;
    saving: string;
    workspaceSettingsSaved: string;
    failedToSaveWorkspaceSettings: string;
    dangerZone: string;
    leaveWorkspace: string;
    leaveWorkspaceDescription: string;
    isSoleOwner: string;
    isSoleOwnerMember: string;
    isSoleOwnerNoMember: string;
    leaveWorkspaceConfirm: string;
    leaving: string;
    leaveWorkspaceButton: string;
    deleteWorkspace: string;
    deleteWorkspaceDescription: string;
    deleteWorkspaceButton: string;
    deleting: string;
    onlyAdminsAndOwnersCanUpdate: string;
  };
  members: {
    members: string;
    inviteMember: string;
    email: string;
    emailPlaceholder: string;
    role: string;
    member: string;
    admin: string;
    owner: string;
    invite: string;
    inviting: string;
    invitationSent: string;
    pendingInvitations: string;
    revokeInvitation: string;
    revokeInvitationDescription: string;
    invitationRevoked: string;
    changeRole: string;
    removeFromWorkspace: string;
    removeMemberDescription: string;
    memberRemoved: string;
    roleUpdated: string;
    failedToSendInvitation: string;
    failedToRevokeInvitation: string;
    failedToUpdateMember: string;
    failedToRemoveMember: string;
    noMembersFound: string;
    fullAccessManageAll: string;
    manageMembersAndSettings: string;
    createAndWorkOnIssues: string;
  };
  repositories: {
    repositories: string;
    repositoriesDescription: string;
    url: string;
    urlPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    addRepository: string;
    remove: string;
    save: string;
    saving: string;
    repositoriesSaved: string;
    failedToSaveRepositories: string;
    onlyAdminsAndOwnersCanManage: string;
  };
  deleteWorkspace: {
    deleteWorkspace: string;
    thisCannotBeUndone: string;
    allIssuesAgentsDataWillBeRemoved: string;
    toConfirmType: string;
    below: string;
    cancel: string;
    delete: string;
    deleting: string;
  };
};

export type AuthDict = {
  login: {
    signIn: string;
    enterCredentials: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signInButton: string;
    signingIn: string;
    authorizing: string;
    authorizeCli: string;
    allowCliAccess: string;
    useDifferentAccount: string;
  };
  init: {
    initializeAdmin: string;
    createAdminAccount: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    createButton: string;
    creating: string;
    emailRequired: string;
    passwordTooShort: string;
    passwordsDoNotMatch: string;
    initFailed: string;
  };
  invite: {
    back: string;
    logOut: string;
    invitationNotFound: string;
    invitationNotFoundDesc: string;
    goToDashboard: string;
    joinedWorkspace: string;
    redirecting: string;
    invitationDeclined: string;
    declinedDesc: string;
    joinWorkspace: string;
    invitedYou: string;
    asAdmin: string;
    asMember: string;
    alreadyHandled: string;
    expired: string;
    decline: string;
    declining: string;
    accept: string;
    acceptAndJoin: string;
    joining: string;
    failedToAccept: string;
    failedToDecline: string;
    welcomeToMultica: string;
    createWorkspaceToGetStarted: string;
  };
};

export type ProjectsDict = {
  // Breadcrumbs & page titles
  projects: string;
  // Table headers
  name: string;
  priority: string;
  status: string;
  progress: string;
  lead: string;
  created: string;
  // Actions
  newProject: string;
  createYourFirstProject: string;
  // Empty state
  noProjectsYet: string;
  // Lead popover
  assignLead: string;
  noLead: string;
  members: string;
  agents: string;
  noResults: string;
  // Project detail sidebar
  properties: string;
  changeIcon: string;
  projectTitle: string;
  addDescription: string;
  // Progress section
  progressSection: string;
  // Description section
  description: string;
  // Actions
  deleteProject: string;
  copyLink: string;
  pinToSidebar: string;
  unpinFromSidebar: string;
  toggleSidebar: string;
  // Delete dialog
  deleteProjectTitle: string;
  deleteProjectDescription: string;
  cancel: string;
  delete: string;
  deleting: string;
  projectDeleted: string;
  // Toast messages
  failedToDeleteProject: string;
  failedToMoveIssue: string;
  linkCopied: string;
  // Create project modal
  collapseProject: string;
  expandProject: string;
  closeProject: string;
  chooseIcon: string;
  projectTitlePlaceholder: string;
  addDescriptionProject: string;
  noResultsProject: string;
  creatingProject: string;
  createProject: string;
  projectCreated: string;
  failedToCreateProject: string;
  // Project detail
  projectNotFound: string;
  noIssuesLinked: string;
  noIssuesLinkedDescription: string;
  // Project status labels
  projectStatusPlanned: string;
  projectStatusInProgress: string;
  projectStatusPaused: string;
  projectStatusCompleted: string;
  projectStatusCancelled: string;
  // Project priority labels
  projectPriorityUrgent: string;
  projectPriorityHigh: string;
  projectPriorityMedium: string;
  projectPriorityLow: string;
  projectPriorityNone: string;
};
export type SearchDict = {
  // Dialog
  title: string;
  description: string;
  placeholder: string;
  // Navigation labels
  inbox: string;
  myIssues: string;
  issues: string;
  projects: string;
  agents: string;
  runtimes: string;
  skills: string;
  settings: string;
  // Section headings
  pages: string;
  commands: string;
  switchWorkspace: string;
  recent: string;
  recentIssues: string;
  // Commands
  newIssue: string;
  newProject: string;
  copyIssueLink: string;
  copyIssueIdentifier: string;
  switchToLightTheme: string;
  switchToDarkTheme: string;
  useSystemTheme: string;
  // Toast messages
  linkCopied: string;
  identifierCopied: string;
  // Empty states
  noResultsFound: string;
  typeToSearchIssuesAndProjects: string;
};

export type InboxDict = {
  // Page title
  inbox: string;
  // List header
  unreadCount: string;
  // Menu items
  markAllAsRead: string;
  archiveAll: string;
  archiveAllRead: string;
  archiveCompleted: string;
  // Empty state
  noNotifications: string;
  yourInboxIsEmpty: string;
  selectNotificationToViewDetails: string;
  // Type labels
  issueAssigned: string;
  unassigned: string;
  assigneeChanged: string;
  statusChanged: string;
  priorityChanged: string;
  dueDateChanged: string;
  newComment: string;
  mentioned: string;
  reviewRequested: string;
  taskCompleted: string;
  taskFailed: string;
  agentBlocked: string;
  agentCompleted: string;
  reacted: string;
  // Detail labels
  setStatusTo: string;
  setPriorityTo: string;
  assignedTo: string;
  removedAssignee: string;
  setDueDateTo: string;
  removedDueDate: string;
  reactedToYourComment: string;
  // Actions
  archive: string;
  // Time
  justNow: string;
  // Toast messages
  failedToMarkAsRead: string;
  failedToArchive: string;
};
export type RuntimesDict = {
  // Page title
  pageTitle: string;
  // Header
  onlineCount: string;
  // Filter tabs
  mine: string;
  all: string;
  // Owner filter
  owner: string;
  allOwners: string;
  // Empty states
  noRuntimesOwned: string;
  noRuntimesForOwner: string;
  noRuntimesRegistered: string;
  registerRuntimeHint: string;
  // Detail panel
  selectRuntimeHint: string;
  runtimeMode: string;
  provider: string;
  status: string;
  lastSeen: string;
  ownerLabel: string;
  device: string;
  daemonId: string;
  created: string;
  updated: string;
  // Sections
  cliVersion: string;
  connectionTest: string;
  tokenUsage: string;
  metadata: string;
  // Status
  online: string;
  offline: string;
  // Runtime modes
  local: string;
  cloud: string;
  // Ping section
  testConnection: string;
  testing: string;
  waitingForDaemon: string;
  runningTest: string;
  connected: string;
  pingFailed: string;
  pingTimeout: string;
  seconds: string;
  // Update section
  cliVersionLabel: string;
  unknown: string;
  latest: string;
  available: string;
  update: string;
  waitingForDaemonUpdate: string;
  updating: string;
  updateComplete: string;
  updateFailed: string;
  updateTimeout: string;
  retry: string;
  managedByDesktop: string;
  // Usage section
  days: string;
  input: string;
  output: string;
  cacheRead: string;
  cacheWrite: string;
  estimatedCost: string;
  noUsageData: string;
  date: string;
  model: string;
  // Delete dialog
  deleteRuntime: string;
  deleteRuntimeConfirmation: string;
  cancel: string;
  delete: string;
  deleting: string;
  // Toast messages
  runtimeDeleted: string;
  failedToDeleteRuntime: string;
  // Last seen
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  never: string;
};
export type InviteDict = Record<string, unknown>;
export type WorkspaceDict = Record<string, unknown>;
