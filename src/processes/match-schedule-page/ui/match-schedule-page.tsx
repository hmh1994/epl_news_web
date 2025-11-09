import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { MatchScheduleWidget } from "@/widgets/match-schedule/ui/match-schedule-widget";

interface MatchSchedulePageProps {
  schedule: MatchDaySchedule[];
  matchweekOptions: number[];
}

export const MatchSchedulePage = ({
  schedule,
  matchweekOptions,
}: MatchSchedulePageProps) => (
  <MatchScheduleWidget schedule={schedule} matchweekOptions={matchweekOptions} />
);
