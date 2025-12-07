import { PlayerDatabasePage } from "@/processes/player-database-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

export default async function PlayerDatabaseRoute() {
  const { database, positions, teamOptions } = EPL_MOCK_DATA.players;
  return (
    <PlayerDatabasePage
      players={database}
      positions={positions as unknown as string[]}
      teams={teamOptions as unknown as string[]}
    />
  );
}
