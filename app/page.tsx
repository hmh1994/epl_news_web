import Footer from "./components/footer";
import Header from "./components/header";
import GameSchedule from "./components/home/game-schedule";
import RankingTable from "./components/home/ranking-table";
import MainContainer from "./components/main-container";

export default function Home() {
  return (
    <>
      <Header />
      <div className='2xl:px-24 xl:px-12 bg-zinc-800'>
        <MainContainer>
          <div className='grid grid-cols-3 gap-6 w-full px-4 pt-10'>
            <div className={"bg-white rounded-lg col-span-2 row-span-2 p-2"}>
              <GameSchedule />
            </div>
            <div className={"bg-white h-[425px] rounded-lg row-span-2 p-2"}>
              <RankingTable />
            </div>
            <div className={"h-[200px] bg-red-300 rounded-lg"}>03</div>
          </div>
        </MainContainer>
      </div>
      <Footer />
    </>
  );
}
