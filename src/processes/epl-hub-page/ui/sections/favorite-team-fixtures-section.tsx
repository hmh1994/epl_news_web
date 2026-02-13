import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { formatKickoffSummary, getClubDisplay } from "../../lib/club-display";
import { useTranslations } from "next-intl";

interface FavoriteTeamFixturesSectionProps {
  basePath: string;
  fixtures: MatchFixture[];
}

export const FavoriteTeamFixturesSection = ({
  basePath,
  fixtures,
}: FavoriteTeamFixturesSectionProps) => {
  const router = useRouter();
  const t = useTranslations("home");

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-white'>
            {t("favoriteTeamFixtures.title")}
          </h3>
          <p className='text-sm text-slate-400'>
            {t("favoriteTeamFixtures.description", {
              count: fixtures.length,
            })}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={`${basePath}/matches`}
            className='rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("favoriteTeamFixtures.viewAll")}
          </Link>
          <CalendarClock className='h-6 w-6 text-emerald-300' />
        </div>
      </div>
      <ul className='mt-6 space-y-4'>
        {fixtures.slice(0, 5).map((fixture) => {
          const home = getClubDisplay(fixture.home.teamId);
          const away = getClubDisplay(fixture.away.teamId);

          return (
            <li
              key={fixture.id}
              className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 cursor-pointer transition-colors hover:border-emerald-400/30 hover:bg-slate-900/60'
              onClick={() =>
                router.push(
                  `${basePath}/matches/${encodeURIComponent(fixture.id)}`
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push(
                    `${basePath}/matches/${encodeURIComponent(fixture.id)}`
                  );
                }
              }}
              role='button'
              tabIndex={0}
            >
              <span className='font-semibold text-white'>
                {home.shortName} vs {away.shortName}
              </span>
              <span className='text-slate-400'>
                {formatKickoffSummary(fixture.kickoff)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
