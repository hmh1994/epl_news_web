"use client";

import { ComponentType } from "react";
import { Calendar, Shield, Square, Target, Trophy } from "lucide-react";

type LeagueMetric = {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
};

const LEAGUE_METRICS: LeagueMetric[] = [
  {
    id: "total-goals",
    label: "시즌 총 골",
    value: "1,026",
    description: "지난 시즌 대비 +12%",
    icon: Trophy,
  },
  {
    id: "avg-goals",
    label: "경기당 평균 골",
    value: "2.7",
    description: "공격적인 흐름이 이어지고 있어요",
    icon: Target,
  },
  {
    id: "fouls",
    label: "누적 파울",
    value: "1,184",
    description: "경기당 평균 15.6회",
    icon: Shield,
  },
  {
    id: "cards",
    label: "옐로/레드 카드",
    value: "142",
    description: "경고 134회 · 퇴장 8회",
    icon: Square,
  },
  {
    id: "matches",
    label: "치른 경기 수",
    value: "372",
    description: "정규 시즌 380경기 중",
    icon: Calendar,
  },
];

export const EplLeaguePulse = () => {
  return (
    <section className='rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-2xl'>
      <header className='mb-8 flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold text-white'>리그 핵심 지표</h2>
        <p className='text-sm text-slate-400'>
          한눈에 보는 프리미어리그 시즌 트렌드
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {LEAGUE_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.id}
              className='group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-emerald-500/10'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#169976] via-emerald-500 to-teal-500 text-white shadow-xl'>
                <Icon className='h-6 w-6' />
              </div>
              <div className='min-w-0'>
                <div className='text-xl font-bold text-white'>{metric.value}</div>
                <div className='text-sm font-medium text-slate-300'>
                  {metric.label}
                </div>
                {metric.description && (
                  <p className='mt-1 text-xs text-slate-500'>{metric.description}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
