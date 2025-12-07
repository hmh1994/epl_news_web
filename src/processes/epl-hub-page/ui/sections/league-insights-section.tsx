import Link from "next/link";
import { EplLeaguePulse } from "@/widgets/epl-hub/season-insights/ui/epl-league-pulse";
import type { LeagueMetaMetric } from "@/shared/api/epl/model/types";
import { useTranslations } from "next-intl";

interface LeagueInsightsSectionProps {
  basePath: string;
  metrics: LeagueMetaMetric[];
}

export const LeagueInsightsSection = ({
  basePath,
  metrics,
}: LeagueInsightsSectionProps) => {
  const t = useTranslations("home");

  return (
    <section className='mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 xl:px-16'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-white'>
          {t("leagueInsights.title")}
        </h2>
        <Link
          href={`${basePath}/league`}
          className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
        >
          {t("leagueInsights.viewAll")}
        </Link>
      </div>
      <EplLeaguePulse metrics={metrics} />
    </section>
  );
};
