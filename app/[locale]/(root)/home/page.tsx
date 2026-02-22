import type { Metadata } from "next";
import { EPLHubPage } from "@/processes/epl-hub-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchPlayerRace } from "@/shared/api/epl/lib/scoring-race";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/match-schedule";
import { fetchSeasonAnalytics } from "@/shared/api/epl/lib/season-analytics";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableRow } from "@/shared/lib/mappers/league";
import type { PlayerRanking } from "@/entities/player/model/player-ranking";

interface HomeRouteProps {
  params: Promise<{ locale: string }>;
}

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const addUtcDays = (date: Date, days: number) => {
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

export const metadata: Metadata = {
  title: "홈 - 프리미어리그 허브",
  description:
    "프리미어리그 순위표, 득점 레이스, 경기 일정, 시즌 인사이트를 한눈에 확인하세요.",
  openGraph: {
    title: "인풋볼 - 프리미어리그 허브",
    description: "순위표·득점 레이스·경기 일정·시즌 인사이트",
    type: "website",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "인풋볼",
  url: "https://infootball.kr",
  description: "프리미어리그 매치·뉴스·선수 정보 플랫폼",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://infootball.kr/ko/players?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function HomeRoute({ params }: HomeRouteProps) {
  const { locale } = await params;
  const leagueId = DEFAULT_LEAGUE_ID;
  const startDate = toIsoDate(new Date());
  const endDate = toIsoDate(addUtcDays(new Date(), 14));

  const [premiumTable, scoringRace, matchSchedule, seasonAnalytics] =
    await Promise.all([
      fetchPremiumTable(leagueId),
      fetchPlayerRace(leagueId, { limit: 5, category: "goal" }),
      fetchMatchSchedule(leagueId, { locale, startDate, endDate }),
      fetchSeasonAnalytics(leagueId),
    ]);
  const tableRows = premiumTable.data.map(toLeagueTableRow);
  const playerRankings: PlayerRanking[] = scoringRace.data;
  const schedule = matchSchedule.data?.schedule ?? [];
  const seasonMetrics = seasonAnalytics.data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <EPLHubPage
        tableRows={tableRows}
        playerRankings={playerRankings}
        schedule={schedule}
        seasonMetrics={seasonMetrics}
      />
    </>
  );
}
