"use client";

import React from "react";
import { Star } from "lucide-react";
import { LeagueChampion, SuccessfulClub } from "@/entities/league/model/league-overview";
import { LeagueChampionsGrid } from "@/features/league-overview/champions/ui/league-champions-grid";
import { LeagueSuccessGrid } from "@/features/league-overview/clubs/ui/league-success-grid";

type LeagueChampionsSectionProps = {
  champions: LeagueChampion[];
  clubs: SuccessfulClub[];
};

export const LeagueChampionsSection = ({ champions, clubs }: LeagueChampionsSectionProps) => (
  <div className='space-y-12'>
    <div className='text-center mb-8'>
      <h3 className='text-4xl font-black text-white mb-4'>Premier League Champions</h3>
      <p className='text-slate-400 text-lg'>역대 우승팀 기록</p>
    </div>

    <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <LeagueChampionsGrid champions={champions} />
    </div>

    <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
        <Star className='w-6 h-6 text-yellow-400' />
        <span>Most Successful Clubs</span>
      </h3>
      <LeagueSuccessGrid clubs={clubs} />
    </div>
  </div>
);
