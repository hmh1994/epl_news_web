import { SuccessfulClub } from "@/entities/league/model/league-overview";
import { LeagueSuccessCard } from "@/entities/league/ui/league-success-card";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface LeagueSuccessGridProps {
  clubs: SuccessfulClub[];
}

export const LeagueSuccessGrid = ({ clubs }: LeagueSuccessGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {clubs.map((club) => {
        const team = TEAMS_BY_ID[club.teamId];
        return (
          <LeagueSuccessCard
            key={club.teamId}
            club={club}
            teamName={team?.name ?? club.teamId.toUpperCase()}
            teamCrest={team?.crest ?? "⚽"}
          />
        );
      })}
    </div>
  );
};
