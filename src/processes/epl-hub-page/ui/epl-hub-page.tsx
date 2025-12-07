"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import type { LeagueMetaMetric } from "@/shared/api/epl/model/types";
import { useTranslations } from "next-intl";
import { useFavorites } from "../lib/use-favorites";
import { FavoriteMatchesPanel } from "./sections/favorite-matches-panel";
import { FavoriteTeamFixturesSection } from "./sections/favorite-team-fixtures-section";
import { FavoriteTeamsPanel } from "./sections/favorite-teams-panel";
import { FeaturedMatchesSection } from "./sections/featured-matches-section";
import { LeagueInsightsSection } from "./sections/league-insights-section";
import { LeagueTableSection } from "./sections/league-table-section";
import { TopScorersPanel } from "./sections/top-scorers-panel";

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

            <div className='flex flex-col gap-8'>
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
            </div>
          </div>
        </section>

        <LeagueInsightsSection basePath={basePath} metrics={leagueMetrics} />

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
