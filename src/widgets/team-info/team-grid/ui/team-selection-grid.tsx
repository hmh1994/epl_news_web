"use client";

import React from "react";
import { Trophy, Target, MapPin } from "lucide-react";
import { TeamProfile } from "@/entities/team/model/team-profile";

type TeamSelectionGridProps = {
  teams: TeamProfile[];
  selectedTeam: TeamProfile | null;
  onSelect: (team: TeamProfile) => void;
};

export const TeamSelectionGrid = ({
  teams,
  selectedTeam,
  onSelect,
}: TeamSelectionGridProps) => (
  <div className='mb-16'>
    <div className='flex items-center justify-between mb-10'>
      <div>
        <h2 className='text-4xl font-black text-white mb-2'>프리미어리그 클럽</h2>
        <p className='text-slate-400 text-lg'>세계 최고 수준의 축구 클럽들을 선택하세요</p>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/10'>
          {teams.length}개 팀
        </div>
      </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {teams.map((team) => {
        const isSelected = selectedTeam?.id === team.id;
        return (
          <button
            key={team.id}
            type='button'
            onClick={() => onSelect(team)}
            className={`group relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-left ${
              isSelected
                ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/10 shadow-2xl shadow-emerald-500/25"
                : "border-white/10 hover:border-white/20"
            }`}
          >
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
              <p className='text-slate-400 text-sm font-medium'>{team.shortName}</p>
            </div>

            <div className='space-y-4 mb-6'>
              <div className='flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-white/5'>
                <div className='flex items-center space-x-2 text-slate-400'>
                  <Trophy className='w-4 h-4' />
                  <span className='text-sm'>승점</span>
                </div>
                <span className='text-white font-bold text-lg'>{team.points}</span>
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
                <span className='text-white font-semibold text-sm'>{team.stadium}</span>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-slate-400 text-sm font-medium'>최근 폼</span>
              <div className='flex space-x-1'>
                {team.form.map((result, index) => (
                  <div
                    key={index}
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
          </button>
        );
      })}
    </div>
  </div>
);
