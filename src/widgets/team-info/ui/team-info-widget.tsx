"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  Trophy,
  Users,
  MapPin,
  Calendar,
  Award,
  Star,
  TrendingUp,
  Target,
  Zap,
  Crown,
  Shield,
  Activity,
} from "lucide-react";
import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import { TEAM_PROFILES, TEAM_PLAYERS } from "@/shared/mocks/team-info";

type TeamTab = "overview" | "squad" | "stats";
type SquadSortKey = "number" | "name" | "age" | "value" | "rating";
type PositionFilter = "all" | "GK" | "DF" | "MF" | "FW";

export const TeamInfoWidget = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamProfile | null>(
    TEAM_PROFILES[0] ?? null
  );
  const [sortBy, setSortBy] = useState<SquadSortKey>("number");
  const [filterPosition, setFilterPosition] = useState<PositionFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TeamTab>("overview");
  const teamProfiles = TEAM_PROFILES;

  const filteredPlayers = useMemo((): PlayerProfile[] => {
    if (!selectedTeam) return [];

    const positionMap: Record<string, string[]> = {
      GK: ["GK"],
      DF: ["CB", "LB", "RB", "LWB", "RWB"],
      MF: ["CDM", "CM", "CAM", "LM", "RM"],
      FW: ["ST", "CF", "LW", "RW"],
    };

    const filteredByTeam = TEAM_PLAYERS.filter(
      (player) => player.teamId === selectedTeam.id
    );

    const filteredByPosition =
      filterPosition === "all"
        ? filteredByTeam
        : filteredByTeam.filter((player) =>
            positionMap[filterPosition]?.includes(player.position)
          );

    const filteredBySearch = searchTerm
      ? filteredByPosition.filter((player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredByPosition;

    return [...filteredBySearch].sort((a, b) => {
      if (sortBy === "number") return a.number - b.number;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "age") return a.age - b.age;
      if (sortBy === "value") return b.marketValue - a.marketValue;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedTeam, sortBy, filterPosition, searchTerm]);

  // 통계 계산 함수들
  const getTeamStats = () => {
    if (!selectedTeam) return null;
    const teamPlayers = TEAM_PLAYERS.filter(
      (p) => p.teamId === selectedTeam.id
    );
    const avgAge =
      teamPlayers.length > 0
        ? (
            teamPlayers.reduce((sum, p) => sum + p.age, 0) / teamPlayers.length
          ).toFixed(1)
        : 0;
    const foreignPlayers = teamPlayers.filter(
      (p) => p.nationality !== "🇬🇧"
    ).length;
    const foreignPercentage =
      teamPlayers.length > 0
        ? ((foreignPlayers / teamPlayers.length) * 100).toFixed(1)
        : 0;
    const avgRating =
      teamPlayers.length > 0
        ? (
            teamPlayers.reduce((sum, p) => sum + p.rating, 0) /
            teamPlayers.length
          ).toFixed(1)
        : 0;
    const totalValue = teamPlayers.reduce((sum, p) => sum + p.marketValue, 0);

    return {
      totalPlayers: teamPlayers.length,
      avgAge,
      foreignPercentage,
      foreignPlayers,
      avgRating,
      totalValue: `€${totalValue}M`,
      totalGoals: teamPlayers.reduce((sum, p) => sum + p.goals, 0),
      totalAssists: teamPlayers.reduce((sum, p) => sum + p.assists, 0),
    };
  };

  const getPositionDistribution = () => {
    if (!selectedTeam) return [];
    const teamPlayers = TEAM_PLAYERS.filter(
      (p) => p.teamId === selectedTeam.id
    );
    const positions = {
      GK: { count: 0, color: "from-yellow-400 to-orange-500", label: "골키퍼" },
      DF: { count: 0, color: "from-teal-400 to-emerald-500", label: "수비수" },
      MF: {
        count: 0,
        color: "from-green-400 to-emerald-500",
        label: "미드필더",
      },
      FW: { count: 0, color: "from-red-400 to-pink-500", label: "공격수" },
    };

    teamPlayers.forEach((player) => {
      if (player.position === "GK") positions.GK.count++;
      else if (["CB", "LB", "RB", "LWB", "RWB"].includes(player.position))
        positions.DF.count++;
      else if (["CDM", "CM", "CAM", "LM", "RM"].includes(player.position))
        positions.MF.count++;
      else positions.FW.count++;
    });

    return Object.entries(positions).map(([pos, data]) => ({
      position: pos,
      label: data.label,
      count: data.count,
      color: data.color,
      percentage:
        teamPlayers.length > 0
          ? ((data.count / teamPlayers.length) * 100).toFixed(1)
          : 0,
    }));
  };

  // Header Component
  const Header = () => (
    <header className='sticky top-0 z-50 bg-slate-900/95 backdrop-blur-2xl border-b border-slate-700/50 shadow-2xl'>
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
                Team Intelligence Center
              </div>
            </div>
          </div>

          <nav className='hidden md:flex space-x-1'>
            {[
              { name: "홈", icon: "🏠", active: false },
              { name: "팀정보", icon: "🏆", active: true },
              { name: "선수정보", icon: "👤", active: false },
              { name: "리그정보", icon: "📊", active: false },
              { name: "통계", icon: "📈", active: false },
            ].map((item) => (
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

  // Hero Section
  const HeroSection = () => (
    <section className='relative py-20 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900'></div>
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
        <div className='inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 text-sm font-semibold text-white/90 mb-8'>
          <Trophy className='w-5 h-5 text-yellow-400' />
          <span>Premier League Teams</span>
          <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
        </div>

        <h1 className='text-7xl md:text-8xl font-black mb-8 leading-none'>
          <span className='bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
            Deep Team
          </span>
          <br />
          <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
            Analytics
          </span>
        </h1>

        <p className='text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
          프리미어리그 20개 팀의 심층 분석과 실시간 데이터를 통해
          <br />
          축구의 새로운 차원을 경험하세요
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
          <button className='group relative px-12 py-6 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-2xl text-white text-xl font-bold shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000'></div>
            <div className='relative flex items-center space-x-3'>
              <Zap className='w-6 h-6' />
              <span>팀 분석 시작</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );

  // Team Selection Grid
  const TeamGrid = () => (
    <div className='mb-16'>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h2 className='text-4xl font-black text-white mb-2'>
            프리미어리그 클럽
          </h2>
          <p className='text-slate-400 text-lg'>
            세계 최고 수준의 축구 클럽들을 선택하세요
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/10'>
            {teamProfiles.length}개 팀
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {teamProfiles.map((team) => (
          <div
            key={team.id}
            className={`group relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              selectedTeam?.id === team.id
                ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/10 shadow-2xl shadow-emerald-500/25"
                : "border-white/10 hover:border-white/20"
            }`}
            onClick={() => setSelectedTeam(team)}
          >
            {/* Team Rank Badge */}
            <div className='absolute -top-3 -right-3'>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg ${
                  team.rank <= 4
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : team.rank <= 10
                    ? "bg-gradient-to-br from-green-400 to-emerald-500"
                    : "bg-gradient-to-br from-slate-500 to-slate-600"
                }`}
              >
                #{team.rank}
              </div>
            </div>

            <div className='relative'>
              {/* Team Logo */}
              <div className='text-center mb-6'>
                <div className='relative mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <div className='w-24 h-24 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-5xl shadow-2xl'>
                    {team.logo}
                  </div>
                  <div className='absolute -inset-3 bg-gradient-to-br from-[#169976]/30 to-teal-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                <h3 className='text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors'>
                  {team.name}
                </h3>
                <p className='text-slate-400 text-sm font-medium'>
                  {team.shortName}
                </p>
              </div>

              {/* Team Stats */}
              <div className='space-y-4 mb-6'>
                <div className='flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-2 text-slate-400'>
                    <Trophy className='w-4 h-4' />
                    <span className='text-sm'>승점</span>
                  </div>
                  <span className='text-white font-bold text-lg'>
                    {team.points}
                  </span>
                </div>

                <div className='flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-2 text-slate-400'>
                    <Target className='w-4 h-4' />
                    <span className='text-sm'>골득실</span>
                  </div>
                  <span className='text-white font-bold'>
                    {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                    {team.goalsFor - team.goalsAgainst}
                  </span>
                </div>

                <div className='flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-2 text-slate-400'>
                    <MapPin className='w-4 h-4' />
                    <span className='text-sm'>홈구장</span>
                  </div>
                  <span className='text-white font-semibold text-sm'>
                    {team.stadium}
                  </span>
                </div>
              </div>

              {/* Recent Form */}
              <div className='flex items-center justify-between'>
                <span className='text-slate-400 text-sm font-medium'>
                  최근 폼
                </span>
                <div className='flex space-x-1'>
                  {team.form.map((result, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Team Profile Section
  const TeamProfile = () => {
    if (!selectedTeam)
      return (
        <div className='text-center py-20'>
          <div className='text-8xl mb-8'>⚽</div>
          <h3 className='text-3xl font-bold text-white mb-4'>
            팀을 선택해주세요
          </h3>
          <p className='text-slate-400 text-lg'>
            위에서 원하는 팀을 클릭하여 상세 정보를 확인하세요
          </p>
        </div>
      );

    const stats = getTeamStats();
    const positionDist = getPositionDistribution();

    return (
      <div className='space-y-12'>
        {/* Team Header */}
        <div className='relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-[#169976]/10 via-transparent to-teal-500/10 rounded-3xl'></div>

          <div className='relative'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-10 mb-10'>
              {/* Team Logo & Basic Info */}
              <div className='flex items-center space-x-6'>
                <div className='relative'>
                  <div className='w-32 h-32 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-6xl shadow-2xl'>
                    {selectedTeam.logo}
                  </div>
                  <div className='absolute -inset-2 bg-gradient-to-br from-[#169976]/40 to-teal-500/40 rounded-3xl blur-xl'></div>
                </div>

                <div>
                  <div className='flex items-center space-x-4 mb-2'>
                    <h2 className='text-5xl font-black text-white'>
                      {selectedTeam.name}
                    </h2>
                    {selectedTeam.rank === 1 && (
                      <Crown className='w-8 h-8 text-yellow-400' />
                    )}
                  </div>
                  <div className='flex items-center space-x-4 mb-4'>
                    <div
                      className={`px-4 py-2 rounded-xl text-sm font-bold ${
                        selectedTeam.rank <= 4
                          ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30"
                          : selectedTeam.rank <= 10
                          ? "bg-green-400/20 text-green-400 border border-green-400/30"
                          : "bg-slate-400/20 text-slate-400 border border-slate-400/30"
                      }`}
                    >
                      프리미어리그 {selectedTeam.rank}위
                    </div>
                    <div className='text-slate-400 text-lg font-medium'>
                      {selectedTeam.shortName}
                    </div>
                  </div>
                  <p className='text-slate-300 text-lg leading-relaxed max-w-2xl'>
                    {selectedTeam.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
                <Trophy className='w-8 h-8 text-yellow-400 mx-auto mb-3' />
                <div className='text-3xl font-black text-white mb-1'>
                  {selectedTeam.points}
                </div>
                <div className='text-slate-400 text-sm font-medium'>승점</div>
              </div>

              <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
                <Target className='w-8 h-8 text-green-400 mx-auto mb-3' />
                <div className='text-3xl font-black text-white mb-1'>
                  {selectedTeam.goalsFor}
                </div>
                <div className='text-slate-400 text-sm font-medium'>득점</div>
              </div>

              <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
                <Shield className='w-8 h-8 text-teal-400 mx-auto mb-3' />
                <div className='text-3xl font-black text-white mb-1'>
                  {selectedTeam.goalsAgainst}
                </div>
                <div className='text-slate-400 text-sm font-medium'>실점</div>
              </div>

              <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
                <Activity className='w-8 h-8 text-teal-400 mx-auto mb-3' />
                <div className='text-3xl font-black text-white mb-1'>
                  {selectedTeam.keyStats.possession}%
                </div>
                <div className='text-slate-400 text-sm font-medium'>점유율</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className='flex flex-wrap gap-2 border-b border-white/10 pb-4'>
          {[
            { id: "overview", name: "개요", icon: "📋" },
            { id: "squad", name: "스쿼드", icon: "👥" },
            { id: "stats", name: "통계", icon: "📊" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#169976]/30 to-teal-600/30 text-white border border-emerald-500/40"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* Club Information */}
            <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <Award className='w-6 h-6 text-emerald-400' />
                <span>클럽 정보</span>
              </h3>

              <div className='space-y-6'>
                <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3'>
                    <Calendar className='w-5 h-5 text-emerald-400' />
                    <span className='text-slate-300'>창단연도</span>
                  </div>
                  <span className='text-white font-bold text-lg'>
                    {selectedTeam.founded}
                  </span>
                </div>

                <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3'>
                    <MapPin className='w-5 h-5 text-teal-400' />
                    <span className='text-slate-300'>홈구장</span>
                  </div>
                  <div className='text-right'>
                    <div className='text-white font-bold'>
                      {selectedTeam.stadium}
                    </div>
                    <div className='text-slate-400 text-sm'>
                      {selectedTeam.capacity.toLocaleString()}석
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3'>
                    <Users className='w-5 h-5 text-green-400' />
                    <span className='text-slate-300'>감독</span>
                  </div>
                  <div className='text-right'>
                    <div className='text-white font-bold'>
                      {selectedTeam.manager}
                    </div>
                    <div className='text-slate-400 text-sm'>
                      {selectedTeam.nationality}
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3'>
                    <Trophy className='w-5 h-5 text-yellow-400' />
                    <span className='text-slate-300'>PL 타이틀</span>
                  </div>
                  <span className='text-white font-bold text-lg'>
                    {selectedTeam.trophies}회
                  </span>
                </div>

                <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3'>
                    <Star className='w-5 h-5 text-teal-400' />
                    <span className='text-slate-300'>클럽 가치</span>
                  </div>
                  <span className='text-white font-bold text-lg'>
                    {selectedTeam.value}
                  </span>
                </div>

                <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center space-x-3 mb-3'>
                    <div
                      className='w-5 h-5 rounded-full'
                      style={{ backgroundColor: selectedTeam.colors.primary }}
                    ></div>
                    <span className='text-slate-300'>팀 컬러</span>
                  </div>
                  <div className='flex space-x-3'>
                    <div
                      className='flex-1 h-4 rounded-lg'
                      style={{ backgroundColor: selectedTeam.colors.primary }}
                    ></div>
                    <div
                      className='flex-1 h-4 rounded-lg'
                      style={{ backgroundColor: selectedTeam.colors.secondary }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Season Performance */}
            <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <Activity className='w-6 h-6 text-green-400' />
                <span>시즌 성과</span>
              </h3>

              <div className='space-y-6'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                    <div className='text-2xl font-bold text-green-400 mb-1'>
                      {selectedTeam.won}
                    </div>
                    <div className='text-slate-400 text-sm'>승</div>
                  </div>
                  <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                    <div className='text-2xl font-bold text-yellow-400 mb-1'>
                      {selectedTeam.drawn}
                    </div>
                    <div className='text-slate-400 text-sm'>무</div>
                  </div>
                  <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                    <div className='text-2xl font-bold text-red-400 mb-1'>
                      {selectedTeam.lost}
                    </div>
                    <div className='text-slate-400 text-sm'>패</div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-300'>승률</span>
                    <span className='text-white font-bold'>
                      {((selectedTeam.won / selectedTeam.played) * 100).toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>

                  <div className='w-full bg-slate-700 rounded-full h-3'>
                    <div
                      className='bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000'
                      style={{
                        width: `${
                          (selectedTeam.won / selectedTeam.played) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5 text-center'>
                    <div className='text-xl font-bold text-white mb-1'>
                      {selectedTeam.keyStats.passAccuracy}%
                    </div>
                    <div className='text-slate-400 text-sm'>패스 성공률</div>
                  </div>
                  <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5 text-center'>
                    <div className='text-xl font-bold text-white mb-1'>
                      {selectedTeam.keyStats.shotsPerGame}
                    </div>
                    <div className='text-slate-400 text-sm'>경기당 슈팅</div>
                  </div>
                </div>

                <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-slate-300'>클린시트</span>
                    <span className='text-white font-bold'>
                      {selectedTeam.keyStats.cleanSheets}경기
                    </span>
                  </div>
                  <div className='text-slate-400 text-sm'>
                    전체 경기의{" "}
                    {(
                      (selectedTeam.keyStats.cleanSheets /
                        selectedTeam.played) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "squad" && (
          <div className='space-y-8'>
            {/* Search and Filters */}
            <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'>
              <div className='flex flex-wrap gap-4'>
                <div className='relative flex-1 min-w-[300px]'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                  <input
                    type='text'
                    placeholder='선수 이름으로 검색...'
                    className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className='bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                  value={filterPosition}
                  onChange={(e) =>
                    setFilterPosition(e.target.value as PositionFilter)
                  }
                >
                  <option value='all'>모든 포지션</option>
                  <option value='GK'>골키퍼</option>
                  <option value='DF'>수비수</option>
                  <option value='MF'>미드필더</option>
                  <option value='FW'>공격수</option>
                </select>

                <select
                  className='bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SquadSortKey)}
                >
                  <option value='number'>등번호순</option>
                  <option value='name'>이름순</option>
                  <option value='age'>나이순</option>
                  <option value='value'>시장가치순</option>
                  <option value='rating'>평점순</option>
                </select>
              </div>
            </div>

            {/* Player Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className='group bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 cursor-pointer transition-all duration-300'
                >
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-12 h-12 bg-gradient-to-br from-[#169976]/30 to-teal-500/30 border-2 border-emerald-400/50 rounded-2xl flex items-center justify-center font-bold text-white'>
                        {player.number}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          player.position.includes("GK")
                            ? "bg-yellow-400/20 text-yellow-400"
                            : ["CB", "LB", "RB", "LWB", "RWB"].some((pos) =>
                                player.position.includes(pos)
                              )
                            ? "bg-teal-400/20 text-teal-400"
                            : ["CDM", "CM", "CAM", "LM", "RM"].some((pos) =>
                                player.position.includes(pos)
                              )
                            ? "bg-green-400/20 text-green-400"
                            : "bg-red-400/20 text-red-400"
                        }`}
                      >
                        {player.position}
                      </div>
                    </div>
                    <div className='text-2xl'>{player.nationality}</div>
                  </div>

                  <div className='mb-4'>
                    <h4 className='text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors'>
                      {player.name}
                    </h4>
                    <p className='text-slate-400 text-sm'>
                      {player.nationalityName} • {player.age}세
                    </p>
                  </div>

                  <div className='grid grid-cols-3 gap-3 mb-4'>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-white'>
                        {player.goals}
                      </div>
                      <div className='text-slate-400 text-xs'>골</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-white'>
                        {player.assists}
                      </div>
                      <div className='text-slate-400 text-xs'>도움</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-yellow-400'>
                        {player.rating}
                      </div>
                      <div className='text-slate-400 text-xs'>평점</div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                    <div className='text-slate-400 text-sm'>시장가치</div>
                    <div className='text-white font-bold'>{player.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className='text-center py-16 bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  검색 결과가 없습니다
                </h3>
                <p className='text-slate-400'>
                  다른 검색어나 필터를 시도해보세요
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            {/* Team Statistics */}
            <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <TrendingUp className='w-6 h-6 text-emerald-400' />
                <span>팀 통계</span>
              </h3>

              <div className='grid grid-cols-2 gap-6'>
                <div className='text-center p-6 bg-gradient-to-br from-[#169976]/10 to-teal-500/10 rounded-2xl border border-emerald-500/20'>
                  <div className='text-3xl font-black text-emerald-400 mb-2'>
                    {stats?.totalPlayers || 0}
                  </div>
                  <div className='text-slate-400 text-sm'>총 선수</div>
                </div>

                <div className='text-center p-6 bg-gradient-to-br from-[#169976]/10 to-teal-500/10 rounded-2xl border border-teal-500/20'>
                  <div className='text-3xl font-black text-teal-400 mb-2'>
                    {stats?.avgAge || 0}
                  </div>
                  <div className='text-slate-400 text-sm'>평균 연령</div>
                </div>

                <div className='text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20'>
                  <div className='text-3xl font-black text-green-400 mb-2'>
                    {stats?.avgRating || 0}
                  </div>
                  <div className='text-slate-400 text-sm'>평균 평점</div>
                </div>

                <div className='text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20'>
                  <div className='text-3xl font-black text-yellow-400 mb-2'>
                    {stats?.foreignPercentage || 0}%
                  </div>
                  <div className='text-slate-400 text-sm'>외국인 비율</div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-slate-800/30 rounded-2xl border border-white/10'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-slate-300 font-medium'>
                    스쿼드 총 가치
                  </span>
                  <span className='text-2xl font-bold text-white'>
                    {stats?.totalValue || "€0M"}
                  </span>
                </div>
                <div className='text-slate-400 text-sm'>
                  평균 선수당 €
                  {stats?.totalPlayers > 0
                    ? Math.round(
                        parseFloat(
                          stats?.totalValue?.replace(/[€M]/g, "") || "0"
                        ) / stats.totalPlayers
                      )
                    : 0}
                  M
                </div>
              </div>
            </div>

            {/* Position Distribution */}
            <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
              <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
                <Target className='w-6 h-6 text-teal-400' />
                <span>포지션 분포</span>
              </h3>

              <div className='space-y-6'>
                {positionDist.map((pos, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-6 h-6 rounded-xl bg-gradient-to-r ${pos.color}`}
                        ></div>
                        <span className='text-white font-bold'>
                          {pos.label}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <span className='text-slate-300 font-semibold'>
                          {pos.count}명
                        </span>
                        <span className='text-slate-400 text-sm'>
                          ({pos.percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className='relative'>
                      <div className='w-full bg-slate-700/50 rounded-full h-4 overflow-hidden'>
                        <div
                          className={`h-4 rounded-full bg-gradient-to-r ${pos.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${pos.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-x-hidden'>
      <Header />
      <HeroSection />

      <main className='max-w-7xl mx-auto px-6 pb-20'>
        <TeamGrid />
        <TeamProfile />
      </main>

      {/* Premium Footer */}
      <footer className='bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900 border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-16'>
          <div className='text-center'>
            <div className='flex items-center justify-center space-x-3 mb-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl'>
                ⚽
              </div>
              <span className='text-3xl font-black bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
                EPL Hub
              </span>
            </div>
            <p className='text-slate-400 mb-8 max-w-2xl mx-auto'>
              세계 최고의 축구 리그, 프리미어리그의 모든 데이터와 인사이트를
              제공하는 프리미엄 플랫폼입니다.
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
