"use client";

import React from "react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { useTranslations } from "next-intl";

type PlayerComparisonMatrixProps = {
  players: PlayerDatabaseEntry[];
};

const SKILL_ORDER: Array<{ key: keyof PlayerDatabaseEntry["stats"]; labelKey: string }> = [
  { key: "shooting", labelKey: "skills.labels.shooting" },
  { key: "passing", labelKey: "skills.labels.passing" },
  { key: "defending", labelKey: "skills.labels.defending" },
];

export const PlayerComparisonMatrix = ({ players }: PlayerComparisonMatrixProps) => {
  const t = useTranslations("player.comparison.matrix");
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
              {t("table.players")}
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
                      {t("table.positionAge", { position: player.position, age: player.age })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <section>
            <div className='grid bg-slate-900/40' style={{ gridTemplateColumns }}>
              <div className='px-4 py-4 text-sm font-semibold text-white'>{t("overview.title")}</div>
              {players.map((player) => (
                <div key={`overview-${player.id}`} className='border-l border-white/5 px-4 py-4 space-y-2 text-sm text-white'>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>{t("overview.position")}</span>
                    <span className='font-semibold text-white'>{player.position}</span>
                  </div>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>{t("overview.age")}</span>
                    <span className='font-semibold text-white'>{t("overview.ageValue", { age: player.age })}</span>
                  </div>
                  <div className='flex items-center justify-between text-slate-300'>
                    <span>{t("overview.nationality")}</span>
                    <span className='font-semibold text-white'>{player.nationality}</span>
                  </div>
                </div>
              ))}
            </div>

            {renderRow(
              t("rows.goals"),
              (player) => <span className='font-semibold text-green-400 text-base'>{player.goals}</span>
            )}
            {renderRow(
              t("rows.assists"),
              (player) => <span className='font-semibold text-teal-400 text-base'>{player.assists}</span>
            )}
            {renderRow(
              t("rows.goalInvolvements"),
              (player) => <span className='font-semibold text-emerald-400 text-base'>{player.goals + player.assists}</span>
            )}
            {renderRow(
              t("physical.title"),
              (player) => (
                <div className='flex items-center gap-3 text-slate-300'>
                  <div className='flex flex-col text-xs'>
                    <span className='uppercase tracking-wide text-slate-500'>{t("physical.heightLabel")}</span>
                    <span className='text-white font-semibold text-sm'>{t("physical.heightValue", { value: player.height })}</span>
                  </div>
                  <div className='w-px h-6 bg-white/10'></div>
                  <div className='flex flex-col text-xs'>
                    <span className='uppercase tracking-wide text-slate-500'>{t("physical.weightLabel")}</span>
                    <span className='text-white font-semibold text-sm'>{t("physical.weightValue", { value: player.weight })}</span>
                  </div>
                </div>
              ),
              { dense: true }
            )}

            <div className='grid bg-slate-900/40 border-t border-white/10' style={{ gridTemplateColumns }}>
              <div className='px-4 py-4 text-sm font-semibold text-white'>{t("skills.title")}</div>
              {players.map((player) => (
                <div key={`skills-${player.id}`} className='border-l border-white/5 px-4 py-4 space-y-4'>
                  {SKILL_ORDER.map(({ key, labelKey }) => (
                    <div key={key} className='space-y-1'>
                      <div className='flex items-center justify-between text-xs text-slate-400'>
                        <span>{t(labelKey)}</span>
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
              t("experience.title"),
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
                    <span className='font-semibold text-white'>
                      {t("experience.matches", { matches: totals.matches })}
                    </span>
                    <span className='text-xs text-slate-500'>•</span>
                    <span className='font-semibold text-emerald-400'>
                      {t("experience.goals", { goals: totals.goals })}
                    </span>
                  </div>
                );
              }
            )}

            {renderRow(
              t("career.title"),
              (player) => {
                const latestPeriod = player.career[0];
                if (!latestPeriod) {
                  return <span className='text-slate-500'>{t("career.empty")}</span>;
                }
                const latestTeam = TEAMS_BY_ID[latestPeriod.teamId];
                return (
                  <div className='space-y-1'>
                    <div className='text-white font-semibold text-sm'>
                      {latestTeam?.name ?? latestPeriod.teamId.toUpperCase()}
                    </div>
                    <div className='text-xs text-slate-400'>
                      {t("career.latestSummary", {
                        year: latestPeriod.year,
                        matches: latestPeriod.matches,
                        goals: latestPeriod.goals,
                      })}
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
