import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { matchesData } from "@/app/fixtures/match-detail";
import { CustomTabTrigger } from "@/components/common";
import {
  MatchHistory,
  MatchLineup,
  MatchPreview,
  MatchStat,
  MatchTimeline,
  MatchTitleBanner,
  RelatedMatches,
} from "@/components/match-detail";
import { MatchSummary } from "@/components/match-detail/match-summary";

export default async function MatchPage({
  params,
}: {
  params: { matchId: string };
}) {
  const matchId = (await params).matchId;
  const match = matchesData[matchId as keyof typeof matchesData];

  if (!match) {
    notFound();
  }

  const isCompleted = match.status === "completed";

  return (
    <div className='min-h-screen bg-background'>
      <MatchTitleBanner match={match} />

      <div className='container py-8'>
        <Tabs
          defaultValue={isCompleted ? "summary" : "preview"}
          className='w-full'
        >
          <TabsList
            className={`grid w-full grid-cols-2 md:${
              isCompleted ? "grid-cols-4" : "grid-cols-3"
            } mb-6`}
          >
            <CustomTabTrigger value={isCompleted ? "summary" : "preview"}>
              {isCompleted ? "Summary" : "Preview"}
            </CustomTabTrigger>
            <CustomTabTrigger value='lineups'>Lineups</CustomTabTrigger>
            <CustomTabTrigger value='stats'>
              {isCompleted ? "Statistics" : "Head to Head"}
            </CustomTabTrigger>
            {isCompleted && (
              <CustomTabTrigger value={"timeline"}>Timeline</CustomTabTrigger>
            )}
          </TabsList>

          {isCompleted ? (
            // Content for completed matches
            <>
              <TabsContent value='summary' className='space-y-6'>
                <MatchSummary match={match} />
              </TabsContent>

              <TabsContent value='timeline' className='space-y-6'>
                <MatchTimeline match={match} />
              </TabsContent>

              <TabsContent value='stats' className='space-y-6'>
                <MatchStat match={match} />
              </TabsContent>
            </>
          ) : (
            // Content for upcoming matches
            <>
              <TabsContent value='preview' className='space-y-6'>
                <MatchPreview match={match} />
              </TabsContent>

              <TabsContent value='stats' className='space-y-6'>
                <MatchHistory match={match} />
              </TabsContent>
            </>
          )}

          <TabsContent value='lineups' className='space-y-6'>
            <MatchLineup match={match} />
          </TabsContent>
        </Tabs>

        <RelatedMatches match={match} />
      </div>
    </div>
  );
}
