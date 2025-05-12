import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { playersData } from "@/app/fixtures/player-detail";
import { CustomTabTrigger } from "@/components/common";
import {
  PlayerCareer,
  PlayerDetailTitle,
  PlayerInfo,
  PlayerRecentPerformance,
  PlayerStat,
} from "@/components/player-detail";

export default async function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  const playerId = (await params).playerId;
  const player = playersData["erling-haaland"];

  if (!player) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-gradient-to-b from-muted/50 to-background pt-8 pb-16'>
        <PlayerDetailTitle player={player} />
      </div>

      <div className='container py-8'>
        <Tabs defaultValue='stats' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
            <CustomTabTrigger value='stats'>Statistics</CustomTabTrigger>
            <CustomTabTrigger value='career'>Career</CustomTabTrigger>
            <CustomTabTrigger value='form'>Recent Form</CustomTabTrigger>
          </TabsList>

          <TabsContent value='stats' className='space-y-6'>
            <PlayerStat player={player} />
          </TabsContent>

          <TabsContent value='career' className='space-y-6'>
            <PlayerCareer careerHistory={player.careerHistory} />

            <PlayerInfo player={player} />
          </TabsContent>

          <TabsContent value='form' className='space-y-6'>
            <PlayerRecentPerformance recentForm={player.recentForm} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
