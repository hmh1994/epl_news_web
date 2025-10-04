"use client";

import React from "react";
import { BarChart3, Zap } from "lucide-react";
import { HERO_STATS } from "@/widgets/premium-epl-table/model/constants";

export const PremiumTableHero = () => (
  <section className='relative pt-28 pb-20 overflow-hidden'>
    <div className='absolute inset-0'>
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
      <div className='absolute top-0 left-0 w-full h-full opacity-30'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        <div className='absolute top-3/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000'></div>
      </div>
    </div>

    <div className='relative z-10 max-w-7xl mx-auto px-6'>
      <div className='text-center mb-16'>
        <div className='inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-4 text-sm font-semibold text-white/90 mb-8'>
          <BarChart3 className='w-5 h-5 text-emerald-400' />
          <span>Advanced Analytics Dashboard</span>
          <Zap className='w-4 h-4 text-yellow-400 animate-pulse' />
        </div>

        <h1 className='text-7xl md:text-8xl font-black mb-8 leading-none'>
          <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
            Premier League
          </span>
          <br />
          <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
            Intelligence
          </span>
        </h1>

        <p className='text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
          실시간 xG, 패스 정확도, 점유율까지 포함한 차세대 축구 데이터 분석
        </p>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'
            >
              <div className={`text-3xl font-black text-white mb-2 ${stat.valueClass}`}>
                {stat.value}
              </div>
              <div className='text-slate-400 text-sm'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
