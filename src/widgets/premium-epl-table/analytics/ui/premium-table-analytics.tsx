"use client";

import React from "react";
import { ANALYTICS_CARDS } from "@/widgets/premium-epl-table/model/constants";

export const PremiumTableAnalytics = () => (
  <div className='mt-20'>
    <div className='text-center mb-12'>
      <h2 className='text-4xl font-black text-white mb-4'>Season Analytics</h2>
      <p className='text-slate-400 text-lg'>심층 통계와 성과 지표</p>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {ANALYTICS_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl ${card.hoverShadowClass} hover:-translate-y-2 transition-all duration-500 cursor-pointer`} 
          >
            <div className='flex items-center justify-between mb-6'>
              <Icon className={`w-12 h-12 ${card.iconClass} group-hover:scale-110 transition-transform`} />
              <div className='text-right'>
                <div className={`text-3xl font-black text-white transition-colors ${card.valueClass}`}>
                  {card.value}
                </div>
                <div className={`${card.deltaClass} text-sm font-semibold`}>
                  {card.delta}
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-slate-400 font-medium'>{card.title}</div>
              <div className='text-slate-500 text-sm'>{card.description}</div>
              <div className='w-full bg-slate-700 rounded-full h-2'>
                <div className={`bg-gradient-to-r ${card.progressGradient} h-2 rounded-full ${card.progressWidth}`}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
