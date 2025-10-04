import { ReactNode } from "react";
import { LeagueAccent } from "@/entities/league/model/league-overview";
import { getAccentStyles } from "@/entities/league/lib/accent-palette";

interface LeagueStatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  change: string;
  accent: LeagueAccent;
}

export const LeagueStatCard = ({
  icon,
  value,
  label,
  change,
  accent,
}: LeagueStatCardProps) => {
  const styles = getAccentStyles(accent);

  return (
    <div className='group bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:-translate-y-2 transition-all duration-500'>
      <div className='flex items-center justify-between mb-6'>
        <div className={`w-12 h-12 flex items-center justify-center ${styles.text}`}>
          {icon}
        </div>
        <div className='text-right'>
          <div
            className={`text-3xl font-black text-white transition-colors ${styles.hoverText}`}
          >
            {value}
          </div>
          <div className={`${styles.text} text-sm font-semibold`}>{change}</div>
        </div>
      </div>
      <div className='text-slate-400 font-medium'>{label}</div>
      <div className='w-full bg-slate-700 rounded-full h-2 mt-4'>
        <div
          className={`bg-gradient-to-r ${styles.gradient} h-2 rounded-full transition-all duration-500`}
          style={{ width: "85%" }}
        ></div>
      </div>
    </div>
  );
};
