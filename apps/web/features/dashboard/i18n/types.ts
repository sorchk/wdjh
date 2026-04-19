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
};

export type ProjectsDict = Record<string, unknown>;
export type AgentsDict = Record<string, unknown>;
export type SettingsDict = Record<string, unknown>;
export type InboxDict = Record<string, unknown>;
export type RuntimesDict = Record<string, unknown>;
export type AutopilotsDict = Record<string, unknown>;
export type SkillsDict = Record<string, unknown>;
export type InviteDict = Record<string, unknown>;
export type WorkspaceDict = Record<string, unknown>;
