import { PremiumEPLTablePage } from "@/processes/premium-epl-table-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableTeam } from "@/shared/lib/mappers/league";

export default async function PremiumEPLTableRoute() {
  const response = await fetchPremiumTable(DEFAULT_LEAGUE_ID);
  const teams = response.data.standings.map(toLeagueTableTeam);

  return <PremiumEPLTablePage teams={teams} />;
}
