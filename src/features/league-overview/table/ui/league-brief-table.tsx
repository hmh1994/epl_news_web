import { Fragment } from "react";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { LeagueBriefRow } from "@/entities/league/ui/league-brief-row";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface LeagueBriefTableProps {
  rows: LeagueTableRow[];
  hoveredTeam: number | null;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
}

export const LeagueBriefTable = ({
  rows,
  hoveredTeam,
  onHover,
  onHoverEnd,
}: LeagueBriefTableProps) => {
  return (
    <table className='w-full'>
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
        {rows.map((row, index) => {
          const team = TEAMS_BY_ID[row.teamId];
          return (
            <Fragment key={row.teamId}>
              <LeagueBriefRow
                row={row}
                isHovered={hoveredTeam === row.pos}
                onHover={onHover}
                onHoverEnd={onHoverEnd}
                teamName={team?.name ?? row.teamId.toUpperCase()}
                teamCrest={team?.crest ?? "⚽"}
              />
            {index === 4 && (
              <tr>
                <td colSpan={8} className='py-2 text-center'>
                  <div className='text-slate-500 text-sm'>• • •</div>
                </td>
              </tr>
            )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
