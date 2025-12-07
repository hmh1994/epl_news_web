import Link from "next/link";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { MatchFixtureCard } from "@/entities/match/ui/match-fixture-card";
import { getClubDisplay } from "../../lib/club-display";
import { useTranslations } from "next-intl";

interface FeaturedMatchesSectionProps {
  basePath: string;
  fixtures: MatchFixture[];
  favoriteMatchIds: string[];
  onToggleFavorite: (matchId: string) => void;
}

export const FeaturedMatchesSection = ({
  basePath,
  fixtures,
  favoriteMatchIds,
  onToggleFavorite,
}: FeaturedMatchesSectionProps) => {
  const t = useTranslations("home");

  return (
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
          {fixtures.map((fixture) => {
            const homeTeam = getClubDisplay(fixture.home.teamId);
            const awayTeam = getClubDisplay(fixture.away.teamId);

            return (
              <MatchFixtureCard
                key={fixture.id}
                fixture={fixture}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favoriteMatchIds.includes(fixture.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
