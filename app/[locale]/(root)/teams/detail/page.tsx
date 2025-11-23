import { TeamInfoPage } from "@/processes/team-info-page";
import { fetchTeamDetail } from "@/shared/api/epl/lib/team-detail";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { TeamProfile } from "@/entities/team/model/team-profile";
import type { PlayerProfile } from "@/entities/player/model/player-profile";

const toTeamProfile = (
  summary: {
    id: number;
    name: string;
    shortName: string;
    logo: string;
    manager: string;
    description: string;
  },
  meta: {
    rank: number;
    points: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    avgAge: number;
    trophies: number;
  },
  staticInfo: {
    founded: number;
    stadium: string;
    capacity: number;
    colors: TeamProfile["colors"];
    keyStats: TeamProfile["keyStats"];
  },
  fallback?: TeamProfile
): TeamProfile => ({
  id: summary.id,
  name: summary.name,
  shortName: summary.shortName,
  logo: summary.logo,
  manager: summary.manager,
  nationality: fallback?.nationality ?? "",
  description: summary.description,
  rank: meta.rank,
  points: meta.points,
  played: meta.played,
  won: meta.won,
  drawn: meta.drawn,
  lost: meta.lost,
  goalsFor: meta.goalsFor,
  goalsAgainst: meta.goalsAgainst,
  form: fallback?.form ?? [],
  avgAge: meta.avgAge,
  trophies: meta.trophies,
  founded: staticInfo.founded,
  stadium: staticInfo.stadium,
  capacity: staticInfo.capacity,
  colors: staticInfo.colors,
  keyStats: staticInfo.keyStats,
});

export default async function TeamInfoRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const teamIds = EPL_MOCK_DATA.teams.profiles.map((team) =>
    String(team.id)
  );

  const teamResponses = await Promise.all(
    teamIds.map((teamId) => fetchTeamDetail(leagueId, teamId))
  );

  const teams: TeamProfile[] = teamResponses.map((response) => {
    const fallbackTeam = EPL_MOCK_DATA.teams.profiles.find(
      (candidate) => candidate.id === response.data.team.summary.id
    );
    return toTeamProfile(
      response.data.team.summary,
      response.data.team.meta,
      response.data.team.static,
      fallbackTeam ?? undefined
    );
  });
  const players: PlayerProfile[] = teamResponses.flatMap(
    (response) => response.data.team.squad
  );

  return <TeamInfoPage teams={teams} players={players} />;
}
