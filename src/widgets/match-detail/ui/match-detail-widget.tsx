"use client";

import { MatchDetail } from "@/entities/match/model/match-detail";
import { MatchDetailHero } from "@/widgets/match-detail/hero/ui/match-detail-hero";
import { MatchDetailInsights } from "@/widgets/match-detail/insights/ui/match-detail-insights";
import { MatchTimeline } from "@/widgets/match-detail/timeline/ui/match-timeline";
import { MatchStatsPanel } from "@/widgets/match-detail/stats/ui/match-stats";
import { MatchKeyPlayers } from "@/widgets/match-detail/key-players/ui/match-key-players";
import { MatchFormGuidePanel } from "@/widgets/match-detail/form-guide/ui/match-form-guide";
import { MatchHeadToHeadPanel } from "@/widgets/match-detail/head-to-head/ui/match-head-to-head";
import { MatchNarrativePanel } from "@/widgets/match-detail/preview/ui/match-narrative-panel";

interface MatchDetailWidgetProps {
  detail: MatchDetail;
}

export const MatchDetailWidget = ({ detail }: MatchDetailWidgetProps) => {
  return (
    <div className='min-h-screen bg-slate-950 text-white pb-28 overflow-hidden'>
      <MatchDetailHero detail={detail} />

      <main className='relative max-w-7xl mx-auto px-6 -mt-28 space-y-12'>
        <MatchDetailInsights insights={detail.insights} />

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          <div className='xl:col-span-2 space-y-8'>
            <MatchTimeline
              fixture={detail.fixture}
              events={detail.timeline}
            />
            <MatchNarrativePanel
              status={detail.fixture.status}
              notes={detail.previewNotes}
              broadcastNotes={detail.broadcastNotes}
            />
          </div>

          <aside className='space-y-8'>
            <MatchStatsPanel stats={detail.stats} />
            <MatchKeyPlayers keyPlayers={detail.keyPlayers} />
            <MatchFormGuidePanel formGuide={detail.formGuide} />
            <MatchHeadToHeadPanel records={detail.headToHead} />
          </aside>
        </div>
      </main>
    </div>
  );
};
