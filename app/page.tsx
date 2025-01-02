"use client";
import Footer from "./components/footer";
import Header from "./components/header";
import GameSchedule from "./components/home/game-schedule";
import NewsSection from "./components/home/news-section";
import RankingTable from "./components/home/ranking-table";
import RecordTable from "./components/home/record-table";
import MainContainer from "./components/main-container";
import { useLeague } from "./context/LeagueContext";

export default function Home() {
  const { league } = useLeague();
  return (
    <>
      <Header />
      <div className='2xl:px-24 xl:px-12 bg-zinc-100'>
        <MainContainer>
          <div className='grid grid-cols-3 gap-6 w-full px-4 pt-10'>
            <div
              className={`bg-${league}-main rounded-lg col-span-2  row-span-2 p-2`}
            >
              <GameSchedule />
            </div>
            <div className={`bg-${league}-main rounded-lg row-span-4 p-2`}>
              <NewsSection />
            </div>
            <div className={`bg-${league}-main  rounded-lg row-span-2 p-2`}>
              <RankingTable />
            </div>
            <div className={`bg-${league}-main rounded-lg row-span-2 p-2`}>
              <RecordTable />
            </div>
          </div>
        </MainContainer>
      </div>
      <Footer />
    </>
  );
}
