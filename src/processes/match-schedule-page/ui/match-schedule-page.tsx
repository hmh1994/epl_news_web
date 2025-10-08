import { MatchScheduleWidget } from "@/widgets/match-schedule/ui/match-schedule-widget";
import {
  EPL_MATCH_SCHEDULE,
  MATCHWEEK_OPTIONS,
} from "@/shared/mocks/match-schedule";

export const MatchSchedulePage = () => {
  return (
    <MatchScheduleWidget
      schedule={EPL_MATCH_SCHEDULE}
      matchweekOptions={MATCHWEEK_OPTIONS}
    />
  );
};
