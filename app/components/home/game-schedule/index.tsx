// import { Button } from "@/components/ui/button"
// import { ChevronRight } from 'lucide-react'
import Image from "next/image";

interface Match {
  homeTeam: {
    name: string;
    score: number;
    logo: string;
  };
  awayTeam: {
    name: string;
    score: number;
    logo: string;
  };
  status: string;
  date?: string;
}

const matches: Match[] = [
  {
    homeTeam: {
      name: "본머스",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "첼시",
      score: 2,
      logo: "/epl_teams/liverpool.png",
    },
    status: "종료임",
  },
  {
    homeTeam: {
      name: "웨스트 햄",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "브렌트퍼드",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    status: "어제",
  },
  {
    homeTeam: {
      name: "사우샘프턴",
      score: 0,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "토트넘",
      score: 5,
      logo: "/epl_teams/liverpool.png",
    },
    status: "어제",
  },
  {
    homeTeam: {
      name: "브라이턴",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "크리스털 팰리스",
      score: 3,
      logo: "/epl_teams/liverpool.png",
    },
    status: "12. 15. (일)",
  },
  {
    homeTeam: {
      name: "맨 시티",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "맨유",
      score: 2,
      logo: "/epl_teams/liverpool.png",
    },
    status: "어제",
  },
  {
    homeTeam: {
      name: "노팅엄 포리스트",
      score: 2,
      logo: "/epl_teams/liverpool.png",
    },
    awayTeam: {
      name: "애스턴 빌라",
      score: 1,
      logo: "/epl_teams/liverpool.png",
    },
    status: "12. 15. (일)",
  },
];

export default function GameSchedule() {
  return (
    <div className='rounded-lg w-full mx-auto bg-gray-50 p-4'>
      <div className='border-b'>
        <div className='flex items-center justify-between p-4'>
          <div className='text-sm'>경기 · 경기일(16/38)</div>
          {">"}
        </div>
      </div>
      <div className='divide-y'>
        {matches.map((match, index) => (
          <div key={index} className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3 flex-1'>
              <div className='flex items-center gap-2 flex-1'>
                <Image
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
                <span className='text-sm'>{match.homeTeam.name}</span>
              </div>
              <span className='font-medium'>{match.homeTeam.score}</span>
            </div>
            <div className='px-4 text-xs text-gray-500'>{match.status}</div>
            <div className='flex items-center gap-3 flex-1 justify-end'>
              <span className='font-medium'>{match.awayTeam.score}</span>
              <div className='flex items-center gap-2 flex-1 justify-end'>
                <span className='text-sm'>{match.awayTeam.name}</span>
                <Image
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='p-4'>
        <button
          type='button'
          className='text-violet-900 hover:text-white border border-violet-700 hover:bg-violet-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-violet-900 dark:text-violet-900 dark:hover:text-white dark:hover:bg-violet-800 '
        >
          전체 경기 일정
        </button>
      </div>
    </div>
  );
}
