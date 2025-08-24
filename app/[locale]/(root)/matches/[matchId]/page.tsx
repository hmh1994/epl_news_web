import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { matchesData } from "@/app/fixtures/match-detail";
import { CustomTabTrigger } from "@/components/common";
import {
  MatchHistory,
  MatchLineup,
  MatchPreview,
  // MatchStat,
  MatchTimeline,
  MatchTitleBanner,
  // RelatedMatches,
} from "@/components/match-detail";
import { MatchSummary } from "@/components/match-detail/match-summary";
import { getMatchDetail } from "@/src/entities/match/apis/get-match-detail";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const matchId = (await params).matchId as "match-1" | "match-2";
  const result = await getMatchDetail({ fixtureId: matchId });
  const match = matchesData[matchId];

  if (!result) {
    notFound();
  }

  const isCompleted = result.gameStat !== null;

  return (
    <div className='min-h-screen bg-background'>
      <MatchTitleBanner match={result} isCompleted={isCompleted} />

      <div className='container py-8'>
        <Tabs
          defaultValue={isCompleted ? "summary" : "preview"}
          className='w-full'
        >
          <TabsList
            className={`grid w-full grid-cols-2 md:${
              isCompleted ? "grid-cols-3" : "grid-cols-3"
            } mb-6`}
          >
            <CustomTabTrigger value={isCompleted ? "summary" : "preview"}>
              {isCompleted ? "Summary" : "Preview"}
            </CustomTabTrigger>
            <CustomTabTrigger value='lineups'>Lineups</CustomTabTrigger>
            {/* <CustomTabTrigger value='stats'>
              {isCompleted ? "Statistics" : "Head to Head"}
            </CustomTabTrigger> */}
            {isCompleted && (
              <CustomTabTrigger value={"timeline"}>Timeline</CustomTabTrigger>
            )}
          </TabsList>

          {isCompleted ? (
            // Content for completed matches
            <>
              <TabsContent value='summary' className='space-y-6'>
                <MatchSummary match={result} />
              </TabsContent>

              <TabsContent value='timeline' className='space-y-6'>
                <MatchTimeline match={result} />
              </TabsContent>

              {/* <TabsContent value='stats' className='space-y-6'>
                <MatchStat match={match} />
              </TabsContent> */}
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
            <MatchLineup match={result} />
          </TabsContent>
        </Tabs>

        {/* <RelatedMatches match={match} /> */}
      </div>
    </div>
  );
}
