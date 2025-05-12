import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MatchEvent } from "./match-event";

export function MatchTimeline({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Timeline</CardTitle>
        <CardDescription>Chronological events from the match</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {match.events
            .sort((a: any, b: any) => a.minute - b.minute)
            .map((event: any, index: number) => (
              <MatchEvent event={event} key={index} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
