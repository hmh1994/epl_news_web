"use client";

import React from "react";

type TeamInfoHeaderProps = {
  navItems?: Array<{ name: string; icon: string; active: boolean }>;
};

const DEFAULT_NAV_ITEMS = [
  { name: "홈", icon: "🏠", active: false },
  { name: "팀정보", icon: "🏆", active: true },
  { name: "선수정보", icon: "👤", active: false },
  { name: "리그정보", icon: "📊", active: false },
  { name: "통계", icon: "📈", active: false },
];

export const TeamInfoHeader = ({ navItems = DEFAULT_NAV_ITEMS }: TeamInfoHeaderProps) => (
  <header className='relative z-40 mt-16 bg-slate-900/95 backdrop-blur-2xl border-b border-slate-700/50 shadow-2xl rounded-3xl rounded-t-none lg:rounded-t-3xl'>
    <div className='max-w-7xl mx-auto px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-2xl'>
              ⚽
            </div>
            <div className='absolute -inset-1 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl blur opacity-30'></div>
          </div>
          <div>
            <span className='text-3xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
              EPL Hub
            </span>
            <div className='text-xs text-slate-400 font-medium'>Team Intelligence Center</div>
          </div>
        </div>

        <nav className='hidden md:flex space-x-1'>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`group relative px-6 py-3 rounded-2xl transition-all duration-300 overflow-hidden font-semibold ${
                item.active
                  ? "text-white bg-gradient-to-r from-[#169976]/30 via-emerald-600/30 to-teal-600/30 border border-emerald-500/40 shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className='relative flex items-center space-x-2'>
                <span className='text-lg'>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  </header>
);
