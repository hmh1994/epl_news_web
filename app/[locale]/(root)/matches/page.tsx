import { MatchSchedulePage } from "@/processes/match-schedule-page";
import {
  fetchMatchSchedule,
  fetchMatchweekOptions,
} from "@/shared/api/epl/lib/match-schedule";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";
import type { MatchweekOption } from "@/shared/api/epl/model/types";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?:
    | {
        matchweek?: string | string[];
      }
    | Promise<{
        matchweek?: string | string[];
      }>;
}

const resolveMatchweek = (
  matchweekParam: string | string[] | undefined,
  options: MatchweekOption[]
) => {
  const value = Array.isArray(matchweekParam) ? matchweekParam[0] : matchweekParam;
  const parsed = value ? Number(value) : undefined;

  if (!parsed || !Number.isFinite(parsed)) {
    return undefined;
  }

  return options.some((option) => option.matchweek === parsed) ? parsed : undefined;
};

const findNearestMatchweek = (options: MatchweekOption[]) => {
  if (options.length === 0) {
    return undefined;
  }

  const now = new Date();
  let nearest = options[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  options.forEach((option) => {
    const start = new Date(`${option.startDate}T00:00:00Z`);
    const end = new Date(`${option.endDate}T23:59:59Z`);
    let distance = 0;

    if (now < start) {
      distance = start.getTime() - now.getTime();
    } else if (now > end) {
      distance = now.getTime() - end.getTime();
    }

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = option;
    }
  });

  return nearest.matchweek;
};

export default async function MatchScheduleRoute({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const matchweekOptionsResponse = await fetchMatchweekOptions(
    DEFAULT_LEAGUE_ID,
    { locale }
  );
  const matchweekOptions = matchweekOptionsResponse.data.matchweeks;

  const resolvedMatchweek = resolveMatchweek(
    resolvedSearchParams?.matchweek,
    matchweekOptions
  );
  const targetMatchweek =
    resolvedMatchweek ?? findNearestMatchweek(matchweekOptions);

  const scheduleResponse = targetMatchweek
    ? await fetchMatchSchedule(DEFAULT_LEAGUE_ID, {
        locale,
        matchweek: targetMatchweek,
      })
    : await fetchMatchSchedule(DEFAULT_LEAGUE_ID, {
        locale,
      });

  return (
    <MatchSchedulePage
      schedule={scheduleResponse.data.schedule}
      matchweekOptions={matchweekOptions.map((option) => option.matchweek)}
      initialMatchweek={targetMatchweek}
    />
  );
}
