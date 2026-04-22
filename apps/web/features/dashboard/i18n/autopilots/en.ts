import type { AutopilotsDict } from "../types";

export const en: AutopilotsDict = {
  autopilot: "Autopilot",
  noAutopilotsYet: "No autopilots yet",
  scheduleDescription:
    "Schedule recurring tasks for your AI agents. Pick a template or start from scratch.",
  newAutopilot: "New autopilot",
  startFromScratch: "Start from scratch",
  nameLabel: "Name",
  namePlaceholder: "e.g. Daily code review",
  promptLabel: "Prompt",
  promptPlaceholder: "Step-by-step instructions for the agent...",
  agentLabel: "Agent",
  selectAgentPlaceholder: "Select agent...",
  scheduleLabel: "Schedule",
  cancel: "Cancel",
  creating: "Creating...",
  create: "Create",
  autopilotCreated: "Autopilot created",
  failedToCreateAutopilot: "Failed to create autopilot",
  autopilotCreatedButTriggerFailed:
    "Autopilot created, but trigger failed to save",
  mode: "Mode",
  status: "Status",
  lastRun: "Last run",
  agent: "Agent",
  name: "Name",
  // Agent live card activity area
  agentLiveCard: {
    isWorking: "{name} is working",
    stop: "Stop",
    liveLogNotAvailable: "Live log is not available for this agent provider. Results will appear when the task completes.",
    latest: "Latest",
    expandTranscript: "Expand transcript",
  },
  taskRunHistory: {
    executionHistory: "Execution history ({count})",
    loading: "Loading...",
    noExecutionData: "No execution data recorded.",
    completed: "completed",
    failed: "failed",
  },
  timeline: {
    result: "result: ",
    loadingTranscript: "Loading...",
    noResultsFound: "No results found",
  },
  // Autopilot message template
  autopilotTriggered: "Autopilot run triggered at {time}. After starting work, rename this issue to accurately reflect what you are doing.",
  templates: {
    dailyNewsDigest: "Daily news digest",
    dailyNewsDigestSummary:
      "Search and summarize today's news for the team",
    prReviewReminder: "PR review reminder",
    prReviewReminderSummary:
      "Flag stale pull requests that need review",
    bugTriage: "Bug triage",
    bugTriageSummary: "Assess and prioritize new bug reports",
    weeklyProgressReport: "Weekly progress report",
    weeklyProgressReportSummary:
      "Compile a weekly summary of team progress",
    dependencyAudit: "Dependency audit",
    dependencyAuditSummary:
      "Scan for security vulnerabilities and outdated packages",
    documentationCheck: "Documentation check",
    documentationCheckSummary:
      "Review recent changes for documentation gaps",
  },
};