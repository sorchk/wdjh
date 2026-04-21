import type { RuntimesDict } from "../types";

export const en: RuntimesDict = {
  // Page title
  pageTitle: "Runtimes",
  // Header
  onlineCount: "{online}/{total} online",
  // Filter tabs
  mine: "Mine",
  all: "All",
  // Owner filter
  owner: "Owner",
  allOwners: "All owners",
  // Empty states
  noRuntimesOwned: "No runtimes owned by you",
  noRuntimesForOwner: "No runtimes for this owner",
  noRuntimesRegistered: "No runtimes registered",
  registerRuntimeHint: 'Run "multica daemon start" to register a local runtime.',
  // Detail panel
  selectRuntimeHint: "Select a runtime to view details",
  runtimeMode: "Runtime Mode",
  provider: "Provider",
  status: "Status",
  lastSeen: "Last Seen",
  ownerLabel: "Owner",
  device: "Device",
  daemonId: "Daemon ID",
  created: "Created",
  updated: "Updated",
  // Sections
  cliVersion: "CLI Version",
  connectionTest: "Connection Test",
  tokenUsage: "Token Usage",
  metadata: "Metadata",
  // Status
  online: "Online",
  offline: "Offline",
  // Runtime modes
  local: "Local",
  cloud: "Cloud",
  // Ping section
  testConnection: "Test Connection",
  testing: "Testing...",
  waitingForDaemon: "Waiting for daemon...",
  runningTest: "Running test...",
  connected: "Connected",
  pingFailed: "Failed",
  pingTimeout: "Timeout",
  seconds: "({duration}s)",
  // Update section
  cliVersionLabel: "CLI Version:",
  unknown: "unknown",
  latest: "Latest",
  available: "available",
  update: "Update",
  waitingForDaemonUpdate: "Waiting for daemon...",
  updating: "Updating...",
  updateComplete: "Update complete. Daemon is restarting...",
  updateFailed: "Update failed",
  updateTimeout: "Timeout",
  retry: "Retry",
  managedByDesktop: "Managed by Desktop",
  // Usage section
  days: "{days}d",
  input: "Input",
  output: "Output",
  cacheRead: "Cache Read",
  cacheWrite: "Cache Write",
  estimatedCost: "Estimated cost ({days}d):",
  noUsageData: "No usage data yet",
  date: "Date",
  model: "Model",
  // Delete dialog
  deleteRuntime: "Delete Runtime",
  deleteRuntimeConfirmation: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
  cancel: "Cancel",
  delete: "Delete",
  deleting: "Deleting...",
  // Toast messages
  runtimeDeleted: "Runtime deleted",
  failedToDeleteRuntime: "Failed to delete runtime",
  // Last seen
  justNow: "just now",
  minutesAgo: "{minutes}m ago",
  hoursAgo: "{hours}h ago",
  daysAgo: "{days}d ago",
  never: "never",
};