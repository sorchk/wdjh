"use client";

import {
  PROJECT_STATUS_ORDER,
  PROJECT_PRIORITY_ORDER,
} from "@multica/core/projects/config";
import type { ProjectStatus, ProjectPriority } from "@multica/core/types";
import { useLocale } from "@/features/dashboard/i18n";

export function useProjectStatusConfig() {
  const { t } = useLocale();

  const statusConfig: Record<
    ProjectStatus,
    { label: string; color: string; dotColor: string; badgeBg: string; badgeText: string }
  > = {
    planned: {
      label: t.projects.projectStatusPlanned,
      color: "text-muted-foreground",
      dotColor: "bg-muted-foreground",
      badgeBg: "bg-muted",
      badgeText: "text-muted-foreground",
    },
    in_progress: {
      label: t.projects.projectStatusInProgress,
      color: "text-warning",
      dotColor: "bg-warning",
      badgeBg: "bg-warning",
      badgeText: "text-white",
    },
    paused: {
      label: t.projects.projectStatusPaused,
      color: "text-muted-foreground",
      dotColor: "bg-muted-foreground",
      badgeBg: "bg-muted",
      badgeText: "text-muted-foreground",
    },
    completed: {
      label: t.projects.projectStatusCompleted,
      color: "text-info",
      dotColor: "bg-info",
      badgeBg: "bg-info",
      badgeText: "text-white",
    },
    cancelled: {
      label: t.projects.projectStatusCancelled,
      color: "text-destructive",
      dotColor: "bg-destructive",
      badgeBg: "bg-muted",
      badgeText: "text-muted-foreground",
    },
  };

  return { statusConfig, statusOrder: PROJECT_STATUS_ORDER };
}

export function useProjectPriorityConfig() {
  const { t } = useLocale();

  const priorityConfig: Record<
    ProjectPriority,
    { label: string; bars: number; color: string; badgeBg: string; badgeText: string }
  > = {
    urgent: {
      label: t.projects.projectPriorityUrgent,
      bars: 4,
      color: "text-destructive",
      badgeBg: "bg-priority",
      badgeText: "text-white",
    },
    high: {
      label: t.projects.projectPriorityHigh,
      bars: 3,
      color: "text-warning",
      badgeBg: "bg-priority/80",
      badgeText: "text-white",
    },
    medium: {
      label: t.projects.projectPriorityMedium,
      bars: 2,
      color: "text-warning",
      badgeBg: "bg-priority/15",
      badgeText: "text-priority",
    },
    low: {
      label: t.projects.projectPriorityLow,
      bars: 1,
      color: "text-info",
      badgeBg: "bg-priority/10",
      badgeText: "text-priority",
    },
    none: {
      label: t.projects.projectPriorityNone,
      bars: 0,
      color: "text-muted-foreground",
      badgeBg: "bg-muted",
      badgeText: "text-muted-foreground",
    },
  };

  return { priorityConfig, priorityOrder: PROJECT_PRIORITY_ORDER };
}
