"use client";

import React from "react";
import { Trophy } from "lucide-react";

export const TeamInfoHero = () => (
  <section className='relative pt-28 pb-14'>
    <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
      <div className='inline-flex items-center space-x-3 rounded-full border border-white/10 bg-slate-900/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 mb-6'>
        <Trophy className='w-4 h-4 text-amber-200' />
        <span>Premier League Teams</span>
        <div className='w-2 h-2 bg-slate-300/70 rounded-full'></div>
      </div>

      <h1 className='text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight'>
        <span className='text-white'>Deep Team</span>
        <br />
        <span className='text-slate-200'>Analytics</span>
      </h1>

      <p className='text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed'>
        프리미어리그 20개 팀의 심층 분석과 실시간 데이터를 통해
        <br />축구의 새로운 차원을 경험하세요
      </p>
    </div>
  </section>
);
