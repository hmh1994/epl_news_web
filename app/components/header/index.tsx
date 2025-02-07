"use client";
import { SOCCER_LEAGUE, useLeague } from "@/app/context/LeagueContext";
import Menu from "./Menu";

export default function Header() {
  const { league, setLeague } = useLeague();
  const onClick = (_league: SOCCER_LEAGUE) => () => {
    setLeague(_league);
  };
  const setEPL = onClick(SOCCER_LEAGUE.EPL);
  const setKLeague = onClick(SOCCER_LEAGUE.K_LEAGUE);
  return (
    <div className={"container mx-auto bg-neutral-800"}>
      <div className='fixed top-0 left-0 right-0 z-10'>
        <header className='w-full flex flex-col'>
          <div className='w-full flex items-center h-[60px] bg-neutral-600 px-4 text-base font-semibold text-white'>
            <div className={"grow"} />
            <button
              className={`rounded-xl w-20 py-1 px-2 ${
                league === "epl" && "bg-stone-400 text-stone-700"
              }`}
              onClick={setEPL}
            >
              EPL
            </button>
            <button
              className={`rounded-xl w-30 py-1 px-2 ${
                league === "k_league" && "bg-stone-400 text-stone-700"
              }`}
              onClick={setKLeague}
            >
              K-League
            </button>
          </div>
          <Menu />
        </header>
      </div>
      {/* <Schedule /> */}
    </div>
  );
}
