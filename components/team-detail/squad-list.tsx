import { PlayerCard } from "./player-card";

export function SquadList({ players }: { players: any[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {players.map((player) => (
        <PlayerCard player={player} key={player.id} />
      ))}
    </div>
  );
}
