"use client";

import React, { useMemo, useState } from "react";
import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import { PremiumTableHero } from "@/widgets/premium-epl-table/hero/ui/premium-table-hero";
import { PremiumTableControls } from "@/widgets/premium-epl-table/controls/ui/premium-table-controls";
import { PremiumTableTable } from "@/widgets/premium-epl-table/table/ui/premium-table-table";
import { PremiumTableAnalytics } from "@/widgets/premium-epl-table/analytics/ui/premium-table-analytics";
import { PremiumTableFooter } from "@/widgets/premium-epl-table/footer/ui/premium-table-footer";
import { SortColumn } from "@/widgets/premium-epl-table/model/types";

interface PremiumEPLTableWidgetProps {
  teams: LeagueTableTeam[];
  metrics: SeasonAnalyticsMetric[];
}

export const PremiumEPLTableWidget = ({
  teams,
  metrics,
}: PremiumEPLTableWidgetProps) => {
  const [sortBy, setSortBy] = useState<SortColumn>("position");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const sortedTeams = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = teams.filter((team) => {
      const teamName = team.teamName.toUpperCase();
      const shortName = team.teamShortName.toUpperCase();
      return (
        teamName.toLowerCase().includes(term) ||
        shortName.toLowerCase().includes(term)
      );
    });

    return filtered.sort((a, b) => {
      if (sortBy === "team") {
        const teamA = a.teamId.toUpperCase();
        const teamB = b.teamId.toUpperCase();
        return sortOrder === "asc"
          ? teamA.localeCompare(teamB)
          : teamB.localeCompare(teamA);
      }

      const aValue = a[sortBy] as number;
      const bValue = b[sortBy] as number;

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [teams, searchTerm, sortBy, sortOrder]);

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <PremiumTableHero />

      <main className='max-w-7xl mx-auto px-6 pb-20 -mt-6 sm:-mt-10'>
        <PremiumTableControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PremiumTableTable
          teams={sortedTeams}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          hoveredRow={hoveredRow}
          onHover={(position) => setHoveredRow(position)}
          onHoverEnd={() => setHoveredRow(null)}
        />

        <PremiumTableAnalytics metrics={metrics} />
      </main>

      <PremiumTableFooter />
    </div>
  );
};
