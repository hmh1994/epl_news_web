"use client";

import { MatchCard, type MatchProps } from "../match-card";
import { RadioIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

const liveMatches: MatchProps[] = [
  {
    homeTeam: {
      name: "유벤투스",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t17.png",
      score: 1,
    },
    awayTeam: {
      name: "AC 밀란",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t57.png",
      score: 1,
    },
    date: "오늘",
    time: "진행 중",
    venue: "알리안츠 스타디움",
    isLive: true,
    minute: "67",
  },
  {
    homeTeam: {
      name: "아틀레티코 마드리드",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t56.png",
      score: 0,
    },
    awayTeam: {
      name: "세비야",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png",
      score: 0,
    },
    date: "오늘",
    time: "진행 중",
    venue: "완다 메트로폴리타노",
    isLive: true,
    minute: "23",
  },
  {
    homeTeam: {
      name: "아약스",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t1@x2.png",
      score: 2,
    },
    awayTeam: {
      name: "PSV",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t2.png",
      score: 1,
    },
    date: "오늘",
    time: "진행 중",
    venue: "요한 크루이프 아레나",
    isLive: true,
    minute: "81",
  },
];

export function LiveMatches() {
  // 표시할 경기 수를 제한합니다
  const [displayCount, setDisplayCount] = React.useState(2);
  const hasMoreMatches = liveMatches.length > displayCount;

  const handleViewMore = () => {
    setDisplayCount(liveMatches.length);
  };

  return (
    <div>
      <div className='flex items-center mb-4'>
        <RadioIcon className='h-5 w-5 mr-2' />
        <h2 className='text-xl font-bold'>Live Matches</h2>
      </div>

      <div className='space-y-4'>
        {liveMatches.slice(0, displayCount).map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}

        {hasMoreMatches && (
          <button
            className='w-full mt-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 text-sm font-medium'
            onClick={handleViewMore}
          >
            Watch More Live Games
            <ChevronDownIcon className='h-4 w-4' />
          </button>
        )}
      </div>
    </div>
  );
}
