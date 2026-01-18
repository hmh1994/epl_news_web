import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import { PlayerDatabaseWidget } from "@/widgets/player-database/ui/player-database-widget";

interface PlayerDatabasePageProps {
  players: PlayerDatabaseEntry[];
  positions: readonly string[];
  teams: readonly string[];
  teamNameById?: Record<string, string>;
  rankingData: Record<"goal" | "assist" | "point" | "xg", PlayerRanking[]>;
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
  rankingData,
  initialSearch,
}: PlayerDatabasePageProps) => (
  <PlayerDatabaseWidget
    players={players}
    positions={positions}
    teams={teams}
    teamNameById={teamNameById}
    rankingData={rankingData}
    initialSearch={initialSearch}
  />
);
