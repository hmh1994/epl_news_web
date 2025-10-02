"use client";
import React, { useState, useEffect } from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Search,
  ArrowUpDown,
  Calendar,
  Users,
  Target,
  Award,
  BarChart3,
  Zap,
} from "lucide-react";

export const PremiumEPLTableWidget = () => {
  const [sortBy, setSortBy] = useState("position");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EPL 팀 데이터 (2023-24 시즌 기준) - 더욱 상세한 데이터
  const [teams] = useState([
    {
      position: 1,
      team: "Manchester City",
      shortName: "MCI",
      logo: "🏆",
      played: 38,
      won: 28,
      drawn: 5,
      lost: 5,
      goalsFor: 96,
      goalsAgainst: 34,
      goalDifference: 62,
      points: 89,
      form: ["W", "W", "D", "W", "W"],
      trend: 0,
      xG: 84.3,
      xGA: 31.2,
      possession: 68.5,
      passAccuracy: 91.2,
      cleanSheets: 18,
      bigChances: 127,
      value: "€1.26B",
    },
    {
      position: 2,
      team: "Arsenal",
      shortName: "ARS",
      logo: "🔴",
      played: 38,
      won: 28,
      drawn: 5,
      lost: 5,
      goalsFor: 91,
      goalsAgainst: 29,
      goalDifference: 62,
      points: 89,
      form: ["W", "L", "W", "W", "D"],
      trend: 1,
      xG: 82.7,
      xGA: 33.8,
      possession: 61.3,
      passAccuracy: 88.7,
      cleanSheets: 16,
      bigChances: 119,
      value: "€2.26B",
    },
    {
      position: 3,
      team: "Liverpool",
      shortName: "LIV",
      logo: "❤️",
      played: 38,
      won: 24,
      drawn: 10,
      lost: 4,
      goalsFor: 86,
      goalsAgainst: 41,
      goalDifference: 45,
      points: 82,
      form: ["W", "D", "W", "W", "L"],
      trend: 2,
      xG: 79.4,
      xGA: 38.9,
      possession: 62.1,
      passAccuracy: 87.9,
      cleanSheets: 20,
      bigChances: 108,
      value: "€4.45B",
    },
    {
      position: 4,
      team: "Aston Villa",
      shortName: "AVL",
      logo: "🦁",
      played: 38,
      won: 20,
      drawn: 8,
      lost: 10,
      goalsFor: 76,
      goalsAgainst: 61,
      goalDifference: 15,
      points: 68,
      form: ["W", "W", "L", "D", "W"],
      trend: 3,
      xG: 69.2,
      xGA: 58.7,
      possession: 54.8,
      passAccuracy: 82.3,
      cleanSheets: 11,
      bigChances: 89,
      value: "€1.15B",
    },
    {
      position: 5,
      team: "Tottenham Hotspur",
      shortName: "TOT",
      logo: "🐓",
      played: 38,
      won: 20,
      drawn: 6,
      lost: 12,
      goalsFor: 74,
      goalsAgainst: 61,
      goalDifference: 13,
      points: 66,
      form: ["W", "W", "L", "D", "W"],
      trend: -1,
      xG: 71.8,
      xGA: 55.4,
      possession: 59.4,
      passAccuracy: 86.1,
      cleanSheets: 13,
      bigChances: 92,
      value: "€2.35B",
    },
    {
      position: 6,
      team: "Chelsea",
      shortName: "CHE",
      logo: "💙",
      played: 38,
      won: 18,
      drawn: 9,
      lost: 11,
      goalsFor: 77,
      goalsAgainst: 63,
      goalDifference: 14,
      points: 63,
      form: ["W", "D", "W", "L", "W"],
      trend: 2,
      xG: 73.5,
      xGA: 59.2,
      possession: 55.7,
      passAccuracy: 83.2,
      cleanSheets: 9,
      bigChances: 98,
      value: "€3.10B",
    },
    {
      position: 7,
      team: "Newcastle United",
      shortName: "NEW",
      logo: "⚫",
      played: 38,
      won: 18,
      drawn: 6,
      lost: 14,
      goalsFor: 85,
      goalsAgainst: 62,
      goalDifference: 23,
      points: 60,
      form: ["L", "W", "D", "W", "L"],
      trend: -3,
      xG: 67.3,
      xGA: 52.8,
      possession: 51.2,
      passAccuracy: 81.4,
      cleanSheets: 12,
      bigChances: 78,
      value: "€1.85B",
    },
    {
      position: 8,
      team: "Manchester United",
      shortName: "MUN",
      logo: "👹",
      played: 38,
      won: 18,
      drawn: 6,
      lost: 14,
      goalsFor: 57,
      goalsAgainst: 58,
      goalDifference: -1,
      points: 60,
      form: ["D", "W", "L", "W", "W"],
      trend: -2,
      xG: 61.4,
      xGA: 54.7,
      possession: 58.9,
      passAccuracy: 85.4,
      cleanSheets: 17,
      bigChances: 71,
      value: "€6.55B",
    },
    {
      position: 9,
      team: "West Ham United",
      shortName: "WHU",
      logo: "⚒️",
      played: 38,
      won: 14,
      drawn: 10,
      lost: 14,
      goalsFor: 60,
      goalsAgainst: 74,
      goalDifference: -14,
      points: 52,
      form: ["L", "D", "W", "L", "D"],
      trend: 1,
      xG: 58.9,
      xGA: 69.3,
      possession: 48.7,
      passAccuracy: 79.8,
      cleanSheets: 8,
      bigChances: 65,
      value: "€850M",
    },
    {
      position: 10,
      team: "Crystal Palace",
      shortName: "CRY",
      logo: "🦅",
      played: 38,
      won: 13,
      drawn: 10,
      lost: 15,
      goalsFor: 57,
      goalsAgainst: 58,
      goalDifference: -1,
      points: 49,
      form: ["W", "L", "D", "W", "L"],
      trend: 0,
      xG: 52.7,
      xGA: 55.1,
      possession: 47.3,
      passAccuracy: 78.4,
      cleanSheets: 10,
      bigChances: 59,
      value: "€720M",
    },
    {
      position: 11,
      team: "Brighton & Hove Albion",
      shortName: "BHA",
      logo: "⚪",
      played: 38,
      won: 12,
      drawn: 12,
      lost: 14,
      goalsFor: 55,
      goalsAgainst: 62,
      goalDifference: -7,
      points: 48,
      form: ["D", "W", "L", "D", "W"],
      trend: -4,
      xG: 58.3,
      xGA: 57.9,
      possession: 56.8,
      passAccuracy: 84.1,
      cleanSheets: 9,
      bigChances: 72,
      value: "€950M",
    },
    {
      position: 12,
      team: "Bournemouth",
      shortName: "BOU",
      logo: "🍒",
      played: 38,
      won: 13,
      drawn: 9,
      lost: 16,
      goalsFor: 54,
      goalsAgainst: 67,
      goalDifference: -13,
      points: 48,
      form: ["L", "W", "W", "L", "D"],
      trend: 1,
      xG: 51.4,
      xGA: 63.2,
      possession: 45.9,
      passAccuracy: 76.7,
      cleanSheets: 7,
      bigChances: 58,
      value: "€520M",
    },
    {
      position: 13,
      team: "Fulham",
      shortName: "FUL",
      logo: "⚪",
      played: 38,
      won: 13,
      drawn: 8,
      lost: 17,
      goalsFor: 55,
      goalsAgainst: 61,
      goalDifference: -6,
      points: 47,
      form: ["W", "D", "L", "W", "L"],
      trend: -1,
      xG: 49.8,
      xGA: 58.6,
      possession: 49.2,
      passAccuracy: 80.3,
      cleanSheets: 11,
      bigChances: 62,
      value: "€680M",
    },
    {
      position: 14,
      team: "Wolverhampton Wanderers",
      shortName: "WOL",
      logo: "🐺",
      played: 38,
      won: 13,
      drawn: 7,
      lost: 18,
      goalsFor: 50,
      goalsAgainst: 65,
      goalDifference: -15,
      points: 46,
      form: ["L", "L", "W", "D", "L"],
      trend: -2,
      xG: 48.2,
      xGA: 59.7,
      possession: 46.8,
      passAccuracy: 77.9,
      cleanSheets: 8,
      bigChances: 55,
      value: "€590M",
    },
    {
      position: 15,
      team: "Everton",
      shortName: "EVE",
      logo: "🔵",
      played: 38,
      won: 13,
      drawn: 9,
      lost: 16,
      goalsFor: 40,
      goalsAgainst: 57,
      goalDifference: -17,
      points: 40,
      form: ["D", "L", "W", "L", "D"],
      trend: 0,
      xG: 44.7,
      xGA: 54.3,
      possession: 44.1,
      passAccuracy: 75.6,
      cleanSheets: 13,
      bigChances: 47,
      value: "€750M",
    },
    {
      position: 16,
      team: "Brentford",
      shortName: "BRE",
      logo: "🐝",
      played: 38,
      won: 10,
      drawn: 9,
      lost: 19,
      goalsFor: 56,
      goalsAgainst: 65,
      goalDifference: -9,
      points: 39,
      form: ["W", "L", "L", "D", "W"],
      trend: 1,
      xG: 50.1,
      xGA: 61.8,
      possession: 42.7,
      passAccuracy: 74.2,
      cleanSheets: 6,
      bigChances: 61,
      value: "€480M",
    },
    {
      position: 17,
      team: "Nottingham Forest",
      shortName: "NFO",
      logo: "🌳",
      played: 38,
      won: 9,
      drawn: 9,
      lost: 20,
      goalsFor: 49,
      goalsAgainst: 67,
      goalDifference: -18,
      points: 32,
      form: ["L", "D", "W", "L", "L"],
      trend: -1,
      xG: 45.3,
      xGA: 62.4,
      possession: 41.9,
      passAccuracy: 73.8,
      cleanSheets: 7,
      bigChances: 52,
      value: "€420M",
    },
    {
      position: 18,
      team: "Luton Town",
      shortName: "LUT",
      logo: "🎩",
      played: 38,
      won: 6,
      drawn: 8,
      lost: 24,
      goalsFor: 52,
      goalsAgainst: 85,
      goalDifference: -33,
      points: 26,
      form: ["L", "L", "D", "L", "W"],
      trend: 0,
      xG: 41.8,
      xGA: 73.2,
      possession: 38.4,
      passAccuracy: 69.7,
      cleanSheets: 4,
      bigChances: 43,
      value: "€180M",
    },
    {
      position: 19,
      team: "Burnley",
      shortName: "BUR",
      logo: "🔥",
      played: 38,
      won: 5,
      drawn: 9,
      lost: 24,
      goalsFor: 41,
      goalsAgainst: 78,
      goalDifference: -37,
      points: 24,
      form: ["L", "L", "L", "D", "L"],
      trend: -1,
      xG: 39.4,
      xGA: 69.8,
      possession: 40.2,
      passAccuracy: 71.3,
      cleanSheets: 5,
      bigChances: 38,
      value: "€220M",
    },
    {
      position: 20,
      team: "Sheffield United",
      shortName: "SHU",
      logo: "⚔️",
      played: 38,
      won: 3,
      drawn: 7,
      lost: 28,
      goalsFor: 35,
      goalsAgainst: 104,
      goalDifference: -69,
      points: 16,
      form: ["L", "L", "L", "L", "D"],
      trend: 0,
      xG: 34.7,
      xGA: 82.9,
      possession: 37.1,
      passAccuracy: 68.2,
      cleanSheets: 2,
      bigChances: 29,
      value: "€150M",
    },
  ]);

  // 정렬된 팀 목록
  const sortedTeams = [...teams]
    .filter(
      (team) =>
        team.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortBy === "team") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return (
        <ArrowUpDown className='w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity' />
      );
    }
    return sortOrder === "asc" ? (
      <ChevronUp className='w-4 h-4 text-emerald-400' />
    ) : (
      <ChevronDown className='w-4 h-4 text-emerald-400' />
    );
  };

  const getTrendIcon = (trend) => {
    if (trend > 0)
      return (
        <div className='flex items-center space-x-1'>
          <TrendingUp className='w-4 h-4 text-green-400' />
          <span className='text-xs font-medium text-green-400'>+{trend}</span>
        </div>
      );
    if (trend < 0)
      return (
        <div className='flex items-center space-x-1'>
          <TrendingDown className='w-4 h-4 text-red-400' />
          <span className='text-xs font-medium text-red-400'>{trend}</span>
        </div>
      );
    return (
      <div className='flex items-center justify-center'>
        <div className='w-4 h-0.5 bg-slate-500 rounded-full'></div>
      </div>
    );
  };

  const getPositionStyle = (position) => {
    if (position <= 4)
      return {
        bg: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/40",
        text: "text-green-400",
        glow: "shadow-green-400/20",
      };
    if (position <= 6)
      return {
        bg: "bg-gradient-to-r from-[#169976]/20 to-teal-500/20 border-emerald-400/40",
        text: "text-teal-400",
        glow: "shadow-emerald-400/20",
      };
    if (position >= 18)
      return {
        bg: "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/40",
        text: "text-red-400",
        glow: "shadow-red-400/20",
      };
    return {
      bg: "bg-slate-700/30 border-slate-500/30",
      text: "text-slate-400",
      glow: "shadow-slate-400/10",
    };
  };

  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      {/* Enhanced Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-slate-900/80 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
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
                  EPL Analytics
                </span>
                <div className='text-sm text-slate-400 font-medium flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <span>Live Premier League Data</span>
                </div>
              </div>
            </div>

            <div className='hidden lg:flex items-center space-x-8 text-sm'>
              <div className='flex items-center space-x-2 text-slate-300'>
                <Calendar className='w-4 h-4' />
                <span>2023-24 Season</span>
              </div>
              <div className='flex items-center space-x-2 text-slate-300'>
                <Users className='w-4 h-4' />
                <span>20 Teams</span>
              </div>
              <div className='flex items-center space-x-2 text-slate-300'>
                <Trophy className='w-4 h-4' />
                <span>380 Matches</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
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

            {/* Key Stats Preview */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'>
                <div className='text-3xl font-black text-green-400 mb-2'>
                  1,213
                </div>
                <div className='text-slate-400 text-sm'>총 득점</div>
              </div>
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'>
                <div className='text-3xl font-black text-teal-400 mb-2'>
                  3.19
                </div>
                <div className='text-slate-400 text-sm'>경기당 평균골</div>
              </div>
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'>
                <div className='text-3xl font-black text-emerald-400 mb-2'>
                  82.4%
                </div>
                <div className='text-slate-400 text-sm'>평균 패스성공률</div>
              </div>
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'>
                <div className='text-3xl font-black text-yellow-400 mb-2'>
                  216
                </div>
                <div className='text-slate-400 text-sm'>총 클린시트</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-6 pb-20'>
        {/* Advanced Controls */}
        <div className='mb-12'>
          <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='relative flex-1'>
                <Search className='absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='팀 또는 약어로 검색 (예: Arsenal, ARS)...'
                  className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-14 pr-5 py-5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-lg'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className='flex flex-wrap gap-4 items-center'>
                <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
                  <div className='w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50'></div>
                  <span className='text-slate-300 font-medium text-sm'>
                    Champions League
                  </span>
                </div>
                <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
                  <div className='w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-emerald-400/50'></div>
                  <span className='text-slate-300 font-medium text-sm'>
                    Europa League
                  </span>
                </div>
                <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
                  <div className='w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50'></div>
                  <span className='text-slate-300 font-medium text-sm'>
                    Relegation Zone
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Table */}
        <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
          {/* Table Header Info */}
          <div className='bg-slate-800/50 px-8 py-6 border-b border-white/10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                <h2 className='text-2xl font-black text-white'>
                  Premier League Table
                </h2>
                <div className='flex items-center space-x-2 text-sm text-slate-400'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <span>Live Updated</span>
                </div>
              </div>
              <div className='flex items-center space-x-4 text-sm text-slate-400'>
                <div className='flex items-center space-x-2'>
                  <Award className='w-4 h-4' />
                  <span>Matchday 38</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Target className='w-4 h-4' />
                  <span>{sortedTeams.length} Teams</span>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-800/30'>
                <tr>
                  {/* Position */}
                  <th
                    className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
                    onClick={() => handleSort("position")}
                  >
                    <div className='flex items-center space-x-3'>
                      <span className='group-hover:text-white transition-colors'>
                        Position
                      </span>
                      {getSortIcon("position")}
                    </div>
                  </th>

                  {/* Team */}
                  <th
                    className='text-left py-6 px-8 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
                    onClick={() => handleSort("team")}
                  >
                    <div className='flex items-center space-x-3'>
                      <span className='group-hover:text-white transition-colors'>
                        Club
                      </span>
                      {getSortIcon("team")}
                    </div>
                  </th>

                  {/* Played */}
                  <th
                    className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
                    onClick={() => handleSort("played")}
                  >
                    <div className='flex items-center justify-center space-x-2'>
                      <span className='group-hover:text-white transition-colors'>
                        PL
                      </span>
                      {getSortIcon("played")}
                    </div>
                  </th>

                  {/* Goal Difference */}
                  <th
                    className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
                    onClick={() => handleSort("goalDifference")}
                  >
                    <div className='flex items-center justify-center space-x-2'>
                      <span className='group-hover:text-white transition-colors'>
                        GD
                      </span>
                      {getSortIcon("goalDifference")}
                    </div>
                  </th>

                  {/* Points */}
                  <th
                    className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider cursor-pointer group hover:bg-slate-700/30 transition-all duration-300'
                    onClick={() => handleSort("points")}
                  >
                    <div className='flex items-center justify-center space-x-2'>
                      <span className='group-hover:text-white transition-colors'>
                        PTS
                      </span>
                      {getSortIcon("points")}
                    </div>
                  </th>

                  {/* Form */}
                  <th className='text-center py-6 px-6 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    Last 5
                  </th>

                  {/* Advanced Stats */}
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    xG
                  </th>

                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    Pass%
                  </th>

                  {/* Trend */}
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    Trend
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-white/5'>
                {sortedTeams.map((team) => {
                  const posStyle = getPositionStyle(team.position);
                  const isHovered = hoveredRow === team.position;

                  return (
                    <tr
                      key={team.position}
                      className={`group transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? "bg-white/10 scale-[1.01] shadow-2xl"
                          : "hover:bg-white/5"
                      }`}
                      onMouseEnter={() => setHoveredRow(team.position)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* Position */}
                      <td className='py-8 px-8'>
                        <div className='flex items-center space-x-4'>
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border-2 shadow-lg transition-all duration-300 ${
                              posStyle.bg
                            } ${posStyle.text} ${posStyle.glow} ${
                              isHovered ? "scale-110 shadow-xl" : ""
                            }`}
                          >
                            {team.position}
                          </div>
                          {team.position === 1 && (
                            <div className='w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                              <Trophy className='w-3 h-3 text-white' />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Team */}
                      <td className='py-8 px-8'>
                        <div className='flex items-center space-x-5'>
                          <div
                            className={`w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-2xl shadow-xl transition-all duration-300 ${
                              isHovered ? "scale-110 rotate-3" : ""
                            }`}
                          >
                            {team.logo}
                          </div>
                          <div>
                            <div
                              className={`text-xl font-bold transition-colors duration-300 ${
                                isHovered ? "text-emerald-300" : "text-white"
                              }`}
                            >
                              {team.team}
                            </div>
                            <div className='text-slate-400 text-sm font-medium'>
                              {team.shortName}
                            </div>
                            <div className='text-slate-500 text-xs'>
                              {team.value}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Played */}
                      <td className='py-8 px-4 text-center'>
                        <div className='bg-slate-700/30 rounded-xl px-3 py-2 inline-block'>
                          <span className='text-slate-300 font-semibold'>
                            {team.played}
                          </span>
                        </div>
                      </td>

                      {/* Goal Difference */}
                      <td className='py-8 px-4 text-center'>
                        <div
                          className={`font-black text-xl px-3 py-2 rounded-xl inline-block ${
                            team.goalDifference > 0
                              ? "text-green-400 bg-green-400/10"
                              : team.goalDifference < 0
                              ? "text-red-400 bg-red-400/10"
                              : "text-slate-400 bg-slate-400/10"
                          }`}
                        >
                          {team.goalDifference > 0 ? "+" : ""}
                          {team.goalDifference}
                        </div>
                      </td>

                      {/* Points */}
                      <td className='py-8 px-4 text-center'>
                        <div
                          className={`w-20 h-14 bg-gradient-to-r from-[#169976]/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                            isHovered ? "scale-110 shadow-emerald-400/50" : ""
                          }`}
                        >
                          <span className='text-white font-black text-xl'>
                            {team.points}
                          </span>
                        </div>
                      </td>

                      {/* Form */}
                      <td className='py-8 px-6'>
                        <div className='flex justify-center space-x-2'>
                          {team.form.map((result, i) => (
                            <div
                              key={i}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 hover:scale-110 ${
                                result === "W"
                                  ? "bg-green-500 text-white shadow-green-500/50"
                                  : result === "D"
                                  ? "bg-yellow-500 text-white shadow-yellow-500/50"
                                  : "bg-red-500 text-white shadow-red-500/50"
                              }`}
                            >
                              {result}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* xG */}
                      <td className='py-8 px-4 text-center'>
                        <div className='space-y-1'>
                          <div className='text-white font-bold'>{team.xG}</div>
                          <div className='text-slate-400 text-xs'>
                            Expected Goals
                          </div>
                        </div>
                      </td>

                      {/* Pass Accuracy */}
                      <td className='py-8 px-4 text-center'>
                        <div className='space-y-2'>
                          <div className='text-white font-bold'>
                            {team.passAccuracy}%
                          </div>
                          <div className='w-full bg-slate-600 rounded-full h-1.5'>
                            <div
                              className='bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full transition-all duration-1000'
                              style={{ width: `${team.passAccuracy}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Trend */}
                      <td className='py-8 px-4 text-center'>
                        <div className='flex justify-center'>
                          {getTrendIcon(team.trend)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Enhanced Table Footer */}
          <div className='bg-slate-800/50 px-8 py-6 border-t border-white/10'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center space-x-6 text-slate-400'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span>총 {sortedTeams.length}개 팀</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Calendar className='w-4 h-4' />
                  <span>마지막 업데이트: 방금 전</span>
                </div>
              </div>
              <div className='flex items-center space-x-8 text-slate-400'>
                <div className='flex items-center space-x-2'>
                  <span>1-4위:</span>
                  <span className='text-green-400 font-semibold'>
                    Champions League
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span>5-6위:</span>
                  <span className='text-teal-400 font-semibold'>
                    Europa League
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span>18-20위:</span>
                  <span className='text-red-400 font-semibold'>
                    Championship
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics Cards */}
        <div className='mt-20'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-black text-white mb-4'>
              Season Analytics
            </h2>
            <p className='text-slate-400 text-lg'>심층 통계와 성과 지표</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-green-400/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer'>
              <div className='flex items-center justify-between mb-6'>
                <Trophy className='w-12 h-12 text-green-400 group-hover:scale-110 transition-transform' />
                <div className='text-right'>
                  <div className='text-3xl font-black text-white group-hover:text-green-400 transition-colors'>
                    1,213
                  </div>
                  <div className='text-green-400 text-sm font-semibold'>
                    +8.2%
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>Total Goals</div>
                <div className='text-slate-500 text-sm'>시즌 총 득점수</div>
                <div className='w-full bg-slate-700 rounded-full h-2'>
                  <div className='bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-4/5'></div>
                </div>
              </div>
            </div>

            <div className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-emerald-400/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer'>
              <div className='flex items-center justify-between mb-6'>
                <BarChart3 className='w-12 h-12 text-teal-400 group-hover:scale-110 transition-transform' />
                <div className='text-right'>
                  <div className='text-3xl font-black text-white group-hover:text-teal-400 transition-colors'>
                    3.19
                  </div>
                  <div className='text-teal-400 text-sm font-semibold'>
                    +5.1%
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>
                  Goals per Match
                </div>
                <div className='text-slate-500 text-sm'>경기당 평균 골</div>
                <div className='w-full bg-slate-700 rounded-full h-2'>
                  <div className='bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full w-3/4'></div>
                </div>
              </div>
            </div>

            <div className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-emerald-400/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer'>
              <div className='flex items-center justify-between mb-6'>
                <Target className='w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform' />
                <div className='text-right'>
                  <div className='text-3xl font-black text-white group-hover:text-emerald-400 transition-colors'>
                    82.4%
                  </div>
                  <div className='text-emerald-400 text-sm font-semibold'>
                    +2.8%
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>Pass Accuracy</div>
                <div className='text-slate-500 text-sm'>평균 패스 성공률</div>
                <div className='w-full bg-slate-700 rounded-full h-2'>
                  <div className='bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full w-5/6'></div>
                </div>
              </div>
            </div>

            <div className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-yellow-400/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer'>
              <div className='flex items-center justify-between mb-6'>
                <Award className='w-12 h-12 text-yellow-400 group-hover:scale-110 transition-transform' />
                <div className='text-right'>
                  <div className='text-3xl font-black text-white group-hover:text-yellow-400 transition-colors'>
                    216
                  </div>
                  <div className='text-yellow-400 text-sm font-semibold'>
                    +12.3%
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-slate-400 font-medium'>Clean Sheets</div>
                <div className='text-slate-500 text-sm'>시즌 총 클린시트</div>
                <div className='w-full bg-slate-700 rounded-full h-2'>
                  <div className='bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-2/3'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Premium Footer */}
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
                <div className='text-slate-400 text-sm'>
                  Professional Football Intelligence
                </div>
              </div>
            </div>
            <p className='text-slate-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed'>
              프리미어리그의 모든 데이터와 통계를 실시간으로 분석하여 제공하는
              차세대 축구 분석 플랫폼입니다. xG, 패스 정확도, 점유율 등 고급
              메트릭으로 더 깊이 있는 축구를 경험하세요.
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
    </div>
  );
};
