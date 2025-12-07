import { MatchSchedulePage } from "@/processes/match-schedule-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

export default async function MatchScheduleRoute() {
  return (
    <MatchSchedulePage
      schedule={EPL_MOCK_DATA.matches.schedule}
      matchweekOptions={EPL_MOCK_DATA.matches.matchweeks}
    />
  );
}
