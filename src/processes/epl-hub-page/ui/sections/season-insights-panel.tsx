"use client";

import { useTranslations } from "next-intl";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";

interface SeasonInsightsPanelProps {
  metrics: SeasonAnalyticsMetric[];
}

const formatDelta = (delta: string | number): string => {
  if (typeof delta === "number") {
    const fixed = delta.toFixed(2);
    return delta > 0 ? `+${fixed}` : fixed;
  }
  return delta;
};

const deltaColor = (delta: string | number) => {
  const s = typeof delta === "number" ? delta : String(delta);
  if (typeof s === "number") return s > 0 ? "text-emerald-400" : s < 0 ? "text-rose-400" : "text-slate-400";
  if (s.startsWith("+")) return "text-emerald-400";
  if (s.startsWith("-")) return "text-rose-400";
  return "text-slate-400";
};

export const SeasonInsightsPanel = ({ metrics }: SeasonInsightsPanelProps) => {
  const t = useTranslations("home.leagueInsights");

  return (
    <div className='rounded-2xl border border-white/10 bg-slate-950/60 shadow-lg'>
      <div className='border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4'>
        <h3 className='text-sm font-semibold text-white sm:text-base'>
          {t("title")}
        </h3>
        <p className='text-xs text-slate-400'>{t("description")}</p>
      </div>
      <div className='divide-y divide-white/5'>
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className='flex items-center justify-between px-4 py-3 sm:px-6'
          >
            <div className='min-w-0'>
              <p className='text-xs text-slate-400'>{metric.title}</p>
              {metric.description && (
                <p className='text-[10px] text-slate-500'>{metric.description}</p>
              )}
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <span className='text-sm font-bold text-white'>{metric.value}</span>
              <span className={`text-[11px] font-semibold ${deltaColor(metric.delta)}`}>
                {formatDelta(metric.delta)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
