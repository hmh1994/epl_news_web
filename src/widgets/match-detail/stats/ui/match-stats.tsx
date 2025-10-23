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
  ChartOptions,
} from "chart.js";
import {
  MatchDetail,
  MatchStatComparison,
} from "@/entities/match/model/match-detail";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface MatchStatsPanelProps {
  stats: MatchStatComparison[];
  formGuide: MatchDetail["formGuide"];
  homeLabel: string;
  awayLabel: string;
  timeframeNote: string;
}

export const MatchStatsPanel = ({
  stats,
  formGuide,
  homeLabel,
  awayLabel,
  timeframeNote,
}: MatchStatsPanelProps) => {
  const selectedStats = useMemo(() => {
    if (stats.length <= 6) {
      return stats;
    }
    return stats.slice(0, 6);
  }, [stats]);

  const chartData = useMemo(() => {
    const homeDataset = selectedStats.map((stat) =>
      computeNormalizedValue(stat.home, stat.away, stat.higherIsBetter)
    );
    const awayDataset = selectedStats.map((stat) =>
      computeNormalizedValue(stat.away, stat.home, stat.higherIsBetter)
    );

    return {
      labels: selectedStats.map((stat) => stat.label),
      datasets: [
        {
          label: homeLabel,
          data: homeDataset,
          backgroundColor: "rgba(22,153,118,0.25)",
          borderColor: "rgba(22,153,118,0.85)",
          borderWidth: 2,
          pointBackgroundColor: "#34d399",
          pointBorderColor: "#0f766e",
          pointHoverBackgroundColor: "#ecfeff",
          pointHoverBorderColor: "#34d399",
          fill: true,
        },
        {
          label: awayLabel,
          data: awayDataset,
          backgroundColor: "rgba(129,140,248,0.2)",
          borderColor: "rgba(99,102,241,0.85)",
          borderWidth: 2,
          pointBackgroundColor: "#a855f7",
          pointBorderColor: "#4c1d95",
          pointHoverBackgroundColor: "#faf5ff",
          pointHoverBorderColor: "#a855f7",
          fill: true,
        },
      ],
    };
  }, [selectedStats, homeLabel, awayLabel]);

  const chartOptions = useMemo<ChartOptions<"radar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: "rgba(148,163,184,0.25)",
          },
          grid: {
            color: "rgba(148,163,184,0.15)",
          },
          ticks: {
            display: false,
            maxTicksLimit: 5,
          },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: {
            color: "#cbd5f5",
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (items) => items[0]?.label ?? "",
            label: (context) => {
              const index = context.dataIndex ?? 0;
              const stat = selectedStats[index];
              const datasetLabel = context.dataset.label ?? "";
              if (!stat) {
                const fallback =
                  typeof context.parsed?.r === "number" ? context.parsed.r : 0;
                return `${datasetLabel}: ${formatStatValue(fallback)}`;
              }
              const isHome = datasetLabel === homeLabel;
              const rawValue = isHome ? stat.home : stat.away;
              return `${datasetLabel}: ${formatStatValue(rawValue)}`;
            },
          },
        },
      },
      animation: {
        duration: 800,
        easing: "easeOutQuart",
      },
    }),
    [selectedStats, homeLabel]
  );

  if (selectedStats.length === 0) {
    return null;
  }

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10 space-y-1'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>
          Momentum &amp; Stats
        </p>
        <h2 className='text-xl font-semibold text-white'>
          핵심 지표 &amp; 최근 흐름
        </h2>
        <p className='text-xs text-slate-400'>{timeframeNote}</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-[1.4fr,1fr] items-start px-2 py-6'>
        <div className='space-y-6'>
          <div className='bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-inner shadow-emerald-500/10'>
            <div className='h-72 sm:h-80'>
              <Radar data={chartData} options={chartOptions} />
            </div>
            <div className='mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300'>
              <LegendItem color='rgba(22,153,118,0.85)' label={homeLabel} />
              <LegendItem color='rgba(99,102,241,0.85)' label={awayLabel} />
            </div>
          </div>

          <StatValueGrid
            stats={selectedStats}
            homeLabel={homeLabel}
            awayLabel={awayLabel}
          />
        </div>

        <div className='space-y-5 bg-slate-900/40 border border-white/10 rounded-2xl p-5'>
          <FormColumn title={homeLabel} entries={formGuide.home} tone='home' />
          <FormColumn title={awayLabel} entries={formGuide.away} tone='away' />
        </div>
      </div>
    </section>
  );
};

const StatValueGrid = ({
  stats,
  homeLabel,
  awayLabel,
}: {
  stats: MatchStatComparison[];
  homeLabel: string;
  awayLabel: string;
}) => {
  return (
    <div className='bg-slate-900/40 border border-white/10 rounded-2xl p-6'>
      <div className='grid gap-4 sm:grid-cols-2'>
        {stats.map((stat) => {
          const positiveForHigher = stat.higherIsBetter !== false;
          const homeLeads = positiveForHigher
            ? stat.home >= stat.away
            : stat.home <= stat.away;
          const isLevel = stat.home === stat.away;
          const leaderLabel = isLevel
            ? "Level"
            : homeLeads
            ? `${homeLabel} 우위`
            : `${awayLabel} 우위`;
          const leaderTone = isLevel
            ? "text-slate-400"
            : homeLeads
            ? "text-emerald-300"
            : "text-fuchsia-300";
          return (
            <div
              key={stat.label}
              className='rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 transition-colors duration-300 hover:bg-white/10'
            >
              <div className='px-1 text-left space-y-1'>
                <span className='block text-sm font-semibold text-white'>{stat.label}</span>
                <span
                  className={`text-[10px] uppercase tracking-[0.16em] ${leaderTone}`}
                >
                  {leaderLabel}
                </span>
              </div>
              <div className='space-y-2 text-xs text-slate-300'>
                <ValueRow
                  label={homeLabel}
                  value={stat.home}
                  highlight={homeLeads && !isLevel}
                />
                <ValueRow
                  label={awayLabel}
                  value={stat.away}
                  highlight={!homeLeads && !isLevel}
                />
              </div>
              <div className='flex items-center justify-between px-1 text-[11px] text-slate-500'>
                <span>차이</span>
                <span>{formatDifference(stat.home, stat.away)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className='flex items-center gap-2'>
    <span
      className='h-2.5 w-2.5 rounded-full'
      style={{ backgroundColor: color }}
    ></span>
    <span>{label}</span>
  </div>
);

const ValueRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight: boolean;
}) => (
  <div className='flex items-center justify-between px-1 text-left'>
    <span className='tracking-[0.03em]'>{label}</span>
    <span
      className={`font-semibold ${highlight ? "text-white" : "text-slate-400"}`}
    >
      {formatStatValue(value)}
    </span>
  </div>
);

const computeNormalizedValue = (
  value: number,
  opponent: number,
  higherIsBetter?: boolean
) => {
  if (value === opponent) {
    return 50;
  }

  if (higherIsBetter === false) {
    const max = Math.max(value, opponent);
    const min = Math.min(value, opponent);
    if (max === min) {
      return 50;
    }
    return ((max - value) / (max - min)) * 100;
  }

  const max = Math.max(value, opponent);
  if (max === 0) {
    return 0;
  }
  return (value / max) * 100;
};

const formatStatValue = (value: number) => {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(1);
};

const formatDifference = (home: number, away: number) => {
  const difference = Math.abs(home - away);
  if (difference === 0) {
    return "0";
  }
  if (difference < 1) {
    return difference.toFixed(1);
  }
  if (Number.isInteger(difference)) {
    return difference.toString();
  }
  return difference.toFixed(1);
};

const FORM_TONE = {
  home: "text-emerald-200",
  away: "text-indigo-200",
} as const;

const FormColumn = ({
  title,
  entries,
  tone,
}: {
  title: string;
  entries: MatchDetail["formGuide"]["home"];
  tone: "home" | "away";
}) => {
  return (
    <div className='space-y-3'>
      <p className={`text-xs uppercase tracking-[0.3em] ${FORM_TONE[tone]}`}>
        {title}
      </p>
      <div className='space-y-2'>
        {entries.map((entry) => (
          <div
            key={`${title}-${entry.date}-${entry.opponent}`}
            className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200'
          >
            <div className='flex items-center gap-3'>
              <span
                className={`px-2 py-1 rounded-lg font-semibold ${
                  resultColor[entry.result]
                }`}
              >
                {entry.result}
              </span>
              <div>
                <p className='font-semibold text-white text-sm'>
                  {entry.score}
                </p>
                <p className='text-[11px] text-slate-400'>
                  {entry.competition}
                </p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-xs text-emerald-200/90 font-medium'>
                vs {entry.opponent}
              </p>
              <p className='text-[11px] text-slate-400'>{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const resultColor: Record<
  MatchDetail["formGuide"]["home"][number]["result"],
  string
> = {
  W: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
  D: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/40",
  L: "bg-rose-500/20 text-rose-200 border border-rose-500/40",
};
