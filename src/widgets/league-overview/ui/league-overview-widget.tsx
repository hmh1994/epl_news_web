"use client";

import React, { useState } from "react";
import { LeagueStat, LeagueChampion, SuccessfulClub } from "@/entities/league/model/league-overview";
import { EPL_CHAMPIONS, EPL_STATS, EPL_TOP_CLUBS, LEAGUE_SUMMARIES } from "@/shared/mocks/league-overview";
import { LeagueOverviewHero } from "@/widgets/league-overview/hero/ui/league-overview-hero";
import { LeagueTabNavigation } from "@/widgets/league-overview/tab-navigation/ui/league-tab-navigation";
import { LeagueStatsSection } from "@/widgets/league-overview/stats-section/ui/league-stats-section";
import { LeagueChampionsSection } from "@/widgets/league-overview/champions-section/ui/league-champions-section";
import { LeagueInsightsSection } from "@/widgets/league-overview/insights-section/ui/league-insights-section";
import { LeagueTab, LeagueEntry } from "@/widgets/league-overview/model/types";

export const LeagueOverviewWidget = () => {
  const [activeTab, setActiveTab] = useState<LeagueTab>("insights");

  const leagueEntries: LeagueEntry[] = Object.entries(
    LEAGUE_SUMMARIES
  ) as LeagueEntry[];
  const maxGoals =
    leagueEntries.length > 0
      ? Math.max(...leagueEntries.map(([, league]) => league.totalGoals))
      : 0;

  const eplChampions: LeagueChampion[] = EPL_CHAMPIONS;
  const leagueStats: LeagueStat[] = EPL_STATS;
  const topClubs: SuccessfulClub[] = EPL_TOP_CLUBS;

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <LeagueOverviewHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <LeagueTabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === "insights" && (
          <LeagueInsightsSection stats={leagueStats} clubs={topClubs} />
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
