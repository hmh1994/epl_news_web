"use client";
import React, { useState } from "react";
import {
  Trophy,
  BarChart3,
  Users,
  Target,
  Crown,
  Globe,
  Zap,
  Star,
  Activity,
  Shield,
} from "lucide-react";

export const LeagueOverviewWidget = () => {
  const [activeLeague, setActiveLeague] = useState("EPL");
  const [activeTab, setActiveTab] = useState("table");
  const [hoveredTeam, setHoveredTeam] = useState(null);

  // 리그 데이터
  const leagues = {
    EPL: {
      name: "Premier League",
      country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      teams: 20,
      totalGoals: 1213,
      avgAttendance: 38181,
      marketValue: "€8.46B",
      color: "from-[#169976] to-teal-500",
      logo: "⚽",
    },
    LaLiga: {
      name: "La Liga",
      country: "🇪🇸",
      teams: 20,
      totalGoals: 1028,
      avgAttendance: 28963,
      marketValue: "€4.12B",
      color: "from-red-600 to-orange-600",
      logo: "🔥",
    },
    Bundesliga: {
      name: "Bundesliga",
      country: "🇩🇪",
      teams: 18,
      totalGoals: 896,
      avgAttendance: 42609,
      marketValue: "€3.89B",
      color: "from-red-500 to-yellow-500",
      logo: "🦅",
    },
    SerieA: {
      name: "Serie A",
      country: "🇮🇹",
      teams: 20,
      totalGoals: 1067,
      avgAttendance: 25080,
      marketValue: "€4.33B",
      color: "from-blue-600 to-green-600",
      logo: "🏛️",
    },
  };

  // EPL 팀 순위 (상위 5개 + 하위 3개만)
  const eplTable = [
    {
      pos: 1,
      team: "Manchester City",
      logo: "🏆",
      played: 38,
      won: 28,
      drawn: 5,
      lost: 5,
      gd: 62,
      pts: 89,
    },
    {
      pos: 2,
      team: "Arsenal",
      logo: "🔴",
      played: 38,
      won: 28,
      drawn: 5,
      lost: 5,
      gd: 62,
      pts: 89,
    },
    {
      pos: 3,
      team: "Liverpool",
      logo: "❤️",
      played: 38,
      won: 24,
      drawn: 10,
      lost: 4,
      gd: 45,
      pts: 82,
    },
    {
      pos: 4,
      team: "Aston Villa",
      logo: "🦁",
      played: 38,
      won: 20,
      drawn: 8,
      lost: 10,
      gd: 15,
      pts: 68,
    },
    {
      pos: 5,
      team: "Tottenham",
      logo: "🐓",
      played: 38,
      won: 20,
      drawn: 6,
      lost: 12,
      gd: 13,
      pts: 66,
    },
    {
      pos: 18,
      team: "Luton Town",
      logo: "🎩",
      played: 38,
      won: 6,
      drawn: 8,
      lost: 24,
      gd: -33,
      pts: 26,
    },
    {
      pos: 19,
      team: "Burnley",
      logo: "🔥",
      played: 38,
      won: 5,
      drawn: 9,
      lost: 24,
      gd: -37,
      pts: 24,
    },
    {
      pos: 20,
      team: "Sheffield Utd",
      logo: "⚔️",
      played: 38,
      won: 3,
      drawn: 7,
      lost: 28,
      gd: -69,
      pts: 16,
    },
  ];

  // 역대 우승팀 (최근 6개만)
  const eplChampions = [
    {
      year: "2023-24",
      team: "Manchester City",
      logo: "🏆",
      titles: 10,
      points: 89,
    },
    {
      year: "2022-23",
      team: "Manchester City",
      logo: "🏆",
      titles: 9,
      points: 89,
    },
    {
      year: "2021-22",
      team: "Manchester City",
      logo: "🏆",
      titles: 8,
      points: 93,
    },
    {
      year: "2020-21",
      team: "Manchester City",
      logo: "🏆",
      titles: 7,
      points: 86,
    },
    { year: "2019-20", team: "Liverpool", logo: "❤️", titles: 1, points: 99 },
    {
      year: "2018-19",
      team: "Manchester City",
      logo: "🏆",
      titles: 6,
      points: 98,
    },
  ];

  const getAccentStyles = (color) => {
    const palette = {
      green: {
        hoverText: "group-hover:text-green-400",
        text: "text-green-400",
        gradient: "from-green-400 to-emerald-500",
      },
      teal: {
        hoverText: "group-hover:text-teal-400",
        text: "text-teal-400",
        gradient: "from-[#169976] to-teal-500",
      },
      emerald: {
        hoverText: "group-hover:text-emerald-400",
        text: "text-emerald-400",
        gradient: "from-emerald-400 to-teal-500",
      },
      yellow: {
        hoverText: "group-hover:text-yellow-400",
        text: "text-yellow-400",
        gradient: "from-yellow-400 to-orange-500",
      },
    };

    return palette[color] ?? palette.green;
  };

  const getPositionColor = (pos) => {
    if (pos <= 4)
      return {
        bg: "bg-green-400/20 border-green-400/40",
        text: "text-green-400",
      };
    if (pos <= 6)
      return {
        bg: "bg-[#169976]/20 border-emerald-400/40",
        text: "text-teal-400",
      };
    if (pos >= 18)
      return { bg: "bg-red-400/20 border-red-400/40", text: "text-red-400" };
    return {
      bg: "bg-slate-400/20 border-slate-400/40",
      text: "text-slate-400",
    };
  };

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
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              {Object.entries(leagues).map(([key, league]) => (
                <button
                  key={key}
                  onClick={() => setActiveLeague(key)}
                  className={`group p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 ${
                    activeLeague === key
                      ? "bg-gradient-to-br from-[#169976]/20 to-teal-500/20 border-white/40 shadow-2xl"
                      : "bg-slate-800/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${league.color} flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform`}
                  >
                    {league.logo}
                  </div>
                  <h3 className='text-lg font-bold text-white mb-2'>
                    {league.name}
                  </h3>
                  <div className='text-2xl mb-2'>{league.country}</div>
                  <div className='text-slate-400 text-sm'>
                    {league.teams} Teams
                  </div>
                  <div className='text-slate-300 font-semibold text-sm mt-2'>
                    {league.marketValue}
                  </div>
                  {activeLeague === key && (
                    <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'>
                      <Crown className='w-4 h-4 text-white' />
                    </div>
                  )}
                </button>
              ))}
            </div>
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
                  onClick={() => setActiveTab(tab.id)}
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

            <table className='w-full'>
              <thead className='bg-slate-800/30'>
                <tr>
                  <th className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase'>
                    Pos
                  </th>
                  <th className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase'>
                    Club
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    PL
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    W
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    D
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    L
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    GD
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase'>
                    PTS
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {eplTable.map((team, idx) => {
                  const posStyle = getPositionColor(team.pos);
                  const isHovered = hoveredTeam === team.pos;
                  return (
                    <React.Fragment key={team.pos}>
                      <tr
                        className={`group transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "bg-white/10 scale-[1.02]"
                            : "hover:bg-white/5"
                        }`}
                        onMouseEnter={() => setHoveredTeam(team.pos)}
                        onMouseLeave={() => setHoveredTeam(null)}
                      >
                        <td className='py-6 px-8'>
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 ${
                              posStyle.bg
                            } ${posStyle.text} ${
                              isHovered ? "scale-110" : ""
                            } transition-transform`}
                          >
                            {team.pos}
                          </div>
                        </td>
                        <td className='py-6 px-8'>
                          <div className='flex items-center space-x-4'>
                            <div
                              className={`w-12 h-12 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                                isHovered ? "scale-110 rotate-3" : ""
                              } transition-all`}
                            >
                              {team.logo}
                            </div>
                            <span
                              className={`text-lg font-bold transition-colors ${
                                isHovered ? "text-emerald-300" : "text-white"
                              }`}
                            >
                              {team.team}
                            </span>
                          </div>
                        </td>
                        <td className='py-6 px-4 text-center text-slate-300 font-medium'>
                          {team.played}
                        </td>
                        <td className='py-6 px-4 text-center text-green-400 font-bold'>
                          {team.won}
                        </td>
                        <td className='py-6 px-4 text-center text-yellow-400 font-bold'>
                          {team.drawn}
                        </td>
                        <td className='py-6 px-4 text-center text-red-400 font-bold'>
                          {team.lost}
                        </td>
                        <td className='py-6 px-4 text-center'>
                          <span
                            className={`font-bold ${
                              team.gd > 0
                                ? "text-green-400"
                                : team.gd < 0
                                ? "text-red-400"
                                : "text-slate-400"
                            }`}
                          >
                            {team.gd > 0 ? "+" : ""}
                            {team.gd}
                          </span>
                        </td>
                        <td className='py-6 px-4 text-center'>
                          <div
                            className={`w-16 h-10 bg-gradient-to-r from-[#169976]/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-xl flex items-center justify-center ${
                              isHovered ? "scale-110" : ""
                            } transition-all`}
                          >
                            <span className='text-white font-black text-lg'>
                              {team.pts}
                            </span>
                          </div>
                        </td>
                      </tr>
                      {idx === 4 && (
                        <tr>
                          <td colSpan='8' className='py-2 text-center'>
                            <div className='text-slate-500 text-sm'>• • •</div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "stats" && (
          <div className='space-y-12'>
            {/* Key Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              {[
                {
                  icon: <Target className='w-12 h-12 text-green-400' />,
                  value: "1,213",
                  label: "Total Goals",
                  change: "+8.2%",
                  color: "green",
                },
                {
                  icon: <Activity className='w-12 h-12 text-teal-400' />,
                  value: "3.19",
                  label: "Goals/Match",
                  change: "+5.1%",
                  color: "teal",
                },
                {
                  icon: <Users className='w-12 h-12 text-emerald-400' />,
                  value: "38,181",
                  label: "Avg Attendance",
                  change: "+12%",
                  color: "emerald",
                },
                {
                  icon: <Shield className='w-12 h-12 text-yellow-400' />,
                  value: "216",
                  label: "Clean Sheets",
                  change: "+15%",
                  color: "yellow",
                },
              ].map((stat, idx) => {
                const accent = getAccentStyles(stat.color);
                return (
                  <div
                    key={idx}
                    className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:-translate-y-2 transition-all duration-500'
                  >
                    <div className='flex items-center justify-between mb-6'>
                      {stat.icon}
                      <div className='text-right'>
                        <div
                          className={`text-3xl font-black text-white transition-colors ${accent.hoverText}`}
                        >
                          {stat.value}
                        </div>
                        <div className={`${accent.text} text-sm font-semibold`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                    <div className='text-slate-400 font-medium'>
                      {stat.label}
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-2 mt-4'>
                      <div
                        className={`bg-gradient-to-r ${accent.gradient} h-2 rounded-full`}
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* League Comparison */}
            <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-8 flex items-center space-x-3'>
                <BarChart3 className='w-6 h-6 text-emerald-400' />
                <span>League Comparison</span>
              </h3>
              <div className='space-y-6'>
                {Object.entries(leagues).map(([key, league]) => (
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
                          width: `${(league.totalGoals / 1213) * 100}%`,
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
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {eplChampions.map((champion, idx) => (
                  <div
                    key={champion.year}
                    className='group relative p-6 bg-slate-800/30 rounded-2xl border border-white/10 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-orange-500/20 hover:border-yellow-400/40 hover:scale-105 transition-all duration-500 cursor-pointer'
                  >
                    {idx === 0 && (
                      <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'>
                        <Crown className='w-4 h-4 text-white' />
                      </div>
                    )}

                    <div className='flex items-center justify-between mb-4'>
                      <div className='text-2xl font-black text-white'>
                        {champion.year}
                      </div>
                      <div className='flex items-center space-x-2'>
                        {Array.from({
                          length: Math.min(champion.titles, 5),
                        }).map((_, i) => (
                          <Trophy key={i} className='w-4 h-4 text-yellow-400' />
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-4'>
                      <div className='w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
                        {champion.logo}
                      </div>
                      <div>
                        <div className='text-lg font-bold text-white group-hover:text-yellow-300 transition-colors'>
                          {champion.team}
                        </div>
                        <div className='text-slate-400 text-sm'>
                          {champion.titles} PL Titles
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                      <span className='text-slate-400 text-sm'>Points</span>
                      <span className='text-white font-bold text-xl'>
                        {champion.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trophy Count Summary */}
            <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <Star className='w-6 h-6 text-yellow-400' />
                <span>Most Successful Clubs</span>
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {[
                  {
                    team: "Manchester City",
                    logo: "🏆",
                    titles: 10,
                    color: "from-[#169976] to-teal-500",
                  },
                  {
                    team: "Manchester United",
                    logo: "👹",
                    titles: 13,
                    color: "from-red-400 to-pink-500",
                  },
                  {
                    team: "Chelsea",
                    logo: "💙",
                    titles: 5,
                    color: "from-blue-500 to-purple-500",
                  },
                ].map((club) => (
                  <div
                    key={club.team}
                    className='p-6 bg-slate-800/30 rounded-2xl border border-white/10 text-center'
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-2xl shadow-xl`}
                    >
                      {club.logo}
                    </div>
                    <h4 className='text-white font-bold text-lg mb-2'>
                      {club.team}
                    </h4>
                    <div className='text-3xl font-black text-yellow-400 mb-1'>
                      {club.titles}
                    </div>
                    <div className='text-slate-400 text-sm'>
                      Premier League Titles
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
