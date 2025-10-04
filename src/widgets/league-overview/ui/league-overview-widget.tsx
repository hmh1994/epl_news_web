"use client";

import React, { useState } from "react";
import { Trophy, BarChart3, Globe, Zap, Star } from "lucide-react";
import {
  LeagueKey,
  LeagueSummary,
  LeagueTableRow,
  LeagueStat,
  LeagueChampion,
  SuccessfulClub,
} from "@/entities/league/model/league-overview";
import {
  EPL_BRIEF_TABLE,
  EPL_CHAMPIONS,
  EPL_STATS,
  EPL_TOP_CLUBS,
  LEAGUE_SUMMARIES,
} from "@/shared/mocks/league-overview";
import { LeagueSelector } from "@/features/league-overview/selector/ui/league-selector";
import { LeagueBriefTable } from "@/features/league-overview/table/ui/league-brief-table";
import { LeagueStatGrid } from "@/features/league-overview/stats/ui/league-stat-grid";
import { LeagueChampionsGrid } from "@/features/league-overview/champions/ui/league-champions-grid";
import { LeagueSuccessGrid } from "@/features/league-overview/clubs/ui/league-success-grid";

type LeagueTab = "table" | "stats" | "champions";

export const LeagueOverviewWidget = () => {
  const [activeLeague, setActiveLeague] = useState<LeagueKey>("EPL");
  const [activeTab, setActiveTab] = useState<LeagueTab>("table");
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);

  const leagueEntries = Object.entries(LEAGUE_SUMMARIES) as [
    LeagueKey,
    LeagueSummary
  ][];
  const maxGoals = Math.max(...leagueEntries.map(([, league]) => league.totalGoals));

  const eplTable: LeagueTableRow[] = EPL_BRIEF_TABLE;
  const eplChampions: LeagueChampion[] = EPL_CHAMPIONS;
  const leagueStats: LeagueStat[] = EPL_STATS;
  const topClubs: SuccessfulClub[] = EPL_TOP_CLUBS;

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      {/* Header */}
      <header className='fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-3xl border-b border-white/10 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-6'>
              <div className='relative'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-2xl shadow-2xl'>
                  ⚽
                </div>
                <div className='absolute -inset-1 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl blur opacity-40 animate-pulse'></div>
              </div>
              <div>
                <span className='text-4xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
                  League Central
                </span>
                <div className='text-sm text-slate-400 font-medium flex items-center space-x-2'>
                  <Globe className='w-4 h-4' />
                  <span>Global Football Intelligence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative pt-28 pb-20 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
          <div className='inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-4 text-sm font-semibold text-white/90 mb-8'>
            <Trophy className='w-5 h-5 text-yellow-400' />
            <span>Global League Analytics</span>
            <Zap className='w-4 h-4 text-yellow-400 animate-pulse' />
          </div>

          <h1 className='text-7xl md:text-8xl font-black mb-8 leading-none'>
            <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
              League
            </span>
            <br />
            <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              Intelligence
            </span>
          </h1>

          <p className='text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
            전 세계 주요 리그의 실시간 순위, 통계, 역사를 한눈에
          </p>
        </div>
      </section>

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        {/* League Selector */}
        <div className='mb-16'>
          <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <h2 className='text-2xl font-bold text-white mb-8 text-center'>
              Select League
            </h2>
            <LeagueSelector
              leagues={leagueEntries}
              activeLeague={activeLeague}
              onSelect={setActiveLeague}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='mb-12'>
          <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-2 border border-white/10 shadow-2xl'>
            <div className='flex gap-2'>
              {[
                { id: "table", name: "League Table", icon: "📊" },
                { id: "stats", name: "Statistics", icon: "📈" },
                { id: "champions", name: "Champions", icon: "🏆" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as LeagueTab)}
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

        {/* Tab Content */}
        {activeTab === "table" && (
          <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
            <div className='bg-slate-800/50 px-8 py-6 border-b border-white/10'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold text-white'>
                  Premier League Table
                </h3>
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

            <div className='overflow-x-auto'>
              <LeagueBriefTable
                rows={eplTable}
                hoveredTeam={hoveredTeam}
                onHover={setHoveredTeam}
                onHoverEnd={() => setHoveredTeam(null)}
              />
            </div>

          </div>
        )}

        {activeTab === "stats" && (
          <div className='space-y-12'>
            {/* Key Stats Cards */}
            <LeagueStatGrid stats={leagueStats} />

            {/* League Comparison */}
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
                        <span className='text-white font-semibold'>
                          {league.name}
                        </span>
                      </div>
                      <span className='text-slate-300 font-bold'>
                        {league.totalGoals} goals
                      </span>
                    </div>
                    <div className='w-full bg-slate-700/50 rounded-full h-4'>
                      <div
                        className={`h-4 rounded-full bg-gradient-to-r ${league.color} transition-all duration-1000`}
                        style={{
                          width: `${(league.totalGoals / maxGoals) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "champions" && (
          <div className='space-y-12'>
            <div className='text-center mb-8'>
              <h3 className='text-4xl font-black text-white mb-4'>
                Premier League Champions
              </h3>
              <p className='text-slate-400 text-lg'>역대 우승팀 기록</p>
            </div>

            <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <LeagueChampionsGrid champions={eplChampions} />
            </div>

            {/* Trophy Count Summary */}
            <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <Star className='w-6 h-6 text-yellow-400' />
                <span>Most Successful Clubs</span>
              </h3>
              <LeagueSuccessGrid clubs={topClubs} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
