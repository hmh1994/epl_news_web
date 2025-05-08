import { MatchCard, type MatchProps } from "../match-card";
import { CalendarDaysIcon, ChevronRightIcon } from "lucide-react";

const upcomingMatches: MatchProps[] = [
  {
    homeTeam: {
      name: "맨체스터 유나이티드",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    },
    awayTeam: {
      name: "리버풀",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t80.png",
    },
    date: "2025년 5월 1일",
    time: "20:00",
    venue: "올드 트래포드",
  },
  {
    homeTeam: {
      name: "바르셀로나",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t102.png",
    },
    awayTeam: {
      name: "레알 마드리드",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t110.png",
    },
    date: "2025년 5월 3일",
    time: "21:00",
    venue: "캄프 누",
  },
  {
    homeTeam: {
      name: "바이에른 뮌헨",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t3@x2.png",
    },
    awayTeam: {
      name: "도르트문트",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t35.png",
    },
    date: "2025년 5월 5일",
    time: "19:30",
    venue: "알리안츠 아레나",
  },
];

export function UpcomingGames() {
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <CalendarDaysIcon className='h-5 w-5 mr-2' />
          <h2 className='text-xl font-bold'>Upcoming Games</h2>
        </div>
        <button className='text-sm px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1'>
          View All
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {upcomingMatches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </div>
    </div>
  );
}
