import { ReactNode } from "react";
import { LeagueStat } from "@/entities/league/model/league-overview";
import { LeagueStatCard } from "@/entities/league/ui/league-stat-card";
import { Target, Activity, Users, Shield } from "lucide-react";

const ICON_MAP: Record<LeagueStat["icon"], ReactNode> = {
  target: <Target className='w-12 h-12' />,
  activity: <Activity className='w-12 h-12' />,
  users: <Users className='w-12 h-12' />,
  shield: <Shield className='w-12 h-12' />,
};

interface LeagueStatGridProps {
  stats: LeagueStat[];
}

export const LeagueStatGrid = ({ stats }: LeagueStatGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
      {stats.map((stat) => (
        <LeagueStatCard
          key={stat.id}
          icon={ICON_MAP[stat.icon] ?? ICON_MAP.target}
          value={stat.value}
          label={stat.label}
          change={stat.change}
          accent={stat.color}
        />
      ))}
    </div>
  );
};
