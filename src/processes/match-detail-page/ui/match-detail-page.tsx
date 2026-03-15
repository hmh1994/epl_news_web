import { MatchDetail } from "@/entities/match/model/match-detail";
import { MatchLineup } from "@/entities/match/model/match-lineup";
import { MatchDetailWidget } from "@/widgets/match-detail/ui/match-detail-widget";

interface MatchDetailPageProps {
  detail: MatchDetail;
  lineup: MatchLineup | null;
}

export const MatchDetailPage = ({ detail, lineup }: MatchDetailPageProps) => {
  return <MatchDetailWidget detail={detail} lineup={lineup} />;
};
