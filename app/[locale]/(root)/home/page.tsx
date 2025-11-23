import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";

export default async function HomeRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const premiumTable = await fetchPremiumTable(leagueId);
  const tableRows = premiumTable.data.standings.map(toLeagueTableRow);
  const playerRankings = EPL_MOCK_DATA.hub.playerRankings;
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
