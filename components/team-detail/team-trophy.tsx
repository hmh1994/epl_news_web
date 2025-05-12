"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export function TeamTrophy({ trophies }: { trophies: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trophy Cabinet</CardTitle>
        <CardDescription>Major honors won by the club</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {trophies.map((trophy, index) => (
            <div key={index}>
              <div className='flex justify-between items-center'>
                <span className='text-muted-foreground'>{trophy.name}</span>
                <span className='font-medium'>{trophy.count}</span>
              </div>
              {index < trophies.length - 1 && <Separator className='my-4' />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
