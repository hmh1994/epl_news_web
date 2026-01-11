import { PlayerDatabasePage } from "@/processes/player-database-page";
import { fetchPlayerList } from "@/shared/api/epl/lib/player-list";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import type { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?:
    | {
        search?: string | string[];
        position?: string | string[];
        teamId?: string | string[];
      }
    | Promise<{
        search?: string | string[];
        position?: string | string[];
        teamId?: string | string[];
      }>;
}

const normalizeSearchParam = (value?: string | string[]) => {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
};

const buildPositionOptions = (players: PlayerDatabaseEntry[]) => {
  const positions = new Set(players.map((player) => player.position));
  return ["all", ...Array.from(positions).sort()];
};

const buildTeamOptions = (players: PlayerDatabaseEntry[]) => {
  const teamMap = new Map<string, string>();
  players.forEach((player) => {
    if (!teamMap.has(player.teamId)) {
      teamMap.set(player.teamId, player.teamName ?? player.teamId);
    }
  });

  return {
    teamOptions: ["all", ...Array.from(teamMap.keys())],
    teamNameById: Object.fromEntries(teamMap.entries()),
  };
};

export default async function PlayerDatabaseRoute({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const search = normalizeSearchParam(resolvedSearchParams?.search);
  const rawPosition = normalizeSearchParam(resolvedSearchParams?.position);
  const rawTeamId = normalizeSearchParam(resolvedSearchParams?.teamId);
  const position = rawPosition && rawPosition !== "all" ? rawPosition : undefined;
  const teamId = rawTeamId && rawTeamId !== "all" ? rawTeamId : undefined;

  const leagueId = DEFAULT_LEAGUE_ID;
  const baseParams = { locale };

  const [allPlayersResponse, filteredResponse] = await Promise.all([
    fetchPlayerList(leagueId, baseParams),
    search || position || teamId
      ? fetchPlayerList(leagueId, { ...baseParams, search, position, teamId })
      : Promise.resolve({ data: [] as PlayerDatabaseEntry[] }),
  ]);

  const allPlayers = allPlayersResponse.data;
  const { teamOptions, teamNameById } = buildTeamOptions(allPlayers);
  const positionOptions = buildPositionOptions(allPlayers);
  const initialResults = filteredResponse.data;

  return (
    <PlayerDatabasePage
      players={allPlayers}
      positions={positionOptions}
      teams={teamOptions}
      teamNameById={teamNameById}
      initialSearch={{
        searchTerm: search,
        position,
        teamId,
        results: initialResults,
      }}
    />
  );
}
