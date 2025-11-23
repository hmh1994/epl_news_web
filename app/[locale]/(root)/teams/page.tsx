import { PremiumEPLTablePage } from "@/processes/premium-epl-table-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchSeasonAnalytics } from "@/shared/api/epl/lib/season-analytics";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableTeam } from "@/shared/lib/mappers/league";

export default async function PremiumEPLTableRoute() {
  const [tableResponse, analyticsResponse] = await Promise.all([
    fetchPremiumTable(DEFAULT_LEAGUE_ID),
    fetchSeasonAnalytics(DEFAULT_LEAGUE_ID),
  ]);

  const teams = tableResponse.data.standings.map(toLeagueTableTeam);
  const metrics = analyticsResponse.data.metrics;

  return <PremiumEPLTablePage teams={teams} metrics={metrics} />;
}
