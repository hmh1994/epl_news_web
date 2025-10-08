import { LeagueChampion } from "@/entities/league/model/league-overview";
import { LeagueChampionCard } from "@/entities/league/ui/league-champion-card";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface LeagueChampionsGridProps {
  champions: LeagueChampion[];
}

export const LeagueChampionsGrid = ({
  champions,
}: LeagueChampionsGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {champions.map((champion, index) => {
        const team = TEAMS_BY_ID[champion.teamId];
        return (
          <LeagueChampionCard
            key={champion.year}
            champion={champion}
            highlight={index === 0}
            teamName={team?.name ?? champion.teamId.toUpperCase()}
            teamCrest={team?.crest ?? "⚽"}
          />
        );
      })}
    </div>
  );
};
