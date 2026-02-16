import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const t = useTranslations("home");

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_18px_40px_rgba(2,6,23,0.35)] sm:p-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-white sm:text-xl'>
            {t("favoriteTeams.title")}
          </h2>
          <p className='text-xs text-slate-400 sm:text-sm'>
            {t("favoriteTeams.description")}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={`${basePath}/teams/detail`}
            className='rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("favoriteTeams.viewTeamInfo")}
          </Link>
          {favoriteTeams.length > 0 && (
            <button
              type='button'
              onClick={onClear}
              aria-label={t("favoriteTeams.clear")}
              className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-red-400/40 hover:text-red-200'
            >
              <Trash2 className='h-3.5 w-3.5' aria-hidden='true' />
              <span className='hidden sm:inline'>{t("favoriteTeams.clear")}</span>
            </button>
          )}
        </div>
      </div>
      <div className='mt-4 space-y-3 sm:mt-6 sm:space-y-4'>
        {favoriteTeams.length === 0 ? (
            <p className='rounded-2xl border border-dashed border-white/10 bg-slate-900/40 px-4 py-6 text-sm text-slate-400'>
              {t("favoriteTeams.empty")}
            </p>
          ) : (
          favoriteTeams.map((teamId) => {
            const { name, shortName, crest } = getClubDisplay(teamId);
            return (
              <div
                key={teamId}
                className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 cursor-pointer transition-colors hover:border-slate-400/30 hover:bg-slate-900/60'
                onClick={() =>
                  router.push(
                    `${basePath}/teams/detail?teamId=${encodeURIComponent(teamId)}`
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(
                      `${basePath}/teams/detail?teamId=${encodeURIComponent(teamId)}`
                    );
                  }
                }}
                role='button'
                tabIndex={0}
              >
                <div className='flex items-center gap-3'>
                  <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-lg border border-white/10'>
                    {crest}
                  </span>
                  <div>
                    <p className='text-sm font-semibold text-white'>{name}</p>
                    <p className='text-xs text-slate-400'>{shortName}</p>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onToggleFavorite(teamId);
                  }}
                  aria-label={`${t("favoriteTeams.remove")} ${name}`}
                  className='text-xs font-semibold text-slate-300 transition-colors hover:text-slate-200'
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
