import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { LeagueBriefRow } from "@/entities/league/ui/league-brief-row";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface LeagueBriefTableProps {
  rows: LeagueTableRow[];
  hoveredTeam: number | null;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
  onFavorite?: (teamId: string) => void;
  favoriteTeamIds?: string[];
}

export const LeagueBriefTable = ({
  rows,
  hoveredTeam,
  onHover,
  onHoverEnd,
  onFavorite,
  favoriteTeamIds,
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
      <thead className='bg-slate-800/30'>
        <tr>
          <th className='py-4 px-8 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            POS
          </th>
          <th className='py-4 px-8 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            Team
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            P
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            W
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            D
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            L
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            GD
          </th>
          <th className='py-4 px-4 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
            PTS
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const team = TEAMS_BY_ID[row.teamId];
          return (
            <LeagueBriefRow
              key={row.teamId}
              row={row}
              isHovered={hoveredTeam === row.pos}
              onHover={onHover}
              onHoverEnd={onHoverEnd}
              teamName={team?.name ?? row.teamId.toUpperCase()}
              teamCrest={team?.crest ?? "⚽"}
              onFavorite={onFavorite}
              isFavorite={favoriteTeamIds?.includes(row.teamId)}
            />
          );
        })}
      </tbody>
    </table>
  );
};
