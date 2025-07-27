import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/src/i18n/routing";
import { CustomTabTrigger, FullTableBtn } from "../common";
import { matchesData } from "@/app/fixtures/home";
import { toUnixTimestamp } from "@/src/shared/utils/time-utils";
import { getMatchByRange } from "@/src/entities/match/apis/get-match-by-range";

export async function UpcomingMatches() {
  const today = new Date();
  const tomorrow = new Date(today); // today를 복사
  tomorrow.setDate(today.getDate() + 1);

  const todayUnixTime = toUnixTimestamp(today);
  const tomorrowUnixTime = toUnixTimestamp(tomorrow);

  const matches = await getMatchByRange({
    startDate: todayUnixTime.toString(),
    endDate: tomorrowUnixTime.toString(),
  });

  console.log(matches);

  return (
    <section className='bg-muted'>
      <div className='container py-12 space-y-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>일정</h2>
          </div>
          <FullTableBtn link={"/matches"} />
        </div>

        <Tabs defaultValue='today' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-6 bg-white'>
            <CustomTabTrigger value='today'>Today</CustomTabTrigger>
            <CustomTabTrigger value='tomorrow'>Tomorrow</CustomTabTrigger>
          </TabsList>
          <TabsContent value='today' className='space-y-4'>
            {matchesData.map((match, index) => (
              <Card key={index + match.matchId}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <Badge
                      variant='outline'
                      className='bg-secondary text-white'
                    >
                      {match.league}
                    </Badge>
                    <span className='text-sm font-medium'>{match.time}</span>
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <Link href={`/teams/${match.homeTeamId}`}>
                      <div className='flex items-center gap-2'>
                        <Image
                          src={match.homeFlag || "/placeholder.svg"}
                          alt={match.homeTeam}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                        <span className='font-medium'>{match.homeTeam}</span>
                      </div>
                    </Link>
                    <span className='text-sm font-bold'>vs</span>
                    <Link href={`/teams/${match.awayTeamId}`}>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>{match.awayTeam}</span>
                        <Image
                          src={match.awayFlag || "/placeholder.svg"}
                          alt={match.awayTeam}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                      </div>
                    </Link>
                  </div>
                  <div className='mt-4 flex justify-end'>
                    <Link
                      href={`/matches/${match.matchId}`}
                      key={match.matchId + index}
                    >
                      <Button
                        variant='outline'
                        size='sm'
                        className={"hover:bg-secondary hover:text-white"}
                      >
                        경기 정보
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value='tomorrow' className='space-y-4'>
            <Card>
              <CardContent className='p-4 text-center py-10'>
                <p>예정된 경기가 없습니다.</p>
                <Link href={"/matches"}>
                  <Button variant='outline' className='mt-4'>
                    일정 살펴보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
