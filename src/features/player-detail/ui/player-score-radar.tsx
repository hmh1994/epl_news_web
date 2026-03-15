"use client";

import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import type { PlayerScore } from "@/entities/player/model/player-score";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PerformanceIndex {
  label: string;
  value: number;
}

interface PlayerScoreRadarProps {
  score: PlayerScore;
  indices: PerformanceIndex[];
}

const CATEGORIES = [
  { key: "shooting", label: "슈팅" },
  { key: "passing", label: "패스" },
  { key: "defending", label: "수비" },
  { key: "dribbling", label: "드리블" },
  { key: "discipline", label: "규율" },
] as const;

export const PlayerScoreRadar = ({ score, indices }: PlayerScoreRadarProps) => {
  const values = CATEGORIES.map((c) => score[c.key]);

  const chartData = useMemo(
    () => ({
      labels: CATEGORIES.map((c) => c.label),
      datasets: [
        {
          data: values,
          backgroundColor: "rgba(148, 163, 184, 0.1)",
          borderColor: "rgba(148, 163, 184, 0.6)",
          borderWidth: 1.5,
          pointBackgroundColor: "#94a3b8",
          pointBorderColor: "#0f172a",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
        },
      ],
    }),
    [values]
  );

  const chartOptions: ChartOptions<"radar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleColor: "rgba(255, 255, 255, 0.9)",
          bodyColor: "rgba(255, 255, 255, 0.75)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 10,
          callbacks: {
            title: (items) => items[0]?.label ?? "",
            label: (ctx) => `${ctx.parsed?.r ?? 0} / 100`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false, maxTicksLimit: 5 },
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          angleLines: { color: "rgba(148, 163, 184, 0.1)" },
          pointLabels: {
            color: "#94a3b8",
            font: { size: 11, weight: 600 },
            padding: 12,
          },
        },
      },
      animation: { duration: 600, easing: "easeOutQuart" },
    }),
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 좌: 레이더 차트 */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]">
        <div className="flex items-baseline justify-between mb-5">
          <h4 className="text-lg font-semibold text-white">능력치 분석</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Overall</span>
            <span className="text-sm font-bold text-white">{Math.round(score.overall)}</span>
          </div>
        </div>
        <div className="h-56 sm:h-64">
          <Radar data={chartData} options={chartOptions} />
        </div>
        {/* 스코어 요약 행 */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.key} className="text-center">
              <div className="text-sm font-semibold text-white">{Math.round(values[i])}</div>
              <div className="text-[10px] text-slate-500">{cat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 우: Performance Indices */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]">
        <h4 className="text-lg font-semibold text-white mb-5">
          Performance Indices
        </h4>
        <div className="space-y-3">
          {indices.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3"
            >
              <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                <span>{item.label}</span>
                <span className="font-semibold text-white">{Math.round(item.value)}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-slate-500/80 to-slate-400/80"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
