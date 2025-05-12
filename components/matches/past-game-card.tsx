import Image from "next/image";
import Link from "next/link";
import { formatMatchTime } from "@/lib/date-utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export function PastGameCard({ fixture }: { fixture: any }) {
  return (
    <Card key={fixture.id} className='overflow-hidden'>
      <CardContent className='p-0'>
        <div className='p-4 border-b bg-muted/20'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Badge variant='outline' className='font-normal'>
                {fixture.competition}
              </Badge>
              <Badge className='bg-primary'>FT</Badge>
            </div>
            <div className='text-sm text-muted-foreground'>
              {formatMatchTime(fixture.date)}
            </div>
          </div>
        </div>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-3'>
              <div className='relative w-10 h-10'>
                <Image
                  src={fixture.homeTeam.logo || "/placeholder.svg"}
                  alt={fixture.homeTeam.name}
                  fill
                  className='object-contain'
                />
              </div>
              {fixture.homeTeam.id ? (
                <Link
                  href={`/teams/${fixture.homeTeam.id}`}
                  className='font-medium hover:text-primary transition-colors'
                >
                  {fixture.homeTeam.name}
                </Link>
              ) : (
                <span className='font-medium'>{fixture.homeTeam.name}</span>
              )}
            </div>
            <div className='text-lg font-bold'>
              {fixture.homeTeam.score} - {fixture.awayTeam.score}
            </div>
            <div className='flex items-center gap-3'>
              {fixture.awayTeam.id ? (
                <Link
                  href={`/teams/${fixture.awayTeam.id}`}
                  className='font-medium hover:text-primary transition-colors'
                >
                  {fixture.awayTeam.name}
                </Link>
              ) : (
                <span className='font-medium'>{fixture.awayTeam.name}</span>
              )}
              <div className='relative w-10 h-10'>
                <Image
                  src={fixture.awayTeam.logo || "/placeholder.svg"}
                  alt={fixture.awayTeam.name}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          </div>
          <div className='text-sm text-muted-foreground text-center'>
            {fixture.venue}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
