import { Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PlayerAchievements({ achievements }: { achievements: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Achievements</CardTitle>
        <CardDescription>Major honors and awards</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {achievements.map((achievement, index) => (
            <li key={index} className='flex items-start gap-2'>
              <Trophy className='h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0' />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
