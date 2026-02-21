"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import type { SeasonAnalyticsMetric } from "@/shared/api/epl/model/season-analytics";
import { useTranslations } from "next-intl";
import { useFavorites } from "../lib/use-favorites";
import { FavoriteMatchesPanel } from "./sections/favorite-matches-panel";
import { FavoriteTeamFixturesSection } from "./sections/favorite-team-fixtures-section";
import { FavoriteTeamsPanel } from "./sections/favorite-teams-panel";
import { FeaturedMatchesSection } from "./sections/featured-matches-section";
import { LeagueTableSection } from "./sections/league-table-section";
import { TopScorersPanel } from "./sections/top-scorers-panel";
import { SeasonInsightsPanel } from "./sections/season-insights-panel";

interface EPLHubPageProps {
  tableRows: LeagueTableRow[];
  playerRankings: PlayerRanking[];
  schedule: MatchDaySchedule[];
  seasonMetrics?: SeasonAnalyticsMetric[];
}

export const EPLHubPage = ({
  tableRows,
  playerRankings,
  schedule,
  seasonMetrics,
}: EPLHubPageProps) => {
  const {
    favoriteTeams,
    favoriteMatches,
    toggleFavoriteTeam,
    toggleFavoriteMatch,
    clearFavoriteTeams,
    clearFavoriteMatches,
  } = useFavorites();
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const t = useTranslations("home");

  const allFixtures = useMemo(
    () => schedule.flatMap((day) => day.fixtures),
    [schedule]
  );

  const upcomingFixtures = useMemo(
    () => allFixtures.filter((fixture) => fixture.status !== "finished"),
    [allFixtures]
  );

  // js-set-map-lookups: Array.includes()는 O(n)이므로 Set으로 변환하여 O(1) 조회합니다.
  const favoriteTeamSet = useMemo(() => new Set(favoriteTeams), [favoriteTeams]);
  const favoriteMatchSet = useMemo(() => new Set(favoriteMatches), [favoriteMatches]);

  const favoriteTeamFixtures = useMemo(
    () =>
      allFixtures.filter(
        (fixture) =>
          favoriteTeamSet.has(fixture.home.teamId) ||
          favoriteTeamSet.has(fixture.away.teamId)
      ),
    [allFixtures, favoriteTeamSet]
  );

  const favoriteMatchFixtures = useMemo(
    () => allFixtures.filter((fixture) => favoriteMatchSet.has(fixture.id)),
    [allFixtures, favoriteMatchSet]
  );

  const featuredFixtures = useMemo(() => {
    const source = upcomingFixtures.length > 0 ? upcomingFixtures : allFixtures;
    return source.slice(0, 3);
  }, [upcomingFixtures, allFixtures]);

  return (
    <div className='flex min-h-screen flex-col bg-slate-950 text-white bg-[radial-gradient(circle_at_20%_-10%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.1),transparent_40%)]'>
      <main className='flex-1'>
        <section className='mx-auto w-full max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-12 xl:px-16'>
          <div className='mb-6 space-y-3 sm:mb-10'>
            {/* <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              EPL 정보 허브 (/test)
            </h1> */}
            <p className='text-base text-slate-300 sm:text-lg'>
              {t("intro.description")}
            </p>
          </div>

          <div className='grid gap-6 sm:gap-8 xl:gap-12 xl:grid-cols-[1.7fr,1fr] xl:items-start'>
            <div className='space-y-6 sm:space-y-8 xl:space-y-12'>
              <LeagueTableSection
                basePath={basePath}
                tableRows={tableRows}
                favoriteTeams={favoriteTeams}
                onToggleFavorite={toggleFavoriteTeam}
              />

              {favoriteTeamFixtures.length > 0 && (
                <FavoriteTeamFixturesSection
                  basePath={basePath}
                  fixtures={favoriteTeamFixtures}
                />
              )}
            </div>

            <div className='flex flex-col gap-6 sm:gap-8 xl:gap-10'>
              <FavoriteTeamsPanel
                basePath={basePath}
                favoriteTeams={favoriteTeams}
                onToggleFavorite={toggleFavoriteTeam}
                onClear={clearFavoriteTeams}
              />

              <FavoriteMatchesPanel
                basePath={basePath}
                fixtures={favoriteMatchFixtures}
                onClear={clearFavoriteMatches}
              />

              <TopScorersPanel
                basePath={basePath}
                playerRankings={playerRankings}
              />

              {seasonMetrics && seasonMetrics.length > 0 && (
                <SeasonInsightsPanel metrics={seasonMetrics} />
              )}
            </div>
          </div>
        </section>

        <FeaturedMatchesSection
          basePath={basePath}
          fixtures={featuredFixtures}
          favoriteMatchIds={favoriteMatches}
          onToggleFavorite={toggleFavoriteMatch}
        />
      </main>
    </div>
  );
};
