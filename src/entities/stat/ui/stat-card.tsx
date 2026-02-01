import type { ReactNode } from "react";
import { Activity, Globe, Target, TrendingUp, Trophy, Users } from "lucide-react";
import { LeagueStat } from "../model/league-stat";

interface StatCardProps {
  stat: LeagueStat;
}

const ICON_MAP: Record<string, ReactNode> = {
  trophy: <Trophy className='w-7 h-7' />,
  users: <Users className='w-7 h-7' />,
  globe: <Globe className='w-7 h-7' />,
  target: <Target className='w-7 h-7' />,
  activity: <Activity className='w-7 h-7' />,
};

const resolveIcon = (icon: string) => ICON_MAP[icon] ?? <Trophy className='w-7 h-7' />;

const buildGradientBackground = (gradient: LeagueStat["gradient"]) => {
  return `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`;
};

export const StatCard = ({ stat }: StatCardProps) => {
  return (
    <div className='group relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-2 cursor-pointer transition-all duration-500'>
      <div
        className='absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl'
        style={{ backgroundImage: buildGradientBackground(stat.gradient) }}
      ></div>

      <div className='relative'>
        <div
          className='w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300'
          style={{ backgroundImage: buildGradientBackground(stat.gradient) }}
        >
          <div className='text-white'>{resolveIcon(stat.icon)}</div>
        </div>

        <div className='text-4xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#169976] group-hover:to-teal-400 transition-all duration-300'>
          {stat.value}
        </div>

        <div className='text-slate-400 font-medium mb-3'>{stat.label}</div>

        <div
          className={`inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded-full ${
            stat.change.startsWith("+")
              ? "bg-green-500/20 text-green-400"
              : stat.change === "0%"
              ? "bg-slate-500/20 text-slate-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          <TrendingUp className='w-3 h-3' />
          <span>{stat.change}</span>
        </div>
      </div>
    </div>
  );
};
