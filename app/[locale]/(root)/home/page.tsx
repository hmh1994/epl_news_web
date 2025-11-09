import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchHubOverview } from "@/shared/api/epl/lib/league";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/matches";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";

export default async function HomeRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const [hubOverview, scheduleResponse] = await Promise.all([
    fetchHubOverview(leagueId),
    fetchMatchSchedule(leagueId),
  ]);

  const tableRows = hubOverview.data.standings.map(toLeagueTableRow);

  return (
    <EPLHubPage
      tableRows={tableRows}
      playerRankings={hubOverview.data.playerRankings}
      schedule={scheduleResponse.data.schedule}
      leagueMetrics={hubOverview.data.leagueMeta}
    />
  );
}
