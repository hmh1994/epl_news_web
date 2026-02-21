import type { Metadata } from "next";
import { MatchSchedulePage } from "@/processes/match-schedule-page";
import { fetchMatchSchedule } from "@/shared/api/epl/lib/match-schedule";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

export const metadata: Metadata = {
  title: "경기 일정",
  description:
    "프리미어리그 최신 경기 일정과 결과를 확인하세요. 날짜별 필터링 및 팀별 경기 검색 지원.",
  openGraph: {
    title: "경기 일정 | 인풋볼",
    description: "프리미어리그 최신 경기 일정과 결과",
    type: "website",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
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
  const endDate = toIsoDate(addUtcDays(new Date(`${startDate}T00:00:00Z`), 7));
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
