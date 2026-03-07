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
  isUp,
}: {
  team: LeagueTableTeam;
  isUp: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded-md bg-slate-900/70 border border-white/10 overflow-hidden shrink-0">
      <Image
        src={team.logo ?? ""}
        alt={team.teamName ?? ""}
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
      />
    </div>
    <span className="text-xs text-slate-300 truncate flex-1">
      {team.teamShortName ?? team.teamId}
    </span>
    <span
      className={`text-xs font-semibold tabular-nums ${
        isUp ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {isUp ? "+" : ""}
      {team.trend.toFixed(1)}
    </span>
  </div>
);

export const TeamMomentumWidget = ({ teams }: TeamMomentumWidgetProps) => {
  const { rising, falling } = useMemo(() => {
    const sorted = [...teams].sort((a, b) => b.trend - a.trend);
    return {
      rising: sorted.filter((t) => t.trend > 0).slice(0, 3),
      falling: sorted.filter((t) => t.trend < 0).reverse().slice(0, 3),
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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-3 space-y-2">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">상승세</span>
          </div>
          {rising.length > 0 ? (
            rising.map((t) => <MomentumItem key={t.teamId} team={t} isUp />)
          ) : (
            <p className="text-xs text-slate-500">-</p>
          )}
        </div>
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-3 space-y-2">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-medium text-red-400">하락세</span>
          </div>
          {falling.length > 0 ? (
            falling.map((t) => <MomentumItem key={t.teamId} team={t} isUp={false} />)
          ) : (
            <p className="text-xs text-slate-500">-</p>
          )}
        </div>
      </div>
    </div>
  );
};
