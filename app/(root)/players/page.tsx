import {
  PlayerCondition,
  PlayerHighlights,
  PlayerRankingTable,
  PlayerTitle,
} from "@/components/players";

export default function PlayerRankingsPage() {
  return (
    <div className='min-h-screen bg-background'>
      <PlayerTitle />
      <div className='container py-8'>
        <PlayerCondition />
        <PlayerRankingTable />
        <PlayerHighlights />
      </div>
    </div>
  );
}
