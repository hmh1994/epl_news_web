import { LeagueOverviewPage } from "@/processes/league-overview-page";
import type { LeagueEntry } from "@/widgets/league-overview/model/types";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

export default async function LeagueOverviewRoute() {
  const summary = Object.values(EPL_MOCK_DATA.league.summaries)[0];
  const entries: LeagueEntry[] = [["EPL", summary]];

  return (
    <LeagueOverviewPage
      entries={entries}
      stats={EPL_MOCK_DATA.league.stats}
      champions={EPL_MOCK_DATA.league.champions}
      clubs={EPL_MOCK_DATA.league.topClubs}
    />
  );
}
