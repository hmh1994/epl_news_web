"use client";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function MatchSummary({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Summary</CardTitle>
        <CardDescription>
          Key events and highlights from the match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='space-y-4'>
              <h3 className='font-semibold'>Goals</h3>
              {match.events
                .filter((event: any) => event.type === "goal")
                .map((event: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.minute}&apos;
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>{event.player}</div>
                      {event.assistedBy && (
                        <div className='text-xs text-muted-foreground'>
                          Assist: {event.assistedBy}
                        </div>
                      )}
                    </div>
                    <div className='w-6 text-right'>
                      {event.team === "home"
                        ? match.homeTeam.shortName
                        : match.awayTeam.shortName}
                    </div>
                  </div>
                ))}
            </div>

            <div className='space-y-4'>
              <h3 className='font-semibold'>Cards</h3>
              {match.events
                .filter(
                  (event: any) =>
                    event.type === "yellowCard" || event.type === "redCard"
                )
                .map((event: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.minute}&apos;
                    </div>
                    <div
                      className={`w-3 h-4 ${
                        event.type === "yellowCard"
                          ? "bg-yellow-400"
                          : "bg-red-600"
                      }`}
                    ></div>
                    <div className='flex-1'>
                      <div className='font-medium'>{event.player}</div>
                    </div>
                    <div className='w-6 text-right'>
                      {event.team === "home"
                        ? match.homeTeam.shortName
                        : match.awayTeam.shortName}
                    </div>
                  </div>
                ))}
            </div>

            <div className='space-y-4'>
              <h3 className='font-semibold'>Substitutions</h3>
              {match.events
                .filter((event: any) => event.type === "substitution")
                .map((event: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.minute}&apos;
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>
                        <span className='text-green-600'>
                          ↑ {event.playerIn}
                        </span>
                        <span className='mx-1'>|</span>
                        <span className='text-red-600'>
                          ↓ {event.playerOut}
                        </span>
                      </div>
                    </div>
                    <div className='w-6 text-right'>
                      {event.team === "home"
                        ? match.homeTeam.shortName
                        : match.awayTeam.shortName}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <Separator />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold mb-4'>Key Statistics</h3>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{match.stats.possession.home}%</span>
                    <span>Possession</span>
                    <span>{match.stats.possession.away}%</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${match.stats.possession.home}%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${match.stats.possession.away}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{match.stats.shots.home}</span>
                    <span>Shots</span>
                    <span>{match.stats.shots.away}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (match.stats.shots.home /
                            (match.stats.shots.home + match.stats.shots.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (match.stats.shots.away /
                            (match.stats.shots.home + match.stats.shots.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{match.stats.shotsOnTarget.home}</span>
                    <span>Shots on Target</span>
                    <span>{match.stats.shotsOnTarget.away}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (match.stats.shotsOnTarget.home /
                            (match.stats.shotsOnTarget.home +
                              match.stats.shotsOnTarget.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (match.stats.shotsOnTarget.away /
                            (match.stats.shotsOnTarget.home +
                              match.stats.shotsOnTarget.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{match.stats.corners.home}</span>
                    <span>Corners</span>
                    <span>{match.stats.corners.away}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (match.stats.corners.home /
                            (match.stats.corners.home +
                              match.stats.corners.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (match.stats.corners.away /
                            (match.stats.corners.home +
                              match.stats.corners.away)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>Match Information</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Referee</span>
                  <span className='font-medium'>{match.referee}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Attendance</span>
                  <span className='font-medium'>
                    {match.attendance.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Stadium</span>
                  <span className='font-medium'>{match.venue}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Half-time Score</span>
                  <span className='font-medium'>
                    {match.score.halfTimeScore}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Full-time Score</span>
                  <span className='font-medium'>
                    {match.score.homeScore} - {match.score.awayScore}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
