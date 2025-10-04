"use client";

import React, { useMemo, useState, useEffect } from "react";
import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import { PREMIER_LEAGUE_TABLE } from "@/shared/mocks/premium-epl-table";
import { PremiumTableHeader } from "@/widgets/premium-epl-table/header/ui/premium-table-header";
import { PremiumTableHero } from "@/widgets/premium-epl-table/hero/ui/premium-table-hero";
import { PremiumTableControls } from "@/widgets/premium-epl-table/controls/ui/premium-table-controls";
import { PremiumTableTable } from "@/widgets/premium-epl-table/table/ui/premium-table-table";
import { PremiumTableAnalytics } from "@/widgets/premium-epl-table/analytics/ui/premium-table-analytics";
import { PremiumTableFooter } from "@/widgets/premium-epl-table/footer/ui/premium-table-footer";
import { SortColumn } from "@/widgets/premium-epl-table/model/types";

export const PremiumEPLTableWidget = () => {
  const [sortBy, setSortBy] = useState<SortColumn>("position");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teams: LeagueTableTeam[] = PREMIER_LEAGUE_TABLE;

  const sortedTeams = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = teams.filter(
      (team) =>
        team.team.toLowerCase().includes(term) ||
        team.shortName.toLowerCase().includes(term)
    );

    return filtered.sort((a, b) => {
      if (sortBy === "team") {
        return sortOrder === "asc"
          ? a.team.localeCompare(b.team)
          : b.team.localeCompare(a.team);
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
      <PremiumTableHeader isScrolled={scrollY > 50} />
      <PremiumTableHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
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

        <PremiumTableAnalytics />
      </main>

      <PremiumTableFooter />
    </div>
  );
};
