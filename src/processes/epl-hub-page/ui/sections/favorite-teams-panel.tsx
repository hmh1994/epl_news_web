import Link from "next/link";
import { Trash2 } from "lucide-react";
import { getClubDisplay } from "../../lib/club-display";
import { useTranslations } from "next-intl";

interface FavoriteTeamsPanelProps {
  basePath: string;
  favoriteTeams: string[];
  onToggleFavorite: (teamId: string) => void;
  onClear: () => void;
}

export const FavoriteTeamsPanel = ({
  basePath,
  favoriteTeams,
  onToggleFavorite,
  onClear,
}: FavoriteTeamsPanelProps) => {
  const t = useTranslations("home");

  return (
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
              onClick={onClear}
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
            const { name, shortName, crest } = getClubDisplay(teamId);
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
                    <p className='text-sm font-semibold text-white'>{name}</p>
                    <p className='text-xs text-slate-400'>{shortName}</p>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => onToggleFavorite(teamId)}
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
  );
};
