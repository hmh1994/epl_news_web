import { MatchSchedulePage } from "@/processes/match-schedule-page";
import {
  fetchFullMatchSchedule,
} from "@/shared/api/epl/lib/match-schedule";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MatchScheduleRoute({
  params,
}: PageProps) {
  const { locale } = await params;

  const scheduleResponse = await fetchFullMatchSchedule(DEFAULT_LEAGUE_ID, {
    locale,
  });

  return (
    <MatchSchedulePage
      schedule={scheduleResponse.data.schedule}
    />
  );
}
