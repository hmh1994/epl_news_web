import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { LeagueBriefRow } from "@/entities/league/ui/league-brief-row";

interface LeagueBriefTableProps {
  rows: LeagueTableRow[];
  hoveredTeam: number | null;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
  onFavorite?: (teamId: string) => void;
  favoriteTeamIds?: string[];
  onSelect?: (teamId: string) => void;
}

export const LeagueBriefTable = ({
  rows,
  hoveredTeam,
  onHover,
  onHoverEnd,
  onFavorite,
  favoriteTeamIds,
  onSelect,
}: LeagueBriefTableProps) => {
  return (
    <table className='w-full table-fixed'>
      <colgroup>
        <col className='w-20' />
        <col className='w-[32rem]' />
        <col className='w-16' />
        <col className='w-16' />
        <col className='w-16' />
        <col className='w-16' />
        <col className='w-20' />
        <col className='w-20' />
      </colgroup>
      <thead className='bg-slate-900/60 border-b border-white/5'>
        <tr>
          <th className='py-4 px-8 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            POS
          </th>
          <th className='py-4 px-8 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            Team
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            P
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            W
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            D
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            L
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            GD
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
            PTS
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <LeagueBriefRow
              key={row.teamId}
              row={row}
              isHovered={hoveredTeam === row.pos}
              onHover={onHover}
              onHoverEnd={onHoverEnd}
              teamName={row.team.toUpperCase()}
              teamLogo={row.logo}
              onFavorite={onFavorite}
              isFavorite={favoriteTeamIds?.includes(row.teamId)}
              onSelect={onSelect}
            />
          );
        })}
      </tbody>
    </table>
  );
};
