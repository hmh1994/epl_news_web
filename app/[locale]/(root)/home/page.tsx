import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchPlayerRace } from "@/shared/api/epl/lib/scoring-race";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/match-schedule";
import { fetchSeasonAnalytics } from "@/shared/api/epl/lib/season-analytics";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";
import type { PlayerRanking } from "@/entities/player/model/player-ranking";

export default async function HomeRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const [premiumTable, scoringRace, matchSchedule, seasonAnalytics] =
    await Promise.all([
      fetchPremiumTable(leagueId),
      fetchPlayerRace(leagueId, { limit: 5, category: "goal" }),
      fetchMatchSchedule(leagueId),
      fetchSeasonAnalytics(leagueId),
    ]);
  const tableRows = premiumTable.data.map(toLeagueTableRow);
  const playerRankings: PlayerRanking[] = scoringRace.data;
  const schedule = matchSchedule.data.schedule;
  const seasonMetrics = seasonAnalytics.data;

  return (
    <EPLHubPage
      tableRows={tableRows}
      playerRankings={playerRankings}
      schedule={schedule}
      seasonMetrics={seasonMetrics}
    />
  );
}
