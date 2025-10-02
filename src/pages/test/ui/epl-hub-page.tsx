"use client";
import React, { useState, useEffect } from "react";
import {
  Trophy,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Globe,
  Target,
  Zap,
} from "lucide-react";

export const EPLHubPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [leagueData] = useState([
    {
      position: 1,
      team: "맨체스터 시티",
      matches: 38,
      points: 89,
      goalDiff: "+73",
      logo: "🏆",
      trend: "+2",
      form: ["W", "W", "W", "D", "W"],
    },
    {
      position: 2,
      team: "아스날",
      matches: 38,
      points: 84,
      goalDiff: "+62",
      logo: "🔴",
      trend: "-1",
      form: ["W", "L", "W", "W", "D"],
    },
    {
      position: 3,
      team: "맨체스터 유나이티드",
      matches: 38,
      points: 75,
      goalDiff: "+15",
      logo: "👹",
      trend: "+1",
      form: ["D", "W", "L", "W", "W"],
    },
    {
      position: 4,
      team: "뉴캐슬 유나이티드",
      matches: 38,
      points: 71,
      goalDiff: "+35",
      logo: "⚫",
      trend: "0",
      form: ["W", "D", "W", "L", "W"],
    },
    {
      position: 5,
      team: "리버풀",
      matches: 38,
      points: 67,
      goalDiff: "+28",
      logo: "🔴",
      trend: "-2",
      form: ["L", "D", "W", "D", "L"],
    },
  ]);

  const [topPlayers] = useState([
    {
      name: "얼링 홀란드",
      team: "맨체스터 시티",
      goals: 36,
      assists: 8,
      avatar: "🇳🇴",
      rating: 9.2,
      value: "€180M",
    },
    {
      name: "해리 케인",
      team: "토트넘 홋스퍼",
      goals: 30,
      assists: 3,
      avatar: "🇬🇧",
      rating: 8.8,
      value: "€100M",
    },
    {
      name: "이반 토니",
      team: "브렌트포드",
      goals: 20,
      assists: 5,
      avatar: "🇬🇧",
      rating: 8.1,
      value: "€40M",
    },
  ]);

  const [recentUpdates] = useState([
    {
      icon: "⚡",
      title: "실시간 경기 결과",
      description: "맨시티 vs 아스날 3-1 종료",
      time: "방금 전",
      priority: "high",
    },
    {
      icon: "🔄",
      title: "이적 소식",
      description: "음바페, 레알 마드리드 이적 확정",
      time: "1시간 전",
      priority: "medium",
    },
    {
      icon: "📊",
      title: "주간 MVP",
      description: "홀란드, 이번 주 최고 선수 선정",
      time: "2시간 전",
      priority: "medium",
    },
    {
      icon: "🏆",
      title: "시즌 기록",
      description: "새로운 득점 기록 달성",
      time: "5시간 전",
      priority: "low",
    },
  ]);

  const [stats] = useState([
    {
      icon: <Trophy className='w-8 h-8' />,
      number: "1,026",
      label: "시즌 총 골",
      change: "+12%",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Users className='w-8 h-8' />,
      number: "380",
      label: "총 경기 수",
      change: "+5%",
      color: "from-[#169976] to-emerald-600",
    },
    {
      icon: <Globe className='w-8 h-8' />,
      number: "20",
      label: "참가 팀",
      change: "0%",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <Target className='w-8 h-8' />,
      number: "2.7",
      label: "경기당 평균 골",
      change: "+8%",
      color: "from-[#169976] to-teal-600",
    },
  ]);

  // Enhanced Header Component
  const Header = () => (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50
          ? "bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
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
              <div className='text-xs text-slate-400 font-medium'>
                Premium Football Analytics
              </div>
            </div>
          </div>

          <nav className='hidden md:flex space-x-1'>
            {[
              { name: "홈", icon: "🏠" },
              { name: "팀정보", icon: "🏆" },
              { name: "선수정보", icon: "👤" },
              { name: "리그정보", icon: "📊" },
              { name: "통계", icon: "📈" },
            ].map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(item.name)}
                  type='button'
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#169976]/0 via-emerald-600/0 to-teal-600/0 transition-all duration-300 rounded-xl ${
                      isActive
                        ? "from-[#169976]/40 via-emerald-600/40 to-teal-600/40"
                        : "group-hover:from-[#169976]/20 group-hover:via-emerald-600/20 group-hover:to-teal-600/20"
                    }`}
                  ></div>
                  <div className='relative flex items-center space-x-2 font-medium'>
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );

  // Premium Hero Section
  const HeroSection = () => (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900'></div>
        <div className='absolute top-0 left-0 w-full h-full opacity-30'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-[#169976] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
          <div className='absolute top-3/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
          <div className='absolute bottom-1/4 left-1/3 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
        </div>
      </div>

      <div className='relative z-10 text-center px-6 max-w-6xl'>
        <div className='mb-8'>
          <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-6'>
            <Zap className='w-4 h-4 text-[#169976]' />
            <span>Real-time Premier League Analytics</span>
          </div>
          <h1 className='text-7xl md:text-8xl font-black mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
              The Ultimate
            </span>
            <br />
            <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              EPL Experience
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed'>
            실시간 데이터 분석과 AI 기반 인사이트로 프리미어리그의 모든 순간을
            경험하세요
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
          <button className='group relative px-10 py-5 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-2xl text-white text-lg font-bold shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000'></div>
            <div className='relative flex items-center space-x-2'>
              <span>프리미엄 시작하기</span>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </div>
          </button>

          <button className='group px-10 py-5 border-2 border-white/20 rounded-2xl text-white text-lg font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-xl'>
            <div className='flex items-center space-x-2'>
              <span>무료 체험</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );

  // Premium League Table
  const LeagueTable = () => (
    <div className='relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <div className='absolute inset-0 bg-gradient-to-br from-[#169976]/5 via-transparent to-teal-500/5 rounded-3xl'></div>
      <div className='relative'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              프리미어리그 순위
            </h2>
            <p className='text-slate-400'>실시간 업데이트되는 최신 순위</p>
          </div>
          <button className='group flex items-center space-x-2 text-[#169976] hover:text-emerald-400 font-medium'>
            <span>전체보기</span>
            <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/10'>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  순위
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  팀
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  경기
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  승점
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  골득실
                </th>
                <th className='text-left py-4 px-3 text-slate-400 font-semibold text-sm uppercase tracking-wider'>
                  최근 폼
                </th>
              </tr>
            </thead>
            <tbody>
              {leagueData.map((team) => (
                <tr
                  key={team.position}
                  className='border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-300 group'
                >
                  <td className='py-5 px-3'>
                    <div className='flex items-center space-x-3'>
                      <span className='font-bold text-[#169976] text-lg'>
                        {team.position}
                      </span>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          team.trend.startsWith("+")
                            ? "bg-green-500/20 text-green-400"
                            : team.trend.startsWith("-")
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {team.trend === "0" ? "━" : team.trend}
                      </div>
                    </div>
                  </td>
                  <td className='py-5 px-3'>
                    <div className='flex items-center space-x-4'>
                      <div className='relative'>
                        <div className='w-10 h-10 bg-gradient-to-br from-[#169976] to-teal-600 rounded-xl flex items-center justify-center text-xl shadow-lg'>
                          {team.logo}
                        </div>
                      </div>
                      <span className='text-white font-semibold group-hover:text-[#169976] transition-colors'>
                        {team.team}
                      </span>
                    </div>
                  </td>
                  <td className='py-5 px-3 text-slate-300 font-medium'>
                    {team.matches}
                  </td>
                  <td className='py-5 px-3'>
                    <span className='text-white font-bold text-lg'>
                      {team.points}
                    </span>
                  </td>
                  <td className='py-5 px-3'>
                    <span
                      className={`font-semibold ${
                        team.goalDiff.startsWith("+")
                          ? "text-green-400"
                          : "text-slate-300"
                      }`}
                    >
                      {team.goalDiff}
                    </span>
                  </td>
                  <td className='py-5 px-3'>
                    <div className='flex space-x-1'>
                      {team.form.map((result, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            result === "W"
                              ? "bg-green-500 text-white"
                              : result === "D"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Premium Player Card
  const PlayerRankings = () => (
    <div className='bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-2xl font-bold text-white mb-1'>톱 스코러</h3>
          <p className='text-slate-400 text-sm'>이번 시즌 득점 순위</p>
        </div>
        <Star className='w-6 h-6 text-yellow-400' />
      </div>

      <div className='space-y-4'>
        {topPlayers.map((player, index) => (
          <div
            key={index}
            className='group relative p-5 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10'
          >
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
                  {player.avatar}
                </div>
                <div className='absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white'>
                  {index + 1}
                </div>
              </div>

              <div className='flex-1'>
                <h4 className='text-white font-bold text-lg group-hover:text-[#169976] transition-colors'>
                  {player.name}
                </h4>
                <p className='text-slate-400 text-sm mb-1'>{player.team}</p>
                <div className='flex items-center space-x-4 text-sm'>
                  <span className='text-green-400 font-semibold'>
                    {player.goals}골
                  </span>
                  <span className='text-[#169976] font-semibold'>
                    {player.assists}도움
                  </span>
                  <span className='text-yellow-400 font-semibold'>
                    ★{player.rating}
                  </span>
                </div>
              </div>

              <div className='text-right'>
                <div className='text-slate-400 text-xs mb-1'>시장가치</div>
                <div className='text-white font-bold'>{player.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Premium Updates
  const RecentUpdates = () => (
    <div className='bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-2xl font-bold text-white mb-1'>
            실시간 업데이트
          </h3>
          <p className='text-slate-400 text-sm'>최신 소식과 알림</p>
        </div>
        <div className='w-3 h-3 bg-[#169976] rounded-full animate-pulse'></div>
      </div>

      <div className='space-y-3'>
        {recentUpdates.map((update, index) => (
          <div
            key={index}
            className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
              update.priority === "high"
                ? "border-red-400 bg-red-400/5 hover:bg-red-400/10"
                : update.priority === "medium"
                ? "border-[#169976] bg-[#169976]/5 hover:bg-[#169976]/10"
                : "border-teal-400 bg-teal-400/5 hover:bg-teal-400/10"
            }`}
          >
            <div className='flex items-start space-x-3'>
              <div className='text-2xl'>{update.icon}</div>
              <div className='flex-1 min-w-0'>
                <h5 className='text-white font-semibold text-sm mb-1 group-hover:text-[#169976] transition-colors'>
                  {update.title}
                </h5>
                <p className='text-slate-400 text-xs mb-2 leading-relaxed'>
                  {update.description}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-500 text-xs'>{update.time}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      update.priority === "high"
                        ? "bg-red-400"
                        : update.priority === "medium"
                        ? "bg-[#169976]"
                        : "bg-teal-400"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Premium Stats Section
  const StatsSection = () => (
    <section className='py-20'>
      <div className='text-center mb-16'>
        <h2 className='text-5xl font-black text-white mb-6'>시즌 하이라이트</h2>
        <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
          데이터로 보는 프리미어리그의 생생한 순간들
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='group relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-2 cursor-pointer transition-all duration-500'
          >
            <div
              className='absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl'
              style={{
                backgroundImage: `linear-gradient(135deg, ${stat.color
                  .split(" ")[0]
                  .replace("from-", "")
                  .replace("-400", "")}, ${stat.color
                  .split(" ")[1]
                  .replace("to-", "")
                  .replace("-500", "")})`,
              }}
            ></div>

            <div className='relative'>
              <div
                className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                <div className='text-white'>{stat.icon}</div>
              </div>

              <div className='text-4xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#169976] group-hover:to-teal-400 transition-all duration-300'>
                {stat.number}
              </div>

              <div className='text-slate-400 font-medium mb-3'>
                {stat.label}
              </div>

              <div
                className={`inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.change.startsWith("+")
                    ? "bg-green-500/20 text-green-400"
                    : stat.change === "0%"
                    ? "bg-slate-500/20 text-slate-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <TrendingUp className='w-3 h-3' />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-x-hidden'>
      <Header />
      <HeroSection />

      <main className='max-w-7xl mx-auto px-6 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20'>
          <div className='lg:col-span-2'>
            <LeagueTable />
          </div>

          <div className='space-y-8'>
            <PlayerRankings />
            <RecentUpdates />
          </div>
        </div>

        <StatsSection />
      </main>

      {/* Premium Footer Section */}
      <footer className='bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900 border-t border-white/10 mt-20'>
        <div className='max-w-7xl mx-auto px-6 py-16'>
          <div className='text-center'>
            <div className='flex items-center justify-center space-x-3 mb-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl'>
                ⚽
              </div>
              <span className='text-3xl font-black bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent'>
                EPL Hub
              </span>
            </div>
            <p className='text-slate-400 mb-8 max-w-2xl mx-auto'>
              프리미어리그의 모든 순간을 놓치지 마세요. 실시간 분석과 전문가
              인사이트로 더 깊은 축구 경험을 만들어보세요.
            </p>
            <div className='text-sm text-slate-500'>
              © 2024 EPL Hub. Premium Football Analytics Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
