"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import type { PointsRaceTeam } from "@/shared/api/epl/lib/points-race";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const TEAM_COLORS: Record<string, string> = {
  MCI: "#6CABDD",
  ARS: "#EF0107",
  LIV: "#C8102E",
  CHE: "#034694",
  TOT: "#132257",
  MUN: "#DA291C",
  NEW: "#241F20",
  AVL: "#670E36",
  BHA: "#0057B8",
  WHU: "#7A263A",
  BOU: "#DA291C",
  CRY: "#1B458F",
  FUL: "#000000",
  WOL: "#FDB913",
  BRE: "#E30613",
  EVE: "#003399",
  NFO: "#DD0000",
  LEI: "#003090",
  IPS: "#0044AA",
  SOU: "#D71920",
};

const DEFAULT_COLOR = "#64748b";

interface PointsRaceChartProps {
  teams: PointsRaceTeam[];
}

export const PointsRaceChart = ({ teams }: PointsRaceChartProps) => {
  const maxGameweek = useMemo(
    () => Math.max(...teams.map((t) => t.cumulativePoints.length), 0),
    [teams]
  );

  const labels = useMemo(
    () => Array.from({ length: maxGameweek }, (_, i) => `${i + 1}`),
    [maxGameweek]
  );

  const chartData = useMemo(
    () => ({
      labels,
      datasets: teams.map((team) => {
        const color = TEAM_COLORS[team.shortName] ?? DEFAULT_COLOR;
        return {
          label: team.name,
          data: team.cumulativePoints,
          borderColor: color,
          backgroundColor: color + "20",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: color,
          tension: 0.3,
          fill: false,
        };
      }),
    }),
    [labels, teams]
  );

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            color: "#94a3b8",
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: { size: 11 },
          },
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleColor: "#e2e8f0",
          bodyColor: "#94a3b8",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 10,
          callbacks: {
            title: (items) => `게임위크 ${items[0].label}`,
            label: (item) => ` ${item.dataset.label}: ${item.raw}pts`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "게임위크",
            color: "#64748b",
            font: { size: 11 },
          },
          ticks: { color: "#475569", font: { size: 10 } },
          grid: { color: "rgba(255,255,255,0.04)" },
        },
        y: {
          title: {
            display: true,
            text: "승점",
            color: "#64748b",
            font: { size: 11 },
          },
          ticks: { color: "#475569", font: { size: 10 } },
          grid: { color: "rgba(255,255,255,0.06)" },
          beginAtZero: true,
        },
      },
    }),
    []
  );

  if (teams.length === 0) return null;

  return (
    <div className="h-[320px] sm:h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};
