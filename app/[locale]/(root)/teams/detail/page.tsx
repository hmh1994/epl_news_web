import { TeamInfoPage } from "@/processes/team-info-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

export default async function TeamInfoRoute() {
  const teams = EPL_MOCK_DATA.teams.profiles;
  const players = EPL_MOCK_DATA.teams.squadPlayers;

  return <TeamInfoPage teams={teams} players={players} />;
}
