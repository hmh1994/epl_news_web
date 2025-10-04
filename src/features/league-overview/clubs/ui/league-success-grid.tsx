import { SuccessfulClub } from "@/entities/league/model/league-overview";
import { LeagueSuccessCard } from "@/entities/league/ui/league-success-card";

interface LeagueSuccessGridProps {
  clubs: SuccessfulClub[];
}

export const LeagueSuccessGrid = ({ clubs }: LeagueSuccessGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {clubs.map((club) => (
        <LeagueSuccessCard key={club.team} club={club} />
      ))}
    </div>
  );
};
