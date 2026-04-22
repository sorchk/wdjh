"use client";

import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import { Skeleton } from "@multica/ui/components/ui/skeleton";
import type { RuntimeUsage } from "@multica/core/types";
import { api } from "@multica/core/api";
import { formatTokens, estimateCost, aggregateByDate } from "../utils";
import { TokenCard } from "./shared";
import {
  ActivityHeatmap,
  HourlyActivityChart,
  DailyTokenChart,
  DailyCostChart,
  ModelDistributionChart,
} from "./charts";
import type { RuntimesDict } from "@/features/dashboard/i18n/types";

export type UsageSectionLocale = Pick<
  RuntimesDict,
  | "activity"
  | "hourlyDistribution"
  | "dailyTokenUsage"
  | "tokenUsageByModel"
  | "less"
  | "more"
  | "noActivity"
  | "noUsageData"
  | "input"
  | "output"
  | "cacheRead"
  | "cacheWrite"
  | "estimatedCost"
  | "date"
  | "model"
  | "total"
>;

const TIME_RANGES = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
] as const;

type TimeRange = (typeof TIME_RANGES)[number]["days"];

export function UsageSection({
  runtimeId,
  locale,
}: {
  runtimeId: string;
  locale: UsageSectionLocale;
}) {
  const [usage, setUsage] = useState<RuntimeUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<TimeRange>(30);

  useEffect(() => {
    setLoading(true);
    api
      .getRuntimeUsage(runtimeId, { days: 90 }) // always fetch 90d, filter client-side
      .then(setUsage)
      .catch(() => setUsage([]))
      .finally(() => setLoading(false));
  }, [runtimeId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-12 rounded-md" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (usage.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-dashed py-6">
        <BarChart3 className="h-5 w-5 text-muted-foreground/40" />
        <p className="mt-2 text-xs text-muted-foreground">{locale.noUsageData}</p>
      </div>
    );
  }

  // Filter by selected time range
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoff = cutoffDate.toISOString().slice(0, 10);
  const filtered = usage.filter((u) => u.date >= cutoff);

  // Compute totals
  const totals = filtered.reduce(
    (acc, u) => ({
      input: acc.input + u.input_tokens,
      output: acc.output + u.output_tokens,
      cacheRead: acc.cacheRead + u.cache_read_tokens,
      cacheWrite: acc.cacheWrite + u.cache_write_tokens,
      cost: acc.cost + estimateCost(u),
    }),
    { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, cost: 0 },
  );

  const { dailyTokens, dailyCost, modelDist } = aggregateByDate(filtered);

  // Group by date for the table
  const byDate = new Map<string, RuntimeUsage[]>();
  for (const u of filtered) {
    const existing = byDate.get(u.date) ?? [];
    existing.push(u);
    byDate.set(u.date, existing);
  }

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex items-center gap-1">
        {TIME_RANGES.map((range) => (
          <button
            key={range.days}
            onClick={() => setDays(range.days)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              days === range.days
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        <TokenCard label={locale.input} value={formatTokens(totals.input)} />
        <TokenCard label={locale.output} value={formatTokens(totals.output)} />
        <TokenCard label={locale.cacheRead} value={formatTokens(totals.cacheRead)} />
        <TokenCard label={locale.cacheWrite} value={formatTokens(totals.cacheWrite)} />
      </div>

      {totals.cost > 0 && (
        <div className="rounded-lg border bg-muted/30 px-3 py-2">
          <span className="text-xs text-muted-foreground">
            {locale.estimatedCost.replace("{days}d", `${days}d`).replace("{days}天", `${days}天`)}{" "}
          </span>
          <span className="text-sm font-semibold">
            ${totals.cost.toFixed(2)}
          </span>
        </div>
      )}

      {/* Heatmap + Hourly */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ActivityHeatmap
          usage={usage}
          locale={{ title: locale.activity, less: locale.less, more: locale.more, noActivity: locale.noActivity }}
        />
        <HourlyActivityChart
          runtimeId={runtimeId}
          locale={{ title: locale.hourlyDistribution, loading: "Loading...", noData: locale.noUsageData }}
        />
      </div>

      {/* Token & Cost charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <DailyTokenChart
          data={dailyTokens}
          locale={{
            title: locale.dailyTokenUsage,
            input: locale.input,
            output: locale.output,
            cacheRead: locale.cacheRead,
            cacheWrite: locale.cacheWrite,
            total: locale.total,
          }}
        />
        <DailyCostChart data={dailyCost} />
      </div>

      <ModelDistributionChart
        data={modelDist}
        locale={{ title: locale.tokenUsageByModel, tokens: locale.total }}
      />

      {/* Daily breakdown table */}
      <div className="rounded-lg border">
        <div className="grid grid-cols-[100px_1fr_80px_80px_80px_80px] gap-2 border-b px-3 py-2 text-xs font-medium text-muted-foreground">
          <div>{locale.date}</div>
          <div>{locale.model}</div>
          <div className="text-right">{locale.input}</div>
          <div className="text-right">{locale.output}</div>
          <div className="text-right">{locale.cacheRead}</div>
          <div className="text-right">{locale.cacheWrite}</div>
        </div>
        <div className="max-h-64 overflow-y-auto divide-y">
          {[...byDate.entries()].map(([date, rows]) =>
            rows.map((row, i) => (
              <div
                key={`${date}-${row.model}-${i}`}
                className="grid grid-cols-[100px_1fr_80px_80px_80px_80px] gap-2 px-3 py-1.5 text-xs"
              >
                <div className="text-muted-foreground">{date}</div>
                <div className="truncate font-mono">{row.model}</div>
                <div className="text-right tabular-nums">
                  {formatTokens(row.input_tokens)}
                </div>
                <div className="text-right tabular-nums">
                  {formatTokens(row.output_tokens)}
                </div>
                <div className="text-right tabular-nums">
                  {formatTokens(row.cache_read_tokens)}
                </div>
                <div className="text-right tabular-nums">
                  {formatTokens(row.cache_write_tokens)}
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
