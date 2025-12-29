import { TeamInfoPage } from "@/processes/team-info-page";
import { fetchTeamDetail } from "@/shared/api/epl/lib/team-detail";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import type { TeamProfile } from "@/entities/team/model/team-profile";
import type { PlayerProfile } from "@/entities/player/model/player-profile";
import teams from "@/shared/constants/teams";

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

  const teamIds = teams.map((t) => t.teamId);
  const teamResponses = await Promise.all(
    teamIds.map((teamId) => fetchTeamDetail(leagueId, teamId))
  );

  const _teams: TeamProfile[] = teamResponses.map((response) => {
    return toTeamProfile(
      response.data.summary,
      response.data.meta,
      response.data.static
    );
  });
  const players: PlayerProfile[] = teamResponses.flatMap((response) =>
    response.data.squad.map((player) => {
      return {
        ...player,
      };
    })
  );
  return <TeamInfoPage teams={_teams} players={players} />;
}
