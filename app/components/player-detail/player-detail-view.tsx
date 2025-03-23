"use client";

import { PlayerTabs } from "@/app/types/player-tabs";
import { useState } from "react";
import PlayerDetailTabs from "./tabs";
import Stats from "./stats";
import Divider from "../common/divider";

export default function PlayerDetailView() {
  const [curTab, setCurTab] = useState<PlayerTabs>(PlayerTabs.Overview);
  return (
    <>
      <PlayerDetailTabs curTab={curTab} setCurTab={setCurTab} />
      <Divider />
      <div className={"mb-10"} />
      {curTab === PlayerTabs.Stats && <Stats />}
    </>
  );
}
