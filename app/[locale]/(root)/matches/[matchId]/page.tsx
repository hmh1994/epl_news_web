import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MatchDetailPage } from "@/processes/match-detail-page";
import { fetchMatchDetail, fetchMatchSchedule } from "@/shared/api/epl/lib/matches";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{ matchId: string }>;
}

export async function generateStaticParams() {
  const response = await fetchMatchSchedule(DEFAULT_LEAGUE_ID);
  const matchIds = response.data.schedule.flatMap((day) =>
    day.fixtures.map((fixture) => ({ matchId: fixture.id }))
  );
  return matchIds;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { matchId } = await params;

  try {
    const response = await fetchMatchDetail(matchId);
    const { fixture, heroTagline } = response.data;
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
    const response = await fetchMatchDetail(matchId);
    return <MatchDetailPage detail={response.data} />;
  } catch {
    notFound();
  }
}
