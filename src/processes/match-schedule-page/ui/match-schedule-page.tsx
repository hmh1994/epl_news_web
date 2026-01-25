import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { MatchScheduleWidget } from "@/widgets/match-schedule/ui/match-schedule-widget";

interface MatchSchedulePageProps {
  schedule: MatchDaySchedule[];
  selectedDate?: string;
  isDateFilterActive?: boolean;
}

export const MatchSchedulePage = ({
  schedule,
  selectedDate,
  isDateFilterActive,
}: MatchSchedulePageProps) => (
  <MatchScheduleWidget
    schedule={schedule}
    selectedDate={selectedDate}
    isDateFilterActive={isDateFilterActive}
  />
);
