import { MatchSchedulePage } from "@/processes/match-schedule-page";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/match-schedule";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?:
    | {
        startDate?: string | string[];
      }
    | Promise<{
        startDate?: string | string[];
      }>;
}

const normalizeSearchParam = (value?: string | string[]) => {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
};

const toIsoDate = (value: Date) => value.toISOString().slice(0, 10);

const addUtcDays = (value: Date, days: number) => {
  const result = new Date(
    Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate())
  );
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

const resolveStartDate = (rawDate?: string) => {
  if (!rawDate) {
    return toIsoDate(new Date());
  }

  const parsed = new Date(`${rawDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return toIsoDate(new Date());
  }

  return rawDate;
};

export default async function MatchScheduleRoute({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const rawStartDate = normalizeSearchParam(resolvedSearchParams?.startDate);
  const startDate = resolveStartDate(rawStartDate);
  const endDate = toIsoDate(addUtcDays(new Date(`${startDate}T00:00:00Z`), 6));
  const isDateFilterActive = Boolean(rawStartDate);

  const scheduleResponse = await fetchMatchSchedule(DEFAULT_LEAGUE_ID, {
    locale,
    startDate,
    endDate,
  });

  return (
    <MatchSchedulePage
      schedule={scheduleResponse?.data?.schedule ?? []}
      selectedDate={startDate}
      isDateFilterActive={isDateFilterActive}
    />
  );
}
