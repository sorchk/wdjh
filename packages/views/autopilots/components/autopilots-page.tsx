"use client";

import { useState } from "react";
import { Plus, Zap, Play, Pause, AlertCircle, Newspaper, GitPullRequest, Bug, BarChart3, Shield, FileSearch, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { autopilotListOptions } from "@multica/core/autopilots/queries";
import {
  useCreateAutopilot,
  useCreateAutopilotTrigger,
  useDeleteAutopilot,
} from "@multica/core/autopilots/mutations";
import { useWorkspaceId } from "@multica/core/hooks";
import { useWorkspacePaths } from "@multica/core/paths";
import { useActorName } from "@multica/core/workspace/hooks";
import { agentListOptions } from "@multica/core/workspace/queries";
import { AppLink } from "../../navigation";
import { ActorAvatar } from "../../common/actor-avatar";
import { PageHeader } from "../../layout/page-header";
import { Skeleton } from "@multica/ui/components/ui/skeleton";
import { Button } from "@multica/ui/components/ui/button";
import { cn } from "@multica/ui/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@multica/ui/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@multica/ui/components/ui/select";
import { useLocale } from "@/features/dashboard/i18n";
import { AutopilotDialog } from "./autopilot-dialog";
import type { Autopilot } from "@multica/core/types";
import type { TriggerFrequency, TriggerConfig } from "./trigger-config";
import { getDefaultTriggerConfig, toCronExpression, TriggerConfigSection } from "./trigger-config";

interface AutopilotTemplate {
  key: string;
  title: string;
  prompt: string;
  summary: string;
  icon: typeof Zap;
  frequency: TriggerFrequency;
  time: string;
}

const TEMPLATES: AutopilotTemplate[] = [
  {
    key: "dailyNewsDigest",
    title: "Daily news digest",
    summary: "Search and summarize today's news for the team",
    prompt: `1. Search the web for news and announcements published today only (strictly today's date)
2. Filter for topics relevant to our team and industry
3. For each item, write a short summary including: title, source, key takeaways
4. Compile everything into a single digest post
5. Post the digest as a comment on this issue and @mention all workspace members`,
    icon: Newspaper,
    frequency: "daily",
    time: "09:00",
  },
  {
    key: "prReviewReminder",
    title: "PR review reminder",
    summary: "Flag stale pull requests that need review",
    prompt: `1. List all open pull requests in the repository
2. Identify PRs that have been open for more than 24 hours without a review
3. For each stale PR, note the author, age, and a one-line summary of the change
4. Post a comment on this issue listing all stale PRs with links
5. @mention the team to remind them to review`,
    icon: GitPullRequest,
    frequency: "weekdays",
    time: "10:00",
  },
  {
    key: "bugTriage",
    title: "Bug triage",
    summary: "Assess and prioritize new bug reports",
    prompt: `1. List all issues with status "triage" or "backlog" that have not been prioritized
2. For each issue, read the description and any attached logs or screenshots
3. Assess severity (critical / high / medium / low) based on user impact and scope
4. Set the priority field on the issue accordingly
5. Add a comment explaining your assessment and suggested next steps`,
    icon: Bug,
    frequency: "weekdays",
    time: "09:00",
  },
  {
    key: "weeklyProgressReport",
    title: "Weekly progress report",
    summary: "Compile a weekly summary of team progress",
    prompt: `1. Gather all issues completed (status "done") in the past 7 days
2. Gather all issues currently in progress
3. Identify any blocked issues and their blockers
4. Calculate key metrics: issues closed, issues opened, net change
5. Write a structured weekly report with sections: Completed, In Progress, Blocked, Metrics
6. Post the report as a comment on this issue`,
    icon: BarChart3,
    frequency: "weekly",
    time: "17:00",
  },
  {
    key: "dependencyAudit",
    title: "Dependency audit",
    summary: "Scan for security vulnerabilities and outdated packages",
    prompt: `1. Run dependency audit tools on the project (npm audit, go vuln check, etc.)
2. Identify any packages with known security vulnerabilities
3. List outdated packages that are more than 2 major versions behind
4. For each finding, note the severity, affected package, and recommended fix
5. Post a summary report as a comment with actionable items`,
    icon: Shield,
    frequency: "weekly",
    time: "08:00",
  },
  {
    key: "documentationCheck",
    title: "Documentation check",
    summary: "Review recent changes for documentation gaps",
    prompt: `1. List all code changes merged in the past 7 days (via git log)
2. For each significant change, check if related documentation was updated
3. Identify any new APIs, config options, or features missing documentation
4. Create a list of documentation gaps with file paths and suggested content
5. Post the findings as a comment on this issue`,
    icon: FileSearch,
    frequency: "weekly",
    time: "14:00",
  },
];

function formatRelativeDate(date: string, i18n: { today: string; daysAgo: string; monthsAgo: string }): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return i18n.today;
  if (days === 1) return `1${i18n.daysAgo}`;
  if (days < 30) return `${days}${i18n.daysAgo}`;
  const months = Math.floor(days / 30);
  return `${months}${i18n.monthsAgo}`;
}

function getStatusConfig(status: string, i18n: { statusActive: string; statusPaused: string; statusArchived: string }): { label: string; color: string; icon: typeof CheckCircle2 } {
  const configs: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
    active: { label: i18n.statusActive, color: "text-emerald-500", icon: CheckCircle2 },
    paused: { label: i18n.statusPaused, color: "text-amber-500", icon: Pause },
    archived: { label: i18n.statusArchived, color: "text-muted-foreground", icon: AlertCircle },
  };
  return configs[status] ?? { label: status, color: "text-muted-foreground", icon: AlertCircle };
}

function getExecutionModeLabel(mode: string, i18n: { modeCreateIssue: string; modeRunOnly: string }): string {
  const configs: Record<string, string> = {
    create_issue: i18n.modeCreateIssue,
    run_only: i18n.modeRunOnly,
  };
  return configs[mode] ?? mode;
}

function AutopilotRow({ autopilot, i18n }: { autopilot: Autopilot; i18n: { autopilots: { modeCreateIssue: string; modeRunOnly: string; statusActive: string; statusPaused: string; statusArchived: string; today: string; daysAgo: string; monthsAgo: string; lastRun: string; mode: string; status: string; agent: string; name: string; unknownAgent: string } } }) {
  const { getActorName } = useActorName();
  const wsPaths = useWorkspacePaths();
  const statusCfg = getStatusConfig(autopilot.status, i18n.autopilots);
  const StatusIcon = statusCfg.icon;

  return (
    <div className="group/row flex h-11 items-center gap-2 px-5 text-sm transition-colors hover:bg-accent/40">
      <AppLink
        href={wsPaths.autopilotDetail(autopilot.id)}
        className="flex min-w-0 flex-1 items-center gap-2"
      >
        <Zap className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate font-medium">{autopilot.title}</span>
      </AppLink>

      {/* Agent */}
      <span className="flex w-32 items-center gap-1.5 shrink-0">
        <ActorAvatar actorType="agent" actorId={autopilot.assignee_id} size={18} />
        <span className="truncate text-xs text-muted-foreground">
          {getActorName("agent", autopilot.assignee_id) || i18n.autopilots.unknownAgent}
        </span>
      </span>

      {/* Mode */}
      <span className="w-24 shrink-0 text-center text-xs text-muted-foreground">
        {getExecutionModeLabel(autopilot.execution_mode, i18n.autopilots)}
      </span>

      {/* Status */}
      <span className={cn("flex w-20 items-center justify-center gap-1 shrink-0 text-xs", statusCfg.color)}>
        <StatusIcon className="h-3 w-3" />
        {statusCfg.label}
      </span>

      {/* Last run */}
      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
        {autopilot.last_run_at ? formatRelativeDate(autopilot.last_run_at, i18n.autopilots) : "--"}
      </span>
    </div>
  );
}

function CreateAutopilotDialog({
  open,
  onOpenChange,
  template,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: AutopilotTemplate | null;
}) {
  const { t: i18n } = useLocale();
  const wsId = useWorkspaceId();
  const { data: agents = [] } = useQuery(agentListOptions(wsId));
  const createAutopilot = useCreateAutopilot();
  const createTrigger = useCreateAutopilotTrigger();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [triggerConfig, setTriggerConfig] = useState<TriggerConfig>(getDefaultTriggerConfig);
  const [submitting, setSubmitting] = useState(false);

  // Apply template when it changes
  const [appliedTemplate, setAppliedTemplate] = useState<AutopilotTemplate | null | undefined>(null);
  if (template !== appliedTemplate && open) {
    setAppliedTemplate(template);
    if (template) {
      setTitle(template.title);
      setDescription(template.prompt);
      setTriggerConfig({
        ...getDefaultTriggerConfig(),
        frequency: template.frequency,
        time: template.time,
      });
    }
  }

  const activeAgents = agents.filter((a) => !a.archived_at);

  const handleSubmit = async () => {
    if (!title.trim() || !assigneeId || submitting) return;
    setSubmitting(true);
    try {
      const autopilot = await createAutopilot.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        assignee_id: assigneeId,
        execution_mode: "create_issue",
      });

      // Attach schedule trigger
      try {
        await createTrigger.mutateAsync({
          autopilotId: autopilot.id,
          kind: "schedule",
          cron_expression: toCronExpression(triggerConfig),
          timezone: triggerConfig.timezone,
        });
      } catch {
        toast.error(i18n.autopilots.autopilotCreatedButTriggerFailed);
      }

      onOpenChange(false);
      setTitle("");
      setDescription("");
      setAssigneeId("");
      setTriggerConfig(getDefaultTriggerConfig());
      toast.success(i18n.autopilots.autopilotCreated);
    } catch {
      toast.error(i18n.autopilots.failedToCreateAutopilot);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle>{i18n.autopilots.newAutopilot}</DialogTitle>
        <div className="space-y-5 pt-2">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">{i18n.autopilots.nameLabel}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={i18n.autopilots.namePlaceholder}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              autoFocus
            />
          </div>

          {/* Prompt */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">{i18n.autopilots.promptLabel}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={i18n.autopilots.promptPlaceholder}
              rows={6}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring resize-y"
            />
          </div>

          {/* Agent */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">{i18n.autopilots.agentLabel}</label>
            <Select value={assigneeId} onValueChange={(v) => v && setAssigneeId(v)}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue>
                  {(value: string | null) => {
                    if (!value) return i18n.autopilots.selectAgentPlaceholder;
                    const agent = activeAgents.find((a) => a.id === value);
                    return agent?.name ?? "Unknown Agent";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {activeAgents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">{i18n.autopilots.scheduleLabel}</label>
            <div className="mt-2">
              <TriggerConfigSection
                config={triggerConfig}
                onChange={setTriggerConfig}
                i18n={{
                  hourly: i18n.autopilots.hourly,
                  daily: i18n.autopilots.daily,
                  weekdays: i18n.autopilots.weekdays,
                  weekly: i18n.autopilots.weekly,
                  custom: i18n.autopilots.custom,
                  frequencyLabel: i18n.autopilots.frequencyLabel,
                  cronExpressionLabel: i18n.autopilots.cronExpressionLabel,
                  cronExpressionPlaceholder: i18n.autopilots.cronExpressionPlaceholder,
                  cronExpressionHelp: i18n.autopilots.cronExpressionHelp,
                  minuteLabel: i18n.autopilots.minuteLabel,
                  timeLabel: i18n.autopilots.timeLabel,
                  timezoneLabel: i18n.autopilots.timezoneLabel,
                  daysLabel: i18n.autopilots.daysLabel,
                  daysOfWeek: i18n.autopilots.daysOfWeek,
                  runsEveryHourAt: i18n.autopilots.runsEveryHourAt,
                  runsDailyAt: i18n.autopilots.runsDailyAt,
                  runsWeekdaysAt: i18n.autopilots.runsWeekdaysAt,
                  runsWeeklyAt: i18n.autopilots.runsWeeklyAt,
                  runsCustomSchedule: i18n.autopilots.runsCustomSchedule,
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
              {i18n.autopilots.cancel}
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={!title.trim() || !assigneeId || submitting}>
              {submitting ? i18n.autopilots.creating : i18n.autopilots.create}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AutopilotsPage() {
  const { t: i18n } = useLocale();
  const wsId = useWorkspaceId();
  const { data: autopilots = [], isLoading } = useQuery(autopilotListOptions(wsId));
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<AutopilotTemplate | null>(null);

  const openCreate = (template?: AutopilotTemplate) => {
    setSelectedTemplate(template ?? null);
    setCreateOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <PageHeader className="justify-between px-5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <h1 className="text-sm font-medium">{i18n.autopilots.autopilot}</h1>
          {!isLoading && autopilots.length > 0 && (
            <span className="text-xs text-muted-foreground tabular-nums">{autopilots.length}</span>
          )}
        </div>
        <Button size="sm" variant="outline" onClick={() => openCreate()}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          {i18n.autopilots.newAutopilot}
        </Button>
      </PageHeader>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <>
            <div className="sticky top-0 z-[1] flex h-8 items-center gap-2 border-b bg-muted/30 px-5">
              <span className="shrink-0 w-4" />
              <Skeleton className="h-3 w-12 flex-1 max-w-[48px]" />
              <Skeleton className="h-3 w-12 shrink-0" />
              <Skeleton className="h-3 w-10 shrink-0" />
              <Skeleton className="h-3 w-10 shrink-0" />
              <Skeleton className="h-3 w-12 shrink-0" />
            </div>
            <div className="p-5 pt-1 space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full" />
              ))}
            </div>
          </>
        ) : autopilots.length === 0 ? (
          <div className="flex flex-col items-center py-16 px-5">
            <Zap className="h-10 w-10 mb-3 text-muted-foreground opacity-30" />
            <p className="text-sm text-muted-foreground">{i18n.autopilots.noAutopilotsYet}</p>
            <p className="text-xs text-muted-foreground mt-1 mb-6">
              {i18n.autopilots.scheduleDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-3xl">
              {TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                const key = tpl.key as keyof typeof i18n.autopilots.templates;
                const title = i18n.autopilots.templates[key];
                const summaryKey = `${key}Summary` as keyof typeof i18n.autopilots.templates;
                const summary = i18n.autopilots.templates[summaryKey];
                return (
                  <button
                    key={tpl.title}
                    type="button"
                    className="flex items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent/40"
                    onClick={() => openCreate(tpl)}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{summary}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => openCreate()}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              {i18n.autopilots.startFromScratch}
            </Button>
          </div>
        ) : (
          <>
            {/* Column headers */}
            <div className="sticky top-0 z-[1] flex h-8 items-center gap-2 border-b bg-muted/30 px-5 text-xs font-medium text-muted-foreground">
              <span className="shrink-0 w-4" />
              <span className="min-w-0 flex-1">{i18n.autopilots.name}</span>
              <span className="w-32 shrink-0">{i18n.autopilots.agent}</span>
              <span className="w-24 text-center shrink-0">{i18n.autopilots.mode}</span>
              <span className="w-20 text-center shrink-0">{i18n.autopilots.status}</span>
              <span className="w-20 text-right shrink-0">{i18n.autopilots.lastRun}</span>
            </div>
            {autopilots.map((autopilot) => (
              <AutopilotRow key={autopilot.id} autopilot={autopilot} i18n={i18n} />
            ))}
          </>
        )}
      </div>

      <CreateAutopilotDialog open={createOpen} onOpenChange={setCreateOpen} template={selectedTemplate} />
    </div>
  );
}
