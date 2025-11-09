import { MatchDetail } from "@/entities/match/model/match-detail";
import { MatchDetailWidget } from "@/widgets/match-detail/ui/match-detail-widget";

interface MatchDetailPageProps {
  detail: MatchDetail;
}

export const MatchDetailPage = ({ detail }: MatchDetailPageProps) => {
  return <MatchDetailWidget detail={detail} />;
};
