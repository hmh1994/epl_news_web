import { EplLeaguePulse } from "@/widgets/epl-hub/season-insights/ui/epl-league-pulse";
import type { LeagueMetaMetric } from "@/shared/api/epl/model/types";
import { useTranslations } from "next-intl";

interface LeagueInsightsSectionProps {
  metrics: LeagueMetaMetric[];
}

export const LeagueInsightsSection = ({
  metrics,
}: LeagueInsightsSectionProps) => {
  const t = useTranslations("home");

  return (
    <section className='mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 xl:px-16'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-white'>
          {t("leagueInsights.title")}
        </h2>
      </div>
      <EplLeaguePulse metrics={metrics} />
    </section>
  );
};
