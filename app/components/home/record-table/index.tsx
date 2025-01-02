"use client";

import { useState } from "react";
import Image from "next/image";

export default function RecordTable() {
  const [activeTab, setActiveTab] = useState("goal");

  const rankings = [
    {
      rank: 1,
      name: "모하메드 살라",
      team: "리버풀",
      points: 17,
      avatar: "/epl_teams/liverpool.png",
      teamIcon: "/epl_teams/liverpool.png",
    },
    {
      rank: 2,
      name: "엘링 홀란드",
      team: "맨 시티",
      points: 14,
      avatar: "/epl_teams/liverpool.png",
      teamIcon: "/epl_teams/liverpool.png",
    },
    {
      rank: 3,
      name: "알렉산더 이사크",
      team: "뉴캐슬",
      points: 12,
      avatar: "/epl_teams/liverpool.png",
      teamIcon: "/epl_teams/liverpool.png",
    },
  ];

  const tabs = [
    { id: "goal", label: "골" },
    { id: "assist", label: "어시스트" },
    { id: "yellow", label: "옐로우 카드" },
    { id: "red", label: "레드 카드" },
  ];

  return (
    <div className='w-full h-full bg-zinc-100 p-4'>
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-4'>득점 순위</h2>
        <div className='border-b'>
          <div className='flex'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium relative
                  ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600' />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {rankings.map((player) => (
          <div key={player.rank} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-6 text-lg font-semibold'>{player.rank}</span>
              <Image
                src={player.avatar}
                alt=''
                width={40}
                height={40}
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <span className='font-medium'>{player.name}</span>
                <div className='flex items-center gap-1'>
                  <Image
                    src={player.teamIcon}
                    alt=''
                    width={20}
                    height={20}
                    className='rounded-full'
                  />
                  <span className='text-sm text-gray-500'>{player.team}</span>
                </div>
              </div>
            </div>
            <span className='font-semibold'>{player.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
