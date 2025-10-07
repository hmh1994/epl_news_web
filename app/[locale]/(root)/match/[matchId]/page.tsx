import type { Metadata } from "next";

import { MatchDetailPage } from "@/views/match-detail";
import {
  getMatchDetail,
  getMatchDetailIds,
} from "@/shared/mocks/match-detail";

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
  const matchup = `${fixture.home.name} vs ${fixture.away.name}`;

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
