"use client";

import React from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  Calendar,
} from "lucide-react";
import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import { LeagueTableRow } from "@/entities/team/ui/league-table-row";
import { SortColumn } from "@/widgets/premium-epl-table/model/types";

type PremiumTableTableProps = {
  teams: LeagueTableTeam[];
  sortBy: SortColumn;
  sortOrder: "asc" | "desc";
  onSort: (column: SortColumn) => void;
  hoveredRow: number | null;
  onHover: (position: number) => void;
  onHoverEnd: () => void;
};

const getSortIcon = (column: SortColumn, sortBy: SortColumn, sortOrder: "asc" | "desc") => {
  if (sortBy !== column) {
    return (
      <ArrowUpDown className='w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity' />
    );
  }
  return sortOrder === "asc" ? (
    <ChevronUp className='w-4 h-4 text-emerald-400' />
  ) : (
    <ChevronDown className='w-4 h-4 text-emerald-400' />
  );
};

export const PremiumTableTable = ({
  teams,
  sortBy,
  sortOrder,
  onSort,
  hoveredRow,
  onHover,
  onHoverEnd,
}: PremiumTableTableProps) => (
  <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
    <div className='bg-slate-800/50 px-8 py-6 border-b border-white/10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <h2 className='text-2xl font-black text-white'>Premier League Table</h2>
          <div className='flex items-center space-x-2 text-sm text-slate-400'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Live Updated</span>
          </div>
        </div>
        <div className='flex items-center space-x-4 text-sm text-slate-400'>
          <div className='flex items-center space-x-2'>
            <Award className='w-4 h-4' />
            <span>Matchday 38</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Target className='w-4 h-4' />
            <span>{teams.length} Teams</span>
          </div>
        </div>
      </div>
    </div>

    <div className='scrollbar-slim overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-slate-800/30'>
          <tr>
            <th
              className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
              onClick={() => onSort("position")}
            >
              <div className='flex items-center space-x-3'>
                <span className='group-hover:text-white transition-colors'>Position</span>
                {getSortIcon("position", sortBy, sortOrder)}
              </div>
            </th>

            <th
              className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
              onClick={() => onSort("team")}
            >
              <div className='flex items-center space-x-3'>
                <span className='group-hover:text-white transition-colors'>Club</span>
                {getSortIcon("team", sortBy, sortOrder)}
              </div>
            </th>

            <th
              className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
              onClick={() => onSort("played")}
            >
              <div className='flex items-center justify-center space-x-2'>
                <span className='group-hover:text-white transition-colors'>PL</span>
                {getSortIcon("played", sortBy, sortOrder)}
              </div>
            </th>

            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>W</th>
            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>D</th>
            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>L</th>

            <th
              className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
              onClick={() => onSort("goalDifference")}
            >
              <div className='flex items-center justify-center space-x-2'>
                <span className='group-hover:text-white transition-colors'>GD</span>
                {getSortIcon("goalDifference", sortBy, sortOrder)}
              </div>
            </th>

            <th
              className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
              onClick={() => onSort("points")}
            >
              <div className='flex items-center justify-center space-x-2'>
                <span className='group-hover:text-white transition-colors'>PTS</span>
                {getSortIcon("points", sortBy, sortOrder)}
              </div>
            </th>

            <th className='text-center py-6 px-6 text-slate-300 font-bold text-sm uppercase tracking-wider'>Last 5</th>
            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>xG</th>
            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>Pass%</th>
            <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>Trend</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-white/5'>
          {teams.map((team, index) => (
            <React.Fragment key={team.team}>
              <LeagueTableRow
                team={team}
                isHovered={hoveredRow === team.position}
                onHover={onHover}
                onHoverEnd={onHoverEnd}
              />
              {index === 4 && (
                <tr>
                  <td colSpan={12} className='py-2 text-center'>
                    <div className='text-slate-500 text-sm'>• • •</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>

    <div className='bg-slate-800/50 px-8 py-6 border-t border-white/10'>
      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center space-x-6 text-slate-400'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            <span>총 {teams.length}개 팀</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Calendar className='w-4 h-4' />
            <span>마지막 업데이트: 방금 전</span>
          </div>
        </div>
        <div className='flex items-center space-x-8 text-slate-400'>
          <div className='flex items-center space-x-2'>
            <span>1-4위:</span>
            <span className='text-green-400 font-semibold'>Champions League</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>5-6위:</span>
            <span className='text-teal-400 font-semibold'>Europa League</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>18-20위:</span>
            <span className='text-red-400 font-semibold'>Championship</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
