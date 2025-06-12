import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { CustomTabTrigger, FullTableBtn } from "../common";
// import { goalScorerData, assistsData } from "@/app/fixtures/home";
// import { getPlayerRank } from "@/src/entities/players/apis/get-player-rank";

export async function PlayerRanking() {
  // const { goalRanks, assistRanks } = await getPlayerRank();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goalRanks: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assistRanks: any[] = [];
  return (
    <section className='container py-12 space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>선수 통계</h2>
        </div>
        <FullTableBtn link={"/players"} />
      </div>

      <Tabs defaultValue='goals' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-6'>
          <CustomTabTrigger value={"goals"}>골 순위</CustomTabTrigger>
          <CustomTabTrigger value='assists'>어시스트 순위</CustomTabTrigger>
        </TabsList>
        <TabsContent value='goals' className='space-y-4'>
          <div className='rounded-lg border shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-muted/50'>
                  <tr className='text-left'>
                    <th className='p-3 text-sm font-medium'>순위</th>
                    <th className='p-3 text-sm font-medium'>선수</th>
                    <th className='p-3 text-sm font-medium'>팀</th>
                    <th className='p-3 text-sm font-medium text-center'>골</th>
                  </tr>
                </thead>
                <tbody>
                  {goalRanks.map((player, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }
                    >
                      <td className='p-3 text-sm'>{player.rank}</td>
                      <td className='p-3 text-sm'>
                        <Link href={`/players/${player.playerId}`}>
                          <div className='flex items-center gap-2'>
                            <Avatar className='h-8 w-8'>
                              <AvatarImage
                                src={player.photoUrl || "/placeholder.svg"}
                                alt={player.playerId}
                              />
                              <AvatarFallback>
                                {player.playerName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{player.playerName}</span>
                          </div>
                        </Link>
                      </td>
                      <td className='p-3 text-sm'>
                        <Link href={`/teams/${player.teamId}`}>
                          <div className='flex items-center gap-2'>
                            <Image
                              src={player.iconUrl || "/placeholder.svg"}
                              alt={player.teamId}
                              width={20}
                              height={20}
                              className='rounded-full'
                            />
                            <span>{player.teamName}</span>
                          </div>
                        </Link>
                      </td>
                      <td className='p-3 text-sm font-bold text-center'>
                        {player.statValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='assists' className='space-y-4'>
          <div className='rounded-lg border shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-muted/50'>
                  <tr className='text-left'>
                    <th className='p-3 text-sm font-medium'>순위</th>
                    <th className='p-3 text-sm font-medium'>선수</th>
                    <th className='p-3 text-sm font-medium'>팀</th>
                    <th className='p-3 text-sm font-medium text-center'>
                      어시스트
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assistRanks.map((player, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }
                    >
                      <td className='p-3 text-sm'>{player.rank}</td>
                      <td className='p-3 text-sm'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={player.photoUrl || "/placeholder.svg"}
                              alt={player.playerId}
                            />
                            <AvatarFallback>
                              {player.playerName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{player.playerName}</span>
                        </div>
                      </td>
                      <td className='p-3 text-sm'>
                        <div className='flex items-center gap-2'>
                          <Image
                            src={player.iconUrl || "/placeholder.svg"}
                            alt={player.teamId}
                            width={20}
                            height={20}
                            className='rounded-full'
                          />
                          <span>{player.teamName}</span>
                        </div>
                      </td>
                      <td className='p-3 text-sm font-bold text-center'>
                        {player.statValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
