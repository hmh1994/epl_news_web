import { Card, CardContent } from "../ui/card";

export function RecentMatches({
  recentMatches,
  upcomingMatches,
  name,
}: {
  recentMatches: any[];
  upcomingMatches: any[];
  name: string;
}) {
  return (
    <>
      <div>
        <h3 className='text-xl font-bold mb-4'>Recent Results</h3>
        <div className='space-y-3'>
          {recentMatches.map((match, index) => (
            <Card key={index} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div
                      className={`w-1 h-12 ${
                        match.result.startsWith("W")
                          ? "bg-green-500"
                          : match.result.startsWith("D")
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className='font-medium'>
                        {match.home
                          ? `${name} vs ${match.opponent}`
                          : `${match.opponent} vs ${name}`}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {match.date}
                      </div>
                    </div>
                  </div>
                  <div className='text-lg font-bold'>{match.result}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-xl font-bold mb-4'>Upcoming Fixtures</h3>
        <div className='space-y-3'>
          {upcomingMatches.map((match, index) => (
            <Card key={index} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='w-1 h-12 bg-muted'></div>
                    <div>
                      <div className='font-medium'>
                        {match.home
                          ? `${name} vs ${match.opponent}`
                          : `${match.opponent} vs ${name}`}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {match.date}
                      </div>
                    </div>
                  </div>
                  <div className='text-lg font-medium'>{match.time}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
