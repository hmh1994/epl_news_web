import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FormIndicator } from "../common";
import { TeamRankDetailType } from "@/src/entities/teams/apis/get-team-rank-detail";

// Helper function to render status badges
// function StatusBadge({ status }: { status: string }) {
//   switch (status) {
//     case "champions-league":
//       return <Badge className='bg-blue-600'>UCL</Badge>;
//     case "europa-league":
//       return <Badge className='bg-orange-500'>UEL</Badge>;
//     case "conference-league":
//       return <Badge className='bg-green-600'>UECL</Badge>;
//     case "relegated":
//       return <Badge variant='destructive'>REL</Badge>;
//     default:
//       return null;
//   }
// }

export function LeagueRankingTable({
  teamRankDetail,
}: {
  teamRankDetail: Array<TeamRankDetailType>;
}) {
  return (
    <Tabs defaultValue='premier-league' className='w-full'>
      {/* <TabsList className='grid grid-cols-1 md:grid-cols-1 mb-6'>
        <TabsTrigger value='premier-league'>Premier League</TabsTrigger>
        <TabsTrigger value='la-liga'>La Liga</TabsTrigger>
        <TabsTrigger value='bundesliga'>Bundesliga</TabsTrigger>
        <TabsTrigger value='serie-a'>Serie A</TabsTrigger>
        <TabsTrigger value='ligue-1'>Ligue 1</TabsTrigger>
      </TabsList> */}

      <Card>
        <CardHeader className='pb-0'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <CardTitle>Premier League</CardTitle>
              {/* <CardDescription>England • 2023/24 Season</CardDescription> */}
            </div>
            {/* <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <div className='w-3 h-3 rounded-full bg-blue-600'></div>
                <span className='text-xs'>Champions League</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-3 h-3 rounded-full bg-orange-500'></div>
                <span className='text-xs'>Europa League</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-3 h-3 rounded-full bg-red-600'></div>
                <span className='text-xs'>Relegation</span>
              </div>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value='premier-league' className='mt-0'>
            <div className='rounded-md border overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-muted/50 border-b'>
                      <th className='text-left py-3 px-4 font-medium'>Pos</th>
                      <th className='text-left py-3 px-4 font-medium'>Team</th>
                      <th className='text-center py-3 px-2 font-medium'>P</th>
                      <th className='text-center py-3 px-2 font-medium'>W</th>
                      <th className='text-center py-3 px-2 font-medium'>D</th>
                      <th className='text-center py-3 px-2 font-medium'>L</th>
                      <th className='text-center py-3 px-2 font-medium'>GF</th>
                      <th className='text-center py-3 px-2 font-medium'>GA</th>
                      <th className='text-center py-3 px-2 font-medium'>GD</th>
                      <th className='text-center py-3 px-4 font-medium'>Pts</th>
                      <th className='text-center py-3 px-4 font-medium'>
                        Last 5
                      </th>
                      <th className='text-center py-3 px-2 font-medium'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRankDetail.map((team, index) => {
                      let rowClass = "";
                      if (team.rank <= 4)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.rank >= 5 && team.rank <= 6)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.rank === 7)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.rank >= 18)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.rank}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.teamLogo || "/placeholder.svg"}
                                  alt={team.shortNameEn}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.shortNameEn}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.teamLogo || "/placeholder.svg"}
                                  alt={team.shortNameEn}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.shortNameEn}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallMatches}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallMatchesWon}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallMatchesDrawn}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallMatchesLost}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallGoalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.overallGoalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.overallGoalsDifference > 0
                              ? `+${team.overallGoalsDifference}`
                              : team.overallGoalsDifference}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.overallPoints}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.recent5Results.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          {/* <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
