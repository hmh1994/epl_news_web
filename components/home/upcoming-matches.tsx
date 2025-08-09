import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/src/i18n/routing";
import { CustomTabTrigger, FullTableBtn } from "../common";
import { toUnixTimestamp } from "@/src/shared/utils/time-utils";
import {
  getMatchByRange,
  MatchType,
} from "@/src/entities/match/apis/get-match-by-range";

function NoMatch() {
  return (
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
  );
}

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

  const dates = Object.keys(matches);

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
            {matches[dates[0]].length === 0 && <NoMatch />}
            {matches[dates[0]].map((match: MatchType, index: number) => (
              <Card key={index + match.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <Badge
                      variant='outline'
                      className='bg-secondary text-white'
                    >
                      premier league
                    </Badge>
                    <span className='text-sm font-medium'>
                      {match.kickoffTime}
                    </span>
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <Link href={`/teams/${match.homeTeam.id}`}>
                      <div className='flex items-center gap-2'>
                        <Image
                          src={match.homeTeam.iconUrl || "/placeholder.svg"}
                          alt={match.homeTeam.id}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                        <span className='font-medium'>
                          {match.homeTeam.nameKr}
                        </span>
                      </div>
                    </Link>
                    <span className='text-sm font-bold'>vs</span>
                    <Link href={`/teams/${match.awayTeam.id}`}>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>
                          {match.awayTeam.nameKr}
                        </span>
                        <Image
                          src={match.awayTeam.iconUrl || "/placeholder.svg"}
                          alt={match.awayTeam.id}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                      </div>
                    </Link>
                  </div>
                  <div className='mt-4 flex justify-end'>
                    <Link href={`/matches/${match.id}`} key={match.id + index}>
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
            {matches[dates[1]].length === 0 && <NoMatch />}
            {matches[dates[1]].map((match: MatchType, index: number) => (
              <Card key={index + match.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <Badge
                      variant='outline'
                      className='bg-secondary text-white'
                    >
                      premier league
                    </Badge>
                    <span className='text-sm font-medium'>
                      {match.kickoffTime}
                    </span>
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <Link href={`/teams/${match.homeTeam.id}`}>
                      <div className='flex items-center gap-2'>
                        <Image
                          src={match.homeTeam.iconUrl || "/placeholder.svg"}
                          alt={match.homeTeam.id}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                        <span className='font-medium'>
                          {match.homeTeam.nameKr}
                        </span>
                      </div>
                    </Link>
                    <span className='text-sm font-bold'>vs</span>
                    <Link href={`/teams/${match.awayTeam.id}`}>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>
                          {match.awayTeam.nameKr}
                        </span>
                        <Image
                          src={match.awayTeam.iconUrl || "/placeholder.svg"}
                          alt={match.awayTeam.id}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                      </div>
                    </Link>
                  </div>
                  <div className='mt-4 flex justify-end'>
                    <Link href={`/matches/${match.id}`} key={match.id + index}>
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
        </Tabs>
      </div>
    </section>
  );
}
// 1748217600000
// 1748390400000
