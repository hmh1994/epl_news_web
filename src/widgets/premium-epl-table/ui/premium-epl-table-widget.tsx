"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  Trophy,
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
import { LeagueTableTeam } from "@/entities/team/model/league-table-team";
import { LeagueTableRow } from "@/entities/team/ui/league-table-row";
import { PREMIER_LEAGUE_TABLE } from "@/shared/mocks/premium-epl-table";

type SortColumn = "position" | "team" | "played" | "goalDifference" | "points";

export const PremiumEPLTableWidget = () => {
  const [sortBy, setSortBy] = useState<SortColumn>("position");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teams: LeagueTableTeam[] = PREMIER_LEAGUE_TABLE;

  // 정렬된 팀 목록
  const sortedTeams = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = teams.filter(
      (team) =>
        team.team.toLowerCase().includes(term) ||
        team.shortName.toLowerCase().includes(term)
    );

    return filtered.sort((a, b) => {
      if (sortBy === "team") {
        return sortOrder === "asc"
          ? a.team.localeCompare(b.team)
          : b.team.localeCompare(a.team);
      }

      const aValue = a[sortBy] as number;
      const bValue = b[sortBy] as number;

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [teams, searchTerm, sortBy, sortOrder]);

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: SortColumn) => {
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

                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    W
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    D
                  </th>
                  <th className='text-center py-6 px-4 text-slate-300 font-bold text-sm uppercase tracking-wider'>
                    L
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
                {sortedTeams.map((team, idx) => (
                  <React.Fragment key={team.team}>
                    <LeagueTableRow
                      team={team}
                      isHovered={hoveredRow === team.position}
                      onHover={setHoveredRow}
                      onHoverEnd={() => setHoveredRow(null)}
                    />
                    {idx === 4 && (
                      <tr>
                        <td colSpan={12} className='py-2 text-center'>
                          <div className='text-slate-500 text-sm'>• • •</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
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
