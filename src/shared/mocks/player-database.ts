import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import {
  MOCK_PLAYERS,
  PLAYER_POSITIONS,
  PLAYER_TEAMS,
} from "@/shared/mocks/data/players";

export const PLAYER_DATABASE: PlayerDatabaseEntry[] = MOCK_PLAYERS.map((player) => ({
  ...player,
  career: player.career.map((period) => ({ ...period })),
}));

export { PLAYER_POSITIONS, PLAYER_TEAMS };
