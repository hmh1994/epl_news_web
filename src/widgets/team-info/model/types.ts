import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";

export type TeamTab = "overview" | "squad" | "stats";
export type SquadSortKey = "number" | "name" | "age" | "value" | "rating";
export type PositionFilter = "all" | "GK" | "DF" | "MF" | "FW";

export type TeamStats = {
  totalPlayers: number;
  avgAge: string;
  foreignPercentage: string;
  foreignPlayers: number;
  avgRating: string;
  totalValue: string;
  totalGoals: number;
  totalAssists: number;
};

export type PositionDistribution = {
  position: string;
  label: string;
  count: number;
  color: string;
  percentage: string;
};

export type FilteredPlayersParams = {
  players: PlayerProfile[];
  team: TeamProfile | null;
  filterPosition: PositionFilter;
  searchTerm: string;
  sortBy: SquadSortKey;
};
