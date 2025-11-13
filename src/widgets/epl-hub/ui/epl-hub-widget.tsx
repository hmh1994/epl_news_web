"use client";

import { useEffect, useState } from "react";
import { EplHubHeader } from "@/widgets/epl-hub/header/ui/epl-hub-header";
import { EplHubHero } from "@/widgets/epl-hub/hero/ui/epl-hub-hero";
import { EplHubStandings } from "@/widgets/epl-hub/standings/ui/epl-hub-standings";
import { EplHubPlayerRankings } from "@/widgets/epl-hub/player-rankings/ui/epl-hub-player-rankings";
import { EplHubLiveUpdates } from "@/widgets/epl-hub/live-updates/ui/epl-hub-live-updates";
import { EplHubStats } from "@/widgets/epl-hub/stats/ui/epl-hub-stats";
import { EplHubFooter } from "@/widgets/epl-hub/footer/ui/epl-hub-footer";
import {
  EPL_LIVE_UPDATES,
  EPL_PLAYER_RANKINGS,
  EPL_SEASON_STATS,
  EPL_STANDINGS,
} from "@/shared/mocks/epl-hub";

export const EplHubWidget = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-x-hidden'>
      <EplHubHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isScrolled={isScrolled}
      />
      <EplHubHero />

      <main className='max-w-7xl mx-auto px-6 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20'>
          <div className='lg:col-span-2'>
            <EplHubStandings teams={EPL_STANDINGS} />
          </div>

          <div className='space-y-8'>
            <EplHubPlayerRankings players={EPL_PLAYER_RANKINGS} />
            <EplHubLiveUpdates updates={EPL_LIVE_UPDATES} />
          </div>
        </div>

        <EplHubStats stats={EPL_SEASON_STATS} />
      </main>

      <EplHubFooter />
    </div>
  );
};
