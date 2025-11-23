import { TeamInfoPage } from "@/processes/team-info-page";
import { fetchTeamProfiles, fetchTeamSquad } from "@/shared/api/epl/lib/teams";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export default async function TeamInfoRoute() {
  const leagueId = DEFAULT_LEAGUE_ID;
  const profilesResponse = await fetchTeamProfiles(leagueId);
  const teams = profilesResponse.data.teams;

  const squadResponses = await Promise.all(
    teams.map((team) => fetchTeamSquad("epl", String(team.id)))
  );

  const players = squadResponses.flatMap((response) => response.data.squad);

  return <TeamInfoPage teams={teams} players={players} />;
}
