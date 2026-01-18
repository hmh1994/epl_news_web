import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { MatchScheduleWidget } from "@/widgets/match-schedule/ui/match-schedule-widget";

interface MatchSchedulePageProps {
  schedule: MatchDaySchedule[];
}

export const MatchSchedulePage = ({
  schedule,
}: MatchSchedulePageProps) => (
  <MatchScheduleWidget
    schedule={schedule}
  />
);
