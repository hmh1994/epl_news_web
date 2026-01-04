"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  RefreshCcw,
  Target,
  Trophy,
} from "lucide-react";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import { ANALYTICS_CARD_STYLES } from "@/widgets/premium-epl-table/model/constants";

interface PremiumTableAnalyticsProps {
  metrics: SeasonAnalyticsMetric[];
}

export const PremiumTableAnalytics = ({
  metrics,
}: PremiumTableAnalyticsProps) => {
  const resolvedMetrics = metrics.length > 0 ? metrics : [];

  const metricStylesByKey = {
    PER_MATCH_XG: {
      ...ANALYTICS_CARD_STYLES[0],
      icon: Trophy,
      iconClass: "text-green-400",
      valueClass: "group-hover:text-green-400",
      deltaClass: "text-green-400",
      progressGradient: "from-green-400 to-emerald-500",
      hoverShadowClass: "hover:shadow-green-400/20",
    },
    PER_MATCH_PASS_ACCURACY: {
      ...ANALYTICS_CARD_STYLES[1],
      icon: BarChart3,
      iconClass: "text-teal-400",
      valueClass: "group-hover:text-teal-400",
      deltaClass: "text-teal-400",
      progressGradient: "from-emerald-400 to-teal-500",
      hoverShadowClass: "hover:shadow-emerald-400/20",
    },
    PER_MATCH_GOALS: {
      ...ANALYTICS_CARD_STYLES[2],
      icon: Target,
      iconClass: "text-emerald-400",
      valueClass: "group-hover:text-emerald-400",
      deltaClass: "text-emerald-400",
      progressGradient: "from-emerald-400 to-teal-500",
      hoverShadowClass: "hover:shadow-emerald-400/20",
    },
    TOTAL_RED_CARDS: {
      ...ANALYTICS_CARD_STYLES[3],
      icon: AlertTriangle,
      iconClass: "text-amber-400",
      valueClass: "group-hover:text-amber-400",
      deltaClass: "text-amber-400",
      progressGradient: "from-amber-400 to-orange-500",
      hoverShadowClass: "hover:shadow-amber-400/20",
    },
    TOTAL_GOALS: {
      ...ANALYTICS_CARD_STYLES[0],
      icon: Trophy,
      iconClass: "text-green-400",
      valueClass: "group-hover:text-green-400",
      deltaClass: "text-green-400",
      progressGradient: "from-green-400 to-emerald-500",
      hoverShadowClass: "hover:shadow-green-400/20",
    },
    PER_MATCH_SUBSTITUTIONS: {
      ...ANALYTICS_CARD_STYLES[1],
      icon: RefreshCcw,
      iconClass: "text-teal-400",
      valueClass: "group-hover:text-teal-400",
      deltaClass: "text-teal-400",
      progressGradient: "from-emerald-400 to-teal-500",
      hoverShadowClass: "hover:shadow-emerald-400/20",
    },
    PER_MATCH_YELLOW_CARDS: {
      ...ANALYTICS_CARD_STYLES[2],
      icon: Activity,
      iconClass: "text-emerald-400",
      valueClass: "group-hover:text-emerald-400",
      deltaClass: "text-emerald-400",
      progressGradient: "from-emerald-400 to-teal-500",
      hoverShadowClass: "hover:shadow-emerald-400/20",
    },
  } as const;

  const metricRanges = {
    PER_MATCH_PASS_ACCURACY: { min: 0, max: 100 },
  } as const;

  const integerOnlyKeys = new Set(["TOTAL_GOALS", "TOTAL_RED_CARDS"]);

  const getMetricStyle = (key: string, index: number) =>
    metricStylesByKey[key as keyof typeof metricStylesByKey] ??
    ANALYTICS_CARD_STYLES[index % ANALYTICS_CARD_STYLES.length];

  const getProgress = (key: string, value: number) => {
    const range = metricRanges[key as keyof typeof metricRanges];
    if (!range) {
      return null;
    }

    const normalized =
      range.max === range.min
        ? 0
        : (value - range.min) / (range.max - range.min);
    return Math.min(Math.max(normalized, 0), 1);
  };

  const formatMetricNumber = (key: string, value: number) => {
    if (integerOnlyKeys.has(key)) {
      return Math.round(value).toString();
    }

    return value.toFixed(2);
  };

  return (
    <div className='mt-20'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-black text-white mb-4'>
          Season Analytics
        </h2>
        <p className='text-slate-400 text-lg'>심층 통계와 성과 지표</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {resolvedMetrics.map((metric, index) => {
          const style = getMetricStyle(metric.key, index);
          const Icon = style.icon;
          const numericValue = Number(metric.value);
          const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
          const numericDelta = Number(metric.delta);
          const safeDelta = Number.isFinite(numericDelta) ? numericDelta : 0;
          const progress = getProgress(metric.key, safeValue);

          return (
            <div
              key={`${metric.id}-${index}`}
              className={`group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl ${style.hoverShadowClass} hover:-translate-y-2 transition-all duration-500`}
            >
              <div className='flex items-center justify-between mb-6'>
                <Icon
                  className={`w-12 h-12 ${style.iconClass} group-hover:scale-110 transition-transform`}
                />
                <div className='text-right'>
                  <div
                    className={`text-3xl font-black text-white transition-colors ${style.valueClass}`}
                  >
                    {formatMetricNumber(metric.key, safeValue)}
                  </div>
                  <div className={`${style.deltaClass} text-sm font-semibold`}>
                    {formatMetricNumber(metric.key, safeDelta)}%
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>{metric.title}</div>
                <div className='text-slate-500 text-sm'>
                  {metric.description ?? "시즌 기준 핵심 지표"}
                </div>
                {progress !== null && (
                  <div className='w-full bg-slate-700 rounded-full h-2'>
                    <div
                      className={`bg-gradient-to-r ${style.progressGradient} h-2 rounded-full`}
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
