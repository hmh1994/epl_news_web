import { PlayerDatabaseWidget } from "@/widgets/player-database/ui/player-database-widget";
import {
  PLAYER_DATABASE,
  PLAYER_POSITIONS,
  PLAYER_TEAMS,
} from "@/shared/mocks/player-database";

export const PlayerDatabasePage = () => {
  return (
    <PlayerDatabaseWidget
      players={PLAYER_DATABASE}
      positions={PLAYER_POSITIONS}
      teams={PLAYER_TEAMS}
    />
  );
};
