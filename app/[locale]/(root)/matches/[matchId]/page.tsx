import type { Metadata } from "next";
import Link from "next/link";

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
      title: `${matchup} - 경기 센터`,
      description: heroTagline,
      openGraph: {
        title: `${matchup} - 경기 센터 | 인풋볼`,
        description: heroTagline,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${matchup} - 경기 센터`,
        description: heroTagline,
      },
      alternates: {
        canonical: `https://infootball.kr/ko/matches/${matchId}`,
      },
    };
  } catch {
    return {
      title: "경기 센터",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { matchId } = await params;
  try {
    const detail = getMatchDetail(matchId);
    const { fixture } = detail;
    const homeTeam =
      TEAMS_BY_ID[fixture.home.teamId]?.name ??
      fixture.home.teamId.toUpperCase();
    const awayTeam =
      TEAMS_BY_ID[fixture.away.teamId]?.name ??
      fixture.away.teamId.toUpperCase();

    const sportsEventJsonLd = {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: `${homeTeam} vs ${awayTeam}`,
      description: detail.heroTagline,
      startDate: fixture.kickoff,
      location: fixture.venue
        ? { "@type": "Place", name: fixture.venue }
        : undefined,
      homeTeam: { "@type": "SportsTeam", name: homeTeam },
      awayTeam: { "@type": "SportsTeam", name: awayTeam },
      url: `https://infootball.kr/ko/matches/${matchId}`,
      organizer: {
        "@type": "SportsOrganization",
        name: "Premier League",
        url: "https://www.premierleague.com",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd) }}
        />
        <MatchDetailPage detail={detail} />
      </>
    );
  } catch {
    return <MatchDetailUnavailable />;
  }
}

const MatchDetailUnavailable = () => (
  <div className='min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 pb-28'>
    <div className='max-w-md text-center space-y-6'>
      <div className='text-6xl'>⚽</div>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-white'>경기 데이터 준비 중</h1>
        <p className='text-slate-400 text-sm leading-relaxed'>
          해당 경기의 상세 데이터가 아직 준비되지 않았습니다.
          <br />
          분석 데이터는 경기 전일부터 순차적으로 제공됩니다.
        </p>
      </div>
      <Link
        href='..'
        className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
      >
        ← 일정으로 돌아가기
      </Link>
    </div>
  </div>
);
