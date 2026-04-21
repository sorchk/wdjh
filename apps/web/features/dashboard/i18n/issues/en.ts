import type { IssuesDict } from "../types";

export const en: IssuesDict = {
  // Breadcrumbs & page titles
  issues: "Issues",
  workspace: "Workspace",
  myIssues: "My Issues",

  // Empty states
  noIssuesYet: "No issues yet",
  noIssuesAssignedToYou: "No issues assigned to you",
  noIssuesAssignedToYouDesc: "Issues you create or are assigned to will appear here.",
  createAnIssueToGetStarted: "Create an issue to get started.",

  // Activity timeline (formatActivity)
  createdThisIssue: "created this issue",
  changedStatusFromTo: "changed status from {from} to {to}",
  changedPriorityFromTo: "changed priority from {from} to {to}",
  selfAssigned: "self-assigned this issue",
  assignedTo: "assigned to {name}",
  removedAssignee: "removed assignee",
  changedAssignee: "changed assignee",
  removedDueDate: "removed due date",
  setDueDateTo: "set due date to {date}",
  renamedFromTo: "renamed this issue from \"{from}\" to \"{to}\"",
  updatedDescription: "updated the description",
  completedTask: "completed the task",
  taskFailed: "task failed",

  // Search
  searchIssues: "Search issues...",
  searching: "Searching...",
  noIssuesFound: "No issues found.",
  typeToSearchIssues: "Type to search issues",

  // Issue picker
  setParentIssue: "Set parent issue",
  setParentIssueDescription:
    "Search for an issue to set as the parent of this issue",
  addSubIssue: "Add sub-issue",
  addSubIssueDescription:
    "Search for an issue to add as a sub-issue",
  setAsParent: "Set {identifier} as parent issue",
  addedAsSubIssue: "Added {identifier} as sub-issue",
  failedToAddSubIssue: "Failed to add sub-issue",

  // Sidebar properties
  properties: "Properties",
  parentIssue: "Parent issue",
  details: "Details",
  createdBy: "Created by",
  created: "Created",
  updated: "Updated",
  tokenUsage: "Token usage",
  input: "Input",
  output: "Output",
  cache: "Cache",
  runs: "Runs",

  // Action menu
  status: "Status",
  priority: "Priority",
  assignee: "Assignee",
  dueDate: "Due date",
  unassigned: "Unassigned",
  createSubIssue: "Create sub-issue",
  setParentIssueAction: "Set parent issue...",
  addSubIssueAction: "Add sub-issue...",
  pinToSidebar: "Pin to sidebar",
  unpinFromSidebar: "Unpin from sidebar",
  copyLink: "Copy link",
  deleteIssue: "Delete issue",
  toggleSidebar: "Toggle sidebar",

  // Subscribe
  subscribe: "Subscribe",
  unsubscribe: "Unsubscribe",
  changeSubscribers: "Change subscribers...",

  // Activity section
  activity: "Activity",
  members: "Members",
  agents: "Agents",
  noResultsFound: "No results found",

  // Not found
  issueDoesNotExist:
    "This issue does not exist or has been deleted in this workspace.",
  backToIssues: "Back to Issues",

  // Additional labels
  deleteIssueTitle: "Delete issue",
  deleteIssueDescription:
    "This will permanently delete this issue and all its comments. This action cannot be undone.",
  cancel: "Cancel",
  delete: "Delete",
  deleting: "Deleting...",
  issueDeleted: "Issue deleted",
  failedToDeleteIssue: "Failed to delete issue",
  failedToUpdateIssue: "Failed to update issue",
  linkCopied: "Link copied",

  // Status labels for picker
  statusBacklog: "Backlog",
  statusTodo: "Todo",
  statusInProgress: "In Progress",
  statusInReview: "In Review",
  statusDone: "Done",
  statusBlocked: "Blocked",
  statusCancelled: "Cancelled",
  noPriority: "No priority",

  // Date options
  today: "Today",
  tomorrow: "Tomorrow",
  nextWeek: "Next week",
  clearDate: "Clear date",

  // Sub-issues
  subIssues: "Sub-issues",
  subIssueOf: "Sub-issue of",
  addSubIssues: "Add sub-issues",

  // Placeholders
  issueTitle: "Issue title",
  addDescription: "Add description...",

  // Filter scopes
  all: "All",
  assigned: "Assigned",
  scopeAllDescription: "All issues in this workspace",
  members_scope: "Members",
  scopeMembersDescription: "Issues assigned to team members",
  agents_scope: "Agents",
  scopeAgentsDescription: "Issues assigned to AI agents",

  // My issues scopes
  scopeAssigned: "Assigned",
  scopeCreated: "Created",
  scopeMyAgents: "My Agents",
  scopeAssignedDescription: "Issues assigned to me",
  scopeCreatedDescription: "Issues I created",
  scopeMyAgentsDescription: "Issues assigned to my agents",

  // Filter labels
  filter: "Filter",
  filterPlaceholder: "Filter...",
  noAssignee: "No assignee",
  noProject: "No project",
  creator: "Creator",
  project: "Project",

  // Sort/display
  manual: "Manual",
  displaySettings: "Display settings",
  ordering: "Ordering",
  cardProperties: "Card properties",
  board: "Board",
  list: "List",
  view: "View",
  boardView: "Board view",
  listView: "List view",
  ascending: "Ascending",
  descending: "Descending",
  resetAllFilters: "Reset all filters",

  // Count labels
  issue_s: "{count} {count, plural, one {issue} other {issues}}",
  issue_singular: "issue",
  issue_plural: "issues",

  // Sub-issues
  subIssues: "Sub-issues",
  subIssueOf: "Sub-issue of",
  addSubIssues: "Add sub-issues",

  // Dialog
  deleteIssueTitle: "Delete issue",
  deleteIssueDescription:
    "This will permanently delete this issue and all its comments. This action cannot be undone.",
  cancel: "Cancel",
  delete: "Delete",
  deleting: "Deleting...",

  // Batch
  selected: "{count} selected",
  updatedNIssues: "Updated {count} {count, plural, one {issue} other {issues}}",
  failedToUpdateIssues: "Failed to update issues",
  deletedNIssues: "Deleted {count} {count, plural, one {issue} other {issues}}",
  failedToDeleteIssues: "Failed to delete issues",
  deleteNIssuesTitle:
    "Delete {count} {count, plural, one {issue} other {issues}}?",
  deleteNIssuesDescription:
    "This action cannot be undone. This will permanently delete the selected {count, plural, one {issue} other {issues}} and all associated data.",

  // Toast
  failedToMoveIssue: "Failed to move issue",
  issueDeleted: "Issue deleted",
  failedToDeleteIssue: "Failed to delete issue",
  linkCopied: "Link copied",
  failedToUpdateIssue: "Failed to update issue",

  // Date options
  today: "Today",
  tomorrow: "Tomorrow",
  nextWeek: "Next week",
  clearDate: "Clear date",

  // Picker labels (used in create issue modal pickers)
  noPriority: "No priority",
  assignTo: "Assign to...",
  priorityUrgent: "Urgent",
  priorityHigh: "High",
  priorityMedium: "Medium",
  priorityLow: "Low",
  statusBacklog: "Backlog",
  statusTodo: "Todo",
  statusInProgress: "In Progress",
  statusInReview: "In Review",
  statusDone: "Done",
  statusBlocked: "Blocked",
  statusCancelled: "Cancelled",
  removeFromProject: "Remove from project",
  noProjectsYet: "No projects yet",

  // Create issue modal
  newIssue: "New issue",
  newSubIssue: "New sub-issue",
  collapse: "Collapse",
  expand: "Expand",
  close: "Close",
  issueTitlePlaceholder: "Issue title",
  addDescriptionPlaceholder: "Add description...",
  creating: "Creating...",
  createIssue: "Create Issue",
  issueCreated: "Issue created",
  viewIssue: "View issue",
  failedToCreateIssue: "Failed to create issue",

  // Create workspace modal
  createNewWorkspace: "Create a new workspace",
  workspaceDescription: "Workspaces are shared environments where teams can work on projects and issues.",
  back: "Back",

  // Create workspace form
  workspaceName: "Workspace Name",
  workspaceUrl: "Workspace URL",
  workspaceUrlPrefix: "multica.ai/",
  workspaceNamePlaceholder: "My Workspace",
  workspaceUrlPlaceholder: "my-workspace",
  creatingWorkspace: "Creating...",
  createWorkspace: "Create workspace",
  workspaceSlugFormatError: "Only lowercase letters, numbers, and hyphens",
  workspaceSlugConflictError: "That workspace URL is already taken.",
  failedToCreateWorkspace: "Failed to create workspace",
  chooseDifferentWorkspaceUrl: "Choose a different workspace URL",

  // Create project modal
  newProject: "New project",
  collapseProject: "Collapse",
  expandProject: "Expand",
  closeProject: "Close",
  chooseIcon: "Choose icon",
  projectTitlePlaceholder: "Project title",
  addDescriptionProject: "Add description...",
  noLead: "No lead",
  assignLead: "Assign lead...",
  membersLabel: "Members",
  agentsLabel: "Agents",
  noResultsProject: "No results",
  creatingProject: "Creating...",
  createProject: "Create Project",
  projectCreated: "Project created",
  failedToCreateProject: "Failed to create project",

  // Board/Kanban view
  addIssue: "Add issue",
  hideColumn: "Hide column",
  showColumn: "Show column",
  noIssuesInColumn: "No issues",
  hiddenColumns: "Hidden columns",
  filterTooltip: "Filter",

  // List view
  addIssueToList: "Add issue",
  noIssuesInList: "No issues",

  // Sort options
  sortByManual: "Manual",
  sortByPriority: "Priority",
  sortByDueDate: "Due date",
  sortByCreatedDate: "Created date",
  sortByTitle: "Title",

  // Card property options
  showPriority: "Priority",
  showDescription: "Description",
  showAssignee: "Assignee",
  showDueDate: "Due date",
  showProject: "Project",
  showSubIssueProgress: "Sub-issue progress",

  // Filter priority labels (most already exist as picker labels)
  priorityNone: "No priority",
};
