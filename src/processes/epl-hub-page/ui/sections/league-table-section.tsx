import Link from "next/link";
import { useState } from "react";
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
  const t = useTranslations("home");

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl'>
      <div className='flex items-center justify-between border-b border-white/10 px-8 py-6'>
        <div>
          <h2 className='text-2xl font-semibold text-white'>
            {t("leagueTable.title")}
          </h2>
          <p className='text-sm text-slate-400'>
            {t("leagueTable.description")}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Link
            href={`${basePath}/teams`}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("leagueTable.viewAll")}
          </Link>
          <span className='inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-semibold text-emerald-200'>
            <Star className='h-4 w-4' />
            {favoriteTeams.length > 0
              ? t("leagueTable.favoritesCount", { count: favoriteTeams.length })
              : t("leagueTable.favoritesReady")}
          </span>
        </div>
      </div>
      <div className='scrollbar-slim overflow-x-auto'>
        <LeagueBriefTable
          rows={tableRows}
          hoveredTeam={hoveredTeam}
          onHover={setHoveredTeam}
          onHoverEnd={() => setHoveredTeam(null)}
          onFavorite={onToggleFavorite}
          favoriteTeamIds={favoriteTeams}
        />
      </div>
    </div>
  );
};
