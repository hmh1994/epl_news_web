import Link from "next/link";
import { Trophy } from "lucide-react";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import { PlayerRankingCard } from "@/entities/player/ui/player-ranking-card";
import { useTranslations } from "next-intl";

interface TopScorersPanelProps {
  basePath: string;
  playerRankings: PlayerRanking[];
}

export const TopScorersPanel = ({
  basePath,
  playerRankings,
}: TopScorersPanelProps) => {
  const t = useTranslations("home");

  return (
    <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-2xl'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-white'>
            {t("topScorers.title")}
          </h2>
          <p className='text-sm text-slate-400'>
            {t("topScorers.description")}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={`${basePath}/players`}
            className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("topScorers.viewPlayers")}
          </Link>
          <Trophy className='h-6 w-6 text-yellow-300' />
        </div>
      </div>
      <div className='mt-6 divide-y divide-white/10 border-t border-white/10'>
        {playerRankings.map((player, index) => {
          return (
            <div
              key={`${player.teamId}-${player.name}`}
              className='py-3 first:pt-0 last:pb-0'
            >
              <PlayerRankingCard
                player={player}
                rank={index + 1}
                teamName={player.teamName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
