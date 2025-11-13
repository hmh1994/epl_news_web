"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LeagueBriefTable } from "@/features/league-overview/table/ui/league-brief-table";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { PlayerRankingCard } from "@/entities/player/ui/player-ranking-card";
import { MatchDaySchedule, MatchFixture } from "@/entities/match/model/match-schedule";
import { MatchFixtureCard } from "@/entities/match/ui/match-fixture-card";
import { CalendarClock, Star, Trash2, Trophy } from "lucide-react";
import { EplLeaguePulse } from "@/widgets/epl-hub/season-insights/ui/epl-league-pulse";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import type { LeagueMetaMetric } from "@/shared/api/epl/model/types";
import { useTranslations } from "next-intl";

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

interface EPLHubPageProps {
  tableRows: LeagueTableRow[];
  playerRankings: PlayerRanking[];
  schedule: MatchDaySchedule[];
  leagueMetrics: LeagueMetaMetric[];
}

export const EPLHubPage = ({
  tableRows,
  playerRankings,
  schedule,
  leagueMetrics,
}: EPLHubPageProps) => {
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const t = useTranslations("home");

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
    () => schedule.flatMap((day) => day.fixtures),
    [schedule]
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
              {t("intro.description")}
            </p>
          </div>

          <div className='grid gap-10 xl:grid-cols-[1.7fr,1fr] xl:items-start'>
            <div className='space-y-10'>
              <div className='rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl'>
                <div className='flex items-center justify-between border-b border-white/10 px-8 py-6'>
                  <div>
                    <h2 className='text-2xl font-semibold text-white'>
                      {t("leagueTable.title")}
                    </h2>
                    <p className='text-sm text-slate-400'>
                      {t("leagueTable.description")}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Link
                      href={`${basePath}/teams`}
                      className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
                    >
                      {t("leagueTable.viewAll")}
                    </Link>
                    <span className='inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-semibold text-emerald-200'>
                      <Star className='h-4 w-4' />
                      {favoriteTeams.length > 0
                        ? t("leagueTable.favoritesCount", {
                            count: favoriteTeams.length,
                          })
                        : t("leagueTable.favoritesReady")}
                    </span>
                  </div>
                </div>
                <div className='scrollbar-slim overflow-x-auto'>
                  <LeagueBriefTable
                    rows={tableRows}
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
                        {t("favoriteTeamFixtures.title")}
                      </h3>
                      <p className='text-sm text-slate-400'>
                        {t("favoriteTeamFixtures.description", {
                          count: favoriteTeamFixtures.length,
                        })}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Link
                        href={`${basePath}/matches`}
                        className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
                      >
                        {t("favoriteTeamFixtures.viewAll")}
                      </Link>
                      <CalendarClock className='h-6 w-6 text-emerald-300' />
                    </div>
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
                      {t("favoriteTeams.title")}
                    </h2>
                    <p className='text-sm text-slate-400'>
                      {t("favoriteTeams.description")}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Link
                      href={`${basePath}/teams/detail`}
                      className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-white'
                    >
                      {t("favoriteTeams.viewTeamInfo")}
                    </Link>
                    {favoriteTeams.length > 0 && (
                      <button
                        type='button'
                        onClick={clearFavoriteTeams}
                        className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-red-400/40 hover:text-red-200'
                      >
                        <Trash2 className='h-4 w-4' />
                        {t("favoriteTeams.clear")}
                      </button>
                    )}
                  </div>
                </div>
                <div className='mt-6 space-y-4'>
                  {favoriteTeams.length === 0 ? (
                    <p className='rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-slate-400'>
                      {t("favoriteTeams.empty")}
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
                            {t("favoriteTeams.remove")}
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
                      {t("favoriteMatches.title")}
                    </h2>
                    <p className='text-sm text-emerald-100'>
                      {t("favoriteMatches.description")}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Link
                      href={`${basePath}/matches`}
                      className='rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-300 hover:text-white'
                    >
                      {t("favoriteMatches.viewAll")}
                    </Link>
                    <button
                      type='button'
                      onClick={clearFavoriteMatches}
                      className='inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-300 hover:text-white'
                    >
                      <Trash2 className='h-4 w-4' />
                      {t("favoriteMatches.clearAll")}
                    </button>
                  </div>
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
                      {t("topScorers.title")}
                    </h2>
                    <p className='text-sm text-slate-400'>
                      {t("topScorers.description")}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Link
                      href={`${basePath}/players`}
                      className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
                    >
                      {t("topScorers.viewPlayers")}
                    </Link>
                    <Trophy className='h-6 w-6 text-yellow-300' />
                  </div>
                </div>
                <div className='mt-6 space-y-4'>
                  {playerRankings.map((player, index) => {
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
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold text-white'>
              {t("leagueInsights.title")}
            </h2>
            <Link
              href={`${basePath}/league`}
              className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
            >
              {t("leagueInsights.viewAll")}
            </Link>
          </div>
          <EplLeaguePulse metrics={leagueMetrics} />
        </section>

        <section className='mx-auto w-full max-w-7xl px-6 pb-20 lg:px-12 xl:px-16'>
          <div className='rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl'>
            <div className='flex flex-col gap-3 border-b border-white/5 px-8 py-6 md:flex-row md:items-center md:justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-white'>
                  {t("upcomingMatches.title")}
                </h2>
                <p className='text-sm text-slate-400'>
                  {t("upcomingMatches.description")}
                </p>
              </div>
              <Link
                href={`${basePath}/matches`}
                className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
              >
                {t("upcomingMatches.viewSchedule")}
              </Link>
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
