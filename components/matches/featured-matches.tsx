import Image from "next/image";
import { formatMatchDate, formatMatchTime } from "@/lib/date-utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@/src/i18n/routing";

export function FeaturedMatches({
  upcomingFixtures,
}: {
  upcomingFixtures: any[];
}) {
  return (
    <div className='mb-8 space-y-6'>
      <h2 className='text-2xl font-bold'>Featured Matches</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {upcomingFixtures.slice(0, 3).map((fixture) => (
          <Card key={fixture.id} className='overflow-hidden'>
            <CardContent className='p-0'>
              <div className='p-4 border-b bg-primary text-white'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='font-normal text-white border-white'
                    >
                      {fixture.competition}
                    </Badge>
                  </div>
                  <div className='text-sm'>
                    {formatMatchDate(fixture.date)} •{" "}
                    {formatMatchTime(fixture.date)}
                  </div>
                </div>
              </div>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <div className='flex flex-col items-center gap-3 flex-1'>
                    <div className='relative w-16 h-16'>
                      <Image
                        src={fixture.homeTeam.logo || "/placeholder.svg"}
                        alt={fixture.homeTeam.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <span className='font-medium text-center'>
                      {fixture.homeTeam.name}
                    </span>
                  </div>
                  <div className='text-2xl font-bold px-4'>vs</div>
                  <div className='flex flex-col items-center gap-3 flex-1'>
                    <div className='relative w-16 h-16'>
                      <Image
                        src={fixture.awayTeam.logo || "/placeholder.svg"}
                        alt={fixture.awayTeam.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <span className='font-medium text-center'>
                      {fixture.awayTeam.name}
                    </span>
                  </div>
                </div>
                <div className='text-sm text-muted-foreground text-center mb-4'>
                  {fixture.venue}
                </div>
                <Link href={"/matches/match-1"}>
                  <Button className='w-full bg-primary hover:bg-secondary cursor-pointer'>
                    Match Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
