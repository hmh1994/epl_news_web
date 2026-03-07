"use client";

import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import type { LeagueTableTeam } from "@/entities/team/model/league-table-team";

interface TeamMomentumWidgetProps {
  teams: LeagueTableTeam[];
}

const MomentumItem = ({
  team,
  maxAbs,
  direction,
}: {
  team: LeagueTableTeam;
  maxAbs: number;
  direction: "up" | "down";
}) => {
  const barWidth = maxAbs === 0 ? 0 : (Math.abs(team.trend) / maxAbs) * 100;
  const isUp = direction === "up";

  return (
    <div className="flex items-center gap-2 py-1.5">
      <div className="w-5 h-5 rounded-md bg-slate-900/70 border border-white/10 overflow-hidden shrink-0">
        <Image
          src={team.logo ?? ""}
          alt={team.teamName ?? ""}
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      </div>
      <span className="text-xs text-slate-300 w-8 shrink-0 truncate">
        {team.teamShortName ?? team.teamId}
      </span>
      <div className="flex-1 h-3 bg-slate-800/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isUp
              ? "bg-gradient-to-r from-emerald-500/70 to-emerald-400/50"
              : "bg-gradient-to-r from-red-500/70 to-red-400/50"
          }`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <span
        className={`text-xs font-semibold tabular-nums w-10 text-right shrink-0 ${
          isUp ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isUp ? "+" : ""}
        {team.trend.toFixed(1)}
      </span>
    </div>
  );
};

export const TeamMomentumWidget = ({ teams }: TeamMomentumWidgetProps) => {
  const { rising, falling, maxAbs } = useMemo(() => {
    const sorted = [...teams].sort((a, b) => b.trend - a.trend);
    const maxAbs = Math.max(...teams.map((t) => Math.abs(t.trend)), 1);
    return {
      rising: sorted.filter((t) => t.trend > 0).slice(0, 5),
      falling: sorted
        .filter((t) => t.trend < 0)
        .reverse()
        .slice(0, 5),
      maxAbs,
    };
  }, [teams]);

  return (
    <div className="mt-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Team Momentum
        </h2>
        <p className="text-slate-400 text-lg">최근 경기 기반 팀 상승/하락 지수</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rising */}
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">상승세</span>
          </div>
          {rising.length > 0 ? (
            rising.map((team) => (
              <MomentumItem
                key={team.teamId}
                team={team}
                maxAbs={maxAbs}
                direction="up"
              />
            ))
          ) : (
            <p className="text-xs text-slate-500 py-2">데이터 없음</p>
          )}
        </div>

        {/* Falling */}
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">하락세</span>
          </div>
          {falling.length > 0 ? (
            falling.map((team) => (
              <MomentumItem
                key={team.teamId}
                team={team}
                maxAbs={maxAbs}
                direction="down"
              />
            ))
          ) : (
            <p className="text-xs text-slate-500 py-2">데이터 없음</p>
          )}
        </div>
      </div>
    </div>
  );
};
