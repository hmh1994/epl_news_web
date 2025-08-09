// "use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { formatMatchDate } from "@/lib/date-utils";
import {
  MatchTitle,
  PastGameCard,
  UpcomingGameCard,
} from "@/components/matches";
import { CustomTabTrigger } from "@/components/common";
import { toUnixTimestamp } from "@/src/shared/utils/time-utils";
import { getMatchByRange } from "@/src/entities/match/apis/get-match-by-range";
import { Card, CardContent } from "@/components/ui/card";

export default async function FixturesPage() {
  const upcomingStart = new Date();
  const upcomingEnd = new Date(upcomingStart);
  upcomingEnd.setDate(upcomingStart.getDate() + 7);

  const pastStart = new Date(upcomingStart);
  pastStart.setDate(upcomingStart.getDate() - 7);
  const pastEnd = new Date(upcomingStart);
  pastEnd.setDate(upcomingStart.getDate() - 1);

  const upcomingMatches = await getMatchByRange({
    startDate: toUnixTimestamp(upcomingStart).toString(),
    endDate: toUnixTimestamp(upcomingEnd).toString(),
  });

  const pastMatches = await getMatchByRange({
    startDate: toUnixTimestamp(pastStart).toString(),
    endDate: toUnixTimestamp(pastEnd).toString(),
  });

  const upcomingDates = Object.keys(upcomingMatches);
  const pastDates = Object.keys(pastMatches);

  return (
    <div className='min-h-screen bg-background'>
      <MatchTitle />

      <div className='container pb-8'>
        {/* <FeaturedMatches upcomingFixtures={upcomingFixtures} />
        <Separator className={"mb-8"} />
        <MatchCondition /> */}

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
              {/* <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm'>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div> */}
            </div>

            {upcomingDates.map((date) => (
              <div key={date} className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  {formatMatchDate(date)}
                </h3>
                {upcomingMatches[date].length === 0 && (
                  <Card className='w-full px-4'>
                    <CardContent className='p-2 text-center '>
                      <p>예정된 경기가 없습니다.</p>
                    </CardContent>
                  </Card>
                )}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {upcomingMatches[date].map((fixture, index) => (
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
              {/* <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm'>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div> */}
            </div>

            {pastDates.map((date) => (
              <div key={date} className='space-y-4'>
                <h3 className='text-lg font-semibold'>
                  {formatMatchDate(date)}
                </h3>
                {pastMatches[date].length === 0 && (
                  <Card className='w-full px-4'>
                    <CardContent className='p-2 text-center '>
                      <p>경기가 없습니다.</p>
                    </CardContent>
                  </Card>
                )}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {pastMatches[date].map((fixture, index) => (
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
