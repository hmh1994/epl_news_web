"use client";

import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import { PremiumEPLTableWidget } from "@/widgets/premium-epl-table/ui/premium-epl-table-widget";

interface PremiumEPLTablePageProps {
  teams: LeagueTableTeam[];
  metrics: SeasonAnalyticsMetric[];
}

export const PremiumEPLTablePage = ({
  teams,
  metrics,
}: PremiumEPLTablePageProps) => {
  return <PremiumEPLTableWidget teams={teams} metrics={metrics} />;
};
