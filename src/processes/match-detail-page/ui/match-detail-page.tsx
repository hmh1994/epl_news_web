import { notFound } from "next/navigation";

import { MatchDetailWidget } from "@/widgets/match-detail/ui/match-detail-widget";
import { getMatchDetail } from "@/shared/mocks/match-detail";

interface MatchDetailPageProps {
  matchId: string;
}

export const MatchDetailPage = ({ matchId }: MatchDetailPageProps) => {
  const detail = getMatchDetail(matchId);

  if (!detail) {
    notFound();
  }

  return <MatchDetailWidget detail={detail} />;
};
