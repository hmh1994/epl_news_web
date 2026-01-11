"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { MatchScheduleFilters } from "@/features/match-schedule/filters/ui/match-schedule-filters";
import { MatchFixtureCard } from "@/entities/match/ui/match-fixture-card";
import { MatchDaySchedule, MatchFixture } from "@/entities/match/model/match-schedule";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { LoadingState } from "@/shared/ui/loading-state";

const TIMEZONE = "Asia/Seoul";

const dayTitleFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
  timeZone: TIMEZONE,
});

type FixtureKey = `${string}-${string}`;

const createFixtureKey = (homeId: string, awayId: string): FixtureKey => {
  const sorted = [homeId, awayId].sort();
  return `${sorted[0]}-${sorted[1]}`;
};

const calculatePowerScore = (fixture: MatchFixture): number => {
  const { home, away } = fixture;
  const homeRank = home.leaguePosition ?? 15;
  const awayRank = away.leaguePosition ?? 15;
  const baseRankScore = (22 - homeRank) + (22 - awayRank);

  const rivalryBonus = RIVALRIES.has(createFixtureKey(home.teamId, away.teamId)) ? 15 : 0;

  const attackScore =
    (TEAM_ATTACK_INDEX[home.teamId] ?? 60) +
    (TEAM_ATTACK_INDEX[away.teamId] ?? 60);

  return baseRankScore + rivalryBonus + attackScore / 10;
};

const getHeadToHead = (fixture: MatchFixture) => {
  const key = createFixtureKey(fixture.home.teamId, fixture.away.teamId);
  return HEAD_TO_HEAD_HISTORY[key] ?? [];
};

const RIVALRIES = new Set<FixtureKey>([
  createFixtureKey("mci", "ars"),
  createFixtureKey("liv", "mun"),
  createFixtureKey("che", "tot"),
  createFixtureKey("ful", "bre"),
  createFixtureKey("new", "bha"),
]);

const TEAM_ATTACK_INDEX: Record<string, number> = {
  mci: 95,
  ars: 90,
  liv: 92,
  che: 78,
  tot: 82,
  mun: 80,
  new: 76,
  bha: 74,
  ful: 68,
  bre: 66,
};

const HEAD_TO_HEAD_HISTORY: Record<FixtureKey, Array<{ season: string; date: string; venue: string; result: string }>> = {
  [createFixtureKey("mci", "ars")]: [
    { season: "2024/25", date: "2024-08-10", venue: "Emirates", result: "ARS 1-1 MCI" },
    { season: "2023/24", date: "2024-04-01", venue: "Etihad", result: "MCI 0-0 ARS" },
  ],
  [createFixtureKey("che", "tot")]: [
    { season: "2024/25", date: "2024-10-18", venue: "Tottenham Hotspur Stadium", result: "TOT 2-2 CHE" },
    { season: "2023/24", date: "2023-11-06", venue: "Tottenham Hotspur Stadium", result: "CHE 4-1 TOT" },
  ],
  [createFixtureKey("liv", "mun")]: [
    { season: "2024/25", date: "2024-09-28", venue: "Old Trafford", result: "MUN 1-3 LIV" },
    { season: "2023/24", date: "2024-04-07", venue: "Old Trafford", result: "MUN 2-2 LIV" },
  ],
  [createFixtureKey("new", "bha")]: [
    { season: "2024/25", date: "2024-09-15", venue: "Amex Stadium", result: "BHA 1-2 NEW" },
    { season: "2023/24", date: "2024-05-19", venue: "St James' Park", result: "NEW 1-1 BHA" },
  ],
  [createFixtureKey("ful", "bre")]: [
    { season: "2024/25", date: "2024-08-30", venue: "Gtech Community Stadium", result: "BRE 0-0 FUL" },
    { season: "2023/24", date: "2024-03-02", venue: "Craven Cottage", result: "FUL 3-2 BRE" },
  ],
};

interface MatchScheduleWidgetProps {
  schedule: MatchDaySchedule[];
  matchweekOptions: number[];
  initialMatchweek?: number;
}

export const MatchScheduleWidget = ({
  schedule,
  matchweekOptions,
  initialMatchweek,
}: MatchScheduleWidgetProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultMatchweek =
    matchweekOptions[matchweekOptions.length - 1] ?? matchweekOptions[0] ?? 0;
  const resolvedInitialMatchweek =
    initialMatchweek && matchweekOptions.includes(initialMatchweek)
      ? initialMatchweek
      : defaultMatchweek;
  const [selectedMatchweek, setSelectedMatchweek] = useState<number>(
    resolvedInitialMatchweek
  );
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);

  const scheduleMatchweeks = useMemo(() => {
    const weeks = new Set<number>();
    schedule.forEach((day) => {
      day.fixtures.forEach((fixture) => weeks.add(fixture.matchweek));
    });
    return weeks;
  }, [schedule]);

  const isScheduleMismatch =
    scheduleMatchweeks.size > 0 && !scheduleMatchweeks.has(selectedMatchweek);

  const filteredSchedule = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const filterFixture = (fixture: MatchDaySchedule["fixtures"][number]) => {
      if (fixture.matchweek !== selectedMatchweek) {
        return false;
      }

      if (term.length === 0) {
        return true;
      }

      const homeTeam = TEAMS_BY_ID[fixture.home.teamId];
      const awayTeam = TEAMS_BY_ID[fixture.away.teamId];

      const haystack = [
        homeTeam?.name,
        homeTeam?.shortName,
        awayTeam?.name,
        awayTeam?.shortName,
        fixture.venue,
        fixture.city,
        fixture.headline ?? "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    };

    return schedule.map((day) => ({
      ...day,
      fixtures: day.fixtures.filter(filterFixture),
    })).filter((day) => day.fixtures.length > 0);
  }, [schedule, searchTerm, selectedMatchweek]);

  const firstAvailableFixtureId = filteredSchedule[0]?.fixtures[0]?.id ?? null;

  useEffect(() => {
    if (!selectedFixtureId && firstAvailableFixtureId) {
      setSelectedFixtureId(firstAvailableFixtureId);
      return;
    }

    if (!selectedFixtureId) {
      return;
    }

    const exists = filteredSchedule.some((day) =>
      day.fixtures.some((fixture) => fixture.id === selectedFixtureId)
    );

    if (!exists) {
      setSelectedFixtureId(firstAvailableFixtureId ?? null);
    }
  }, [filteredSchedule, selectedFixtureId, firstAvailableFixtureId]);

  const rankedFixtures = useMemo(() => {
    const allFixtures = filteredSchedule.flatMap((day) => day.fixtures);
    return allFixtures
      .map((fixture) => ({ fixture, score: calculatePowerScore(fixture) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [filteredSchedule]);

  const handleMatchweekChange = (matchweek: number) => {
    if (matchweek === selectedMatchweek) {
      return;
    }

    setSelectedMatchweek(matchweek);

    const params = new URLSearchParams(searchParams?.toString());
    params.set("matchweek", String(matchweek));
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    if (!matchweekOptions.includes(selectedMatchweek)) {
      setSelectedMatchweek(defaultMatchweek);
    }
  }, [defaultMatchweek, matchweekOptions, selectedMatchweek]);

  useEffect(() => {
    if (
      initialMatchweek &&
      matchweekOptions.includes(initialMatchweek) &&
      initialMatchweek !== selectedMatchweek
    ) {
      setSelectedMatchweek(initialMatchweek);
    }
  }, [initialMatchweek, matchweekOptions, selectedMatchweek]);

  return (
    <div className='min-h-screen bg-slate-950 text-white pb-28'>
      <ScheduleHero matchweek={selectedMatchweek} />

      <main className='max-w-7xl mx-auto px-6 -mt-24 relative space-y-12'>
        <MatchScheduleFilters
          matchweeks={matchweekOptions}
          selectedMatchweek={selectedMatchweek}
          onMatchweekChange={handleMatchweekChange}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />

        {rankedFixtures.length > 0 && !isScheduleMismatch && (
          <MatchweekSpotlight fixtures={rankedFixtures} />
        )}

        {filteredSchedule.length === 0 ? (
          isPending || isScheduleMismatch ? (
            <div className='bg-slate-900/40 border border-white/10 rounded-3xl p-16 text-center text-slate-300'>
              <LoadingState />
            </div>
          ) : (
            <EmptyState />
          )
        ) : (
          <div className='space-y-10'>
            {filteredSchedule.map((day) => (
              <ScheduleDay
                key={day.date}
                day={day}
                selectedFixtureId={selectedFixtureId}
                onSelectFixture={(fixtureId) => setSelectedFixtureId(fixtureId)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const ScheduleHero = ({ matchweek }: { matchweek: number }) => {
  const t = useTranslations("widgets.matchSchedule.hero");
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";

  return (
    <section className='relative pt-28 pb-32 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-950'></div>
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/3 left-1/5 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
        <p className='text-sm uppercase tracking-[0.4em] text-emerald-200/80 mb-3'>
          Premier League 2024/25
        </p>
        <h1 className='text-5xl md:text-6xl font-black mb-4 leading-tight'>
          <span className='bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent'>
            Match Schedule
          </span>
        </h1>
        <p className='text-lg text-slate-300 max-w-2xl mx-auto'>{t("description")}</p>

        <div className='mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold'>
          <Link
            href={`${basePath}/teams`}
            className='rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("teamLink")}
          </Link>
          <Link
            href={`${basePath}/players`}
            className='rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("playerLink")}
          </Link>
          <Link
            href={`${basePath}/league`}
            className='rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("leagueLink")}
          </Link>
        </div>

        <div className='mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl text-sm text-slate-200'>
          <span className='uppercase tracking-[0.3em] text-emerald-300'>
            Current
          </span>
          <span className='text-white font-semibold'>
            Matchweek {matchweek}
          </span>
          <span className='text-slate-400 hidden md:inline'>•</span>
          <span className='text-slate-400 hidden md:inline'>
            Kickoffs shown in local time
          </span>
        </div>
      </div>
    </section>
  );
};

const ScheduleDay = ({
  day,
  selectedFixtureId,
  onSelectFixture,
}: {
  day: MatchDaySchedule;
  selectedFixtureId: string | null;
  onSelectFixture: (fixtureId: string) => void;
}) => {
  const dayTitle = dayTitleFormatter.format(new Date(`${day.date}T00:00:00Z`));
  const dayPowerRanking = day.fixtures
    .map((fixture) => ({ fixture, score: calculatePowerScore(fixture) }))
    .sort((a, b) => b.score - a.score);
  const selectedFixture =
    day.fixtures.find((fixture) => fixture.id === selectedFixtureId) ??
    day.fixtures[0] ?? null;

  return (
    <section className='bg-slate-900/50 border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl'>
      <header className='px-8 py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>Match Day</p>
          <h2 className='text-2xl font-bold text-white'>{dayTitle}</h2>
        </div>
        <div className='text-sm text-slate-400'>
          {day.fixtures.length} {day.fixtures.length > 1 ? "fixtures" : "fixture"}
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-0'>
        <div className='lg:col-span-2 p-6 space-y-4 lg:max-h-[640px] lg:overflow-y-auto lg:pr-4 scrollbar-slim'>
          {day.fixtures.map((fixture) => {
            const homeTeamInfo = TEAMS_BY_ID[fixture.home.teamId];
            const awayTeamInfo = TEAMS_BY_ID[fixture.away.teamId];

            return (
              <MatchFixtureCard
                key={fixture.id}
                fixture={fixture}
                homeTeam={homeTeamInfo && {
                  name: homeTeamInfo.name,
                  shortName: homeTeamInfo.shortName,
                  crest: homeTeamInfo.crest,
                }}
                awayTeam={awayTeamInfo && {
                  name: awayTeamInfo.name,
                  shortName: awayTeamInfo.shortName,
                  crest: awayTeamInfo.crest,
                }}
                isSelected={fixture.id === selectedFixtureId}
                onSelect={() => onSelectFixture(fixture.id)}
              />
            );
          })}
        </div>
        <aside className='border-t border-white/10 bg-slate-900/60 p-6 space-y-8 lg:border-t-0 lg:border-l lg:p-8'>
          <DayInsights
            fixtures={day.fixtures}
            ranking={dayPowerRanking}
            selectedFixture={selectedFixture}
          />
        </aside>
      </div>
    </section>
  );
};

const DayInsights = ({
  fixtures,
  ranking,
  selectedFixture,
}: {
  fixtures: MatchDaySchedule["fixtures"];
  ranking: Array<{ fixture: MatchFixture; score: number }>;
  selectedFixture: MatchFixture | null;
}) => {
  const fixture = selectedFixture ?? fixtures[0];

  if (!fixture) return null;

  const homeTeam = TEAMS_BY_ID[fixture.home.teamId];
  const awayTeam = TEAMS_BY_ID[fixture.away.teamId];

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Match Facts</p>
        <div className='bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 space-y-3 text-sm text-slate-300'>
          <div className='flex items-center justify-between text-white font-semibold'>
            <span>{homeTeam?.shortName ?? fixture.home.teamId.toUpperCase()}</span>
            <span>vs</span>
            <span>{awayTeam?.shortName ?? fixture.away.teamId.toUpperCase()}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Kickoff</span>
            <span className='text-white'>
              {new Date(fixture.kickoff).toLocaleString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: TIMEZONE,
              })}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Venue</span>
            <span className='text-white text-right'>
              {fixture.venue}
              <span className='block text-xs text-slate-400'>{fixture.city}</span>
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span>League Rank</span>
            <span className='text-white'>
              {(fixture.home.leaguePosition ?? "-")} vs {(fixture.away.leaguePosition ?? "-")}
            </span>
          </div>
        </div>
      </div>

      <PowerRankingList ranking={ranking} selectedFixture={fixture} />
      <HeadToHeadList selectedFixture={fixture} />
    </div>
  );
};

const MatchweekSpotlight = ({
  fixtures,
}: {
  fixtures: Array<{ fixture: MatchFixture; score: number }>;
}) => {
  const t = useTranslations("widgets.matchSchedule.spotlight");
  if (fixtures.length === 0) return null;

  return (
    <section className='bg-gradient-to-br from-[#169976]/15 via-slate-900/60 to-slate-900/80 border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl mb-12'>
      <div className='px-8 py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-emerald-200/80 mb-1'>EPL spotlight</p>
          <h2 className='text-2xl font-bold text-white'>{t("title")}</h2>
        </div>
        <p className='text-sm text-slate-300'>{t("description")}</p>
      </div>
      <div className='px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {fixtures.map(({ fixture, score }, index) => {
          const homeTeam = TEAMS_BY_ID[fixture.home.teamId];
          const awayTeam = TEAMS_BY_ID[fixture.away.teamId];
          const key = `spotlight-${fixture.id}`;

          return (
            <div key={key} className='bg-slate-900/70 border border-white/10 rounded-2xl px-5 py-4 space-y-3'>
              <div className='flex items-center justify-between text-xs text-slate-500 uppercase tracking-[0.3em]'>
                <span>#{index + 1}</span>
                <span>Power {Math.round(score)}</span>
              </div>
              <div className='text-white font-semibold text-lg'>
                {(homeTeam?.shortName ?? fixture.home.teamId.toUpperCase())} vs {(
                  awayTeam?.shortName ?? fixture.away.teamId.toUpperCase()
                )}
              </div>
              {fixture.headline && (
                <p className='text-slate-300 text-sm'>{fixture.headline}</p>
              )}
              <div className='text-xs text-slate-400 space-y-1'>
                <div>
                  {t("kickoff")} · {new Date(fixture.kickoff).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: TIMEZONE,
                  })}
                </div>
                <div>
                  {t("ranking")} · {(fixture.home.leaguePosition ?? "-")} vs {(fixture.away.leaguePosition ?? "-")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const PowerRankingList = ({
  ranking,
  selectedFixture,
}: {
  ranking: Array<{ fixture: MatchFixture; score: number }>;
  selectedFixture?: MatchFixture | null;
}) => {
  if (!selectedFixture) return null;

  const active = ranking.find((entry) => entry.fixture.id === selectedFixture.id);
  const homeTeam = TEAMS_BY_ID[selectedFixture.home.teamId];
  const awayTeam = TEAMS_BY_ID[selectedFixture.away.teamId];
  const score = active ? Math.round(active.score) : "-";

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>Power Ranking</p>
        <span className='text-[10px] uppercase text-slate-500'>Higher is spicier</span>
      </div>
      <div className='bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span>{homeTeam?.shortName ?? selectedFixture.home.teamId.toUpperCase()}</span>
          <span className='text-slate-400'>vs</span>
          <span>{awayTeam?.shortName ?? selectedFixture.away.teamId.toUpperCase()}</span>
        </div>
        <div className='text-emerald-400 font-bold text-base'>{score}</div>
      </div>
    </div>
  );
};

const HeadToHeadList = ({
  selectedFixture,
}: {
  selectedFixture?: MatchFixture | null;
}) => {
  const t = useTranslations("widgets.matchSchedule.headToHead");
  if (!selectedFixture) return null;

  const home = TEAMS_BY_ID[selectedFixture.home.teamId];
  const away = TEAMS_BY_ID[selectedFixture.away.teamId];
  const history = getHeadToHead(selectedFixture);

  if (history.length === 0) return null;

  return (
    <div className='space-y-3'>
      <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>{t("title")}</p>
      <div className='bg-slate-800/40 border border-white/10 rounded-2xl px-4 py-4 space-y-2'>
        <div className='text-sm font-semibold text-white'>
          {(home?.shortName ?? selectedFixture.home.teamId.toUpperCase())} vs {(
            away?.shortName ?? selectedFixture.away.teamId.toUpperCase()
          )}
        </div>
        <ul className='space-y-1 text-xs text-slate-300'>
          {history.slice(0, 3).map((match, idx) => (
            <li key={`${selectedFixture.id}-history-${idx}`} className='flex items-center justify-between'>
              <span>{match.season}</span>
              <span className='font-semibold'>{match.result}</span>
              <span className='text-slate-500'>{match.venue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const EmptyState = () => {
  const t = useTranslations("widgets.matchSchedule.empty");
  return (
    <div className='bg-slate-900/40 border border-white/10 rounded-3xl p-16 text-center text-slate-300'>
      <div className='text-6xl mb-4'>📅</div>
      <h3 className='text-2xl font-bold text-white mb-2'>{t("title")}</h3>
      <p className='text-slate-400'>{t("description")}</p>
    </div>
  );
};
