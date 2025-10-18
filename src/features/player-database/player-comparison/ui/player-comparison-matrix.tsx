"use client";

import React from "react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

type PlayerComparisonMatrixProps = {
  players: PlayerDatabaseEntry[];
};

const SKILL_ORDER: Array<{ key: keyof PlayerDatabaseEntry["stats"]; label: string }> = [
  { key: "shooting", label: "Shooting" },
  { key: "passing", label: "Passing" },
  { key: "defending", label: "Defending" },
];

export const PlayerComparisonMatrix = ({ players }: PlayerComparisonMatrixProps) => {
  const gridTemplateColumns = `200px repeat(${players.length}, minmax(0, 1fr))`;

  const renderRow = (
    label: React.ReactNode,
    renderValue: (player: PlayerDatabaseEntry) => React.ReactNode,
    { dense }: { dense?: boolean } = {}
  ) => (
    <div
      className={`grid border-t border-white/5 ${dense ? "py-3" : "py-4"}`}
      style={{ gridTemplateColumns }}
    >
      <div className='px-4 text-sm font-medium text-slate-400 flex items-center'>{label}</div>
      {players.map((player) => (
        <div
          key={`${player.id}-${String(label)}`}
          className='px-4 text-sm text-white flex items-center'
        >
          {renderValue(player)}
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-slate-900/60 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
      <div className='overflow-x-auto'>
        <div className='min-w-[720px]'>
          <div className='grid bg-slate-900/70' style={{ gridTemplateColumns }}>
            <div className='px-4 py-6 text-sm font-semibold uppercase tracking-widest text-slate-400 flex items-center'>
              Players
            </div>
            {players.map((player) => {
              const team = TEAMS_BY_ID[player.teamId];
              return (
                <div
                  key={`header-${player.id}`}
                  className='px-4 py-6 border-l border-white/5 text-center space-y-3'
                >
                  <div className='w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#169976] to-teal-500 flex items-center justify-center text-2xl shadow-xl'>
                    {player.photo}
                  </div>
                  <div className='space-y-1'>
                    <div className='text-white font-semibold text-lg'>{player.name}</div>
                    <div className='text-slate-400 text-sm'>
                      {team?.name ?? player.teamId.toUpperCase()}
                    </div>
                    <div className='text-xs text-slate-500'>
                      {player.position} • {player.age}세
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <section>
            <div className='grid bg-slate-900/40' style={{ gridTemplateColumns }}>
              <div className='px-4 py-4 text-sm font-semibold text-white'>개요</div>
              {players.map((player) => (
                <div key={`overview-${player.id}`} className='border-l border-white/5 px-4 py-4 space-y-2 text-sm text-white'>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>포지션</span>
                    <span className='font-semibold text-white'>{player.position}</span>
                  </div>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>나이</span>
                    <span className='font-semibold text-white'>{player.age}세</span>
                  </div>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>국적</span>
                    <span className='font-semibold text-white'>{player.nationality}</span>
                  </div>
                </div>
              ))}
            </div>

            {renderRow(
              "득점",
              (player) => <span className='font-semibold text-green-400 text-base'>{player.goals}</span>
            )}
            {renderRow(
              "도움",
              (player) => <span className='font-semibold text-teal-400 text-base'>{player.assists}</span>
            )}
            {renderRow(
              "공격포인트",
              (player) => <span className='font-semibold text-emerald-400 text-base'>{player.goals + player.assists}</span>
            )}
            {renderRow(
              "체격",
              (player) => (
                <div className='flex items-center gap-3 text-slate-300'>
                  <div className='flex flex-col text-xs'>
                    <span className='uppercase tracking-wide text-slate-500'>Height</span>
                    <span className='text-white font-semibold text-sm'>{player.height} cm</span>
                  </div>
                  <div className='w-px h-6 bg-white/10'></div>
                  <div className='flex flex-col text-xs'>
                    <span className='uppercase tracking-wide text-slate-500'>Weight</span>
                    <span className='text-white font-semibold text-sm'>{player.weight} kg</span>
                  </div>
                </div>
              ),
              { dense: true }
            )}

            <div className='grid bg-slate-900/40 border-t border-white/10' style={{ gridTemplateColumns }}>
              <div className='px-4 py-4 text-sm font-semibold text-white'>기술 지표</div>
              {players.map((player) => (
                <div key={`skills-${player.id}`} className='border-l border-white/5 px-4 py-4 space-y-4'>
                  {SKILL_ORDER.map(({ key, label }) => (
                    <div key={key} className='space-y-1'>
                      <div className='flex items-center justify-between text-xs text-slate-400'>
                        <span>{label}</span>
                        <span className='text-white font-semibold'>{player.stats[key]}</span>
                      </div>
                      <div className='w-full h-1.5 rounded-full bg-slate-700 overflow-hidden'>
                        <div
                          className='h-1.5 rounded-full bg-gradient-to-r from-[#169976] to-teal-500 transition-all'
                          style={{ width: `${player.stats[key]}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {renderRow(
              "경험치",
              (player) => {
                const totals = player.career.reduce(
                  (acc, period) => {
                    acc.matches += period.matches;
                    acc.goals += period.goals;
                    return acc;
                  },
                  { matches: 0, goals: 0 }
                );
                return (
                  <div className='flex items-center gap-3 text-slate-300 text-sm'>
                    <span className='font-semibold text-white'>{totals.matches} matches</span>
                    <span className='text-xs text-slate-500'>•</span>
                    <span className='font-semibold text-emerald-400'>{totals.goals} goals</span>
                  </div>
                );
              }
            )}

            {renderRow(
              "최근 커리어",
              (player) => {
                const latestPeriod = player.career[0];
                if (!latestPeriod) {
                  return <span className='text-slate-500'>데이터 없음</span>;
                }
                const latestTeam = TEAMS_BY_ID[latestPeriod.teamId];
                return (
                  <div className='space-y-1'>
                    <div className='text-white font-semibold text-sm'>
                      {latestTeam?.name ?? latestPeriod.teamId.toUpperCase()}
                    </div>
                    <div className='text-xs text-slate-400'>
                      {latestPeriod.year} • {latestPeriod.matches}경기 {latestPeriod.goals}골
                    </div>
                  </div>
                );
              }
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
