"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export function PlayerSeasonStat({ stats }: { stats: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Season Statistics</CardTitle>
        <CardDescription>Performance in the current season</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Appearances</span>
              <span className='font-medium'>{stats.appearances}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Goals</span>
              <span className='font-medium'>{stats.goals}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Assists</span>
              <span className='font-medium'>{stats.assists}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Minutes Played</span>
              <span className='font-medium'>{stats.minutesPlayed}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Yellow Cards</span>
              <span className='font-medium'>{stats.yellowCards}</span>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Red Cards</span>
              <span className='font-medium'>{stats.redCards}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Shots on Target</span>
              <span className='font-medium'>{stats.shotsOnTarget}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Pass Accuracy</span>
              <span className='font-medium'>{stats.passAccuracy}%</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Dribble Success</span>
              <span className='font-medium'>{stats.dribbleSuccess}%</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Aerial Duels Won</span>
              <span className='font-medium'>{stats.aerialDuelsWon}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
