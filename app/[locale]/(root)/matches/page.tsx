"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { upcomingFixtures, pastResults } from "@/app/fixtures/matches";
import { formatMatchDate } from "@/lib/date-utils";
import {
  FeaturedMatches,
  MatchCondition,
  MatchTitle,
  PastGameCard,
  UpcomingGameCard,
} from "@/components/matches";
import { CustomTabTrigger } from "@/components/common";
import { Separator } from "@/components/ui/separator";

// Helper function to group fixtures by date
function groupFixturesByDate(fixtures: any[]) {
  const grouped: Record<string, any[]> = {};

  fixtures.forEach((fixture) => {
    const date = fixture.date.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(fixture);
  });

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, fixtures]) => ({
      date,
      fixtures: fixtures.sort((a, b) => a.date.localeCompare(b.date)),
    }));
}

export default function FixturesPage() {
  const upcomingFixturesByDate = groupFixturesByDate(upcomingFixtures);
  const pastResultsByDate = groupFixturesByDate(pastResults);

  return (
    <div className='min-h-screen bg-background'>
      <MatchTitle />

      <div className='container pb-8'>
        <FeaturedMatches upcomingFixtures={upcomingFixtures} />
        <Separator className={"mb-8"} />
        <MatchCondition />

        <Tabs defaultValue='upcoming' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <CustomTabTrigger value='upcoming'>
              Upcoming Matches
            </CustomTabTrigger>
            <CustomTabTrigger value='results'>Past Matches</CustomTabTrigger>
          </TabsList>

          <TabsContent value='upcoming' className='space-y-8'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold'>Upcoming Matches</h2>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm'>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {upcomingFixturesByDate.map((group) => (
              <div key={group.date} className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  {formatMatchDate(group.date)}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {group.fixtures.map((fixture, index) => (
                    <UpcomingGameCard
                      fixture={fixture}
                      key={"upcoming" + index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value='results' className='space-y-8'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold'>Recent Results</h2>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm'>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {pastResultsByDate.map((group) => (
              <div key={group.date} className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  {formatMatchDate(group.date)}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {group.fixtures.map((fixture, index) => (
                    <PastGameCard fixture={fixture} key={"past" + index} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
