import { MatchSchedulePage } from "@/processes/match-schedule-page";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/matches";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export default async function MatchScheduleRoute() {
  const response = await fetchMatchSchedule(DEFAULT_LEAGUE_ID);

  return (
    <MatchSchedulePage
      schedule={response.data.schedule}
      matchweekOptions={response.data.matchweeks}
    />
  );
}
