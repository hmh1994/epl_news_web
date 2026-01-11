import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { MatchScheduleWidget } from "@/widgets/match-schedule/ui/match-schedule-widget";

interface MatchSchedulePageProps {
  schedule: MatchDaySchedule[];
  matchweekOptions: number[];
  initialMatchweek?: number;
}

export const MatchSchedulePage = ({
  schedule,
  matchweekOptions,
  initialMatchweek,
}: MatchSchedulePageProps) => (
  <MatchScheduleWidget
    schedule={schedule}
    matchweekOptions={matchweekOptions}
    initialMatchweek={initialMatchweek}
  />
);
