import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchPlayerRace } from "@/shared/api/epl/lib/scoring-race";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";
import type { PlayerRanking } from "@/entities/player/model/player-ranking";

export default async function HomeRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const [premiumTable, scoringRace] = await Promise.all([
    fetchPremiumTable(leagueId),
    fetchPlayerRace(leagueId, { limit: 5, category: "goal" }),
  ]);
  console.log(scoringRace);
  const tableRows = premiumTable.data.map(toLeagueTableRow);
  const playerRankings: PlayerRanking[] = scoringRace.data;

  const schedule = EPL_MOCK_DATA.matches.schedule;

  return (
    <EPLHubPage
      tableRows={tableRows}
      playerRankings={playerRankings}
      schedule={schedule}
    />
  );
}
