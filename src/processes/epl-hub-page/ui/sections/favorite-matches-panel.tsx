import Link from "next/link";
import { Trash2 } from "lucide-react";
import { MatchFixture } from "@/entities/match/model/match-schedule";
import { formatKickoffSummary, getClubDisplay } from "../../lib/club-display";
import { useTeams } from "@/shared/providers/teams-provider";
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
  const teamsById = useTeams();
  const t = useTranslations("home");

  if (fixtures.length === 0) {
    return null;
  }

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_18px_40px_rgba(2,6,23,0.35)] sm:p-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-white sm:text-xl'>
            {t("favoriteMatches.title")}
          </h2>
          <p className='text-xs text-slate-400 sm:text-sm'>
            {t("favoriteMatches.description")}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={`${basePath}/matches`}
            className='rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("favoriteMatches.viewAll")}
          </Link>
          <button
            type='button'
            onClick={onClear}
            aria-label={t("favoriteMatches.clearAll")}
            className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            <Trash2 className='h-3.5 w-3.5' aria-hidden='true' />
            <span className='hidden sm:inline'>{t("favoriteMatches.clearAll")}</span>
          </button>
        </div>
      </div>
      <ul className='mt-4 space-y-3 sm:mt-6 sm:space-y-4'>
        {fixtures.slice(0, 4).map((fixture) => {
          const home = getClubDisplay(fixture.home.teamId, teamsById, fixture.home.teamName);
          const away = getClubDisplay(fixture.away.teamId, teamsById, fixture.away.teamName);
          return (
            <li key={fixture.id}>
              <Link
                href={`${basePath}/matches/${encodeURIComponent(fixture.id)}`}
                className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-slate-400/30 hover:bg-slate-900/60'
              >
                <span className='font-semibold text-white'>
                  {home.shortName} vs {away.shortName}
                </span>
                <span>{formatKickoffSummary(fixture.kickoff)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
