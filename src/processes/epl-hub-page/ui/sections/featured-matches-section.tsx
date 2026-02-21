import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
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
  const router = useRouter();
  const t = useTranslations("home");
  const matchweek = fixtures.length > 0 ? fixtures[0].matchweek : null;

  // js-set-map-lookups: includes()는 O(n)이므로 Set.has()로 O(1) 조회합니다.
  const favoriteMatchSet = useMemo(() => new Set(favoriteMatchIds), [favoriteMatchIds]);
  // rerender-functional-setstate: map 내부 인라인 함수를 useCallback으로 추출합니다.
  const handleMatchSelect = useCallback(
    (matchId: string) =>
      router.push(`${basePath}/matches/${encodeURIComponent(matchId)}`),
    [router, basePath]
  );

  return (
    <section className='mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-20 lg:px-12 xl:px-16'>
      <div className='rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
        <div className='flex flex-col gap-3 border-b border-white/5 px-4 py-4 sm:px-8 sm:py-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-3'>
            <div>
              <h2 className='text-lg font-semibold text-white sm:text-2xl'>
                {t("upcomingMatches.title")}
              </h2>
              <p className='text-sm text-slate-400'>
                {t("upcomingMatches.description")}
              </p>
            </div>
            {matchweek && (
              <span className='shrink-0 rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-300'>
                MW {matchweek}
              </span>
            )}
          </div>
          <Link
            href={`${basePath}/matches`}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("upcomingMatches.viewSchedule")}
          </Link>
        </div>

        <div className='grid gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3'>
          {fixtures.map((fixture) => {
            const homeTeam = getClubDisplay(fixture.home.teamId, fixture.home.teamName);
            const awayTeam = getClubDisplay(fixture.away.teamId, fixture.away.teamName);

            return (
              <MatchFixtureCard
                key={fixture.id}
                fixture={fixture}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favoriteMatchSet.has(fixture.id)}
                onSelect={handleMatchSelect}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
