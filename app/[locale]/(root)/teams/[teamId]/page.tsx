import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { teamsData } from "@/app/fixtures/team-detail";
import {
  RecentMatches,
  SquadList,
  TeamInfo,
  TeamSeasonStat,
  TeamTrophy,
} from "@/components/team-detail";
import { CustomTabTrigger } from "@/components/common";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const teamId = (await params).teamId;
  const team = teamsData["liverpool"];

  if (!team) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-gradient-to-b from-muted/50 to-background pt-8 pb-16'>
        <div className='container'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
            <div className='relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0'>
              <Image
                src={team.logo || "/placeholder.svg"}
                alt={team.name}
                fill
                className='object-contain'
              />
            </div>
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-4xl font-bold'>{team.name}</h1>
              <p className='text-muted-foreground mt-2 max-w-2xl'>
                {team.description}
              </p>

              <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-6'>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-muted-foreground' />
                  <span>{team.stadium}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>Founded {team.founded}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Trophy className='h-4 w-4 text-muted-foreground' />
                  <span>Position: {team.position}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <span>Manager: {team.manager}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container py-8'>
        <Tabs defaultValue='squad' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
            <CustomTabTrigger value='squad'>Squad</CustomTabTrigger>
            <CustomTabTrigger value='fixtures'>
              Fixtures & Results
            </CustomTabTrigger>
            <CustomTabTrigger value='stats'>Team Stats</CustomTabTrigger>
          </TabsList>

          <TabsContent value='squad' className='space-y-6'>
            <SquadList players={team.players} />
          </TabsContent>

          <TabsContent value='fixtures' className='space-y-8'>
            <RecentMatches
              name={team.name}
              recentMatches={team.recentMatches}
              upcomingMatches={team.upcomingMatches}
            />
          </TabsContent>

          <TabsContent value='stats' className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <TeamSeasonStat team={team} />
              <TeamTrophy trophies={team.trophies} />
            </div>
            <TeamInfo team={team} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
