import Link from "next/link";
import { Trash2 } from "lucide-react";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { formatKickoffSummary, getClubDisplay } from "../../lib/club-display";
import { useTranslations } from "next-intl";

interface FavoriteMatchesPanelProps {
  basePath: string;
  fixtures: MatchFixture[];
  onClear: () => void;
}

export const FavoriteMatchesPanel = ({
  basePath,
  fixtures,
  onClear,
}: FavoriteMatchesPanelProps) => {
  const t = useTranslations("home");

  if (fixtures.length === 0) {
    return null;
  }

  return (
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
            onClick={onClear}
            className='inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-300 hover:text-white'
          >
            <Trash2 className='h-4 w-4' />
            {t("favoriteMatches.clearAll")}
          </button>
        </div>
      </div>
      <ul className='mt-6 space-y-4'>
        {fixtures.slice(0, 4).map((fixture) => {
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
              <span>{formatKickoffSummary(fixture.kickoff)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
