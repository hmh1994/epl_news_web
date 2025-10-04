import { LeagueChampion } from "@/entities/league/model/league-overview";
import { LeagueChampionCard } from "@/entities/league/ui/league-champion-card";

interface LeagueChampionsGridProps {
  champions: LeagueChampion[];
}

export const LeagueChampionsGrid = ({
  champions,
}: LeagueChampionsGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {champions.map((champion, index) => (
        <LeagueChampionCard
          key={champion.year}
          champion={champion}
          highlight={index === 0}
        />
      ))}
    </div>
  );
};
