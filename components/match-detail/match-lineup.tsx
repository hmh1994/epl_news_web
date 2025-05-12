import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { LineupList } from "@/components/match-detail";

const LINEUP_POSITION = {
  gk: ["GK"],
  def: ["CB", "RB", "LB"],
  mid: ["CDM", "DM", "CAM", "RM", "LM", "AM"],
  fwd: ["RW", "LW", "ST", "CF"],
};

const renderLineups = (title: string, position: string, lineup: any) => {
  // @ts-ignore
  const lineupPosition = LINEUP_POSITION[position];
  return (
    <div>
      <h4 className='text-sm font-medium text-muted-foreground mb-2'>
        {title}
      </h4>
      {lineupPosition.map((pos: string, index: number) => (
        <LineupList
          lineup={lineup}
          position={pos}
          key={JSON.stringify(position) + index + pos}
        />
      ))}
    </div>
  );
};

const renderSubstitutes = (subs: any[]) => {
  return (
    <div className='mt-6'>
      <h4 className='text-sm font-medium text-muted-foreground mb-2'>
        Substitutes
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {subs.map((player: any, index: number) => (
          <div key={index} className='flex items-center gap-2 py-1'>
            <div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
              {player.number}
            </div>
            <div className='text-sm'>
              <span className='font-medium'>{player.name}</span>
              <span className='text-muted-foreground ml-1'>
                ({player.position})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function MatchLineup({ match }: { match: any }) {
  const isCompleted = match.status === "completed";
  return (
    <TabsContent value='lineups' className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            {isCompleted ? "Match Lineups" : "Predicted Lineups"}
          </CardTitle>
          <CardDescription>
            {isCompleted
              ? "Official lineups for the match"
              : "Predicted starting lineups for the match"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='relative w-8 h-8'>
                  <Image
                    src={match.homeTeam.logo || "/placeholder.svg"}
                    alt={match.homeTeam.name}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='font-semibold'>{match.homeTeam.name}</h3>
                <Badge variant='outline'>{match.homeTeam.formation}</Badge>
              </div>

              <div className='space-y-4'>
                {renderLineups("Goalkeeper", "gk", match.homeLineup)}
                {renderLineups("Defenders", "def", match.homeLineup)}
                {renderLineups("Midfielders", "mid", match.homeLineup)}
                {renderLineups("Forwards", "fwd", match.homeLineup)}
              </div>
              {renderSubstitutes(match.homeSubs)}
            </div>

            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='relative w-8 h-8'>
                  <Image
                    src={match.awayTeam.logo || "/placeholder.svg"}
                    alt={match.awayTeam.name}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='font-semibold'>{match.awayTeam.name}</h3>
                <Badge variant='outline'>{match.awayTeam.formation}</Badge>
              </div>

              <div className='space-y-4'>
                {renderLineups("Goalkeeper", "gk", match.awayLineup)}
                {renderLineups("Defenders", "def", match.awayLineup)}
                {renderLineups("Midfielders", "mid", match.awayLineup)}
                {renderLineups("Forwards", "fwd", match.awayLineup)}
              </div>

              {renderSubstitutes(match.awaySubs)}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
