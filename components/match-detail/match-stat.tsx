import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const renderStat = (statName: string, homeValue: string, awayValue: string) => (
  <>
    <div className='text-right font-medium'>{homeValue}</div>
    <div className='text-center text-muted-foreground'>{statName}</div>
    <div className='text-left font-medium'>{awayValue}</div>
  </>
);

export function MatchStat({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Statistics</CardTitle>
        <CardDescription>Detailed statistics from the match</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-3 gap-4'>
            {renderStat(
              "Possession",
              `${match.stats.possession.home}%`,
              `${match.stats.possession.away}%`
            )}
            {renderStat(
              "Shots",
              `${match.stats.shots.home}`,
              `${match.stats.shots.away}`
            )}
            {renderStat(
              "Shots on Target",
              `${match.stats.shotsOnTarget.home}`,
              `${match.stats.shotsOnTarget.away}`
            )}
            {renderStat(
              "Corners",
              `${match.stats.corners.home}`,
              `${match.stats.corners.away}`
            )}
            {renderStat(
              "Fouls",
              `${match.stats.fouls.home}`,
              `${match.stats.fouls.away}`
            )}
            {renderStat(
              "Yellow Cards",
              `${match.stats.yellowCards.home}`,
              `${match.stats.yellowCards.away}`
            )}
            {renderStat(
              "Red Cards",
              `${match.stats.redCards.home}`,
              `${match.stats.redCards.away}`
            )}
            {renderStat(
              "Offsides",
              `${match.stats.offsides.home}`,
              `${match.stats.offsides.away}`
            )}
            {renderStat(
              "Passes",
              `${match.stats.passes.home}`,
              `${match.stats.passes.away}`
            )}
            {renderStat(
              "Pass Accuracy",
              `${match.stats.passAccuracy.home}%`,
              `${match.stats.passAccuracy.away}%`
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
