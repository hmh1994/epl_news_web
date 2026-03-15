"use client";

import { MatchDetail } from "@/entities/match/model/match-detail";
import { MatchLineup } from "@/entities/match/model/match-lineup";
import { MatchDetailHero } from "@/widgets/match-detail/hero/ui/match-detail-hero";
import { MatchDetailInsights } from "@/widgets/match-detail/insights/ui/match-detail-insights";
import { MatchTimeline } from "@/widgets/match-detail/timeline/ui/match-timeline";
import { MatchFormation } from "@/widgets/match-detail/formation/ui/match-formation";
import { MatchStatsPanel } from "@/widgets/match-detail/stats/ui/match-stats";
import { MatchKeyPlayers } from "@/widgets/match-detail/key-players/ui/match-key-players";
import { MatchHeadToHeadPanel } from "@/widgets/match-detail/head-to-head/ui/match-head-to-head";
import { useTeams } from "@/shared/providers/teams-provider";

interface MatchDetailWidgetProps {
  detail: MatchDetail;
  lineup: MatchLineup | null;
}

export const MatchDetailWidget = ({ detail, lineup }: MatchDetailWidgetProps) => {
  const teamsById = useTeams();
  const homeTeam = teamsById[detail.fixture.home.teamId];
  const awayTeam = teamsById[detail.fixture.away.teamId];
  const homeShort = homeTeam?.shortName ?? detail.fixture.home.teamName ?? detail.fixture.home.teamId;
  const awayShort = awayTeam?.shortName ?? detail.fixture.away.teamName ?? detail.fixture.away.teamId;
  const momentumScores = calculateMomentum(detail);
  const momentumTrend =
    momentumScores.home === momentumScores.away
      ? "steady"
      : momentumScores.home > momentumScores.away
      ? "up"
      : "down";

  const enhancedInsights = transformInsights(detail.insights, {
    homeLabel: homeShort,
    awayLabel: awayShort,
    homeScore: momentumScores.home,
    awayScore: momentumScores.away,
    trend: momentumTrend,
  });

  const sampleSize = Math.max(detail.formGuide.home.length, detail.formGuide.away.length);
  const timeframeNote = `최근 ${sampleSize}경기 기준`;

  return (
    <div className='min-h-screen bg-slate-950 text-white pb-28 overflow-hidden'>
      <MatchDetailHero detail={detail} />

      <main className='relative max-w-7xl mx-auto px-6 -mt-28 space-y-12'>
        <MatchDetailInsights insights={enhancedInsights} />

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 items-start'>
          <div className='xl:col-span-2 space-y-8'>
            <MatchTimeline
              fixture={detail.fixture}
              events={detail.timeline}
            />

            {lineup && (
              <MatchFormation
                lineup={lineup}
                homeLabel={homeTeam?.name ?? detail.fixture.home.teamName ?? detail.fixture.home.teamId}
                awayLabel={awayTeam?.name ?? detail.fixture.away.teamName ?? detail.fixture.away.teamId}
              />
            )}

            <MatchHeadToHeadPanel
              records={detail.headToHead}
              homeLabel={homeTeam?.name ?? detail.fixture.home.teamName ?? detail.fixture.home.teamId}
              awayLabel={awayTeam?.name ?? detail.fixture.away.teamName ?? detail.fixture.away.teamId}
            />

            <MatchKeyPlayers keyPlayers={detail.keyPlayers} />
          </div>

          <div className='space-y-8'>
            <MatchStatsPanel
              stats={detail.stats}
              formGuide={detail.formGuide}
              homeLabel={homeTeam?.name ?? detail.fixture.home.teamName ?? detail.fixture.home.teamId}
              awayLabel={awayTeam?.name ?? detail.fixture.away.teamName ?? detail.fixture.away.teamId}
              timeframeNote={timeframeNote}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const RESULT_POINTS = {
  W: 3,
  D: 1,
  L: 0,
} as const;

const calculateMomentum = (detail: MatchDetail) => {
  const homeScore = detail.formGuide.home.reduce((sum, match) => sum + RESULT_POINTS[match.result], 0);
  const awayScore = detail.formGuide.away.reduce((sum, match) => sum + RESULT_POINTS[match.result], 0);
  return { home: homeScore, away: awayScore };
};

const transformInsights = (
  insights: MatchDetail["insights"],
  momentum: {
    homeLabel: string;
    awayLabel: string;
    homeScore: number;
    awayScore: number;
    trend: "up" | "down" | "steady";
  }
) => {
  const momentumValue = `${momentum.homeLabel} ${momentum.homeScore} vs ${momentum.awayLabel} ${momentum.awayScore}`;
  let replaced = false;

  const updated = insights.map((insight) => {
    if (insight.label === "무패 기록") {
      replaced = true;
      return {
        label: "기세",
        value: momentumValue,
        trend: momentum.trend,
        helperText: "최근 3경기 승점 지수 (승=3, 무=1, 패=0)",
      };
    }
    return insight;
  });

  if (!replaced) {
    updated.push({
      label: "기세",
      value: momentumValue,
      trend: momentum.trend,
      helperText: "최근 3경기 승점 지수 (승=3, 무=1, 패=0)",
    });
  }

  return updated;
};
