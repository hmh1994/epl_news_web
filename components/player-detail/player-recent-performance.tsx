import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PlayerRecentPerformance({ recentForm }: { recentForm: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Performances</CardTitle>
        <CardDescription>Form in the last 5 matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {recentForm.map((match, index) => (
            <div key={index} className='border rounded-lg p-4'>
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div>
                  <h3 className='font-medium'>{match.match}</h3>
                  <p className='text-sm text-muted-foreground'>{match.date}</p>
                </div>
                <div className='flex items-center gap-4'>
                  <Badge variant='outline' className='text-sm'>
                    Result: {match.result}
                  </Badge>
                  <Badge
                    className={
                      match.contribution.includes("No Goal Contribution")
                        ? "bg-muted text-muted-foreground"
                        : "bg-green-600"
                    }
                  >
                    {match.contribution}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
