import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const t = useTranslations("home");

  if (fixtures.length === 0) {
    return null;
  }

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-white'>
            {t("favoriteMatches.title")}
          </h2>
          <p className='text-sm text-slate-400'>
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
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            <Trash2 className='h-4 w-4' aria-hidden='true' />
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
              className='flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-300 cursor-pointer transition-colors hover:border-emerald-400/30 hover:bg-slate-900/60'
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
              <span>{formatKickoffSummary(fixture.kickoff)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
