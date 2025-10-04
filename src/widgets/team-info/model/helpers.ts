import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import {
  FilteredPlayersParams,
  PositionDistribution,
  PositionFilter,
  SquadSortKey,
  TeamStats,
} from "./types";

const POSITION_GROUPS: Record<Exclude<PositionFilter, "all">, string[]> = {
  GK: ["GK"],
  DF: ["CB", "LB", "RB", "LWB", "RWB"],
  MF: ["CDM", "CM", "CAM", "LM", "RM"],
  FW: ["ST", "CF", "LW", "RW"],
};

const SQUAD_SORTERS: Record<
  SquadSortKey,
  (a: PlayerProfile, b: PlayerProfile) => number
> = {
  number: (a, b) => a.number - b.number,
  name: (a, b) => a.name.localeCompare(b.name),
  age: (a, b) => a.age - b.age,
  value: (a, b) => b.marketValue - a.marketValue,
  rating: (a, b) => b.rating - a.rating,
};

export const filterPlayers = ({
  players,
  team,
  filterPosition,
  searchTerm,
  sortBy,
}: FilteredPlayersParams): PlayerProfile[] => {
  if (!team) return [];

  const onTeam = players.filter((player) => player.teamId === team.id);

  const byPosition =
    filterPosition === "all"
      ? onTeam
      : onTeam.filter((player) =>
          POSITION_GROUPS[filterPosition].some((code) =>
            player.position.includes(code)
          )
        );

  const lowerTerm = searchTerm.toLowerCase();

  const bySearch = lowerTerm
    ? byPosition.filter((player) =>
        player.name.toLowerCase().includes(lowerTerm)
      )
    : byPosition;

  const sorter = SQUAD_SORTERS[sortBy];

  return [...bySearch].sort(sorter);
};

export const calculateTeamStats = (
  team: TeamProfile | null,
  players: PlayerProfile[]
): TeamStats | null => {
  if (!team) return null;

  const squad = players.filter((player) => player.teamId === team.id);

  if (squad.length === 0) {
    return {
      totalPlayers: 0,
      avgAge: "0",
      foreignPercentage: "0",
      foreignPlayers: 0,
      avgRating: "0",
      totalValue: "€0M",
      totalGoals: 0,
      totalAssists: 0,
    };
  }

  const totalAge = squad.reduce((sum, player) => sum + player.age, 0);
  const avgAge = (totalAge / squad.length).toFixed(1);

  const foreignPlayers = squad.filter((player) => player.nationality !== "🇬🇧").length;
  const foreignPercentage = ((foreignPlayers / squad.length) * 100).toFixed(1);

  const avgRating = (
    squad.reduce((sum, player) => sum + player.rating, 0) / squad.length
  ).toFixed(1);

  const totalValueNumber = squad.reduce(
    (sum, player) => sum + player.marketValue,
    0
  );

  return {
    totalPlayers: squad.length,
    avgAge,
    foreignPercentage,
    foreignPlayers,
    avgRating,
    totalValue: `€${totalValueNumber}M`,
    totalGoals: squad.reduce((sum, player) => sum + player.goals, 0),
    totalAssists: squad.reduce((sum, player) => sum + player.assists, 0),
  };
};

export const calculatePositionDistribution = (
  team: TeamProfile | null,
  players: PlayerProfile[]
): PositionDistribution[] => {
  if (!team) return [];

  const squad = players.filter((player) => player.teamId === team.id);
  const total = squad.length || 1;

  const distribution = {
    GK: {
      position: "GK",
      label: "골키퍼",
      color: "from-yellow-400 to-orange-500",
      count: 0,
    },
    DF: {
      position: "DF",
      label: "수비수",
      color: "from-teal-400 to-emerald-500",
      count: 0,
    },
    MF: {
      position: "MF",
      label: "미드필더",
      color: "from-green-400 to-emerald-500",
      count: 0,
    },
    FW: {
      position: "FW",
      label: "공격수",
      color: "from-red-400 to-pink-500",
      count: 0,
    },
  };

  squad.forEach((player) => {
    if (player.position === "GK") {
      distribution.GK.count += 1;
    } else if (POSITION_GROUPS.DF.some((code) => player.position.includes(code))) {
      distribution.DF.count += 1;
    } else if (POSITION_GROUPS.MF.some((code) => player.position.includes(code))) {
      distribution.MF.count += 1;
    } else {
      distribution.FW.count += 1;
    }
  });

  return Object.values(distribution).map((item) => ({
    position: item.position,
    label: item.label,
    count: item.count,
    color: item.color,
    percentage: ((item.count / total) * 100).toFixed(1),
  }));
};
