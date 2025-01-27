"use client";
import Footer from "./components/footer";
import Header from "./components/header";
import GameSchedule from "./components/home/game-schedule";
import NewsSection from "./components/home/news-section";
import RecordTable from "./components/home/record-table";
import TeamRankingSection from "./components/home/team-ranking-section";
// import RecordTable from "./components/home/record-table";
import MainContainer from "./components/main-container";

export default function Home() {
  return (
    <>
      <Header />
      <div className='2xl:px-24 xl:px-12 bg-neutral-700 mt-[150px]'>
        <MainContainer>
          <div className='bg-neutral-700 grid md:grid-cols-3 xs:grid-cols-1 gap-6 w-full px-4 pt-10 mb-10'>
            <div className={"md:col-span-2 xs:col-span-1"}>
              <div className={`bg-neutral-800 rounded-lg p-2 h-content mb-3`}>
                <GameSchedule />
              </div>
            </div>
            <div className={"col-span-1"}>
              <div className={`bg-neutral-800 rounded-lg p-2  mb-3`}>
                <NewsSection />
              </div>
              <div className={`bg-neutral-800 rounded-lg p-2  mb-3`}>
                <TeamRankingSection />
              </div>
              <div className={`bg-neutral-800 rounded-lg p-2  mb-3`}>
                <RecordTable />
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
      <Footer />
    </>
  );
}
