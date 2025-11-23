import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MatchDetailPage } from "@/processes/match-detail-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

const MATCH_SCHEDULE = EPL_MOCK_DATA.matches.schedule;
const MATCH_DETAILS = EPL_MOCK_DATA.matches.details;

interface PageProps {
  params: Promise<{ matchId: string }>;
}

const getMatchDetail = (matchId: string) => {
  const detail = MATCH_DETAILS[matchId];
  if (!detail) {
    throw new Error(`Match detail not found: ${matchId}`);
  }
  return detail;
};

export async function generateStaticParams() {
  return MATCH_SCHEDULE.flatMap((day) =>
    day.fixtures.map((fixture) => ({ matchId: fixture.id }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { matchId } = await params;

  try {
    const detail = getMatchDetail(matchId);
    const { fixture, heroTagline } = detail;
    const homeTeam =
      TEAMS_BY_ID[fixture.home.teamId]?.name ??
      fixture.home.teamId.toUpperCase();
    const awayTeam =
      TEAMS_BY_ID[fixture.away.teamId]?.name ??
      fixture.away.teamId.toUpperCase();
    const matchup = `${homeTeam} vs ${awayTeam}`;

    return {
      title: `${matchup} - Match Centre`,
      description: heroTagline,
      openGraph: {
        title: `${matchup} - Match Centre`,
        description: heroTagline,
      },
    };
  } catch {
    return {
      title: "Match Centre",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { matchId } = await params;
  try {
    const detail = getMatchDetail(matchId);
    return <MatchDetailPage detail={detail} />;
  } catch {
    notFound();
  }
}
