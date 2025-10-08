"use client";

import React, { useMemo, useState } from "react";
import { MatchScheduleFilters } from "@/features/match-schedule/filters/ui/match-schedule-filters";
import { MatchFixtureCard } from "@/entities/match/ui/match-fixture-card";
import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

const dayTitleFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

interface MatchScheduleWidgetProps {
  schedule: MatchDaySchedule[];
  matchweekOptions: number[];
}

export const MatchScheduleWidget = ({
  schedule,
  matchweekOptions,
}: MatchScheduleWidgetProps) => {
  const defaultMatchweek =
    matchweekOptions[matchweekOptions.length - 1] ?? matchweekOptions[0] ?? 0;
  const [selectedMatchweek, setSelectedMatchweek] =
    useState<number>(defaultMatchweek);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBroadcastOnly, setShowBroadcastOnly] = useState(false);

  const filteredSchedule = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const filterFixture = (fixture: MatchDaySchedule["fixtures"][number]) => {
      if (fixture.matchweek !== selectedMatchweek) {
        return false;
      }

      if (showBroadcastOnly && !fixture.broadcast) {
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
  }, [schedule, searchTerm, selectedMatchweek, showBroadcastOnly]);

  return (
    <div className='min-h-screen bg-slate-950 text-white pb-28'>
      <ScheduleHero matchweek={selectedMatchweek} />

      <main className='max-w-7xl mx-auto px-6 -mt-24 relative'>
        <MatchScheduleFilters
          matchweeks={matchweekOptions}
          selectedMatchweek={selectedMatchweek}
          onMatchweekChange={setSelectedMatchweek}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          showBroadcastOnly={showBroadcastOnly}
          onToggleBroadcast={() => setShowBroadcastOnly((prev) => !prev)}
        />

        {filteredSchedule.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='space-y-10'>
            {filteredSchedule.map((day) => (
              <ScheduleDay key={day.date} day={day} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const ScheduleHero = ({ matchweek }: { matchweek: number }) => (
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
      <p className='text-lg text-slate-300 max-w-2xl mx-auto'>
        경기 주차별 킥오프 시간, 경기장, 방송 정보를 한 곳에서 확인하세요.
        맞춤 필터로 보고 싶은 경기를 빠르게 찾아보세요.
      </p>

      <div className='mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl text-sm text-slate-200'>
        <span className='uppercase tracking-[0.3em] text-emerald-300'>Current</span>
        <span className='text-white font-semibold'>Matchweek {matchweek}</span>
        <span className='text-slate-400 hidden md:inline'>•</span>
        <span className='text-slate-400 hidden md:inline'>Kickoffs shown in local time</span>
      </div>
    </div>
  </section>
);

const ScheduleDay = ({ day }: { day: MatchDaySchedule }) => {
  const dayTitle = dayTitleFormatter.format(new Date(day.date));

  return (
    <section className='bg-slate-900/50 border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl overflow-hidden'>
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
            <div className='lg:col-span-2 p-8 space-y-6'>
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
              />
            );
          })}
            </div>
        <aside className='hidden lg:block border-l border-white/10 bg-slate-900/60 p-8 space-y-6'>
          <QuickInfo fixtures={day.fixtures} />
        </aside>
      </div>
    </section>
  );
};

const QuickInfo = ({ fixtures }: { fixtures: MatchDaySchedule["fixtures"] }) => {
  const venues = Array.from(new Set(fixtures.map((fixture) => fixture.venue)));
  const cities = Array.from(new Set(fixtures.map((fixture) => fixture.city)));
  const broadcasts = fixtures.filter((fixture) => fixture.broadcast).length;

  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500 mb-2'>Highlights</p>
        <p className='text-3xl font-black text-white'>{fixtures.length}</p>
        <p className='text-slate-400 text-sm'>scheduled EPL fixtures</p>
      </div>

      <div className='space-y-3 text-sm text-slate-300'>
        <div>
          <p className='text-slate-500 text-xs uppercase tracking-[0.2em] mb-1'>Venues</p>
          <div className='flex flex-wrap gap-2'>
            {venues.map((venue) => (
              <span
                key={venue}
                className='px-3 py-1 rounded-xl bg-slate-800/60 border border-white/10'
              >
                {venue}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className='text-slate-500 text-xs uppercase tracking-[0.2em] mb-1'>Cities</p>
          <div className='flex flex-wrap gap-2 text-slate-300'>
            {cities.join(" • ")}
          </div>
        </div>

        <div className='flex items-center justify-between bg-emerald-500/10 border border-emerald-400/30 rounded-2xl px-4 py-3'>
          <span className='text-emerald-200 font-semibold'>Broadcast</span>
          <span className='text-white font-bold'>
            {broadcasts}/{fixtures.length}
          </span>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className='bg-slate-900/40 border border-white/10 rounded-3xl p-16 text-center text-slate-300'>
    <div className='text-6xl mb-4'>📅</div>
    <h3 className='text-2xl font-bold text-white mb-2'>조건에 맞는 경기가 없습니다</h3>
    <p className='text-slate-400'>다른 검색어나 필터를 선택해보세요.</p>
  </div>
);
