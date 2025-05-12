"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export function TeamInfo({ team }: { team: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Information</CardTitle>
        <CardDescription>Details about the club</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Full Name</span>
              <span className='font-medium'>{team.name} FC</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Founded</span>
              <span className='font-medium'>{team.founded}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Stadium</span>
              <span className='font-medium'>{team.stadium}</span>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Capacity</span>
              <span className='font-medium'>
                {team.capacity.toLocaleString()}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Manager</span>
              <span className='font-medium'>{team.manager}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Nickname</span>
              <span className='font-medium'>{team.nickname}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
