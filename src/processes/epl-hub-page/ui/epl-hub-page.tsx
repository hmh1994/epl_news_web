"use client";

import { useEffect, useMemo, useState } from "react";
import { LeagueBriefTable } from "@/features/league-overview/table/ui/league-brief-table";
import { EPL_BRIEF_TABLE } from "@/shared/mocks/league-overview";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { EPL_PLAYER_RANKINGS } from "@/shared/mocks/epl-hub";
import { PlayerRankingCard } from "@/entities/player/ui/player-ranking-card";
import { EPL_MATCH_SCHEDULE } from "@/shared/mocks/match-schedule";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { MatchFixtureCard } from "@/entities/match/ui/match-fixture-card";
import { CalendarClock, Star, Trash2, Trophy } from "lucide-react";
import { EplLeaguePulse } from "@/widgets/epl-hub/season-insights/ui/epl-league-pulse";

const FAVORITE_TEAMS_STORAGE_KEY = "eplFavoriteTeams";
const FAVORITE_MATCHES_STORAGE_KEY = "eplFavoriteMatches";

const kickoffSummaryFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const getClubDisplay = (teamId: string) => {
  const team = TEAMS_BY_ID[teamId];
  const fallback = teamId.toUpperCase();

  return {
    name: team?.name ?? fallback,
    shortName: team?.shortName ?? fallback,
  };
};

export const EPLHubPage = () => {
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedTeams = window.localStorage.getItem(
        FAVORITE_TEAMS_STORAGE_KEY
      );
      const storedMatches = window.localStorage.getItem(
        FAVORITE_MATCHES_STORAGE_KEY
      );

      if (storedTeams) {
        const parsedTeams = JSON.parse(storedTeams) as string[];
        setFavoriteTeams(parsedTeams.filter(Boolean));
      }

      if (storedMatches) {
        const parsedMatches = JSON.parse(storedMatches) as string[];
        setFavoriteMatches(parsedMatches.filter(Boolean));
      }
    } catch (error) {
      console.error("Failed to load favorites from storage", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      FAVORITE_TEAMS_STORAGE_KEY,
      JSON.stringify(favoriteTeams)
    );
  }, [favoriteTeams, storageReady]);

  useEffect(() => {
    if (!storageReady || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      FAVORITE_MATCHES_STORAGE_KEY,
      JSON.stringify(favoriteMatches)
    );
  }, [favoriteMatches, storageReady]);

  const allFixtures = useMemo(
    () => EPL_MATCH_SCHEDULE.flatMap((day) => day.fixtures),
    []
  );

  const upcomingFixtures = useMemo(
    () => allFixtures.filter((fixture) => fixture.status !== "finished"),
    [allFixtures]
  );

  const favoriteTeamFixtures = useMemo(
    () =>
      allFixtures.filter(
        (fixture) =>
          favoriteTeams.includes(fixture.home.teamId) ||
          favoriteTeams.includes(fixture.away.teamId)
      ),
    [allFixtures, favoriteTeams]
  );

  const favoriteMatchFixtures = useMemo(
    () => allFixtures.filter((fixture) => favoriteMatches.includes(fixture.id)),
    [allFixtures, favoriteMatches]
  );

  const featuredFixtures = useMemo(() => {
    const source = upcomingFixtures.length > 0 ? upcomingFixtures : allFixtures;
    return source.slice(0, 3);
  }, [upcomingFixtures, allFixtures]);

  const toggleFavoriteTeam = (teamId: string) => {
    setFavoriteTeams((previous) =>
      previous.includes(teamId)
        ? previous.filter((id) => id !== teamId)
        : [...previous, teamId]
    );
  };

  const toggleFavoriteMatch = (matchId: string) => {
    setFavoriteMatches((previous) =>
      previous.includes(matchId)
        ? previous.filter((id) => id !== matchId)
        : [...previous, matchId]
    );
  };

  const clearFavoriteTeams = () => {
    setFavoriteTeams([]);
  };

  const clearFavoriteMatches = () => {
    setFavoriteMatches([]);
  };

  const handleHoverTeam = (pos: number) => {
    setHoveredTeam(pos);
  };

  return (
    <div className='flex min-h-screen flex-col bg-slate-950 text-white'>
      <main className='flex-1'>
        <section className='mx-auto w-full max-w-7xl px-6 pb-16 pt-28 lg:px-12 xl:px-16'>
          <div className='mb-10 space-y-3'>
            {/* <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              EPL 정보 허브 (/test)
            </h1> */}
            <p className='text-base text-slate-400 sm:text-lg'>
              리그 순위, 주요 선수, 다가오는 경기를 먼저 살펴보고 관심 팀과
              경기를 즐겨찾기에 저장해 효율적으로 확인하세요.
            </p>
          </div>

          <div className='grid gap-10 xl:grid-cols-[1.7fr,1fr] xl:items-start'>
            <div className='space-y-10'>
              <div className='rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl'>
                <div className='flex items-center justify-between border-b border-white/10 px-8 py-6'>
                  <div>
                    <h2 className='text-2xl font-semibold text-white'>
                      리그 순위
                    </h2>
                    <p className='text-sm text-slate-400'>
                      팀 옆의 즐겨찾기 버튼을 눌러 관심 팀을 등록해 보세요.
                    </p>
                  </div>
                  <span className='inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-semibold text-emerald-200'>
                    <Star className='h-4 w-4' />
                    {favoriteTeams.length > 0
                      ? `${favoriteTeams.length}팀 즐겨찾음`
                      : "즐겨찾기 준비됨"}
                  </span>
                </div>
                <div className='scrollbar-slim overflow-x-auto'>
                  <LeagueBriefTable
                    rows={EPL_BRIEF_TABLE}
                    hoveredTeam={hoveredTeam}
                    onHover={handleHoverTeam}
                    onHoverEnd={() => setHoveredTeam(null)}
                    onFavorite={toggleFavoriteTeam}
                    favoriteTeamIds={favoriteTeams}
                  />
                </div>
              </div>

              {favoriteTeamFixtures.length > 0 && (
                <div className='rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-xl font-semibold text-white'>
                        관심 팀 경기 일정
                      </h3>
                      <p className='text-sm text-slate-400'>
                        즐겨찾기한 팀이 포함된 다음{" "}
                        {favoriteTeamFixtures.length}경기를 미리 체크하세요.
                      </p>
                    </div>
                    <CalendarClock className='h-6 w-6 text-emerald-300' />
                  </div>
                  <ul className='mt-6 space-y-4'>
                    {favoriteTeamFixtures.slice(0, 5).map((fixture) => {
                      const home = getClubDisplay(fixture.home.teamId);
                      const away = getClubDisplay(fixture.away.teamId);

                      return (
                        <li
                          key={fixture.id}
                          className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200'
                        >
                          <span className='font-semibold text-white'>
                            {home.shortName} vs {away.shortName}
                          </span>
                          <span className='text-slate-400'>
                            {kickoffSummaryFormatter.format(
                              new Date(fixture.kickoff)
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className='flex flex-col gap-8'>
              <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-2xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-xl font-semibold text-white'>
                      즐겨찾는 팀
                    </h2>
                    <p className='text-sm text-slate-400'>
                      자주 확인하고 싶은 팀을 관리하세요.
                    </p>
                  </div>
                  {favoriteTeams.length > 0 && (
                    <button
                      type='button'
                      onClick={clearFavoriteTeams}
                      className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-red-400/40 hover:text-red-200'
                    >
                      <Trash2 className='h-4 w-4' />
                      초기화
                    </button>
                  )}
                </div>
                <div className='mt-6 space-y-4'>
                  {favoriteTeams.length === 0 ? (
                    <p className='rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-slate-400'>
                      아직 즐겨찾기한 팀이 없습니다. 순위표에서 관심 팀을
                      선택하면 이곳에 모아볼 수 있어요.
                    </p>
                  ) : (
                    favoriteTeams.map((teamId) => {
                      const team = getClubDisplay(teamId);
                      const crest = TEAMS_BY_ID[teamId]?.crest ?? "⚽";
                      return (
                        <div
                          key={teamId}
                          className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3'
                        >
                          <div className='flex items-center gap-3'>
                            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#169976] to-teal-500 text-lg shadow-lg'>
                              {crest}
                            </span>
                            <div>
                              <p className='text-sm font-semibold text-white'>
                                {team.name}
                              </p>
                              <p className='text-xs text-slate-400'>
                                {team.shortName}
                              </p>
                            </div>
                          </div>
                          <button
                            type='button'
                            onClick={() => toggleFavoriteTeam(teamId)}
                            className='text-xs font-semibold text-emerald-300 transition-colors hover:text-emerald-200'
                          >
                            해제
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {favoriteMatchFixtures.length > 0 && (
                <div className='rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 shadow-2xl'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-xl font-semibold text-white'>
                        즐겨찾는 경기
                      </h2>
                      <p className='text-sm text-emerald-100'>
                        저장한 경기 일정은 홈에서 바로 확인할 수 있어요.
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={clearFavoriteMatches}
                      className='inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-300 hover:text-white'
                    >
                      <Trash2 className='h-4 w-4' />
                      전체 해제
                    </button>
                  </div>
                  <ul className='mt-6 space-y-4'>
                    {favoriteMatchFixtures.slice(0, 4).map((fixture) => {
                      const home = getClubDisplay(fixture.home.teamId);
                      const away = getClubDisplay(fixture.away.teamId);
                      return (
                        <li
                          key={fixture.id}
                          className='flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100'
                        >
                          <span className='font-semibold text-white'>
                            {home.shortName} vs {away.shortName}
                          </span>
                          <span>
                            {kickoffSummaryFormatter.format(
                              new Date(fixture.kickoff)
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-2xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-xl font-semibold text-white'>
                      득점왕 경쟁
                    </h2>
                    <p className='text-sm text-slate-400'>
                      올 시즌을 빛내고 있는 공격수들을 확인하세요.
                    </p>
                  </div>
                  <Trophy className='h-6 w-6 text-yellow-300' />
                </div>
                <div className='mt-6 space-y-4'>
                  {EPL_PLAYER_RANKINGS.map((player, index) => {
                    const team = TEAMS_BY_ID[player.teamId];
                    return (
                      <PlayerRankingCard
                        key={`${player.teamId}-${player.name}`}
                        player={player}
                        rank={index + 1}
                        teamName={team?.name ?? player.teamId.toUpperCase()}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 xl:px-16'>
          <EplLeaguePulse />
        </section>

        <section className='mx-auto w-full max-w-7xl px-6 pb-20 lg:px-12 xl:px-16'>
          <div className='rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl'>
            <div className='flex flex-col gap-3 border-b border-white/5 px-8 py-6 md:flex-row md:items-center md:justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-white'>
                  다가오는 경기
                </h2>
                <p className='text-sm text-slate-400'>
                  즐겨찾기한 경기는 카드 오른쪽 상단에서 확인할 수 있어요.
                </p>
              </div>
            </div>

            <div className='grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3'>
              {featuredFixtures.map((fixture: MatchFixture) => {
                const homeTeam = getClubDisplay(fixture.home.teamId);
                const awayTeam = getClubDisplay(fixture.away.teamId);

                return (
                  <MatchFixtureCard
                    key={fixture.id}
                    fixture={fixture}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    onToggleFavorite={toggleFavoriteMatch}
                    isFavorite={favoriteMatches.includes(fixture.id)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
