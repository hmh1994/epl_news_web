import { Star } from "lucide-react";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import { PlayerRankingCard } from "@/entities/player/ui/player-ranking-card";

interface EplHubPlayerRankingsProps {
  players: PlayerRanking[];
}

export const EplHubPlayerRankings = ({ players }: EplHubPlayerRankingsProps) => {
  return (
    <div className='bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-2xl font-bold text-white mb-1'>톱 스코러</h3>
          <p className='text-slate-400 text-sm'>이번 시즌 득점 순위</p>
        </div>
        <Star className='w-6 h-6 text-yellow-400' />
      </div>

      <div className='space-y-4'>
        {players.map((player, index) => (
          <PlayerRankingCard key={player.name} player={player} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
