export function LineupList({
  lineup,
  position,
}: {
  lineup: any[];
  position: string;
}) {
  return lineup
    .filter((player) => player.position === position)
    .map((player, index) => (
      <div key={index} className='flex items-center gap-2 py-1'>
        <div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
          {player.number}
        </div>
        <div className='font-medium'>{player.name}</div>
      </div>
    ));
}
