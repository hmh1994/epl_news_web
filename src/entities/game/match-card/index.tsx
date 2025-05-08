import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

export interface MatchProps {
  homeTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  date: string;
  time: string;
  venue: string;
  isLive?: boolean;
  minute?: string;
}

export function MatchCard({
  homeTeam,
  awayTeam,
  date,
  time,
  venue,
  isLive = false,
  minute,
}: MatchProps) {
  return (
    <div className='mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow'>
      <div className='p-4'>
        {isLive && (
          <div className='flex items-center mb-2'>
            <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center'>
              <span className='h-2 w-2 bg-white rounded-full mr-1 animate-pulse'></span>
              LIVE {minute && `- ${minute}'`}
            </span>
          </div>
        )}

        <div className='flex justify-between items-center mb-4'>
          <div className='flex flex-col items-center w-5/12'>
            <div className='h-12 w-12 relative mb-2'>
              <Image
                src={homeTeam.logo || "/placeholder.svg?height=48&width=48"}
                alt={homeTeam.name}
                fill
                className='object-contain'
              />
            </div>
            <div className='relative inline-block w-full'>
              <span className='text-sm font-medium text-center block w-full truncate'>
                {homeTeam.name}
              </span>
              <div className='absolute z-10 w-auto p-2 -mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap left-1/2 transform -translate-x-1/2 top-full'>
                {homeTeam.name}
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center w-2/12 justify-center'>
            {homeTeam.score !== undefined && awayTeam.score !== undefined ? (
              <div className='text-xl font-bold flex justify-center items-center w-full text-center'>
                <div className='flex flex-col md:flex-row items-center justify-center'>
                  <span className='text-center'>{homeTeam.score}</span>
                  <span className='mx-1'>-</span>
                  <span className='text-center'>{awayTeam.score}</span>
                </div>
              </div>
            ) : (
              <div className='text-xl font-bold text-center w-full'>VS</div>
            )}
          </div>

          <div className='flex flex-col items-center w-5/12'>
            <div className='h-12 w-12 relative mb-2'>
              <Image
                src={awayTeam.logo || "/placeholder.svg?height=48&width=48"}
                alt={awayTeam.name}
                fill
                className='object-contain'
              />
            </div>
            <div className='relative inline-block w-full'>
              <span className='text-sm font-medium text-center block w-full truncate'>
                {awayTeam.name}
              </span>
              <div className='absolute z-10 w-auto p-2 -mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap left-1/2 transform -translate-x-1/2 top-full'>
                {awayTeam.name}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-2 flex flex-col gap-1 text-sm text-gray-500'>
          <div className='flex items-center'>
            <CalendarIcon className='h-4 w-4 mr-2 flex-shrink-0' />
            <span className='truncate'>{date}</span>
          </div>
          <div className='flex items-center'>
            <ClockIcon className='h-4 w-4 mr-2 flex-shrink-0' />
            <span className='truncate'>{time}</span>
          </div>
          <div className='flex items-center'>
            <MapPinIcon className='h-4 w-4 mr-2 flex-shrink-0' />
            <span className='truncate'>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
