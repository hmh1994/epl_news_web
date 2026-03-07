"use client";

import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import type { PointsRaceTeam } from "@/shared/api/epl/lib/points-race";
import { PremiumEPLTableWidget } from "@/widgets/premium-epl-table/ui/premium-epl-table-widget";

interface PremiumEPLTablePageProps {
  teams: LeagueTableTeam[];
  metrics: SeasonAnalyticsMetric[];
  pointsRace: PointsRaceTeam[];
}

export const PremiumEPLTablePage = ({
  teams,
  metrics,
  pointsRace,
}: PremiumEPLTablePageProps) => {
  return (
    <PremiumEPLTableWidget
      teams={teams}
      metrics={metrics}
      pointsRace={pointsRace}
    />
  );
};
