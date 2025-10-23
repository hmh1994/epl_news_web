import type { Metadata } from "next";

import { MatchDetailPage } from "@/views/match-detail";
import {
  getMatchDetail,
  getMatchDetailIds,
} from "@/shared/mocks/match-detail";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface PageProps {
  params: Promise<{ matchId: string }>;
}

export async function generateStaticParams() {
  return getMatchDetailIds().map((matchId) => ({ matchId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { matchId } = await params;
  const detail = getMatchDetail(matchId);

  if (!detail) {
    return {
      title: "Match Centre",
    };
  }

  const { fixture, heroTagline } = detail;
  const homeTeam = TEAMS_BY_ID[fixture.home.teamId]?.name ?? fixture.home.teamId.toUpperCase();
  const awayTeam = TEAMS_BY_ID[fixture.away.teamId]?.name ?? fixture.away.teamId.toUpperCase();
  const matchup = `${homeTeam} vs ${awayTeam}`;

  return {
    title: `${matchup} - Match Centre`,
    description: heroTagline,
    openGraph: {
      title: `${matchup} - Match Centre`,
      description: heroTagline,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { matchId } = await params;

  return <MatchDetailPage matchId={matchId} />;
}
