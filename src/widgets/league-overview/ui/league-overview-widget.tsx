"use client";

import React, { useState } from "react";
import { LeagueStat, LeagueChampion, SuccessfulClub } from "@/entities/league/model/league-overview";
import { LeagueOverviewHero } from "@/widgets/league-overview/hero/ui/league-overview-hero";
import { LeagueTabNavigation } from "@/widgets/league-overview/tab-navigation/ui/league-tab-navigation";
import { LeagueStatsSection } from "@/widgets/league-overview/stats-section/ui/league-stats-section";
import { LeagueChampionsSection } from "@/widgets/league-overview/champions-section/ui/league-champions-section";
import { LeagueInsightsSection } from "@/widgets/league-overview/insights-section/ui/league-insights-section";
import { LeagueTab, LeagueEntry } from "@/widgets/league-overview/model/types";

interface LeagueOverviewWidgetProps {
  leagueEntries: LeagueEntry[];
  leagueStats: LeagueStat[];
  champions: LeagueChampion[];
  clubs: SuccessfulClub[];
}

export const LeagueOverviewWidget = ({
  leagueEntries,
  leagueStats,
  champions,
  clubs,
}: LeagueOverviewWidgetProps) => {
  const [activeTab, setActiveTab] = useState<LeagueTab>("insights");

  const maxGoals =
    leagueEntries.length > 0
      ? Math.max(...leagueEntries.map(([, league]) => league.totalGoals))
      : 0;

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <LeagueOverviewHero />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <LeagueTabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === "insights" && (
          <LeagueInsightsSection stats={leagueStats} clubs={clubs} />
        )}

        {activeTab === "stats" && (
          <LeagueStatsSection
            stats={leagueStats}
            leagueEntries={leagueEntries}
            maxGoals={maxGoals}
          />
        )}

        {activeTab === "champions" && (
          <LeagueChampionsSection champions={champions} clubs={clubs} />
        )}
      </main>
    </div>
  );
};
