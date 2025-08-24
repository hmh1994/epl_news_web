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
import {
  MatchDetailPlayerType,
  MatchDetailSubPlayerType,
  MatchDetailType,
} from "@/src/entities/match/apis/get-match-detail";

const renderLineups = (title: string, lineup: MatchDetailPlayerType[]) => {
  return (
    <div>
      <h4 className='text-sm font-medium text-muted-foreground mb-2'>
        {title}
      </h4>
      <LineupList lineup={lineup} />
    </div>
  );
};

const renderSubstitutes = (subs: MatchDetailSubPlayerType[]) => {
  return (
    <div className='mt-6'>
      <h4 className='text-sm font-medium text-muted-foreground mb-2'>
        Substitutes
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {subs.map((player: MatchDetailSubPlayerType, index: number) => (
          <div key={index} className='flex items-center gap-2 py-1'>
            <div className='w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
              {player.shirtNumber}
            </div>
            <div className='text-sm'>
              <span className='font-medium'>{player.displayNameEn}</span>
              {/* <span className='text-muted-foreground ml-1'>
                ({player.position})
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function MatchLineup({ match }: { match: MatchDetailType }) {
  const matchInfo = match;
  const isCompleted = matchInfo.gameStat !== null;
  const { lineup: homeLineup, substitutes: homeSubstitutes } =
    matchInfo.homeTeamInfo;

  const { lineup: awayLineup, substitutes: awaySubstitutes } =
    matchInfo.awayTeamInfo;

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
                    src={
                      "https://resources.premierleague.com/premierleague/badges/50/t43.png"
                    }
                    alt={matchInfo.homeTeamInfo.teamNameEn}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='font-semibold'>
                  {matchInfo.homeTeamInfo.teamNameEn}
                </h3>
                <Badge variant='outline'>
                  {matchInfo.homeTeamInfo.teamFormation.join("-")}
                </Badge>
              </div>

              <div className='space-y-4'>
                {renderLineups(
                  "Goalkeeper",
                  matchInfo.homeTeamInfo.lineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 0
                  )
                )}
                {renderLineups(
                  "Defenders",
                  homeLineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 1
                  )
                )}
                {renderLineups(
                  "Midfielders",
                  homeLineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 2
                  )
                )}
                {renderLineups(
                  "Forwards",
                  homeLineup.filter(
                    (player: MatchDetailPlayerType) => player.row > 2
                  )
                )}
              </div>
              {renderSubstitutes(homeSubstitutes)}
            </div>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='relative w-8 h-8'>
                  <Image
                    src={
                      "https://resources.premierleague.com/premierleague/badges/50/t43.png"
                    }
                    alt={matchInfo.awayTeamInfo.teamNameEn}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='font-semibold'>
                  {matchInfo.awayTeamInfo.teamNameEn}
                </h3>
                <Badge variant='outline'>
                  {matchInfo.awayTeamInfo.teamFormation.join("-")}
                </Badge>
              </div>

              <div className='space-y-4'>
                {renderLineups(
                  "Goalkeeper",
                  awayLineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 0
                  )
                )}
                {renderLineups(
                  "Defenders",
                  awayLineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 1
                  )
                )}
                {renderLineups(
                  "Midfielders",
                  awayLineup.filter(
                    (player: MatchDetailPlayerType) => player.row === 2
                  )
                )}
                {renderLineups(
                  "Forwards",
                  awayLineup.filter(
                    (player: MatchDetailPlayerType) => player.row > 2
                  )
                )}
              </div>
              {renderSubstitutes(awaySubstitutes)}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
