"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMatchDate, formatMatchTime } from "@/lib/date-utils";
import { FormIndicator } from "@/components/common";

export function MatchPreview({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Preview</CardTitle>
        <CardDescription>
          Preview and analysis for the upcoming match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold mb-4'>Team Information</h3>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Home Team
                    </span>
                    <span className='font-medium'>{match.homeTeam.name}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Manager
                    </span>
                    <span className='font-medium'>
                      {match.homeTeam.manager}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Formation
                    </span>
                    <span className='font-medium'>
                      {match.homeTeam.formation}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Recent Form
                    </span>
                    <div className='flex items-center gap-1 mt-1'>
                      {match.homeTeam.recentForm.map((result, index) => (
                        <FormIndicator key={index} result={result} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Away Team
                    </span>
                    <span className='font-medium'>{match.awayTeam.name}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Manager
                    </span>
                    <span className='font-medium'>
                      {match.awayTeam.manager}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Formation
                    </span>
                    <span className='font-medium'>
                      {match.awayTeam.formation}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground'>
                      Recent Form
                    </span>
                    <div className='flex items-center gap-1 mt-1'>
                      {match.awayTeam.recentForm.map((result, index) => (
                        <FormIndicator key={index} result={result} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-4'>Match Information</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Date</span>
                  <span className='font-medium'>
                    {formatMatchDate(match.date)}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Time</span>
                  <span className='font-medium'>
                    {formatMatchTime(match.date)}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Venue</span>
                  <span className='font-medium'>{match.venue}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>City</span>
                  <span className='font-medium'>{match.city}</span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Capacity</span>
                  <span className='font-medium'>
                    {match.capacity.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Referee</span>
                  <span className='font-medium'>{match.referee}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
