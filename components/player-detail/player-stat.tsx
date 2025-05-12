import { PlayerAchievements } from "./player-achievements";
import { PlayerHistory } from "./player-history";
import { PlayerSeasonStat } from "./player-season-stat";

export function PlayerStat({ player }: { player: any }) {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <PlayerSeasonStat stats={player.stats} />
        <PlayerAchievements achievements={player.achievements} />
      </div>
      <PlayerHistory seasonStats={player.seasonStats} />
    </>
  );
}
