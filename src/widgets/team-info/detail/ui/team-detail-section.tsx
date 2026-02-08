"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Award,
  Calendar,
  Crown,
  MapPin,
  Search,
  Shield,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import {
  PositionDistribution,
  PositionFilter,
  SquadSortKey,
  TeamStats,
  TeamTab,
} from "@/widgets/team-info/model/types";
import Image from "next/image";

const TAB_ITEMS: Array<{ id: TeamTab; name: string; icon: string }> = [
  { id: "overview", name: "개요", icon: "📋" },
  { id: "squad", name: "스쿼드", icon: "👥" },
  { id: "stats", name: "통계", icon: "📊" },
];

type TeamDetailSectionProps = {
  team: TeamProfile | null;
  stats: TeamStats | null;
  positionDistribution: PositionDistribution[];
  activeTab: TeamTab;
  onTabChange: (tab: TeamTab) => void;
  filteredPlayers: PlayerProfile[];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  filterPosition: PositionFilter;
  onFilterPositionChange: (value: PositionFilter) => void;
  sortBy: SquadSortKey;
  onSortChange: (value: SquadSortKey) => void;
};

export const TeamDetailSection = ({
  team,
  stats,
  positionDistribution,
  activeTab,
  onTabChange,
  filteredPlayers,
  searchTerm,
  onSearchTermChange,
  filterPosition,
  onFilterPositionChange,
  sortBy,
  onSortChange,
}: TeamDetailSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";

  const handlePlayerNavigate = (playerId: string | number) => {
    router.push(`${basePath}/players/${encodeURIComponent(String(playerId))}`);
  };

  if (!team) {
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
  }

  return (
    <div className='space-y-12'>
      <div className='relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#169976]/10 via-transparent to-teal-500/10 rounded-3xl'></div>

        <div className='relative'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-10 mb-10'>
            <div className='flex items-center space-x-6'>
              <div className='relative'>
                <div
                  className={`w-32 h-32 rounded-2xl flex items-center justify-center text-xl shadow-lg overflow-hidden  transition-all`}
                >
                  <Image
                    src={team.logo}
                    alt={team.logo}
                    width={40}
                    height={40}
                    className='w-28 h-28 object-contain'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center space-x-4 mb-2'>
                  <h2 className='text-5xl font-black text-white'>
                    {team.name}
                  </h2>
                  {team.rank === 1 && (
                    <Crown className='w-8 h-8 text-yellow-400' />
                  )}
                </div>
                <div className='flex items-center space-x-4 mb-4'>
                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-bold ${
                      team.rank <= 4
                        ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30"
                        : team.rank <= 10
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "bg-slate-400/20 text-slate-400 border border-slate-400/30"
                    }`}
                  >
                    프리미어리그 {team.rank}위
                  </div>
                  <div className='text-slate-400 text-lg font-medium'>
                    {team.shortName}
                  </div>
                </div>
                <p className='text-slate-300 text-lg leading-relaxed max-w-2xl'>
                  {team.description}
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
              <Trophy className='w-8 h-8 text-yellow-400 mx-auto mb-3' />
              <div className='text-3xl font-black text-white mb-1'>
                {team.points}
              </div>
              <div className='text-slate-400 text-sm font-medium'>승점</div>
            </div>
            <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
              <Target className='w-8 h-8 text-green-400 mx-auto mb-3' />
              <div className='text-3xl font-black text-white mb-1'>
                {team.goalsFor}
              </div>
              <div className='text-slate-400 text-sm font-medium'>득점</div>
            </div>
            <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
              <Shield className='w-8 h-8 text-teal-400 mx-auto mb-3' />
              <div className='text-3xl font-black text-white mb-1'>
                {team.goalsAgainst}
              </div>
              <div className='text-slate-400 text-sm font-medium'>실점</div>
            </div>
            <div className='bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center'>
              <Activity className='w-8 h-8 text-teal-400 mx-auto mb-3' />
              <div className='text-3xl font-black text-white mb-1'>
                {team.keyStats.possession}%
              </div>
              <div className='text-slate-400 text-sm font-medium'>점유율</div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 border-b border-white/10 pb-4'>
        {TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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

      {activeTab === "overview" && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
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
                  {team.founded}
                </span>
              </div>

              <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center space-x-3'>
                  <MapPin className='w-5 h-5 text-teal-400' />
                  <span className='text-slate-300'>홈구장</span>
                </div>
                <div className='text-right'>
                  <div className='text-white font-bold'>{team.stadium}</div>
                  <div className='text-slate-400 text-sm'>
                    {team.capacity.toLocaleString()}석
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center space-x-3'>
                  <Users className='w-5 h-5 text-green-400' />
                  <span className='text-slate-300'>감독</span>
                </div>
                <div className='text-right'>
                  <div className='text-white font-bold'>{team.manager}</div>
                  <div className='text-slate-400 text-sm'>
                    {team.nationality}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center space-x-3'>
                  <Trophy className='w-5 h-5 text-yellow-400' />
                  <span className='text-slate-300'>PL 타이틀</span>
                </div>
                <span className='text-white font-bold text-lg'>
                  {team.trophies}회
                </span>
              </div>

              <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center space-x-3 mb-3'>
                  <div
                    className='w-5 h-5 rounded-full'
                    style={{ backgroundColor: team.colors.primary }}
                  ></div>
                  <span className='text-slate-300'>팀 컬러</span>
                </div>
                <div className='flex space-x-3'>
                  <div
                    className='flex-1 h-4 rounded-lg'
                    style={{ backgroundColor: team.colors.primary }}
                  ></div>
                  <div
                    className='flex-1 h-4 rounded-lg'
                    style={{ backgroundColor: team.colors.secondary }}
                  ></div>
                </div>
                <div className='mt-3 grid grid-cols-2 gap-3 text-[11px] uppercase text-slate-400'>
                  <div className='flex items-center justify-between'>
                    <span>Primary</span>
                    <span className='font-mono text-white text-xs normal-case'>
                      {team.colors.primary}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Secondary</span>
                    <span className='font-mono text-white text-xs normal-case'>
                      {team.colors.secondary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
              <Activity className='w-6 h-6 text-green-400' />
              <span>시즌 성과</span>
            </h3>

            <div className='space-y-6'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='text-2xl font-bold text-green-400 mb-1'>
                    {team.won}
                  </div>
                  <div className='text-slate-400 text-sm'>승</div>
                </div>
                <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='text-2xl font-bold text-yellow-400 mb-1'>
                    {team.drawn}
                  </div>
                  <div className='text-slate-400 text-sm'>무</div>
                </div>
                <div className='text-center p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                  <div className='text-2xl font-bold text-red-400 mb-1'>
                    {team.lost}
                  </div>
                  <div className='text-slate-400 text-sm'>패</div>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-300'>승률</span>
                  <span className='text-white font-bold'>
                    {((team.won / team.played) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className='w-full bg-slate-700 rounded-full h-3'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000'
                    style={{ width: `${(team.won / team.played) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5 text-center'>
                  <div className='text-xl font-bold text-white mb-1'>
                    {team.keyStats.passAccuracy}%
                  </div>
                  <div className='text-slate-400 text-sm'>패스 성공률</div>
                </div>
                <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5 text-center'>
                  <div className='text-xl font-bold text-white mb-1'>
                    {team.keyStats.shotsPerGame}
                  </div>
                  <div className='text-slate-400 text-sm'>경기당 슈팅</div>
                </div>
              </div>

              <div className='p-4 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-slate-300'>클린시트</span>
                  <span className='text-white font-bold'>
                    {team.keyStats.cleanSheets}경기
                  </span>
                </div>
                <div className='text-slate-400 text-sm'>
                  전체 경기의{" "}
                  {((team.keyStats.cleanSheets / team.played) * 100).toFixed(1)}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "squad" && (
        <div className='space-y-8'>
          <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='relative flex-1'>
                <Search className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='선수 검색 (이름)'
                  className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                  value={searchTerm}
                  onChange={(event) => onSearchTermChange(event.target.value)}
                />
              </div>
              <div className='flex flex-wrap gap-4'>
                <div className='relative'>
                  <select
                    className='appearance-none bg-slate-800/50 border border-white/10 rounded-2xl pl-6 pr-12 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                    value={filterPosition}
                    onChange={(event) =>
                      onFilterPositionChange(event.target.value as PositionFilter)
                    }
                  >
                    <option value='all'>모든 포지션</option>
                    <option value='GK'>골키퍼</option>
                    <option value='DF'>수비수</option>
                    <option value='MF'>미드필더</option>
                    <option value='FW'>공격수</option>
                  </select>
                  <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300'>
                    <svg
                      className='h-4 w-4'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M5.25 7.5 10 12.25 14.75 7.5h-9.5Z' />
                    </svg>
                  </span>
                </div>
                <div className='relative'>
                  <select
                    className='appearance-none bg-slate-800/50 border border-white/10 rounded-2xl pl-6 pr-12 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all'
                    value={sortBy}
                    onChange={(event) =>
                      onSortChange(event.target.value as SquadSortKey)
                    }
                  >
                    <option value='number'>등번호순</option>
                    <option value='name'>이름순</option>
                    <option value='age'>나이순</option>
                    <option value='rating'>평점순</option>
                  </select>
                  <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300'>
                    <svg
                      className='h-4 w-4'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M5.25 7.5 10 12.25 14.75 7.5h-9.5Z' />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className='group bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 cursor-pointer transition-all duration-300'
                onClick={() => handlePlayerNavigate(player.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handlePlayerNavigate(player.id);
                  }
                }}
                role='button'
                tabIndex={0}
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
                          : ["CB", "LB", "RB", "LWB", "RWB"].some((code) =>
                              player.position.includes(code)
                            )
                          ? "bg-teal-400/20 text-teal-400"
                          : ["CDM", "CM", "CAM", "LM", "RM"].some((code) =>
                              player.position.includes(code)
                            )
                          ? "bg-green-400/20 text-green-400"
                          : "bg-red-400/20 text-red-400"
                      }`}
                    >
                      {player.position}
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4 className='text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors'>
                    {player.name}
                  </h4>
                  <p className='text-slate-400 text-sm'>
                    {player.nationality} • {player.age}세
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
                  <div className='text-slate-400 text-sm'>시즌 출전</div>
                  <div className='text-white font-bold'>
                    {player.appearances}경기
                  </div>
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
          <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
              <TrendingUp className='w-6 h-6 text-emerald-400' />
              <span>팀 통계</span>
            </h3>

            <div className='grid grid-cols-2 gap-6'>
              <div className='text-center p-6 bg-gradient-to-br from-[#169976]/10 to-teal-500/10 rounded-2xl border border-emerald-500/20'>
                <div className='text-3xl font-black text-emerald-400 mb-2'>
                  {stats?.matchesPlayed ?? team.played}
                </div>
                <div className='text-slate-400 text-sm'>경기 수</div>
              </div>
              <div className='text-center p-6 bg-gradient-to-br from-[#169976]/10 to-teal-500/10 rounded-2xl border border-teal-500/20'>
                <div className='text-3xl font-black text-teal-400 mb-2'>
                  {stats?.winRate ?? "0.0"}%
                </div>
                <div className='text-slate-400 text-sm'>승률</div>
              </div>
              <div className='text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20'>
                <div className='text-3xl font-black text-green-400 mb-2'>
                  {stats?.goalDifference ?? team.goalsFor - team.goalsAgainst}
                </div>
                <div className='text-slate-400 text-sm'>득실차</div>
              </div>
              <div className='text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20'>
                <div className='text-3xl font-black text-yellow-400 mb-2'>
                  {stats?.goalsForPerGame ?? "0.00"}
                </div>
                <div className='text-slate-400 text-sm'>경기당 득점</div>
              </div>
            </div>

            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 bg-slate-800/30 rounded-2xl border border-white/10'>
                <div className='text-slate-300 text-sm'>경기당 실점</div>
                <div className='mt-1 text-2xl font-bold text-white'>
                  {stats?.goalsAgainstPerGame ?? "0.00"}
                </div>
              </div>
              <div className='p-4 bg-slate-800/30 rounded-2xl border border-white/10'>
                <div className='text-slate-300 text-sm'>점유율</div>
                <div className='mt-1 text-2xl font-bold text-white'>
                  {stats?.possession ?? `${team.keyStats.possession}%`}
                </div>
              </div>
              <div className='p-4 bg-slate-800/30 rounded-2xl border border-white/10'>
                <div className='text-slate-300 text-sm'>패스 성공률</div>
                <div className='mt-1 text-2xl font-bold text-white'>
                  {stats?.passAccuracy ?? `${team.keyStats.passAccuracy}%`}
                </div>
              </div>
              <div className='p-4 bg-slate-800/30 rounded-2xl border border-white/10'>
                <div className='text-slate-300 text-sm'>클린시트 비율</div>
                <div className='mt-1 text-2xl font-bold text-white'>
                  {stats?.cleanSheetRate ?? "0.0%"}
                </div>
              </div>
              <div className='p-4 bg-slate-800/30 rounded-2xl border border-white/10 md:col-span-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-300 text-sm'>경기당 슈팅</span>
                  <span className='text-2xl font-bold text-white'>
                    {stats?.shotsPerGame ?? team.keyStats.shotsPerGame}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
            <h3 className='text-2xl font-bold text-white mb-6 flex items-center space-x-3'>
              <Target className='w-6 h-6 text-teal-400' />
              <span>포지션 분포</span>
            </h3>

            <div className='space-y-6'>
              {positionDistribution.map((pos) => (
                <div key={pos.position} className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`w-6 h-6 rounded-xl bg-gradient-to-r ${pos.color}`}
                      ></div>
                      <span className='text-white font-bold'>{pos.label}</span>
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

                  <div className='w-full bg-slate-700/50 rounded-full h-4 overflow-hidden'>
                    <div
                      className={`h-4 rounded-full bg-gradient-to-r ${pos.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${pos.percentage}%` }}
                    />
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
