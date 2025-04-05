"use client";

import { PlayerTabs } from "@/app/types/player-tabs";
import { useState } from "react";
import PlayerDetailTabs from "./tabs";
import Stats from "./stats";
import Divider from "../common/divider";
import Overview from "./overview";
import PlayerInfoCard from "./\bplayer-info-card";

export default function PlayerDetailView() {
  const [curTab, setCurTab] = useState<PlayerTabs>(PlayerTabs.Overview);
  return (
    <div className='grid grid-cols-3 gap-4 px-2 my-5'>
      <div>
        <PlayerInfoCard />
      </div>
      <div className='col-span-2'>
        <PlayerDetailTabs curTab={curTab} setCurTab={setCurTab} />
        <Divider />
        <div className={"mb-10"} />
        {curTab === PlayerTabs.Overview && <Overview />}
        {curTab === PlayerTabs.Stats && <Stats />}
      </div>
    </div>
  );
}
