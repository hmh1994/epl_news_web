import { LastMatches } from "@/src/entities/game/last-matches";
import { LiveMatches } from "@/src/entities/game/live-matches";
import { UpcomingGames } from "@/src/entities/game/upcoming-games";
import { LatestTrasnfer, SimpleNews } from "@/src/entities/news/ui";
import { TopAssits, TopScorer } from "@/src/entities/player/ui";
import { TeamRankingTable } from "@/src/entities/team/ui";
import {
  ColorWrapper,
  Footer,
  ResponsiveContainer,
  Header,
} from "@/src/shared/ui";

const Test: React.FC = () => {
  return (
    <>
      <Header />
      <ColorWrapper cssOption={"bg-neutral-200 min-h-screen "}>
        <ResponsiveContainer>
          <div className='grid grid-flow-row grid-rows-12 grid-cols-12 gap-4 py-10'>
            <div className={"col-span-3 bg-red-100 row-span-6"}>ASD</div>
            <div className={"col-span-6 bg-neutral-100 row-span-3"}>
              <div className='container mx-auto p-4'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                  {/* Upcoming Games - Full width */}
                  <div className='md:col-span-12 bg-neutral-50 rounded-lg shadow-md p-4'>
                    <UpcomingGames />
                  </div>

                  {/* Last Matches - Half width */}
                  <div className='md:col-span-6 bg-neutral-50 rounded-lg shadow-md p-4'>
                    <LastMatches />
                  </div>

                  {/* Live Matches - Half width */}
                  <div className='md:col-span-6 bg-neutral-50 rounded-lg shadow-md p-4'>
                    <LiveMatches />
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-span-3 row-span-3"}>
              <SimpleNews />
            </div>
            <div className={"col-span-6 row-span-6"}>
              <TeamRankingTable />
            </div>
            <div className={"col-span-3 row-span-6"}>
              <LatestTrasnfer />
              <div className={"my-2"}>
                <TopScorer />
              </div>
              <div className={"my-2"}>
                <TopAssits />
              </div>
            </div>
            <div className={"col-span-3 bg-blue-100 row-span-3"}>schedule</div>
          </div>
        </ResponsiveContainer>
      </ColorWrapper>
      <Footer />
    </>
  );
};
export default Test;
