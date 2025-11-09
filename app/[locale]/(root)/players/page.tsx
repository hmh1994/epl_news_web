import { PlayerDatabasePage } from "@/processes/player-database-page";
import { fetchPlayerDatabase } from "@/shared/api/epl/lib/players";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export default async function PlayerDatabaseRoute() {
  const response = await fetchPlayerDatabase(DEFAULT_LEAGUE_ID);
  return (
    <PlayerDatabasePage
      players={response.data.players}
      positions={response.data.filters.positions}
      teams={response.data.filters.teamIds}
    />
  );
}
