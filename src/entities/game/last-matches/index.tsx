"use client";

import { MatchCard, type MatchProps } from "../match-card";
import { HistoryIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

const lastMatches: MatchProps[] = [
  {
    homeTeam: {
      name: "첼시",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t38.png",
      score: 2,
    },
    awayTeam: {
      name: "아스널",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t88.png",
      score: 1,
    },
    date: "2025년 4월 25일",
    time: "완료",
    venue: "스탬포드 브릿지",
  },
  {
    homeTeam: {
      name: "맨체스터 시티",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t111.png",
      score: 3,
    },
    awayTeam: {
      name: "토트넘",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t33.png",
      score: 0,
    },
    date: "2025년 4월 24일",
    time: "완료",
    venue: "에티하드 스타디움",
  },
  {
    homeTeam: {
      name: "PSG",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
      score: 2,
    },
    awayTeam: {
      name: "마르세유",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t55.png",
      score: 2,
    },
    date: "2025년 4월 23일",
    time: "완료",
    venue: "파르크 데 프랭스",
  },
];

export function LastMatches() {
  // 표시할 경기 수를 제한합니다
  const [displayCount, setDisplayCount] = React.useState(2);
  const hasMoreMatches = lastMatches.length > displayCount;

  const handleViewMore = () => {
    setDisplayCount(lastMatches.length);
  };

  return (
    <div>
      <div className='flex items-center mb-4'>
        <HistoryIcon className='h-5 w-5 mr-2' />
        <h2 className='text-xl font-bold'>Last Matches</h2>
      </div>

      <div className='space-y-4'>
        {lastMatches.slice(0, displayCount).map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}

        {hasMoreMatches && (
          <button
            className='w-full mt-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 text-sm font-medium'
            onClick={handleViewMore}
          >
            Show More Results
            <ChevronDownIcon className='h-4 w-4' />
          </button>
        )}
      </div>
    </div>
  );
}
