"use client";

import { useState } from "react";

const tabs = [
  { _id: "goal", label: "골" },
  { _id: "assist", label: "어시스트" },
  { _id: "yellow", label: "옐로우 카드" },
  { _id: "red", label: "레드 카드" },
];

const mockPlayer = [
  {
    ranking: 1,
    teamName: "TEAM NAME",
    playerName: "PLAYER NAME",
    target: 10,
  },
  {
    ranking: 2,
    teamName: "TEAM NAME",
    playerName: "PLAYER NAME",
    target: 9,
  },
  {
    ranking: 3,
    teamName: "TEAM NAME",
    playerName: "PLAYER NAME",
    target: 8,
  },
  {
    ranking: 4,
    teamName: "TEAM NAME",
    playerName: "PLAYER NAME",
    target: 7,
  },
  {
    ranking: 5,
    teamName: "TEAM NAME",
    playerName: "PLAYER NAME",
    target: 6,
  },
];

export default function RecordTable() {
  const [curTab, setCurTab] = useState(tabs[0]);

  return (
    <div className={"grid h-full"}>
      <div className={"rounded-lg w-full mx-auto bg-neutral-900"}>
        <div
          className={
            "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black"
          }
        >
          Player Ranking
        </div>
        <div
          className={
            "flex center-align justify-left my-1 mx-3 text-neutral-200"
          }
        >
          {tabs.map((tab) => (
            <button
              key={tab._id}
              className={` my-1 mx-2 cursor-pointer ${
                curTab._id === tab._id &&
                "border-b border-green-400 text-green-400"
              }`}
              onClick={() => setCurTab(tab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className={
            "mt-5 mx-5 grid grid-cols-6 flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500 mb-3 text-sm"
          }
        >
          <div className={"col-span-4 flex"}>#</div>
          <div className={"col-span-2 flex justify-center"}>{curTab.label}</div>
        </div>
        {mockPlayer.map((player) => (
          <div
            className={`mx-5 grid grid-cols-6 flex justify-center center-align text-neutral-200 pb-4 border-b border-neutral-500 mb-3 text-sm`}
            key={player.ranking}
          >
            <div
              className={`col-span-1 flex pl-2
              ${player.ranking <= 3 && "border-l border-green-400"}
              `}
            >
              {player.ranking}
            </div>
            <div className={"col-span-3 "}>
              <div>{player.playerName}</div>
              <div className={"text-xs"}>{player.teamName}</div>
            </div>
            <div className={"col-span-2 flex justify-center"}>
              {player.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
