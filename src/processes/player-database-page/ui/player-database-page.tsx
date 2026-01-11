import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerDatabaseWidget } from "@/widgets/player-database/ui/player-database-widget";

interface PlayerDatabasePageProps {
  players: PlayerDatabaseEntry[];
  positions: readonly string[];
  teams: readonly string[];
  teamNameById?: Record<string, string>;
  initialSearch?: {
    searchTerm?: string;
    position?: string;
    teamId?: string;
    results?: PlayerDatabaseEntry[];
  };
}

export const PlayerDatabasePage = ({
  players,
  positions,
  teams,
  teamNameById,
  initialSearch,
}: PlayerDatabasePageProps) => (
  <PlayerDatabaseWidget
    players={players}
    positions={positions}
    teams={teams}
    teamNameById={teamNameById}
    initialSearch={initialSearch}
  />
);
