import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teamStat1, teamStat2, teamStat3 } from "@/app/fixtures/teams";

const LeagueComparisonCard = ({
  title,
  description,
  teams,
}: {
  title: string;
  description: string;
  teams: any[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='space-y-4'>
        {teams.map((item, index) => (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>{index + 1}.</span>
              <span>{item.team}</span>
              <Badge variant='outline' className='text-xs'>
                {item.league}
              </Badge>
            </div>
            <span className='font-bold'>{item.stat}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export function LeagueComparison() {
  return (
    <div className='mt-8 space-y-6'>
      <h2 className='text-2xl font-bold'>League Comparison</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <LeagueComparisonCard
          title={"Top Scoring Teams"}
          description='Teams with the most goals scored this season'
          teams={teamStat1}
        />

        <LeagueComparisonCard
          title={"Best Defensive Teams"}
          description='Teams with the fewest goals conceded'
          teams={teamStat2}
        />

        <LeagueComparisonCard
          title={"Highest Points Total"}
          description='Teams with the most points this season'
          teams={teamStat3}
        />
      </div>
    </div>
  );
}
