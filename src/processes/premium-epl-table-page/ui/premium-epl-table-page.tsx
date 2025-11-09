"use client";

import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import { PremiumEPLTableWidget } from "@/widgets/premium-epl-table/ui/premium-epl-table-widget";

interface PremiumEPLTablePageProps {
  teams: LeagueTableTeam[];
}

export const PremiumEPLTablePage = ({ teams }: PremiumEPLTablePageProps) => {
  return <PremiumEPLTableWidget teams={teams} />;
};
