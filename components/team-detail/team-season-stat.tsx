"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export function TeamSeasonStat({ team }: { team: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Season Statistics</CardTitle>
        <CardDescription>Performance in the current season</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Matches Played</span>
            <span className='font-medium'>{team.played}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Won</span>
            <span className='font-medium'>{team.won}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Drawn</span>
            <span className='font-medium'>{team.drawn}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Lost</span>
            <span className='font-medium'>{team.lost}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Goal Difference</span>
            <span className='font-medium'>
              {team.gd > 0 ? `+${team.gd}` : team.gd}
            </span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Points</span>
            <span className='font-bold text-lg'>{team.points}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
