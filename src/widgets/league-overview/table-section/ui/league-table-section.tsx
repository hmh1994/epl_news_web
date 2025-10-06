"use client";

import React from "react";
import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { LeagueBriefTable } from "@/features/league-overview/table/ui/league-brief-table";

type LeagueTableSectionProps = {
  rows: LeagueTableRow[];
  hoveredTeam: number | null;
  onHover: (teamId: number) => void;
  onHoverEnd: () => void;
};

export const LeagueTableSection = ({
  rows,
  hoveredTeam,
  onHover,
  onHoverEnd,
}: LeagueTableSectionProps) => (
  <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
    <div className='bg-slate-800/50 px-8 py-6 border-b border-white/10'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-bold text-white'>Premier League Table</h3>
        <div className='flex items-center space-x-6 text-sm'>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full'></div>
            <span className='text-slate-400'>UCL</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-teal-400 rounded-full'></div>
            <span className='text-slate-400'>UEL</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-red-400 rounded-full'></div>
            <span className='text-slate-400'>Relegation</span>
          </div>
        </div>
      </div>
    </div>

    <div className='scrollbar-slim overflow-x-auto'>
      <LeagueBriefTable
        rows={rows}
        hoveredTeam={hoveredTeam}
        onHover={onHover}
        onHoverEnd={onHoverEnd}
      />
    </div>
  </div>
);
