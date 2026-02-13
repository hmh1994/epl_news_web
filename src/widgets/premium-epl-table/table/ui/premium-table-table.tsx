"use client";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  Calendar,
  Info,
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

const getSortIcon = (
  column: SortColumn,
  sortBy: SortColumn,
  sortOrder: "asc" | "desc"
) => {
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

const getAriaSort = (
  column: SortColumn,
  sortBy: SortColumn,
  sortOrder: "asc" | "desc"
) => {
  if (sortBy !== column) {
    return "none";
  }
  return sortOrder === "asc" ? "ascending" : "descending";
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
          <h2 className='text-2xl font-black text-white'>
            Premier League Table
          </h2>
          <div className='flex items-center space-x-2 text-sm text-slate-400'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>Live Updated</span>
          </div>
        </div>
        <div className='flex items-center space-x-4 text-sm text-slate-400'>
          <div className='flex items-center space-x-2'>
            <Award className='w-4 h-4' />
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
              scope='col'
              aria-sort={getAriaSort("position", sortBy, sortOrder)}
              className='text-left py-5 px-6 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("position")}
                className='group flex w-full items-center space-x-2 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  Position
                </span>
                {getSortIcon("position", sortBy, sortOrder)}
              </button>
            </th>

            <th
              scope='col'
              aria-sort={getAriaSort("team", sortBy, sortOrder)}
              className='text-left py-5 px-6 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("team")}
                className='group flex w-full items-center space-x-2 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  Club
                </span>
                {getSortIcon("team", sortBy, sortOrder)}
              </button>
            </th>

            <th
              scope='col'
              aria-sort={getAriaSort("played", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("played")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  PL
                </span>
                {getSortIcon("played", sortBy, sortOrder)}
              </button>
            </th>

            <th
              scope='col'
              aria-sort={getAriaSort("won", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("won")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  W
                </span>
                {getSortIcon("won", sortBy, sortOrder)}
              </button>
            </th>
            <th
              scope='col'
              aria-sort={getAriaSort("drawn", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("drawn")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  D
                </span>
                {getSortIcon("drawn", sortBy, sortOrder)}
              </button>
            </th>
            <th
              scope='col'
              aria-sort={getAriaSort("lost", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("lost")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  L
                </span>
                {getSortIcon("lost", sortBy, sortOrder)}
              </button>
            </th>

            <th
              scope='col'
              aria-sort={getAriaSort("goalDifference", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("goalDifference")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  GD
                </span>
                {getSortIcon("goalDifference", sortBy, sortOrder)}
              </button>
            </th>

            <th
              scope='col'
              aria-sort={getAriaSort("points", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("points")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  PTS
                </span>
                {getSortIcon("points", sortBy, sortOrder)}
              </button>
            </th>

            <th
              title='Expected goals (xG) based on shot quality and volume'
              scope='col'
              aria-sort={getAriaSort("xG", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("xG")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  xG
                </span>
                <Info className='w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors' />
                {getSortIcon("xG", sortBy, sortOrder)}
              </button>
            </th>
            <th
              scope='col'
              aria-sort={getAriaSort("passAccuracy", sortBy, sortOrder)}
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              <button
                type='button'
                onClick={() => onSort("passAccuracy")}
                className='group flex w-full items-center justify-center space-x-1.5 hover:text-white hover:bg-slate-700/30 transition-all duration-300 rounded-lg px-2 py-1 -mx-2'
              >
                <span className='group-hover:text-white transition-colors'>
                  Pass%
                </span>
                {getSortIcon("passAccuracy", sortBy, sortOrder)}
              </button>
            </th>
            <th
              scope='col'
              className='text-center py-5 px-4 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              Last 5
            </th>
            <th
              scope='col'
              className='text-center py-5 px-3 text-slate-300 font-bold text-xs uppercase tracking-wider'
            >
              Trend
            </th>
          </tr>
        </thead>

        <tbody className='divide-y divide-white/5'>
          {teams.map((team) => {
            return (
              <LeagueTableRow
                key={team.teamId}
                team={team}
                isHovered={hoveredRow === team.position}
                onHover={onHover}
                onHoverEnd={onHoverEnd}
                teamName={(team.teamName ?? team.teamId).toUpperCase()}
                teamShortName={(team.teamShortName ?? team.teamId).toUpperCase()}
                teamLogo={team.logo ?? ""}
              />
            );
          })}
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
            <span className='text-green-400 font-semibold'>
              Champions League
            </span>
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
