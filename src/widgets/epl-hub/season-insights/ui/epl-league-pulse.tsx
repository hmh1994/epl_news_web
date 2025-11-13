"use client";

import { ComponentType, useCallback, useMemo } from "react";
import { Calendar, Shield, Square, Target, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LeagueMetaMetric } from "@/shared/api/epl/model/types";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  target: Target,
  shield: Shield,
  square: Square,
  calendar: Calendar,
};

type LocalizableMetric = LeagueMetaMetric & {
  translationKey?: string;
};

const FALLBACK_METRICS: Array<
  Omit<LocalizableMetric, "label" | "description">
> = [
  {
    id: "total-goals",
    value: "1,026",
    icon: "trophy",
    translationKey: "totalGoals",
  },
  {
    id: "avg-goals",
    value: "2.7",
    icon: "target",
    translationKey: "avgGoals",
  },
  {
    id: "fouls",
    value: "1,184",
    icon: "shield",
    translationKey: "fouls",
  },
  {
    id: "cards",
    value: "142",
    icon: "square",
    translationKey: "cards",
  },
  {
    id: "matches",
    value: "372",
    icon: "calendar",
    translationKey: "matches",
  },
];

const TRANSLATION_KEY_BY_ID = FALLBACK_METRICS.reduce<Record<string, string>>(
  (result, metric) => {
    if (metric.translationKey) {
      result[metric.id] = metric.translationKey;
    }
    return result;
  },
  {}
);

interface EplLeaguePulseProps {
  metrics: LeagueMetaMetric[];
}

export const EplLeaguePulse = ({ metrics }: EplLeaguePulseProps) => {
  const t = useTranslations("home.leagueInsights");

  const localizeMetric = useCallback(
    (metric: LocalizableMetric) => {
      const translationKey =
        metric.translationKey ?? TRANSLATION_KEY_BY_ID[metric.id];

      if (!translationKey) {
        return metric;
      }

      const localizedLabel = t(`fallbackMetrics.${translationKey}.label`);
      const localizedDescription = t(
        `fallbackMetrics.${translationKey}.description`
      );

      return {
        ...metric,
        translationKey,
        label: localizedLabel,
        description: metric.description ?? localizedDescription,
      };
    },
    [t]
  );

  const localizedFallbackMetrics = useMemo(() => {
    return FALLBACK_METRICS.map((metric) =>
      localizeMetric(metric as LocalizableMetric)
    );
  }, [localizeMetric]);

  const displayMetrics = useMemo(() => {
    const source =
      metrics.length > 0 ? metrics : localizedFallbackMetrics;

    return source.map((metric) => {
      const localizedMetric = localizeMetric(metric as LocalizableMetric);
      const iconKey = (localizedMetric.icon ?? "trophy") as keyof typeof ICON_MAP;
      const Icon = ICON_MAP[iconKey] ?? Trophy;

      return { metric: localizedMetric, Icon };
    });
  }, [metrics, localizedFallbackMetrics, localizeMetric]);

  return (
    <section className='rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-2xl'>
      <header className='mb-8 flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold text-white'>
          {t("cardTitle", { defaultValue: t("title") })}
        </h2>
        <p className='text-sm text-slate-400'>{t("description")}</p>
      </header>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {displayMetrics.map(({ metric, Icon }) => {
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
