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

export function TeamInfo({ team }: { team: TeamDetailType }) {
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
              <span className='font-medium'>{team.nameKr}</span>
            </div>
            <Separator />
            {/* <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Founded</span>
              <span className='font-medium'>{team.founded}</span>
            </div>
            <Separator /> */}
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Stadium</span>
              <span className='font-medium'>{team.groundNameKr}</span>
            </div>
            <Separator />
          </div>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Capacity</span>
              <span className='font-medium'>
                {team.groundCapacity.toLocaleString()}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Manager</span>
              <span className='font-medium'>감독 아직 안됐음 </span>
            </div>
            <Separator />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
