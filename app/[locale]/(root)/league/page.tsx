import { LeagueOverviewPage } from "@/processes/league-overview-page";
import type { LeagueEntry } from "@/widgets/league-overview/model/types";
import { fetchLeagueMetadata } from "@/shared/api/epl/lib/league";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export default async function LeagueOverviewRoute() {
  const response = await fetchLeagueMetadata(DEFAULT_LEAGUE_ID);
  const entries: LeagueEntry[] = [["EPL", response.data.summary]];

  return (
    <LeagueOverviewPage
      entries={entries}
      stats={response.data.overviewStats}
      champions={response.data.champions}
      clubs={response.data.successfulClubs}
    />
  );
}
