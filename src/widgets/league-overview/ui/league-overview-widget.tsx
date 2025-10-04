"use client";

import React, { useState } from "react";
import {
  LeagueKey,
  LeagueTableRow,
  LeagueStat,
  LeagueChampion,
  SuccessfulClub,
} from "@/entities/league/model/league-overview";
import {
  EPL_BRIEF_TABLE,
  EPL_CHAMPIONS,
  EPL_STATS,
  EPL_TOP_CLUBS,
  LEAGUE_SUMMARIES,
} from "@/shared/mocks/league-overview";
import { LeagueOverviewHeader } from "@/widgets/league-overview/header/ui/league-overview-header";
import { LeagueOverviewHero } from "@/widgets/league-overview/hero/ui/league-overview-hero";
import { LeagueSelectorPanel } from "@/widgets/league-overview/selector-panel/ui/league-selector-panel";
import { LeagueTabNavigation } from "@/widgets/league-overview/tab-navigation/ui/league-tab-navigation";
import { LeagueTableSection } from "@/widgets/league-overview/table-section/ui/league-table-section";
import { LeagueStatsSection } from "@/widgets/league-overview/stats-section/ui/league-stats-section";
import { LeagueChampionsSection } from "@/widgets/league-overview/champions-section/ui/league-champions-section";
import { LeagueTab, LeagueEntry } from "@/widgets/league-overview/model/types";

export const LeagueOverviewWidget = () => {
  const [activeLeague, setActiveLeague] = useState<LeagueKey>("EPL");
  const [activeTab, setActiveTab] = useState<LeagueTab>("table");
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);

  const leagueEntries: LeagueEntry[] = Object.entries(
    LEAGUE_SUMMARIES
  ) as LeagueEntry[];
  const maxGoals = Math.max(
    ...leagueEntries.map(([, league]) => league.totalGoals)
  );

  const eplTable: LeagueTableRow[] = EPL_BRIEF_TABLE;
  const eplChampions: LeagueChampion[] = EPL_CHAMPIONS;
  const leagueStats: LeagueStat[] = EPL_STATS;
  const topClubs: SuccessfulClub[] = EPL_TOP_CLUBS;

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <LeagueOverviewHeader />
      <LeagueOverviewHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <LeagueSelectorPanel
          leagues={leagueEntries}
          activeLeague={activeLeague}
          onSelect={(league) => setActiveLeague(league)}
        />

        <LeagueTabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === "table" && (
          <LeagueTableSection
            rows={eplTable}
            hoveredTeam={hoveredTeam}
            onHover={(teamId) => setHoveredTeam(teamId)}
            onHoverEnd={() => setHoveredTeam(null)}
          />
        )}

        {activeTab === "stats" && (
          <LeagueStatsSection
            stats={leagueStats}
            leagueEntries={leagueEntries}
            maxGoals={maxGoals}
          />
        )}

        {activeTab === "champions" && (
          <LeagueChampionsSection champions={eplChampions} clubs={topClubs} />
        )}
      </main>
    </div>
  );
};
