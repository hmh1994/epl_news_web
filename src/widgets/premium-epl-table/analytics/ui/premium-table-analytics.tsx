"use client";

import React from "react";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import { ANALYTICS_CARD_STYLES } from "@/widgets/premium-epl-table/model/constants";

interface PremiumTableAnalyticsProps {
  metrics: SeasonAnalyticsMetric[];
}

const FALLBACK_METRICS: SeasonAnalyticsMetric[] = [
  {
    id: "total-goals",
    title: "Total Goals",
    value: "1,213",
    delta: "+8.2%",
    description: "시즌 총 득점수",
  },
  {
    id: "goals-per-match",
    title: "Goals per Match",
    value: "3.19",
    delta: "+5.1%",
    description: "경기당 평균 골",
  },
  {
    id: "pass-accuracy",
    title: "Pass Accuracy",
    value: "82.4%",
    delta: "+2.8%",
    description: "평균 패스 성공률",
  },
  {
    id: "clean-sheets",
    title: "Clean Sheets",
    value: "216",
    delta: "+12.3%",
    description: "시즌 총 클린시트",
  },
];

export const PremiumTableAnalytics = ({
  metrics,
}: PremiumTableAnalyticsProps) => {
  const resolvedMetrics =
    metrics.length > 0 ? metrics : FALLBACK_METRICS;

  return (
    <div className='mt-20'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-black text-white mb-4'>Season Analytics</h2>
        <p className='text-slate-400 text-lg'>심층 통계와 성과 지표</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {resolvedMetrics.map((metric, index) => {
          const style =
            ANALYTICS_CARD_STYLES[index % ANALYTICS_CARD_STYLES.length];
          const Icon = style.icon;
          const progress = Math.min(Math.max(0.65 + index * 0.08, 0), 1);

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
                    {metric.value}
                  </div>
                  <div className={`${style.deltaClass} text-sm font-semibold`}>
                    {metric.delta}
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>{metric.title}</div>
                <div className='text-slate-500 text-sm'>
                  {metric.description ?? "시즌 기준 핵심 지표"}
                </div>
                <div className='w-full bg-slate-700 rounded-full h-2'>
                  <div
                    className={`bg-gradient-to-r ${style.progressGradient} h-2 rounded-full`}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
