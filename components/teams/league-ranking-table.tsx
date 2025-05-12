import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  premierLeagueTeams,
  laLigaTeams,
  bundesligaTeams,
  serieATeams,
  ligue1Teams,
} from "@/app/fixtures/teams";
import { FormIndicator } from "../common";

// Helper function to render status badges
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "champions-league":
      return <Badge className='bg-blue-600'>UCL</Badge>;
    case "europa-league":
      return <Badge className='bg-orange-500'>UEL</Badge>;
    case "conference-league":
      return <Badge className='bg-green-600'>UECL</Badge>;
    case "relegated":
      return <Badge variant='destructive'>REL</Badge>;
    default:
      return null;
  }
}

export function LeagueRankingTable() {
  return (
    <Tabs defaultValue='premier-league' className='w-full'>
      <TabsList className='grid grid-cols-2 md:grid-cols-5 mb-6'>
        <TabsTrigger value='premier-league'>Premier League</TabsTrigger>
        <TabsTrigger value='la-liga'>La Liga</TabsTrigger>
        <TabsTrigger value='bundesliga'>Bundesliga</TabsTrigger>
        <TabsTrigger value='serie-a'>Serie A</TabsTrigger>
        <TabsTrigger value='ligue-1'>Ligue 1</TabsTrigger>
      </TabsList>

      <Card>
        <CardHeader className='pb-0'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <CardTitle>Premier League</CardTitle>
              <CardDescription>England • 2023/24 Season</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
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
            </div>
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
                    {premierLeagueTeams.map((team, index) => {
                      let rowClass = "";
                      if (team.pos <= 4)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.pos >= 5 && team.pos <= 6)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.pos === 7)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.pos >= 18)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.pos}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.played}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.won}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.drawn}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.lost}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.points}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.form.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='la-liga' className='mt-0'>
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
                    {laLigaTeams.map((team, index) => {
                      let rowClass = "";
                      if (team.pos <= 4)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.pos >= 5 && team.pos <= 6)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.pos === 7)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.pos >= 18)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.pos}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.played}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.won}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.drawn}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.lost}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.points}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.form.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='bundesliga' className='mt-0'>
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
                    {bundesligaTeams.map((team, index) => {
                      let rowClass = "";
                      if (team.pos <= 4)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.pos >= 5 && team.pos <= 6)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.pos === 7)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.pos >= 16)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.pos}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.played}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.won}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.drawn}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.lost}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.points}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.form.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='serie-a' className='mt-0'>
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
                    {serieATeams.map((team, index) => {
                      let rowClass = "";
                      if (team.pos <= 4)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.pos >= 5 && team.pos <= 6)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.pos === 7)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.pos >= 18)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.pos}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.played}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.won}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.drawn}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.lost}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.points}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.form.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='ligue-1' className='mt-0'>
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
                    {ligue1Teams.map((team, index) => {
                      let rowClass = "";
                      if (team.pos <= 3)
                        rowClass = "border-l-4 border-l-blue-600";
                      else if (team.pos === 4)
                        rowClass = "border-l-4 border-l-orange-500";
                      else if (team.pos === 5)
                        rowClass = "border-l-4 border-l-green-600";
                      else if (team.pos >= 17)
                        rowClass = "border-l-4 border-l-red-600";

                      return (
                        <tr
                          key={index}
                          className={`${rowClass} ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          } hover:bg-muted/40 transition-colors`}
                        >
                          <td className='py-3 px-4'>{team.pos}</td>
                          <td className='py-3 px-4'>
                            {team.teamId ? (
                              <Link
                                href={`/teams/${team.teamId}`}
                                className='flex items-center gap-2 hover:text-green-600 transition-colors'
                              >
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </Link>
                            ) : (
                              <div className='flex items-center gap-2'>
                                <Image
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.team}
                                  width={20}
                                  height={20}
                                  className='rounded-full'
                                />
                                <span>{team.team}</span>
                              </div>
                            )}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.played}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.won}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.drawn}
                          </td>
                          <td className='py-3 px-2 text-center'>{team.lost}</td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsFor}
                          </td>
                          <td className='py-3 px-2 text-center'>
                            {team.goalsAgainst}
                          </td>
                          <td className='py-3 px-2 text-center font-medium'>
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className='py-3 px-4 text-center font-bold'>
                            {team.points}
                          </td>
                          <td className='py-3 px-4'>
                            <div className='flex items-center justify-center gap-1'>
                              {team.form.map((result, i) => (
                                <FormIndicator key={i} result={result} />
                              ))}
                            </div>
                          </td>
                          <td className='py-3 px-2 text-center'>
                            <StatusBadge status={team.status} />
                          </td>
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
