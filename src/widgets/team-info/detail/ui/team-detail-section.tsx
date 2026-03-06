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
        <h3 className='mb-4 text-3xl font-semibold text-white'>
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
      <div className='relative rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
        <div className='relative'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-10 mb-8 md:mb-10'>
            <div className='flex items-center space-x-4 sm:space-x-6'>
              <div className='relative'>
                <div className='flex h-20 w-20 sm:h-32 sm:w-32 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-xl transition'>
                  <Image
                    src={team.logo}
                    alt={`${team.name} logo`}
                    width={40}
                    height={40}
                    className='w-16 h-16 sm:w-28 sm:h-28 object-contain'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center space-x-3 sm:space-x-4 mb-2'>
                  <h2 className='text-2xl sm:text-4xl font-semibold text-white'>
                    {team.name}
                  </h2>
                  {team.rank === 1 && (
                    <Crown className='w-8 h-8 text-yellow-400' />
                  )}
                </div>
                <div className='flex items-center space-x-4 mb-4'>
                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      team.rank <= 4
                        ? "border border-yellow-400/20 bg-yellow-400/10 text-yellow-200"
                        : team.rank <= 10
                        ? "border border-slate-400/20 bg-slate-500/10 text-slate-200"
                        : "border border-white/10 bg-slate-400/10 text-slate-300"
                    }`}
                  >
                    프리미어리그 {team.rank}위
                  </div>
                  <div className='text-slate-400 text-base font-medium'>
                    {team.shortName}
                  </div>
                </div>
                <p className='text-slate-300 text-base leading-relaxed max-w-2xl'>
                  {team.description}
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6'>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 text-center'>
              <Trophy className='w-6 h-6 sm:w-8 sm:h-8 text-amber-300 mx-auto mb-2 sm:mb-3' />
              <div className='text-xl sm:text-3xl font-semibold text-white mb-1'>
                {team.points}
              </div>
              <div className='text-slate-400 text-sm font-medium'>승점</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 text-center'>
              <Target className='w-6 h-6 sm:w-8 sm:h-8 text-slate-300 mx-auto mb-2 sm:mb-3' />
              <div className='text-xl sm:text-3xl font-semibold text-white mb-1'>
                {team.goalsFor}
              </div>
              <div className='text-slate-400 text-sm font-medium'>득점</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 text-center'>
              <Shield className='w-6 h-6 sm:w-8 sm:h-8 text-slate-300 mx-auto mb-2 sm:mb-3' />
              <div className='text-xl sm:text-3xl font-semibold text-white mb-1'>
                {team.goalsAgainst}
              </div>
              <div className='text-slate-400 text-sm font-medium'>실점</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 text-center'>
              <Activity className='w-6 h-6 sm:w-8 sm:h-8 text-slate-300 mx-auto mb-2 sm:mb-3' />
              <div className='text-xl sm:text-3xl font-semibold text-white mb-1'>
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
            className={`flex items-center space-x-2 rounded-2xl border px-6 py-3 font-semibold transition ${
              activeTab === tab.id
                ? "border-slate-400/30 bg-slate-500/10 text-white"
                : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10'>
          <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
            <h3 className='mb-4 md:mb-6 flex items-center space-x-3 text-xl md:text-2xl font-semibold text-white'>
              <Award className='w-6 h-6 text-slate-300' />
              <span>클럽 정보</span>
            </h3>

            <div className='space-y-6'>
              <div className='flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='flex items-center space-x-3'>
                  <Calendar className='w-5 h-5 text-slate-300' />
                  <span className='text-slate-300'>창단연도</span>
                </div>
                <span className='text-lg font-semibold text-white'>
                  {team.founded}
                </span>
              </div>

              <div className='flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='flex items-center space-x-3'>
                  <MapPin className='w-5 h-5 text-slate-300' />
                  <span className='text-slate-300'>홈구장</span>
                </div>
                <div className='text-right'>
                  <div className='text-white font-semibold'>{team.stadium}</div>
                  <div className='text-slate-400 text-sm'>
                    {team.capacity.toLocaleString()}석
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='flex items-center space-x-3'>
                  <Users className='w-5 h-5 text-slate-300' />
                  <span className='text-slate-300'>감독</span>
                </div>
                <div className='text-right'>
                  <div className='text-white font-semibold'>{team.manager}</div>
                  <div className='text-slate-400 text-sm'>
                    {team.nationality}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='flex items-center space-x-3'>
                  <Trophy className='w-5 h-5 text-amber-300' />
                  <span className='text-slate-300'>PL 타이틀</span>
                </div>
                <span className='text-lg font-semibold text-white'>
                  {team.trophies}회
                </span>
              </div>

              <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4'>
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

          <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
            <h3 className='mb-4 md:mb-6 flex items-center space-x-3 text-xl md:text-2xl font-semibold text-white'>
              <Activity className='w-6 h-6 text-slate-300' />
              <span>시즌 성과</span>
            </h3>

            <div className='space-y-6'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center'>
                  <div className='mb-1 text-2xl font-semibold text-slate-300'>
                    {team.won}
                  </div>
                  <div className='text-slate-400 text-sm'>승</div>
                </div>
                <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center'>
                  <div className='mb-1 text-2xl font-semibold text-amber-300'>
                    {team.drawn}
                  </div>
                  <div className='text-slate-400 text-sm'>무</div>
                </div>
                <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center'>
                  <div className='mb-1 text-2xl font-semibold text-rose-300'>
                    {team.lost}
                  </div>
                  <div className='text-slate-400 text-sm'>패</div>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-300'>승률</span>
                  <span className='font-semibold text-white'>
                    {((team.won / team.played) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className='h-3 w-full rounded-full bg-slate-800/60'>
                  <div
                    className='h-3 rounded-full bg-slate-400/80 transition-all duration-1000'
                    style={{ width: `${(team.won / team.played) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center'>
                  <div className='mb-1 text-xl font-semibold text-white'>
                    {team.keyStats.passAccuracy}%
                  </div>
                  <div className='text-slate-400 text-sm'>패스 성공률</div>
                </div>
                <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center'>
                  <div className='mb-1 text-xl font-semibold text-white'>
                    {team.keyStats.shotsPerGame}
                  </div>
                  <div className='text-slate-400 text-sm'>경기당 슈팅</div>
                </div>
              </div>

              <div className='rounded-xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-slate-300'>클린시트</span>
                  <span className='font-semibold text-white'>
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
          <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
            <div className='flex flex-col lg:flex-row gap-4 md:gap-6'>
              <div className='relative flex-1'>
                <Search className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='선수 검색 (이름)'
                  aria-label='선수 검색'
                  name='squad-search'
                  autoComplete='off'
                  className='w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 sm:py-4 pl-14 pr-5 text-white placeholder-slate-400 transition focus:outline-none focus:border-slate-400/40 focus:ring-2 focus:ring-slate-400/20'
                  value={searchTerm}
                  onChange={(event) => onSearchTermChange(event.target.value)}
                />
              </div>
              <div className='flex flex-wrap gap-4'>
                <div className='relative'>
                  <select
                    aria-label='포지션 필터'
                    name='squad-position'
                    className='appearance-none rounded-2xl border border-white/10 bg-slate-900/60 py-3 sm:py-4 pl-4 sm:pl-6 pr-10 sm:pr-12 text-sm sm:text-base text-white transition focus:outline-none focus:border-slate-400/40 focus:ring-2 focus:ring-slate-400/20'
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
                    aria-label='정렬 기준'
                    name='squad-sort'
                    className='appearance-none rounded-2xl border border-white/10 bg-slate-900/60 py-3 sm:py-4 pl-4 sm:pl-6 pr-10 sm:pr-12 text-sm sm:text-base text-white transition focus:outline-none focus:border-slate-400/40 focus:ring-2 focus:ring-slate-400/20'
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
                className='group cursor-pointer rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition hover:border-slate-400/30 hover:bg-slate-950/70'
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
                    <div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-sm font-semibold text-white'>
                      {player.number}
                    </div>
                    <div
                      className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
                        player.position.includes("GK")
                          ? "border-yellow-400/30 bg-yellow-500/10 text-yellow-200"
                          : ["CB", "LB", "RB", "LWB", "RWB"].some((code) =>
                              player.position.includes(code)
                            )
                          ? "border-slate-400/30 bg-slate-500/10 text-slate-200"
                          : ["CDM", "CM", "CAM", "LM", "RM"].some((code) =>
                              player.position.includes(code)
                            )
                          ? "border-slate-400/30 bg-slate-500/10 text-slate-200"
                          : "border-rose-400/30 bg-rose-500/10 text-rose-200"
                      }`}
                    >
                      {player.position}
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4 className='mb-1 text-xl font-semibold text-white transition-colors group-hover:text-slate-200'>
                    {player.name}
                  </h4>
                  <p className='text-slate-400 text-sm'>
                    {player.nationality} • {player.age}세
                  </p>
                </div>

                <div className='grid grid-cols-3 gap-3 mb-4'>
                  <div className='text-center'>
                  <div className='text-lg font-semibold text-white'>
                    {player.goals}
                  </div>
                    <div className='text-slate-400 text-xs'>골</div>
                  </div>
                  <div className='text-center'>
                  <div className='text-lg font-semibold text-white'>
                    {player.assists}
                  </div>
                    <div className='text-slate-400 text-xs'>도움</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-lg font-semibold text-amber-300'>
                      {player.rating}
                    </div>
                    <div className='text-slate-400 text-xs'>평점</div>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                  <div className='text-slate-400 text-sm'>시즌 출전</div>
                  <div className='font-semibold text-white'>
                    {player.appearances}경기
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className='rounded-3xl border border-white/10 bg-slate-950/50 py-16 text-center'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10'>
          <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
            <h3 className='mb-4 md:mb-6 flex items-center space-x-3 text-xl md:text-2xl font-semibold text-white'>
              <TrendingUp className='w-6 h-6 text-slate-300' />
              <span>팀 통계</span>
            </h3>

            <div className='grid grid-cols-2 gap-3 sm:gap-6'>
              <div className='rounded-2xl border border-slate-400/20 bg-slate-500/5 p-6 text-center'>
                <div className='mb-2 text-3xl font-semibold text-slate-300'>
                  {stats?.matchesPlayed ?? team.played}
                </div>
                <div className='text-slate-400 text-sm'>경기 수</div>
              </div>
              <div className='rounded-2xl border border-slate-400/20 bg-slate-500/5 p-6 text-center'>
                <div className='mb-2 text-3xl font-semibold text-slate-300'>
                  {stats?.winRate ?? "0.0"}%
                </div>
                <div className='text-slate-400 text-sm'>승률</div>
              </div>
              <div className='rounded-2xl border border-slate-400/20 bg-slate-500/5 p-6 text-center'>
                <div className='mb-2 text-3xl font-semibold text-slate-300'>
                  {stats?.goalDifference ?? team.goalsFor - team.goalsAgainst}
                </div>
                <div className='text-slate-400 text-sm'>득실차</div>
              </div>
              <div className='rounded-2xl border border-amber-400/20 bg-amber-500/5 p-6 text-center'>
                <div className='mb-2 text-3xl font-semibold text-amber-300'>
                  {stats?.goalsForPerGame ?? "0.00"}
                </div>
                <div className='text-slate-400 text-sm'>경기당 득점</div>
              </div>
            </div>

            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='text-slate-300 text-sm'>경기당 실점</div>
                <div className='mt-1 text-2xl font-semibold text-white'>
                  {stats?.goalsAgainstPerGame ?? "0.00"}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='text-slate-300 text-sm'>점유율</div>
                <div className='mt-1 text-2xl font-semibold text-white'>
                  {stats?.possession ?? `${team.keyStats.possession}%`}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='text-slate-300 text-sm'>패스 성공률</div>
                <div className='mt-1 text-2xl font-semibold text-white'>
                  {stats?.passAccuracy ?? `${team.keyStats.passAccuracy}%`}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-4'>
                <div className='text-slate-300 text-sm'>클린시트 비율</div>
                <div className='mt-1 text-2xl font-semibold text-white'>
                  {stats?.cleanSheetRate ?? "0.0%"}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 p-4 md:col-span-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-300 text-sm'>경기당 슈팅</span>
                  <span className='text-2xl font-semibold text-white'>
                    {stats?.shotsPerGame ?? team.keyStats.shotsPerGame}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
            <h3 className='mb-4 md:mb-6 flex items-center space-x-3 text-xl md:text-2xl font-semibold text-white'>
              <Target className='w-6 h-6 text-slate-300' />
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
                      <span className='font-semibold text-white'>{pos.label}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='font-semibold text-slate-300'>
                        {pos.count}명
                      </span>
                      <span className='text-slate-400 text-sm'>
                        ({pos.percentage}%)
                      </span>
                    </div>
                  </div>

                  <div className='h-4 w-full overflow-hidden rounded-full bg-slate-800/60'>
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
