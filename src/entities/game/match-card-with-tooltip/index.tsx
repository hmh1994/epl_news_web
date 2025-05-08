"use client";

import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

export function MatchCardWithTooltip({
  homeTeam,
  awayTeam,
  date,
  time,
  venue,
  isLive = false,
  minute,
}: MatchProps) {
  const [showHomeTooltip, setShowHomeTooltip] = useState(false);
  const [showAwayTooltip, setShowAwayTooltip] = useState(false);
  const [showVenueTooltip, setShowVenueTooltip] = useState(false);

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
              <span
                className='text-sm font-medium text-center block w-full truncate'
                onMouseEnter={() => setShowHomeTooltip(true)}
                onMouseLeave={() => setShowHomeTooltip(false)}
              >
                {homeTeam.name}
              </span>
              {showHomeTooltip && (
                <div className='absolute z-10 w-auto p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap left-1/2 transform -translate-x-1/2 top-full'>
                  {homeTeam.name}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col items-center w-2/12 justify-center'>
            {homeTeam.score !== undefined && awayTeam.score !== undefined ? (
              <div className='text-xl font-bold'>
                {homeTeam.score} - {awayTeam.score}
              </div>
            ) : (
              <div className='text-xl font-bold'>VS</div>
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
              <span
                className='text-sm font-medium text-center block w-full truncate'
                onMouseEnter={() => setShowAwayTooltip(true)}
                onMouseLeave={() => setShowAwayTooltip(false)}
              >
                {awayTeam.name}
              </span>
              {showAwayTooltip && (
                <div className='absolute z-10 w-auto p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap left-1/2 transform -translate-x-1/2 top-full'>
                  {awayTeam.name}
                </div>
              )}
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
            <span
              className='truncate'
              onMouseEnter={() => setShowVenueTooltip(true)}
              onMouseLeave={() => setShowVenueTooltip(false)}
            >
              {venue}
            </span>
            {showVenueTooltip && (
              <div className='absolute z-10 w-auto p-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap left-0 transform translate-y-1'>
                {venue}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
