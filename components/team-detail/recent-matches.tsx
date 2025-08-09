"use client";
import { TeamMatchType } from "@/src/entities/teams/apis/get-team";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "@/src/i18n/routing";

export function RecentMatches({
  recentMatches,
  upcomingMatches,
}: {
  recentMatches: TeamMatchType[] | null;
  upcomingMatches: TeamMatchType[] | null;
}) {
  const router = useRouter();

  const onClickMatch = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };
  return (
    <>
      <div>
        <h3 className='text-xl font-bold mb-4'>Recent Results</h3>
        <div className='space-y-3'>
          {recentMatches &&
            recentMatches.map((match, index) => {
              return (
                <Card
                  key={index}
                  className='overflow-hidden cursor-pointer'
                  onClick={() => onClickMatch(match.id)}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <div
                          className={`w-1 h-12 ${
                            match.result === "draw"
                              ? "bg-yellow-500"
                              : match.result === "lose"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <div className='font-medium'>
                            {match.homeTeamNameKr} vs {match.awayTeamNameKr}
                          </div>
                          <div className='text-sm text-muted-foreground'>
                            {match.kickoffTime}
                          </div>
                        </div>
                      </div>
                      <div className='text-lg font-bold'>
                        {match.result.toUpperCase()} {match.homeTeamScore} vs{" "}
                        {match.awayTeamScore}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      <div>
        <h3 className='text-xl font-bold mb-4'>Upcoming Fixtures</h3>
        <div className='space-y-3'>
          {upcomingMatches &&
            upcomingMatches.map((match, index) => (
              <Card key={index} className='overflow-hidden'>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='w-1 h-12 bg-muted'></div>
                      <div>
                        <div className='font-medium'>
                          {match.homeTeamNameKr} vs {match.awayTeamNameKr}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {match.kickoffTime}
                        </div>
                      </div>
                    </div>
                    <div className='text-lg font-medium'>
                      {match.kickoffTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
