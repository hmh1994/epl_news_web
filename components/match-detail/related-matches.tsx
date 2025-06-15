import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { matchesData } from "@/app/fixtures/match-detail";
import { formatMatchTime } from "@/lib/date-utils";

export function RelatedMatches({ match }: { match: any }) {
  return (
    <div className='mt-8 space-y-6'>
      <h2 className='text-2xl font-bold'>Related Matches</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {Object.values(matchesData)
          .filter((m) => m.id !== match.id)
          .slice(0, 3)
          .map((relatedMatch) => (
            <Card key={relatedMatch.id} className='overflow-hidden'>
              <CardContent className='p-0'>
                <div className='p-4 border-b bg-muted/20'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <Badge variant='outline' className='font-normal'>
                        {relatedMatch.competition}
                      </Badge>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {formatMatchTime(relatedMatch.date)}
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={relatedMatch.homeTeam.logo || "/placeholder.svg"}
                          alt={relatedMatch.homeTeam.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                      <span className='font-medium'>
                        {relatedMatch.homeTeam.name}
                      </span>
                    </div>
                    {relatedMatch.status === "completed" ? (
                      <div className='text-lg font-bold'>
                        {relatedMatch.score.homeScore} -{" "}
                        {relatedMatch.score.awayScore}
                      </div>
                    ) : (
                      <div className='text-lg font-bold'>vs</div>
                    )}
                    <div className='flex items-center gap-3'>
                      <span className='font-medium'>
                        {relatedMatch.awayTeam.name}
                      </span>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={relatedMatch.awayTeam.logo || "/placeholder.svg"}
                          alt={relatedMatch.awayTeam.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='text-sm text-muted-foreground text-center mb-4'>
                    {relatedMatch.venue}
                  </div>
                  <Link href={`/matches/${relatedMatch.id}`}>
                    <Button className='w-full bg-primary hover:bg-secondary'>
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
