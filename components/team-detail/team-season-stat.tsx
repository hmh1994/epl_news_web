"use client";
import { TeamDetailType } from "@/src/entities/teams/apis/get-team";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export function TeamSeasonStat({ team }: { team: TeamDetailType }) {
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
            <span className='font-medium'>{team.seasonStat.played}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Won</span>
            <span className='font-medium'>{team.seasonStat.won}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Drawn</span>
            <span className='font-medium'>{team.seasonStat.drawn}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Lost</span>
            <span className='font-medium'>{team.seasonStat.lost}</span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Goal Difference</span>
            <span className='font-medium'>
              {team.seasonStat.gd > 0
                ? `+${team.seasonStat.gd}`
                : team.seasonStat.gd}
            </span>
          </div>
          <Separator />
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Points</span>
            <span className='font-bold text-lg'>{team.seasonStat.points}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
