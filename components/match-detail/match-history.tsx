"use client";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export function MatchHistory({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Head to Head</CardTitle>
        <CardDescription>
          Historical record between the two teams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold mb-4'>Overall Record</h3>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Total Matches</span>
                  <span className='font-medium'>{match.headToHead.total}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    {match.homeTeam.name} Wins
                  </span>
                  <span className='font-medium'>
                    {match.headToHead.homeWins}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Draws</span>
                  <span className='font-medium'>{match.headToHead.draws}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    {match.awayTeam.name} Wins
                  </span>
                  <span className='font-medium'>
                    {match.headToHead.awayWins}
                  </span>
                </div>
              </div>

              <div className='mt-6'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{match.headToHead.homeWins}</span>
                    <span>{match.headToHead.draws}</span>
                    <span>{match.headToHead.awayWins}</span>
                  </div>
                  <div className='flex h-8 rounded-md overflow-hidden'>
                    <div
                      className='bg-blue-600 flex items-center justify-center text-white text-xs font-medium'
                      style={{
                        width: `${
                          (match.headToHead.homeWins / match.headToHead.total) *
                          100
                        }%`,
                      }}
                    >
                      {Math.round(
                        (match.headToHead.homeWins / match.headToHead.total) *
                          100
                      )}
                      %
                    </div>
                    <div
                      className='bg-gray-500 flex items-center justify-center text-white text-xs font-medium'
                      style={{
                        width: `${
                          (match.headToHead.draws / match.headToHead.total) *
                          100
                        }%`,
                      }}
                    >
                      {Math.round(
                        (match.headToHead.draws / match.headToHead.total) * 100
                      )}
                      %
                    </div>
                    <div
                      className='bg-red-600 flex items-center justify-center text-white text-xs font-medium'
                      style={{
                        width: `${
                          (match.headToHead.awayWins / match.headToHead.total) *
                          100
                        }%`,
                      }}
                    >
                      {Math.round(
                        (match.headToHead.awayWins / match.headToHead.total) *
                          100
                      )}
                      %
                    </div>
                  </div>
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>{match.homeTeam.name}</span>
                    <span>Draws</span>
                    <span>{match.awayTeam.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>Recent Meetings</h3>
              <div className='space-y-3'>
                {match.headToHead.recentMatches.map(
                  (meeting: any, index: number) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 border rounded-md'
                    >
                      <div className='flex flex-col'>
                        <span className='font-medium'>
                          {meeting.homeTeam} {meeting.result} {meeting.awayTeam}
                        </span>
                        <div className='flex items-center text-xs text-muted-foreground'>
                          <span>{meeting.competition}</span>
                          <span className='mx-1'>•</span>
                          <span>{meeting.date}</span>
                        </div>
                      </div>
                      <ChevronRight className='h-4 w-4 text-muted-foreground' />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
