"use client";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CardType,
  MatchDetailCardType,
  MatchDetailGoalType,
  MatchDetailType,
} from "@/src/entities/match/apis/get-match-detail";

export function MatchSummary({ match }: { match: MatchDetailType }) {
  const { static: _stat, timeline } = match.gameStat;

  const homePassAccurate = Number(
    ((_stat.home.passesAccurate / _stat.home.passesTotal) * 100).toFixed(2)
  );
  const awayPassAccurate = Number(
    ((_stat.away.passesAccurate / _stat.away.passesTotal) * 100).toFixed(2)
  );

  const { substitutions } = timeline;
  const homeSubEvents = substitutions.home.map((event) => ({
    teamSide: "home",
    clock: event.clock,
    inPlayerDisplayNameEn: event.inPlayerDisplayNameEn,
    inPlayerDisplayNameKr: event.inPlayerDisplayNameKr,
    outPlayerDisplayNameEn: event.outPlayerDisplayNameEn,
    outPlayerDisplayNameKr: event.outPlayerDisplayNameKr,
    type: "substitution",
  }));

  const awaySubEvents = substitutions.away.map((event) => ({
    teamSide: "away",
    clock: event.clock,
    inPlayerDisplayNameEn: event.inPlayerDisplayNameEn,
    inPlayerDisplayNameKr: event.inPlayerDisplayNameKr,
    outPlayerDisplayNameEn: event.outPlayerDisplayNameEn,
    outPlayerDisplayNameKr: event.outPlayerDisplayNameKr,
    type: "substitution",
  }));

  const timelineEvent = [...homeSubEvents, ...awaySubEvents].sort(
    (event1, event2) => {
      return event1.clock - event2.clock;
    }
  );

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
              {timeline.goals.map(
                (event: MatchDetailGoalType, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.clock}&apos;
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>
                        {event.playerDisplayNameEn}
                      </div>
                      {/* {event.assistedBy && (
                        <div className='text-xs text-muted-foreground'>
                          Assist: {event.assistedBy}
                        </div>
                      )} */}
                    </div>
                    <div className='w-6 text-right'>
                      {event.teamSide === "home"
                        ? match.homeTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()
                        : match.awayTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className='space-y-4'>
              <h3 className='font-semibold'>Cards</h3>
              {timeline.cards.map(
                (event: MatchDetailCardType, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.clock}&apos;
                    </div>
                    <div
                      className={`w-3 h-4 ${
                        event.cardType === CardType.F_YELLOW
                          ? "bg-yellow-400"
                          : "bg-red-600"
                      }`}
                    ></div>
                    <div className='flex-1'>
                      <div className='font-medium'>
                        {event.playerDisplayNameEn}
                      </div>
                    </div>
                    <div className='w-6 text-right'>
                      {event.teamSide === "home"
                        ? match.homeTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()
                        : match.awayTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className='space-y-4'>
              <h3 className='font-semibold'>Substitutions</h3>
              {timelineEvent
                .filter((event: any) => event.type === "substitution")
                .map((event: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-8 text-right font-medium'>
                      {event.clock}&apos;
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>
                        <span className='text-green-600'>
                          ↑ {event.inPlayerDisplayNameEn}
                        </span>
                        <span className='mx-1'>|</span>
                        <span className='text-red-600'>
                          ↓ {event.outPlayerDisplayNameEn}
                        </span>
                      </div>
                    </div>
                    <div className='w-6 text-right'>
                      {event.teamSide === "home"
                        ? match.homeTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()
                        : match.awayTeamInfo.shortTeamNameEn
                            .substring(0, 3)
                            .toUpperCase()}
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
                    <span>{_stat.home.possession}%</span>
                    <span>Possession</span>
                    <span>{_stat.away.possession}%</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${_stat.home.possession}%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${_stat.away.possession}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{_stat.home.shotsTotal}</span>
                    <span>Shots</span>
                    <span>{_stat.away.shotsTotal}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (_stat.home.shotsTotal /
                            (_stat.home.shotsTotal + _stat.away.shotsTotal)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (_stat.away.shotsTotal /
                            (_stat.away.shotsTotal + _stat.home.shotsTotal)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{_stat.home.shotsOnTarget}</span>
                    <span>Shots on Target</span>
                    <span>{_stat.away.shotsOnTarget}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (_stat.home.shotsOnTarget /
                            (_stat.home.shotsOnTarget +
                              _stat.away.shotsOnTarget)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (_stat.away.shotsOnTarget /
                            (_stat.home.shotsOnTarget +
                              _stat.away.shotsOnTarget)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{_stat.home.foulsCommitted}</span>
                    <span>Fouls Committed</span>
                    <span>{_stat.away.foulsCommitted}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (_stat.home.foulsCommitted /
                            (_stat.home.foulsCommitted +
                              _stat.away.foulsCommitted)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (_stat.away.foulsCommitted /
                            (_stat.home.foulsCommitted +
                              _stat.away.foulsCommitted)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{homePassAccurate}</span>
                    <span>Pass Accuracy</span>
                    <span>{awayPassAccurate}</span>
                  </div>
                  <div className='flex h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='bg-blue-600'
                      style={{
                        width: `${
                          (homePassAccurate /
                            (homePassAccurate + awayPassAccurate)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className='bg-red-600'
                      style={{
                        width: `${
                          (awayPassAccurate /
                            (homePassAccurate + awayPassAccurate)) *
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
                  <span className='font-medium'>{match.officialNameEn}</span>
                </div>
                <Separator />
                {/* <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Attendance</span>
                  <span className='font-medium'>
                    {match.attendance.toLocaleString()}
                  </span>
                </div> */}
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Stadium</span>
                  <span className='font-medium'>{match.groundNameEn}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Full-time Score</span>
                  <span className='font-medium'>
                    {match.homeTeamInfo.teamScore} -{" "}
                    {match.awayTeamInfo.teamScore}
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
