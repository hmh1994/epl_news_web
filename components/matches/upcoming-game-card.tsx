import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { formatMatchTime } from "@/lib/date-utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { MatchType } from "@/src/entities/match/apis/get-match-by-range";

export function UpcomingGameCard({ fixture }: { fixture: MatchType }) {
  return (
    <Card key={fixture.id} className='overflow-hidden'>
      <CardContent className='p-0'>
        <div className='p-4 border-b bg-muted/20'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Badge variant='outline' className='font-normal'>
                premier league
              </Badge>
            </div>
            <div className='text-sm text-muted-foreground'>
              {formatMatchTime(fixture.kickoffTime)}
            </div>
          </div>
        </div>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-3'>
              <div className='relative w-10 h-10'>
                <Image
                  src={fixture.homeTeam.iconUrl || "/placeholder.svg"}
                  alt={fixture.homeTeam.id}
                  fill
                  className='object-contain'
                />
              </div>
              {fixture.homeTeam.id ? (
                <Link
                  href={`/teams/${fixture.homeTeam.id}`}
                  className='font-medium hover:text-primary transition-colors'
                >
                  {fixture.homeTeam.nameKr}
                </Link>
              ) : (
                <span className='font-medium'>{fixture.homeTeam.nameKr}</span>
              )}
            </div>
            <div className='text-lg font-bold'>vs</div>
            <div className='flex items-center gap-3'>
              {fixture.awayTeam.id ? (
                <Link
                  href={`/teams/${fixture.awayTeam.id}`}
                  className='font-medium hover:text-primary transition-colors'
                >
                  {fixture.awayTeam.nameKr}
                </Link>
              ) : (
                <span className='font-medium'>{fixture.awayTeam.nameKr}</span>
              )}
              <div className='relative w-10 h-10'>
                <Image
                  src={fixture.awayTeam.iconUrl || "/placeholder.svg"}
                  alt={fixture.awayTeam.nameKr}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          </div>
          <div className='text-sm text-muted-foreground text-center'>
            {fixture.groundKr}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
