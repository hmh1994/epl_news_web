import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayerGoalTable } from "./player-goal-table";
import { PlayerAssistTable } from "./player-assist-table";

export function PlayerRankingTable() {
  return (
    <Tabs defaultValue='goals' className='w-full'>
      <TabsList className='grid grid-cols-2 md:grid-cols-2 mb-6'>
        <TabsTrigger value='goals'>Goal Scorers</TabsTrigger>
        <TabsTrigger value='assists'>Assist Providers</TabsTrigger>
        {/* <TabsTrigger value='young-players'>Young Players</TabsTrigger> */}
      </TabsList>

      <Card>
        <CardHeader className='pb-0'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <CardTitle>Top Goal Scorers</CardTitle>
              <CardDescription>
                Players with the most goals scored this season
              </CardDescription>
            </div>
            <Badge className='bg-green-600'>2023/24 Season</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <PlayerGoalTable />

          <PlayerAssistTable />

          {/* <TabsContent value='goalkeepers' className='mt-0'>
            <div className='rounded-md border overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-muted/50 border-b'>
                      <th className='text-left py-3 px-4 font-medium'>Rank</th>
                      <th className='text-left py-3 px-4 font-medium'>
                        Player
                      </th>
                      <th className='text-left py-3 px-4 font-medium'>Team</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        League
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>Age</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Clean Sheets
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Apps
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Goals Conceded
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Save %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {goalkeepers.map((player, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-background" : "bg-muted/20"
                        } hover:bg-muted/40 transition-colors`}
                      >
                        <td className='py-3 px-4'>{player.rank}</td>
                        <td className='py-3 px-4'>
                          {player.playerId ? (
                            <Link
                              href={`/players/${player.playerId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-4'>
                          {player.teamId ? (
                            <Link
                              href={`/teams/${player.teamId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          <Badge variant='outline' className='font-normal'>
                            {player.league}
                          </Badge>
                        </td>
                        <td className='py-3 px-2 text-center'>{player.age}</td>
                        <td className='py-3 px-2 text-center font-bold'>
                          {player.cleanSheets}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.appearances}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.goalsConceded}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.savePercentage.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='defenders' className='mt-0'>
            <div className='rounded-md border overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-muted/50 border-b'>
                      <th className='text-left py-3 px-4 font-medium'>Rank</th>
                      <th className='text-left py-3 px-4 font-medium'>
                        Player
                      </th>
                      <th className='text-left py-3 px-4 font-medium'>Team</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        League
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>Age</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Apps
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Clean Sheets
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>G+A</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Duels Won
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {defenders.map((player, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-background" : "bg-muted/20"
                        } hover:bg-muted/40 transition-colors`}
                      >
                        <td className='py-3 px-4'>{player.rank}</td>
                        <td className='py-3 px-4'>
                          {player.playerId ? (
                            <Link
                              href={`/players/${player.playerId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-4'>
                          {player.teamId ? (
                            <Link
                              href={`/teams/${player.teamId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          <Badge variant='outline' className='font-normal'>
                            {player.league}
                          </Badge>
                        </td>
                        <td className='py-3 px-2 text-center'>{player.age}</td>
                        <td className='py-3 px-2 text-center'>
                          {player.appearances}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.cleanSheets}
                        </td>
                        <td className='py-3 px-2 text-center font-bold'>
                          {player.goals + player.assists}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.duelsWon}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent> */}

          {/* <TabsContent value='young-players' className='mt-0'>
            <div className='rounded-md border overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-muted/50 border-b'>
                      <th className='text-left py-3 px-4 font-medium'>Rank</th>
                      <th className='text-left py-3 px-4 font-medium'>
                        Player
                      </th>
                      <th className='text-left py-3 px-4 font-medium'>Team</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        League
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>Age</th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Apps
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Goals
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>
                        Assists
                      </th>
                      <th className='text-center py-3 px-2 font-medium'>G+A</th>
                    </tr>
                  </thead>
                  <tbody>
                    {youngPlayers.map((player, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-background" : "bg-muted/20"
                        } hover:bg-muted/40 transition-colors`}
                      >
                        <td className='py-3 px-4'>{player.rank}</td>
                        <td className='py-3 px-4'>
                          {player.playerId ? (
                            <Link
                              href={`/players/${player.playerId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={player.avatar || "/placeholder.svg"}
                                  alt={player.player}
                                />
                                <AvatarFallback>
                                  {player.player.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{player.player}</div>
                                <div className='text-xs text-muted-foreground'>
                                  {player.nationality}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-4'>
                          {player.teamId ? (
                            <Link
                              href={`/teams/${player.teamId}`}
                              className='flex items-center gap-2 hover:text-green-600 transition-colors'
                            >
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </Link>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <Image
                                src={player.teamLogo || "/placeholder.svg"}
                                alt={player.team}
                                width={20}
                                height={20}
                                className='rounded-full'
                              />
                              <span>{player.team}</span>
                            </div>
                          )}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          <Badge variant='outline' className='font-normal'>
                            {player.league}
                          </Badge>
                        </td>
                        <td className='py-3 px-2 text-center font-bold'>
                          {player.age}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.appearances}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.goals}
                        </td>
                        <td className='py-3 px-2 text-center'>
                          {player.assists}
                        </td>
                        <td className='py-3 px-2 text-center font-bold'>
                          {player.goals + player.assists}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent> */}
        </CardContent>
      </Card>
    </Tabs>
  );
}
