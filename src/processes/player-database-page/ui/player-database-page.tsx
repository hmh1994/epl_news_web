import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerDatabaseWidget } from "@/widgets/player-database/ui/player-database-widget";

interface PlayerDatabasePageProps {
  players: PlayerDatabaseEntry[];
  positions: readonly string[];
  teams: readonly string[];
}

export const PlayerDatabasePage = ({
  players,
  positions,
  teams,
}: PlayerDatabasePageProps) => (
  <PlayerDatabaseWidget players={players} positions={positions} teams={teams} />
);
