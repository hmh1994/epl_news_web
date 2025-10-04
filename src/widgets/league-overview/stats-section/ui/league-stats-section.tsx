"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import { LeagueStat } from "@/entities/league/model/league-overview";
import { LeagueStatGrid } from "@/features/league-overview/stats/ui/league-stat-grid";
import { LeagueEntry } from "@/widgets/league-overview/model/types";

type LeagueStatsSectionProps = {
  stats: LeagueStat[];
  leagueEntries: LeagueEntry[];
  maxGoals: number;
};

export const LeagueStatsSection = ({
  stats,
  leagueEntries,
  maxGoals,
}: LeagueStatsSectionProps) => (
  <div className='space-y-12'>
    <LeagueStatGrid stats={stats} />

    <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <h3 className='text-2xl font-bold text-white mb-8 flex items-center space-x-3'>
        <BarChart3 className='w-6 h-6 text-emerald-400' />
        <span>League Comparison</span>
      </h3>
      <div className='space-y-6'>
        {leagueEntries.map(([key, league]) => (
          <div key={key} className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${league.color} flex items-center justify-center text-sm`}
                >
                  {league.logo}
                </div>
                <span className='text-white font-semibold'>{league.name}</span>
              </div>
              <span className='text-slate-300 font-bold'>{league.totalGoals} goals</span>
            </div>
            <div className='w-full bg-slate-700/50 rounded-full h-4'>
              <div
                className={`h-4 rounded-full bg-gradient-to-r ${league.color} transition-all duration-1000`}
                style={{ width: `${(league.totalGoals / maxGoals) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
