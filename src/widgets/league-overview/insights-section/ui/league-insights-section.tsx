"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { LeagueStat, SuccessfulClub } from "@/entities/league/model/league-overview";
import { LeagueStatGrid } from "@/features/league-overview/stats/ui/league-stat-grid";
import { LeagueSuccessGrid } from "@/features/league-overview/clubs/ui/league-success-grid";

type LeagueInsightsSectionProps = {
  stats: LeagueStat[];
  clubs: SuccessfulClub[];
};

export const LeagueInsightsSection = ({ stats, clubs }: LeagueInsightsSectionProps) => (
  <div className='space-y-12'>
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='text-4xl font-black text-white mb-3'>Premier League Snapshot</h3>
        <p className='text-slate-400 text-lg'>
          공격력, 관중 동원력, 수비 지표 등 이번 시즌 핵심 수치를 한눈에 확인하세요.
        </p>
      </div>
      <LeagueStatGrid stats={stats} />
    </div>

    <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
        <Sparkles className='w-6 h-6 text-emerald-400' />
        <span>클럽 포커스</span>
      </h3>
      <p className='text-slate-400 mb-6'>
        프리미어리그 우승 트로피를 가장 많이 들어 올린 명문 클럽들을 소개합니다.
      </p>
      <LeagueSuccessGrid clubs={clubs} />
    </div>
  </div>
);
