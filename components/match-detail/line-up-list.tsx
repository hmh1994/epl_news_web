import { MatchDetailPlayerType } from "@/src/entities/match/apis/get-match-detail";

export function LineupList({ lineup }: { lineup: MatchDetailPlayerType[] }) {
  return lineup.map((player, index) => (
    <div key={index} className='flex items-center gap-2 py-1'>
      <div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
        {player.shirtNumber}
      </div>
      <div className='font-medium'>{player.displayNameEn}</div>
    </div>
  ));
}
