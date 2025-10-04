"use client";

import React from "react";

export const PremiumTableFooter = () => (
  <footer className='bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900 border-t border-white/10 mt-20'>
    <div className='max-w-7xl mx-auto px-6 py-16'>
      <div className='text-center'>
        <div className='flex items-center justify-center space-x-4 mb-8'>
          <div className='w-16 h-16 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-3xl shadow-2xl'>
            ⚽
          </div>
          <div>
            <span className='text-4xl font-black bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
              EPL Analytics
            </span>
            <div className='text-slate-400 text-sm'>Professional Football Intelligence</div>
          </div>
        </div>
        <p className='text-slate-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed'>
          프리미어리그의 모든 데이터와 통계를 실시간으로 분석하여 제공하는 차세대 축구 분석 플랫폼입니다. xG, 패스 정확도, 점유율 등 고급 메트릭으로 더 깊이 있는 축구를 경험하세요.
        </p>
        <div className='flex items-center justify-center space-x-8 text-sm text-slate-500'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span>실시간 업데이트</span>
          </div>
          <div>© 2024 EPL Analytics Platform</div>
          <div>Advanced Football Intelligence</div>
        </div>
      </div>
    </div>
  </footer>
);
