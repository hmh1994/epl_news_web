"use client";

import type { PointsRaceTeam } from "@/shared/api/epl/lib/points-race";
import { PointsRaceChart } from "./PointsRaceChart";

interface PointsRaceWidgetProps {
  teams: PointsRaceTeam[];
}

export const PointsRaceWidget = ({ teams }: PointsRaceWidgetProps) => {
  if (!teams || teams.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Points Race
        </h2>
        <p className="text-slate-400 text-lg">상위 팀 시즌 승점 추이</p>
      </div>

      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 sm:p-6">
        <PointsRaceChart teams={teams} />
      </div>
    </div>
  );
};
