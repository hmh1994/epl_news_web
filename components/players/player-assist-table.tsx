import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPlayerAssistRank } from "@/src/entities/players/apis/get-player-assist-rank";

export async function PlayerAssistTable() {
  const { playerAssistRank } = await getPlayerAssistRank();
  return (
    <TabsContent value='assists' className='mt-0'>
      <div className='rounded-md border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-muted/50 border-b'>
                <th className='text-left py-3 px-4 font-medium'>Rank</th>
                <th className='text-left py-3 px-4 font-medium'>Player</th>
                <th className='text-left py-3 px-4 font-medium'>Team</th>
                <th className='text-center py-3 px-2 font-medium'>League</th>
                <th className='text-center py-3 px-2 font-medium'>Age</th>
                <th className='text-center py-3 px-2 font-medium'>Assists</th>
                <th className='text-center py-3 px-2 font-medium'>Goals</th>
                <th className='text-center py-3 px-2 font-medium'>Apps</th>
                <th className='text-center py-3 px-2 font-medium'>A/M</th>
              </tr>
            </thead>
            <tbody>
              {playerAssistRank.map((player, index) => (
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
                            src={player.playerImg || "/placeholder.svg"}
                            alt={player.playerNameKr}
                          />
                          <AvatarFallback>
                            {player.playerNameKr.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{player.playerNameKr}</div>
                          <div className='text-xs text-muted-foreground'>
                            {player.countryEn}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={player.playerImg || "/placeholder.svg"}
                            alt={player.playerNameKr}
                          />
                          <AvatarFallback>
                            {player.playerNameKr.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{player.playerNameKr}</div>
                          <div className='text-xs text-muted-foreground'>
                            {player.countryEn}
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
                          src={player.teamIcon || "/placeholder.svg"}
                          alt={player.teamNameKr}
                          width={20}
                          height={20}
                          className='rounded-full'
                        />
                        <span>{player.teamNameEn}</span>
                      </Link>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Image
                          src={player.teamIcon || "/placeholder.svg"}
                          alt={player.teamNameEn}
                          width={20}
                          height={20}
                          className='rounded-full'
                        />
                        <span>{player.teamNameEn}</span>
                      </div>
                    )}
                  </td>
                  <td className='py-3 px-2 text-center'>
                    <Badge variant='outline' className='font-normal'>
                      Premier League
                    </Badge>
                  </td>
                  <td className='py-3 px-2 text-center'>{player.age}</td>
                  <td className='py-3 px-2 text-center font-bold'>
                    {player.assists}
                  </td>
                  <td className='py-3 px-2 text-center'>{player.goals}</td>
                  <td className='py-3 px-2 text-center'>
                    {player.appearances}
                  </td>
                  <td className='py-3 px-2 text-center'>
                    {(player.assists / player.appearances).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TabsContent>
  );
}
