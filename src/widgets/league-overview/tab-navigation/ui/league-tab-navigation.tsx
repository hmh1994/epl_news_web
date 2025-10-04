"use client";

import React from "react";
import { LeagueTab } from "@/widgets/league-overview/model/types";

type LeagueTabNavigationProps = {
  activeTab: LeagueTab;
  onTabChange: (tab: LeagueTab) => void;
};

const TABS: Array<{ id: LeagueTab; name: string; icon: string }> = [
  { id: "table", name: "League Table", icon: "📊" },
  { id: "stats", name: "Statistics", icon: "📈" },
  { id: "champions", name: "Champions", icon: "🏆" },
];

export const LeagueTabNavigation = ({ activeTab, onTabChange }: LeagueTabNavigationProps) => (
  <div className='mb-12'>
    <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-2 border border-white/10 shadow-2xl'>
      <div className='flex gap-2'>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-8 py-6 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#169976] to-teal-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className='flex flex-col items-center space-y-2'>
              <span className='text-2xl'>{tab.icon}</span>
              <span>{tab.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);
