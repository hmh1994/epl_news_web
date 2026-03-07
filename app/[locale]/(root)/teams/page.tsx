import type { Metadata } from "next";
import { PremiumEPLTablePage } from "@/processes/premium-epl-table-page";
import { fetchPremiumTable } from "@/shared/api/epl/lib/league";
import { fetchSeasonAnalytics } from "@/shared/api/epl/lib/season-analytics";
import { fetchPointsRace } from "@/shared/api/epl/lib/points-race";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import { toLeagueTableTeam } from "@/shared/lib/mappers/league";

export const metadata: Metadata = {
  title: "팀 순위표",
  description:
    "프리미어리그 팀 순위표와 시즌 통계를 확인하세요. 승점·득실차·최근 폼을 한눈에 비교.",
  openGraph: {
    title: "팀 순위표 | 인풋볼",
    description: "프리미어리그 팀 순위표·시즌 통계",
    type: "website",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PremiumEPLTableRoute({ params }: PageProps) {
  const { locale } = await params;
  const [tableResponse, analyticsResponse, pointsRaceResponse] =
    await Promise.all([
      fetchPremiumTable(DEFAULT_LEAGUE_ID, { locale }),
      fetchSeasonAnalytics(DEFAULT_LEAGUE_ID, { locale }),
      fetchPointsRace(DEFAULT_LEAGUE_ID, { locale, limit: 6 }),
    ]);

  const teams = tableResponse.data.map(toLeagueTableTeam);
  return (
    <PremiumEPLTablePage
      teams={teams}
      metrics={analyticsResponse.data}
      pointsRace={pointsRaceResponse.data}
    />
  );
}
