import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { LeagueBriefTable } from "@/features/league-overview/table/ui/league-brief-table";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeagueTableSectionProps {
  basePath: string;
  tableRows: LeagueTableRow[];
  favoriteTeams: string[];
  onToggleFavorite: (teamId: string) => void;
}

export const LeagueTableSection = ({
  basePath,
  tableRows,
  favoriteTeams,
  onToggleFavorite,
}: LeagueTableSectionProps) => {
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations("home");

  // rerender-functional-setstate: 인라인 화살표 함수는 매 렌더마다 새 참조를 생성합니다.
  // useCallback으로 안정적인 참조를 유지합니다.
  const handleHoverEnd = useCallback(() => setHoveredTeam(null), []);
  const handleTeamSelect = useCallback(
    (teamId: string) =>
      router.push(
        `${basePath}/teams/detail?teamId=${encodeURIComponent(teamId)}`
      ),
    [router, basePath]
  );

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
      <div className='flex flex-col gap-3 border-b border-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6'>
        <div>
          <h2 className='text-lg font-semibold text-white sm:text-2xl'>
            {t("leagueTable.title")}
          </h2>
          <p className='text-xs text-slate-400 sm:text-sm'>
            {t("leagueTable.description")}
          </p>
        </div>
        <div className='flex items-center gap-2 sm:gap-3'>
          <Link
            href={`${basePath}/teams`}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("leagueTable.viewAll")}
          </Link>
          <span className='inline-flex items-center gap-1.5 rounded-full border border-slate-400/20 bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-200 sm:gap-2 sm:px-4'>
            <Star className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
            <span className='hidden sm:inline'>
              {favoriteTeams.length > 0
                ? t("leagueTable.favoritesCount", { count: favoriteTeams.length })
                : t("leagueTable.favoritesReady")}
            </span>
            <span className='sm:hidden'>
              {favoriteTeams.length > 0 ? favoriteTeams.length : "0"}
            </span>
          </span>
        </div>
      </div>
      <div className='scrollbar-slim overflow-x-auto'>
        <LeagueBriefTable
          rows={tableRows}
          hoveredTeam={hoveredTeam}
          onHover={setHoveredTeam}
          onHoverEnd={handleHoverEnd}
          onFavorite={onToggleFavorite}
          favoriteTeamIds={favoriteTeams}
          onSelect={handleTeamSelect}
        />
      </div>
    </div>
  );
};
