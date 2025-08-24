import { MatchDetailType } from "@/src/entities/match/apis/get-match-detail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MatchEvent } from "./match-event";

export function MatchTimeline({ match }: { match: MatchDetailType }) {
  const { timeline } = match.gameStat;
  const { goals, cards, substitutions } = timeline;
  const goalEvents = goals.map((event) => ({
    teamSide: event.teamSide,
    clock: event.clock,
    playerDisplayNameEn: event.playerDisplayNameEn,
    playerDisplayNameKr: event.playerDisplayNameKr,
    type: "GOAL",
  }));

  const cardEvents = cards.map((event) => ({
    teamSide: event.teamSide,
    clock: event.clock,
    playerDisplayNameEn: event.playerDisplayNameEn,
    playerDisplayNameKr: event.playerDisplayNameKr,
    type: event.cardType,
  }));

  const homeSubEvents = substitutions.home.map((event) => ({
    teamSide: "home",
    clock: event.clock,
    inPlayerDisplayNameEn: event.inPlayerDisplayNameEn,
    inPlayerDisplayNameKr: event.inPlayerDisplayNameKr,
    outPlayerDisplayNameEn: event.outPlayerDisplayNameEn,
    outPlayerDisplayNameKr: event.outPlayerDisplayNameKr,
    type: "substitution",
  }));

  const awaySubEvents = substitutions.away.map((event) => ({
    teamSide: "away",
    clock: event.clock,
    inPlayerDisplayNameEn: event.inPlayerDisplayNameEn,
    inPlayerDisplayNameKr: event.inPlayerDisplayNameKr,
    outPlayerDisplayNameEn: event.outPlayerDisplayNameEn,
    outPlayerDisplayNameKr: event.outPlayerDisplayNameKr,
    type: "substitution",
  }));

  const timelineEvent = [
    ...goalEvents,
    ...cardEvents,
    ...homeSubEvents,
    ...awaySubEvents,
  ].sort((event1, event2) => {
    return event1.clock - event2.clock;
  });

  console.log("ASD", timelineEvent);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Timeline</CardTitle>
        <CardDescription>Chronological events from the match</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {timelineEvent.map((event: any, index: number) => (
            <MatchEvent event={event} key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
