import { LeagueKey, LeagueSummary } from "@/entities/league/model/league-overview";
import { LeagueSelectorCard } from "@/entities/league/ui/league-selector-card";

interface LeagueSelectorProps {
  leagues: [LeagueKey, LeagueSummary][];
  activeLeague: LeagueKey;
  onSelect: (league: LeagueKey) => void;
}

export const LeagueSelector = ({
  leagues,
  activeLeague,
  onSelect,
}: LeagueSelectorProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      {leagues.map(([key, league]) => (
        <LeagueSelectorCard
          key={key}
          leagueKey={key}
          league={league}
          isActive={activeLeague === key}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
