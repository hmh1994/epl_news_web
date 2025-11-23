import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchScoringRace } from "@/shared/api/epl/lib/scoring-race";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";

export default async function HomeRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const [premiumTable, scoringRace] = await Promise.all([
    fetchPremiumTable(leagueId),
    fetchScoringRace(leagueId, { limit: 5 }),
  ]);
  const tableRows = premiumTable.data.standings.map(toLeagueTableRow);
  const playerRankings = scoringRace.data;
  const schedule = EPL_MOCK_DATA.matches.schedule;
  const leagueMetrics = EPL_MOCK_DATA.hub.metaMetrics;

  return (
    <EPLHubPage
      tableRows={tableRows}
      playerRankings={playerRankings}
      schedule={schedule}
      leagueMetrics={leagueMetrics}
    />
  );
}
