"use client";

import React from "react";
import { Trophy, Target, MapPin } from "lucide-react";
import { TeamProfile } from "@/entities/team/model/team-profile";

type TeamSelectionGridProps = {
  teams: TeamProfile[];
  selectedTeam: TeamProfile | null;
  onSelect: (team: TeamProfile) => void;
  showHeader?: boolean;
  variant?: "default" | "compact";
};

const CompactList = ({
  teams,
  selectedTeam,
  onSelect,
}: Pick<TeamSelectionGridProps, "teams" | "selectedTeam" | "onSelect">) => {
  if (teams.length === 0) {
    return (
      <div className='rounded-xl border border-dashed border-white/10 bg-white/5 px-3 py-4 text-xs text-slate-400 text-center'>
        조건에 맞는 팀이 없습니다.
      </div>
    );
  }

  return (
    <div className='space-y-1'>
      {teams.map((team) => {
        const isSelected = selectedTeam?.id === team.id;
        return (
          <button
            key={team.id}
            type='button'
            onClick={() => onSelect(team)}
            className={`flex h-12 w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-all ${
              isSelected
                ? "border-emerald-400 bg-emerald-500/10 text-white shadow-lg"
                : "border-white/10 bg-slate-900/60 text-white/80 hover:border-emerald-400/60 hover:bg-slate-900/80"
            }`}
          >
            <div className='flex min-w-0 items-center gap-2.5'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#169976] to-teal-500 text-base text-white shadow-inner'>
                {team.logo}
              </div>
              <div className='min-w-0'>
                <p className='truncate text-[13px] font-semibold text-white'>
                  {team.name}
                </p>
                <p className='text-[10px] text-slate-400'>{team.shortName}</p>
              </div>
            </div>
            <div className='flex flex-col items-end text-[10px] text-slate-300'>
              <span className='font-semibold text-white'>#{team.rank}</span>
              <span>{team.points} pts</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export const TeamSelectionGrid = ({
  teams,
  selectedTeam,
  onSelect,
  showHeader = true,
  variant = "default",
}: TeamSelectionGridProps) => {
  if (variant === "compact") {
    return (
      <CompactList teams={teams} selectedTeam={selectedTeam} onSelect={onSelect} />
    );
  }

  return (
    <div className='mb-16'>
      {showHeader && (
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h2 className='mb-1 text-3xl font-black text-white'>프리미어리그 클럽</h2>
            <p className='text-sm text-slate-400 md:text-base'>
              세계 최고 수준의 축구 클럽들을 선택하세요
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-sm text-slate-400'>
              {teams.length}개 팀
            </div>
          </div>
        </div>
      )}

      {teams.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-slate-400'>
          조건에 맞는 팀이 없습니다.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {teams.map((team) => {
            const isSelected = selectedTeam?.id === team.id;
            return (
              <button
                key={team.id}
                type='button'
                onClick={() => onSelect(team)}
                className={`group relative rounded-3xl border bg-slate-900/60 p-8 text-left transition-all duration-500 backdrop-blur-2xl ${
                  isSelected
                    ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/10 shadow-2xl shadow-emerald-500/25"
                    : "border-white/10 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl"
                }`}
              >
                <div className='absolute -top-3 -right-3'>
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${
                      team.rank <= 4
                        ? "from-yellow-400 to-orange-500"
                        : team.rank <= 10
                        ? "from-green-400 to-emerald-500"
                        : "from-slate-500 to-slate-600"
                    } flex items-center justify-center text-lg font-black text-white shadow-lg`}
                  >
                    #{team.rank}
                  </div>
                </div>

                <div className='mb-6 text-center'>
                  <div className='relative mx-auto mb-4 transition-transform duration-300 group-hover:scale-110'>
                    <div className='flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#169976] to-teal-500 text-5xl text-white shadow-2xl'>
                      {team.logo}
                    </div>
                    <div className='absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#169976]/30 to-teal-500/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100'></div>
                  </div>
                  <h3 className='text-2xl font-bold text-white transition-colors group-hover:text-emerald-300'>
                    {team.name}
                  </h3>
                  <p className='text-sm font-medium text-slate-400'>{team.shortName}</p>
                </div>

                <div className='mb-6 space-y-4'>
                  <div className='flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/30 p-3'>
                    <div className='flex items-center space-x-2 text-slate-400'>
                      <Trophy className='h-4 w-4' />
                      <span className='text-sm'>승점</span>
                    </div>
                    <span className='text-lg font-bold text-white'>{team.points}</span>
                  </div>
                  <div className='flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/30 p-3'>
                    <div className='flex items-center space-x-2 text-slate-400'>
                      <Target className='h-4 w-4' />
                      <span className='text-sm'>골득실</span>
                    </div>
                    <span className='font-bold text-white'>
                      {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                      {team.goalsFor - team.goalsAgainst}
                    </span>
                  </div>
                  <div className='flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/30 p-3'>
                    <div className='flex items-center space-x-2 text-slate-400'>
                      <MapPin className='h-4 w-4' />
                      <span className='text-sm'>홈구장</span>
                    </div>
                    <span className='text-sm font-semibold text-white'>{team.stadium}</span>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-slate-400'>최근 폼</span>
                  <div className='flex space-x-1'>
                    {team.form.map((result, index) => (
                      <div
                        key={index}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-lg ${
                          result === "W"
                            ? "bg-green-500"
                            : result === "D"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
